import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { SERVIDOR } from '../index';

interface LoginUserInput {
	username: string;
	password: string;
}

const Login: React.FC = () => {
	const [errors, updateErrors] = useState([]);
	const [redirect, updateRedirect] = useState<boolean>(false);

	const [fields, updateFields] = useState<LoginUserInput>({
		username: '',
		password: ''
	})

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		await fetch(`https:${SERVIDOR}/api/users/login`, {
			method: 'POST',
			body: JSON.stringify(fields),
			headers: { "Content-Type": "application/json" }
		})
		.then(res => res.json())
		.catch(err => console.error(err))
		.then(res => {
			if(typeof res !== "object") {
				(async function(){
					await localStorage.setItem('Authorization', `Bearer ${res}`);
				}());

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
		<div className="login_card">
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
			  	<div>
			  		<input name="username" type="text" value={fields.username} onChange={(e) => handleChange(e)} placeholder="Username..." />
			  	</div>
			  	<div>
			  		<input name="password" type="password" value={fields.password} onChange={(e) => handleChange(e)} placeholder="Password..." />
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

export default Login;