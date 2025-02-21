import React, { useContext } from 'react';
import { Context } from '../store/appContext';

export const CardExpense = ({ description, amount, category, eid }) => {
    const { store, actions } = useContext(Context);

    const expenseTypes = {
        food: "Comida",
        groceries: "Mercado",
        health: "Health",
        entertainment: "Entretenimiento",
        education: "Education",
        other: "Other"
    };

    const categoryColors = {
        food: '#FFB6B9',        // Rosa pastel
        groceries: '#C5E1A5',   // Verde menta
        health: '#FFDD94',      // Amarillo pastel
        entertainment: '#A5D8FF', // Azul celeste
        education: '#F5C6E5',   // Rosa lavanda
        other: '#E0E0E0'        // Gris claro
    };

    const categoryName = expenseTypes[category] || "Otro";
    const backgroundColor = categoryColors[category] || "lightblue";

    return (

        <div className="card" style={{ width: "18rem", backgroundColor }}>
            <div className="card-header">
                Expense
            </div>
            <div className="card-body">
                <h5 className="card-title">{categoryName}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{amount}</h6>
                <p className="card-text">{description}</p>
                <button
                    className="btn btn-danger"
                    onClick={() => actions.deleteExpense(eid)}

                >Delete</button>
            </div>
        </div>

    )
}