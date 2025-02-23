import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<div className="dropdown">
						<button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						<i className="fa-solid fa-bars"></i>
						</button>
						<ul className="dropdown-menu">
							<li><Link className="dropdown-item" to="/">Home</Link></li>
							<li><Link className="dropdown-item" to="/profileView">Perfil de usuario</Link></li>
							<li><Link className="dropdown-item" to="/logout">Cerrar sesión</Link></li>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};