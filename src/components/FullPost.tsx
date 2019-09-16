import React, { useState, useEffect } from 'react';
import Comments from './Comments';
import { PostI } from './Post';

import { SERVIDOR, PUBLIC } from '../index';

const FullPost: React.FC = (props: any) => {
	const post_id = props.match.params.post_id;

	const [post, updatePost] = useState<PostI>({
		user_id: '',
		post_id: '',
        title: '',
        description: '',
        url: '',
        created_at: ''
	});

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
		{	
			post.url === '' ? (
				<div className="layout">
					<h1>Loading post...</h1>
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