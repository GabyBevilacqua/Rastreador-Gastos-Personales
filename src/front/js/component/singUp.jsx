import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";


export const SingUp = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate()
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await actions.registerUser(formData); // Asume que devuelve `true` o lanza error
            if (success) {
                alert("Usuario creado con éxito, inicia sesion");
                setFormData({ name: "", email: "", password: "" }); // Restablece los campos del formulario
                navigate("/");
            }
        } catch (error) {
            // Mostrar el mensaje de error del servidor
            alert(error.message || "Error al registrar el usuario");
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };


    return (
        <form onSubmit={handleSubmit}>
            <h1>Registro</h1>
            <div className="form-group">
                <label htmlFor="name">Nombre y apellido</label>
                <input
                    type="text"
                    className="form-control input-short"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    className="form-control input-short"
                    id="email"
                    aria-describedby="emailHelp"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <small id="emailHelp" className="form-text text-muted">No compartiremos tu email</small>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    className="form-control input-short"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary mt-3">
                Guardar
            </button>
        </form>
    )
}