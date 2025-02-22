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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Formulario enviado");
    }


    return (
        <form  onSubmit={handleSubmit}>
            <h1>Registro</h1>
            <div className="form-group">
                <label htmlFor="exampleInputName">Nombre y apellido</label>
                <input
                    type="name"
                    className="form-control input-short"
                    id="exampleInputName1"
                    />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email</label>
                <input
                    type="email"
                    className="form-control input-short"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp" />
                <small id="emailHelp" className="form-text text-muted">No compartiremos tu email</small>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                    type="password"
                    className="form-control input-short"
                    id="exampleInputPassword1" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}