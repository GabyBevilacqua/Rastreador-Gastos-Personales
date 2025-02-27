import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Categorizador } from "../component/categorizador.jsx";
import { VisualizacionGastos } from "../component/visualizacionGastos.jsx";

export const ProfileView = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="text-center mt-5 box01">
            <h1>BudgetBuddy</h1>
            <p>Bienvenido {store.user?.name}</p>
            {store.user && (
                <>
                    <Categorizador />
                    <VisualizacionGastos />
                </>
            )}
            <h3 className="mt-3">Tu compañero de gastos personales!</h3>
        </div>
    );
};