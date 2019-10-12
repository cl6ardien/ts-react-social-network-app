
import React, { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import Comments from './Comments';
import Spinner from './Spinner';
import { PostI } from './Post';
import { AuthContext } from '../auth_context';

import { SERVIDOR, PUBLIC } from '../index';

const FullPost: React.FC = (props: any) => {
	const post_id = props.match.params.post_id;
	//@ts-ignore
    const { userdata } = useContext(AuthContext);
    let user_id: string = '';
    try {
    	user_id = userdata.user_id;
    } catch(e) {
    	// console.error(e);
    }
	const token = localStorage.getItem('Authorization');
	const [redirect, setRedirect] = useState<boolean>(false);

	const [post, updatePost] = useState<PostI>({
		user_id: '',
		post_id: '',
        title: '',
        description: '',
        url: '',
        created_at: ''
	});

	const handleDelete = async () => {
		await fetch(`${SERVIDOR}/api/posts/delete/${post_id}`, {
			headers: {
				'Authorization': token||''
			}
		})
		.then(r => r.json())
		.catch(err => console.error(JSON.stringify(err)))
		.then(data => {
			console.log(data);
			setRedirect(true);
		});
	}

	useEffect(() => {
		async function urlretrieve() {
			await fetch(`${SERVIDOR}/api/posts/${post_id}`, {
				method: 'GET'
			})
			.then(res => res.json())
			.catch(err => {
				console.error(JSON.stringify(err));
			})
			.then(res => {
				updatePost(res[0]);
			});
		}

		urlretrieve();
	}, []);


	return (
	<>
		{ redirect && <Redirect to="/" /> }

		{	
			post.url === '' ? (
				<div className="layout">
					<Spinner />
				</div>
			)
			: (
				<>
					<div className="full_post">
						<div className="full_post__image">
							<img src={`${PUBLIC}/${post.url.split('/')[2]}`} alt="" />
						</div>

						<div className="full_post__article">
							<div className="search">
								<svg width="22" height="22" xmlns="http://www.w3.org/2000/svg">
								  <path d="M15.66 15.687l-.439-.456.743-1.016A7.956 7.956 0 0 0 17.5 9.5a8 8 0 1 0-8 8c1.702 0 3.32-.53 4.67-1.503l1.056-.761.434.451zm0 0l.45.47-.45-.47zm.45.47l2.163 2.253-2.162-2.253z" fill-rule="nonzero" stroke="#121212" stroke-width="3" fill="none"/>
								</svg>
							</div>

							<div className="headline-wrapper">
								<h3 className="title">
									{post.title}
								</h3>
								{
									
									user_id === post.user_id ? (
										<>
											<button onClick={() => handleDelete()} className="btn-delete">
												<svg width="12" height="13" xmlns="http://www.w3.org/2000/svg">
												  <path d="M5.843 4.912L10.255.6l1.397 1.43L7.24 6.344l4.312 4.412-1.43 1.397L5.81 7.74l-4.412 4.312L0 10.622 4.412 6.31.1 1.898 1.53.5l4.313 4.412z" fill="#121212" fill-rule="nonzero"/>
												</svg>
											</button>
										</>
									) : (
										<>
										</>
									)
									
								}
								
							</div>

							<div className="text-wrapper">
								<p>{post.description}</p>
							</div>

							<hr />

							<Comments post_id={post.post_id} />
						</div>
					</div>
				</>
			)
		}
	</>
	);
}

export default FullPost;