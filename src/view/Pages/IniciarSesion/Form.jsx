import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { TaskContext } from "../../context/tasks";
import './Form.css';

export const Form = () => {
    const{state,dispatch} = useContext(TaskContext)
    const [loginError, setLoginError] = useState(null);
    const navigate = useNavigate();


    const handleLogin = (event) => {
        event.preventDefault();
        fetch('https://birsbane-numbat-zjcf.1.us-1.fl0.io/api/user/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: event.target.elements.email.value,
                password: event.target.elements.password.value,
            }),
        })
            .then((response) => {
                if (response.ok) {

                    return response.json()

                } else {
                    throw new Error('Credenciales incorrectas')
                }
            })
            .then((data) => {
                dispatch({type:"LOGIN_USER", payload: data.user})
                navigate('/home')
            }).catch(error=>{
                console.error("Error durante la autenticación:", error);
                setLoginError("Credenciales incorrectas. Verifica tu email y contraseña.")
            })
    }


    return (
        <div className="container">
            <form onSubmit={handleLogin} className="container__form">
                <h1 className="form__title">Bienvenid@</h1>

                <div className="form__input">
                    <i className="fas fa-envelope"></i>
                    <input type="email" name="email" placeholder="Ingresa tu email" />
                </div>

                <div className="form__input">
                    <i className="fas fa-lock"></i>
                    <input type="password" name="password" id="password" placeholder="Ingresa tu contraseña" />
                </div>

                <button type="submit" className="btn__form" >Ingresar</button>


                {loginError && (
                    <p className="error-message">{loginError}</p>
                )}

                <Link to='registro' className="register__link">Registrarse</Link>
            </form>

            <div className="containerDos">
                <img className="form__logo" src="https://i.postimg.cc/85n0q9SN/logo-jovenes-Creativos.png" alt="Jovenes Creativos" />
            </div>
        </div>
    )
}