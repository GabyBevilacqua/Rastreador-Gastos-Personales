import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Login } from "../component/login.jsx";

import { SingUp } from "../component/singUp.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5 box01">
			<h1>BudgetBuddy</h1>
			<SingUp />
			<Login />
			<h3 className="mt-3">Tu compañero de gastos personales!</h3>
		</div>
	);
};

