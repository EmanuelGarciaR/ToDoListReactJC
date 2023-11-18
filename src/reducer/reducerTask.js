export const initialState = {
    task: [],
}
export function reducer(init, action) {
    switch (action.type) {
        case "GET_TASK":
            //guardamos en localstorage
            globalThis.localStorage.setItem("TASK", JSON.stringify(action.payload))
            return {
                ...init,
                task: action.payload,
            };

        case "ADD_TASK":
            return {
                ...init,
                task: [...init.task, action.payload],
            };

        case "DELETE_TASK":
            return init;

        case "DELETE_TASK_SUCCESS":
            // Actualizamos el estado con la tarea eliminada
            const updatedTasks = init.task.filter((task) => task._id !== action.payload);
            return { ...init, task: updatedTasks };

        case "LOG_OUT":
            // Reinicia el estado cuando cierra sesión
            return initialState;
        default:
            return init;
    }
}