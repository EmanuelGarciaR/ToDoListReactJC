import { API_DELETETODOS } from "../services/urlApi";
export const initialState = {
    task: [],
}
export function reducer(init, action) {
    switch (action.type) {
        case "GET_TASK":
            //guardamos en localstorage
            globalThis.localStorage.setItem("TASK", JSON.stringify(action.payload))
            return { ...init, 
                task: action.payload,
            };

        case "ADD_TASK":
            return {...init,
                task: [...init.task, action.payload],
            };

        case "DELETE_TASK":
            // Eliminar la tarea en el servidor
            const deleteTaskApi = async (todoId) => {
                try {
                    await api.delete(`API_DELETETODOS+${todoId}`);
                } catch (error) {
                    console.error('Error al eliminar tarea en el servidor:', error);
                }
            };
            // Llama a la función para eliminar la tarea en la api
            deleteTaskApi(action.payload);
            // Elimina la tarea del estado local
            const updatedTasks = init.task.filter(task => task._id !== action.payload);
            return {
                ...init,
                task: updatedTasks,
            };
        case "LOG_OUT":
            // Reinicia el estado cuando cierra sesión
            return initialState;
        default:
            return init;
    }
}