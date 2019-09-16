import React, { useState } from 'react';

import { SERVIDOR } from '../index';

interface NewPostI {
	title: string;
	description: string;
	image: string | Blob
}

const NewPost: React.FC = () => {
	//@ts-ignore
	const token: string = localStorage.getItem('Authorization');

	const [values, updateValues] = useState<NewPostI>({
		title: '',
		description: '',
		image: ''
	});

	const onChange = (e: any) => {
		if (e.target.name === 'image') {
			console.log('should be image => ', e.target.name);
			updateValues({
				...values,
				[e.target.name]: e.target.files[0]
			});
		} else {
			updateValues({
				...values,
				[e.target.name]: e.target.value
			});
		}
	}	

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form_data = new FormData();
		form_data.append('title', values.title);
		form_data.append('description', values.description);
    	form_data.append('image', values.image);

    	await fetch(`${SERVIDOR}/api/posts/upload`, {
    		method: 'POST',
  			body: form_data,
  			headers: {
  				'Authorization': token
  			}
  		})
  		.then(res => res.text())
		.then((response: any) => {
			//
		})
		.catch(err => console.error(err));

  	}

	return (
		<>
			<div className="new_post">
				<h3>New Post</h3>
				<form onSubmit={handleSubmit} noValidate>
			  	<div>
			  		<input name="title" type="text" placeholder="Title..." value={values.title}  onChange={(e) => onChange(e)} />
			  	</div>
			  	<div>
			  		<textarea name="description" value={values.description} onChange={(e) => onChange(e)} placeholder="Description..."></textarea>
			  	</div>
			  	<div>
			  		<input name="image" onChange={(e) => onChange(e)} type="file" id="image_upload" />
			  	</div>
			  	<div>
			  		<button>upload</button>
			  	</div>
			</form>
			</div>
		</>
	);
}

export default NewPost;