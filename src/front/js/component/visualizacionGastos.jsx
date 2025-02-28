import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { CardExpense } from "./cardExpense.jsx";

export const VisualizacionGastos = () => {
    const { store, actions } = useContext(Context);
    const [selectedMonth, setSelectedMonth] = useState(0); // 0 representa "Todos los meses"
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Año actual
    const [availableAmount, setAvailableAmount] = useState(0); // Monto disponible
    const [initialAmount, setInitialAmount] = useState(() => { 
        // Recupera el monto inicial de localStorage al cargar el componente
        const savedInitialAmount = localStorage.getItem("initialAmount");
        return savedInitialAmount ? parseFloat(savedInitialAmount) : 0;
    }); // Monto inicial


    useEffect(() => {
        actions.fetchExpenses();
    }, []);

    const handleMonthChange = (e) => {
        setSelectedMonth(parseInt(e.target.value));
    };

    const handleYearChange = (e) => {
        setSelectedYear(parseInt(e.target.value));
    };

    const handleAvailableAmountChange = (e) => {
        setAvailableAmount(parseFloat(e.target.value));
    };

    const handleInitialAmountChange = (e) => {
        setInitialAmount(parseFloat(e.target.value));
    };

    /* const handleInitialAmountChange = (e) => {    // si pongo esto me trae los expenses de otro usuario que no es
        const newInitialAmount = parseFloat(e.target.value);
        setInitialAmount(newInitialAmount);
        // Guarda el monto inicial en localStorage
        localStorage.setItem("initialAmount", newInitialAmount);
    }; */

    const filteredExpenses = store.expenses?.filter(expense => {
        const expenseDate = new Date(expense.date);
        return (selectedMonth === 0 || expenseDate.getMonth() + 1 === selectedMonth) && expenseDate.getFullYear() === selectedYear;
    });

    const totalSpent = filteredExpenses?.reduce((total, expense) => total + expense.amount, 0) || 0;
    const remainingAmount = initialAmount - totalSpent;

    return (
        <div className="container">
            
            <div className="row justify-content-center mb-3">
                <div className="col-auto">
                    <label htmlFor="initialAmount">Monto Inicial:</label>
                    <input
                        type="number"
                        id="initialAmount"
                        className="form-control"
                        value={initialAmount}
                        onChange={handleInitialAmountChange}
                    />
                </div>
                {/* {<div className="col-auto">
                    <label htmlFor="availableAmount">Monto Disponible:</label>
                    <input
                        type="number"
                        id="availableAmount"
                        className="form-control"
                        value={availableAmount}
                        onChange={handleAvailableAmountChange}
                    />
                </div>} */}
            </div>
            <div className="row justify-content-center">
                <div className="col-auto">
                    <div className="d-flex">
                        <div className="p-2">
                            <p>Inicial: {initialAmount} €</p>
                        </div>
                        <div className="p-2">
                            <p>Gastado: {totalSpent} €</p>
                        </div>
                        <div className="p-2">
                            <p>Restante: {remainingAmount} €</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center mb-2">
                <div className="col-auto">
                    <label htmlFor="month">Mes:</label>
                    <select id="month" className="form-control" value={selectedMonth} onChange={handleMonthChange}>
                        <option value={0}>Todos los meses</option>
                        {[...Array(12).keys()].map(i => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>
                </div>
                <div className="col-auto">
                    <label htmlFor="year">Año:</label>
                    <select id="year" className="form-control" value={selectedYear} onChange={handleYearChange}>
                        {[...Array(10).keys()].map(i => (
                            <option key={selectedYear - i} value={selectedYear - i}>{selectedYear - i}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="row justify-content-center">
                {filteredExpenses?.map(expense => (
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
};