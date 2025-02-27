import React, { useContext } from 'react';
import { Context } from '../store/appContext';

export const CardExpense = ({ description, amount, category, subcategory, date, eid }) => {
    const { store, actions } = useContext(Context);

    const expenseTypes = {
        food: "Comida",
        groceries: "Mercado",
        debt: "Deudas",
        entertainment: "Entretenimiento",
        housing: "Alquiler",
        utilities: "Servicios",
        'online shopping': "Compras online",
        fitness: "Gimnasio",
        other: "Other"
    };

    const categoryColors = {
        food: '#FFB6B9',        // Rosa pastel
        groceries: '#C5E1A5',   // Verde menta
        debt: '#FFDD94',      // Amarillo pastel
        entertainment: '#A5D8FF', // Azul celeste
        housing: '#F5C6E5',   // Rosa lavanda
        utilities: '#FFC8A2', // Naranja pastel
        'online shopping': '#FFD8B8', // Melocotón
        fitness: '#B5EAD7',   // Verde agua
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
                    className="button3"
                    onClick={() => actions.deleteExpense(eid)}
                >
                    Borrar
                </button>
            </div>
        </div>

    )
}