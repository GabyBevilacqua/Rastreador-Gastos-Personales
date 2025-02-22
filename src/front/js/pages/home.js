import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Login } from "../component/login.jsx";
import { Categorizador } from "../component/categorizador.jsx";
import { VisualizacionGastos } from "../component/visualizacionGastos.jsx";
import { SingUp } from "../component/singUp.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>BudgetBuddy</h1>
			<SingUp />
		{!store.user ? <Login /> : <div> <h1>Welcome to BudgetBuddy {store.user?.email}</h1>
		<Categorizador />
		<VisualizacionGastos />
		</div>}
		<h3>Tu compañero de gastos personales!</h3>
		</div>
	);
};
