import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const Categorizador = () => {
    const { store, actions } = useContext(Context);

    const [formData, setFormData] = useState({
        price: "",
        description: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.categorize(formData);
        setFormData({
            price: "",
            description: ""
        });
    };

    return (
        <div className="container">
            <h1>Categorizador</h1>
            <form   onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="price">Precio</label>
                    <input
                        type="number"
                        className="form-control input-short"
                        id="price"
                        name="price"
                        onChange={handleChange}
                        value={formData.price}
                    />
                    <label htmlFor="description">Descripción</label>
                    <textarea
                        className="form-control input-short"
                        id="description"
                        name="description"
                        onChange={handleChange}
                        value={formData.description}    
                    />
                </div>
                <button 
                type="submit" 
                className="btn btn-primary">
                    Agregar
                </button>
            </form>
        </div>
    );
}