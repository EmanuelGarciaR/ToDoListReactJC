import { useState, useEffect } from "react";
import './Registro.css';
import { Link } from 'react-router-dom';

export const Registro = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [response, setResponse] = useState(null);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const handleCreateUser = (user) => {
        const userData = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.pass,
        };
        // Se imprime los datos en la consola
        // logFormData(userData);

        fetch('https://birsbane-numbat-zjcf.1.us-1.fl0.io/api/user', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userData),
        })
        .then((response) => response.json())
        .then((data) => setResponse(data));
        setRegistrationSuccess(true);
    };

    useEffect(() => {
        if (registrationSuccess) {
            // Recargar la página
            window.location.reload();
        }
    }, [registrationSuccess]);

    // Función para imprimir los datos del formulario en la consola
    const logFormData = (data) => {
        console.log("Datos del formulario:", data);
    };

    const RegisterFormData = () =>{
        event.preventDefault();
        // Verificar si todos los campos están llenos
        if (firstName.trim() === '' || lastName.trim() === '' || email.trim() === '' || pass.trim() === '') {
            // Puedes mostrar un mensaje al usuario o simplemente salir de la función
            setErrorMessage("Por favor, completa todos los campos");
            return;
    }
        let user = {
            firstName,
            lastName,
            email,
            pass,
        }
        handleCreateUser(user)
        console.log(user)
        // Limpiar el mensaje de error después de registro exitoso
        setErrorMessage('');
    }


    return (
        <div className="contain">
            <div className="containDosRegister">
                <img className="register__logo" src="https://i.postimg.cc/85n0q9SN/logo-jovenes-Creativos.png" alt="Jovenes Creativos"/>
            </div>

            <form onSubmit={RegisterFormData} className="container__register">
                <h1 className="register__title">Registro</h1>
                <div className="register__input">
                    <i className="fa-regular fa-circle-user"></i>
                    <input type="text" name="firstName" id="firstName" value={firstName} placeholder="Primer Nombre" onChange={(e) => setFirstName(e.target.value)} />
                </div>

                <div className="register__input">
                    <i className="fa-regular fa-circle-user"></i>
                    <input type="text" name="lastName" id="lastName" value={lastName} placeholder="Segundo Nombre" onChange={(e) => setLastName(e.target.value)} />
                </div>

                <div className="register__input">
                    <i className="fa-solid fa-envelope"></i>
                    <input type="email" name="emailRegister" id="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="register__input">
                    <i className="fas fa-lock"></i>
                    <input type="password" name="passRegister" id="password" value={pass} placeholder="Contraseña" onChange={(e) => setPass(e.target.value)} />
                </div>

                <input type="submit" value="Registrar" className="register__btn" onClick={RegisterFormData} disabled={registrationSuccess} />
                {errorMessage && (
                    <p className="error-messageRegister">{errorMessage}</p>
                )}
                <Link to='/' className="register__link">Iniciar Sesión</Link>
            </form>
        </div>
    );
}