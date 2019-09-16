import React from 'react';
import { Link } from 'react-router-dom';

// styles
import '../build/styles.css';

const Navigation: React.FC = () => {
  return (
  	<>
		<div className="sidebar">
			<div className="hamburger">
				<svg width="22" height="18" xmlns="http://www.w3.org/2000/svg">
				  <path d="M0 3V0h21.417v3H0zm0 7.417v-3h21.417v3H0zm0 7.417v-3h15.5v3H0z" fill="#fff" fill-rule="nonzero"/>
				</svg>
			</div>

			<nav className="navbar">
				<Link to="/">DASHBOARD</Link>
				<Link to="/">NEWS</Link>
				<Link to="/">CATEGORIES</Link>
			</nav>

			<div className="indicator"></div>
		</div>
    </>
  );
}

export default Navigation;