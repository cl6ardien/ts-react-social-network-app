import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { SERVIDOR } from '../index';

interface RegisterUserInput {
	username: string;
	email: string;
	password: string;
	confirm_password: string;
}

const Register: React.FC = () => {
	const [errors, updateErrors] = useState([]);
	const [redirect, updateRedirect] = useState<boolean>(false);

	const [fields, updateFields] = useState<RegisterUserInput>({
		username: '',
		email: '',
		password: '',
		confirm_password: ''
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		await fetch(`https:${SERVIDOR}/api/users/register`, {
			method: 'POST',
			body: JSON.stringify(fields),
			headers: { "Content-Type": "application/json" }
		})
		.then(res => res.json())
		.catch(err => console.error(err))
		.then(res => {
			if(typeof res !== "object") {
				localStorage.setItem('Authorization', `Bearer ${res}`);	
				updateRedirect(true);
			} else {
				updateErrors(res);
			}
		});

	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		updateFields({
			...fields,
			[e.target.name]: e.target.value
		});
	}

	return (
	<>
		{ redirect && <Redirect to="/" /> }
		<div className="register_card">
			<h1>Register</h1>
			<form onSubmit={handleSubmit}>
			  	<div>
			  		<input name="username" type="text" value={fields.username} onChange={(e) => handleChange(e)} placeholder="Username..."/>
			  	</div>
			  	<div>
			  		<input name="email" type="text" value={fields.email} onChange={(e) => handleChange(e)} placeholder="Email..." />
			  	</div>
			  	<div>
			  		<input name="password" type="password" onChange={(e) => handleChange(e)} placeholder="Password..." />
			  	</div>
			  	<div>
			  		<input name="confirm_password" type="password" onChange={(e) => handleChange(e)} placeholder="Confirm password..." />
			  	</div>
			  	<div>
			  		{
			  			errors && errors.map((err: string, i: number) => (
			  				<li key={i}>
			  					{ err }
			  				</li>
			  			))
			  		}
			  	</div>
			  	<div>
			  		<button>submit</button>
			  	</div>
			</form>
		</div>
	</>
	);
}

export default Register;