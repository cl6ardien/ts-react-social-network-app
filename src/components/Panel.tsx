import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

//Context
import { AuthContext } from '../auth_context';

const Panel: React.FC = () => {
    //@ts-ignore
    const { userdata } = useContext(AuthContext);
    let username = '';

    try{
    	//@ts-ignore
    	username = userdata.user.username;
    } catch(err) {
    	console.error(err);
    }

	return (
		<>
		  <div className="panel">
		  	<ul className="panel__items">
		  		{ userdata.user ? (
			  			<>
					  		<li>
					  			<p>{ username }</p>
					  		</li>
					  		<li>
					  			<button onClick={() => { 
					  				localStorage.removeItem('Authorization');
					  				window.location.href = "/login" }}>
					  			logout
					  			</button>
					  		</li>
			  			</>
			  		) : (
			  			<>
					  		<li>
					  			<Link to="/login">
					  			signin
					  			</Link>
					  		</li>
					  		<li>
					  			<Link to="/register">
					  			signup
					  			</Link>
					  		</li>
				  		</>
			  		)
		  		}
		  	</ul>
		  </div>
		</>
	);
}

export default Panel;