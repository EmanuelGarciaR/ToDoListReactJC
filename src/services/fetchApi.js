import { API_GETTODOS } from "./urlApi";

export const Get_TODOS = (_id) => {
    return new Promise((resolve, reject) => {
        fetch(API_GETTODOS + _id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    // Registro exitoso
                    console.log('Se obtuvieron las tareas con éxito');
                    resolve(response.json());
                    // Puedes realizar otras acciones aquí, como redirigir al usuario
                } else {
                    // Si la respuesta es un error, muestra el mensaje de error
                    response.json().then((errorData) => {
                        console.error('Error en el registro:', errorData.error);
                        reject({ error: errorData.error });
                    });
                }
            })
            .catch((error) => {
                console.error('Error en la solicitud:', error);
                // Manejar errores, si es necesario
                reject({ error: error.message });
            });
    });
};