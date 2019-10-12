import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

//Context
import { AuthContext } from '../auth_context';

import { SERVIDOR } from '../index';

export interface CommentI {
	user_id: string;
	post_id: string;
	comment_id: string;
	body: string;
	created_at: string;
	username: string;
}

const Comments: any = (props: any) => {
	//@ts-ignore
	const { userdata } = useContext(AuthContext);
	//@ts-ignore
	const token: string = localStorage.getItem('Authorization');
    let username: string = '';
    try {
    	username = userdata.username;
    } catch(e) {
    	// console.error(e);
    }
	const post_id = props.post_id;
	const [body, updateComment] = useState<string>('');
	const [comments, updateComments] = useState<CommentI[]>([{
		user_id: '',
        post_id: '',
        comment_id: '',
        body: '',
        created_at: '',
        username: ''
	}]);

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		await fetch(`https:${SERVIDOR}/api/comments/upload/${post_id}`, {
			method: 'POST',
			body: JSON.stringify({
				body
			}),
			headers: { 
				"Content-Type": "application/json",
				"Authorization": token
			}
		})
		.then(res => res.json())
		.catch(err => console.error(err))
		.then(response => {
			updateComment('');
			fetchComments();
		});
	}

	const handleDelete = async () => {
 		await fetch(`https:${SERVIDOR}/api/comments/delete/${post_id}`, {
			method: 'GET',
			headers: { 
				"Authorization": token
			}
		})
		.then(res => res.json())
		.catch(err => {
			console.error(err);
		})
		.then(res => {
			console.log(res);
			fetchComments();
		});
	}


	const fetchComments = async () => {
 		await fetch(`${SERVIDOR}/api/comments/${post_id}`, {
			method: 'GET'
		})
		.then(res => res.json())
		.catch(err => {
			console.error(err);
		})
		.then(res => {
			updateComments(res);
		});
	}

	useEffect(() => {
		fetchComments();
	}, []);

	return (
	<>
		<div className="comment_section">
			<h4>comments ({Object.keys(comments).length})</h4>
			{
				!!userdata ? (
					<div className="comment_section__box">
						<form onSubmit={onSubmit} noValidate>
							<textarea name="body" value={body} onChange={(e) => updateComment(e.target.value)} placeholder="Leave a comment..." id="comment_body"></textarea>
							<button className="btn-post" type="submit">submit</button>
						</form>
						<ul>
						{
							comments.map((comment: CommentI) => (
								<li key={comment.comment_id}>
									<div className="single_comment">
										{
											username === comment.username ? (
												<button onClick={() => handleDelete()} className="btn-delete">
													<svg width="12" height="13" xmlns="http://www.w3.org/2000/svg">
													  <path d="M5.843 4.912L10.255.6l1.397 1.43L7.24 6.344l4.312 4.412-1.43 1.397L5.81 7.74l-4.412 4.312L0 10.622 4.412 6.31.1 1.898 1.53.5l4.313 4.412z" fill="#121212" fill-rule="nonzero"/>
													</svg>
												</button>
											) : (
												<>
												</>
											)
										}
										<h5>
											By {comment.username}
										</h5>
										<p>
											{comment.body}
										</p>
										<small>{moment(comment.created_at).fromNow()}</small>
									</div>
								</li>
							))
						}
						</ul>
					</div>
				) : (
					<div>
						<p>
							<Link to="/login">Signin</Link> to comment
						</p>
					</div>
				)
			}

		</div>
	</>
	);
}

export default Comments;