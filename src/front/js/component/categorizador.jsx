import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const Categorizador = () => {
    const { store, actions } = useContext(Context);

    const [formData, setFormData] = useState({
        price: "",
        description: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await actions.categorize(formData);
        setFormData({
            price: "",
            description: ""
        });
        setLoading(false);
    };

    return (
        <div className="container">
            <h1>Categorizador</h1>
            {loading && <div className="spinner-border text-primary" role="status"> </div>}
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
                className="btn btn-primary mt-3 mb-3">
                    Agregar
                </button>
            </form>
        </div>
    );
}