import React, { createContext, useState } from 'react';
import jwt_decode from 'jwt-decode';

const initialState = {
	user: null
};

const updateUserData = () => {
	try {
		//@ts-ignore
		const token = localStorage.getItem('Authorization').split('Bearer ')[1];

		if(token !== null && token !== undefined){
			try {
				const decoded_token: any = jwt_decode(token);
				
				try{
					if(decoded_token.exp * 1000 < Date.now()){ /* expired token */
						localStorage.remove('Authorization');
					} else {
						initialState.user = decoded_token;
					}

				} catch(err){
					console.log(err);
				}
			} catch(err){
				console.log(err);
			}
		}
	}catch(err) {
		console.log(err);
	}
}

(async function(){
	await updateUserData();
}());

export const AuthContext = createContext({
	userdata: initialState,
	login: (props: any) => {},
	logout: () => {}
});

const AuthContextProvider = (props: any) => {
	const [userdata, updateUser] = useState(initialState);

	const login = async (user: any) => {
		await localStorage.setItem('Authorization', user.token);
		await updateUser({ user: props.user });
	}

	const logout = () => {
		localStorage.removeItem('Authorization');
		updateUser({ user: null });
		//props.history.push('/login');
	}


	return (
		<AuthContext.Provider value={{
			userdata,
			login,
			logout
		}}>
			{ props.children /* ...props */}
		</AuthContext.Provider>
	)
}

export { AuthContextProvider };