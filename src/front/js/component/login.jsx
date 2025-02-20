import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Login = () => {
    const { actions } = useContext(Context);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        actions.login(formData);
    }



    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    className="form-control input-short"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    className="form-control input-short"
                    id="password"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                />
            </div>
            <button
                type="button"
                className="btn btn-primary"
                onClick={() => actions.login(formData)}>
                Login
            </button>

        </form>
    )
}