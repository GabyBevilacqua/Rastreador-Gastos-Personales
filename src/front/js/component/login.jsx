import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Login = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault()
        const success = await actions.login(email, password);
        if (success) {
           navigate("/profileView"); // Redirigir a la página del perfil 
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    };


    return (
        <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    className="form-control input-short"
                    id="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    className="form-control input-short"
                    id="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button
                type="submit"
                className="btn btn-primary mt-3"
                >
                Login
            </button>
        </form>
    )
}