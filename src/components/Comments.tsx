import React, { useState, useEffect } from 'react';
import moment from 'moment';

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
	const token: string = localStorage.getItem('Authorization');
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
		await fetch(`${SERVIDOR}/api/comments/upload/${post_id}`, {
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
		.then(response => console.log(response))
	}


	useEffect(() => {
		(async function(){
	 		await fetch(`${SERVIDOR}/api/comments/${post_id}`, {
				method: 'GET'
			})
			.then(res => res.json())
			.catch(err => {
				console.error(err);
			})
			.then(res => {
				updateComments(res);
				console.log(res);
			});
		}());

	}, []);

	return (
	<>
		<div className="comment_section">
			<h3>comments ({Object.keys(comments).length})</h3>
				<div className="comment_section__box">
					<form onSubmit={onSubmit} noValidate>
						<textarea name="body" value={body} onChange={(e) => updateComment(e.target.value)} placeholder="Leave a comment..." id="comment_body"></textarea>
						<button>submit</button>
					</form>
				</div>
			<ul>
				{
					comments.map((comment: CommentI) => (
						<li key={comment.comment_id}>
							<div className="single_comment">
								<h3>
									{comment.username}
								</h3>
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
	</>
	);
}

export default Comments;