import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

// @ts-ignore
export const AuthContext = createContext();

const AuthContextProvider = (props: any) => {
	const [userdata, updateUser] = useState();

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
							updateUser(decoded_token);
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

	useEffect(() => {
		(async function(){
			await updateUserData();
		}());

	});


	const login = async (token: any) => {
		localStorage.setItem('Authorization', `Bearer ${token}`);
		await updateUserData();
	}

	const logout = () => {
		localStorage.removeItem('Authorization');
		updateUser(null);
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