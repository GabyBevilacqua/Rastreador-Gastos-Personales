import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { actions, store } = useContext(Context);
	const navigate = useNavigate();

	const handleLogout = () => {
		actions.logout();
		alert("Sesión cerrada exitosamente.");
		navigate("/");
	}

	const handleDelete = () => {
		if (window.confirm("¿Estás seguro de que deseas eliminar tu cuenta?")) {
			actions.deleteUser();
			alert("Cuenta eliminada exitosamente.");
			navigate("/");
		}
	}


	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">BudgetBuddy</span>
				</Link>
				<div className="ml-auto">
					<div className="dropdown">
						<button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
							<i className="fa-solid fa-bars"></i>
						</button>
						<ul className="dropdown-menu">
							<li><Link className="dropdown-item" to="/">Home</Link></li>
							<li><Link className="dropdown-item" to="/profileView">Perfil de usuario</Link></li>
							<li
							className="dropdown-item cursor-pointer"
							onClick={handleDelete}							
							>	Eliminar cuenta							
							</li>
							<li
							className="dropdown-item cursor-pointer"
							onClick={handleLogout}							
							>	Cerrar sesión							
							</li>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};