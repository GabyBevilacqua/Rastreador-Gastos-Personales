import React, { useContext } from 'react';
import { Context } from '../store/appContext';

export const CardExpense = ({ description, amount, category, subcategory, date, eid }) => {
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

    // Formatea la fecha en el formato día/mes/año  porque sino sale con hora segundos y miliseg
    const formattedDate = new Date(date).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    return (

        <div className="card" style={{ width: "14rem", backgroundColor }}>
            <div className="card-header">
                Expense
            </div>
            <div className="card-body">
                <p className="card-text">{formattedDate}</p>
                <h5 className="card-title">{categoryName}</h5>
                <p className="card-text">{subcategory}</p>
                <h6 className="card-subtitle mb-2 text-muted">{amount} €</h6>
                <p className="card-text">{description}</p>
                <button
                    className="btn btn-danger"
                    onClick={() => actions.deleteExpense(eid)}
                >
                    Borrar
                </button>
            </div>
        </div>

    )
}