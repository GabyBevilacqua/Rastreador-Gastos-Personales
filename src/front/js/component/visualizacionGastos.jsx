import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { CardExpense } from "./cardExpense.jsx";

export const VisualizacionGastos = () => {
    const { store, actions } = useContext(Context);


    useEffect(() => {
        actions.fetchExpenses();
    }
        , []);


    return (
        <div className="container">
            <div className="row justify-content-center">
                {store.expenses?.map(expense => (
                    <CardExpense className="col-sm-4 col-md-3 col-lg-3" key={expense.id}

                        description={expense.description}
                        amount={expense.amount}
                        category={expense.category}
                        date={expense.date}
                        eid={expense.id}
                    />
                ))}
            </div>
        </div>
    );
}