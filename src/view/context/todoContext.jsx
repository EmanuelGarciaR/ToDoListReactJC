import { createContext, useReducer } from "react";
import { initialState, reducer } from "../../reducer/reducerTask";
import { API_DELETETODOS } from "../../services/urlApi";

export const TodoContext = createContext()

export const ToDoProvider = ({ children }) => {
    const [init, dispatch] = useReducer(reducer, initialState)

    const getTodo = (tasks) => {
        dispatch({ type: "GET_TASK", payload: tasks });
        console.log(init.task)
    }

    const deleteTodo = async (todoId) => {
        try {
            // Eliminar la tarea en la API
            await fetch(`${API_DELETETODOS}/${todoId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            // Eliminar la tarea del estado local
            dispatch({ type: 'DELETE_TASK_SUCCESS', payload: todoId });
        } catch (error) {
            console.error('Error al eliminar tarea en el servidor:', error);
        }
    };

    const addToDo = (add) => {
        dispatch({ type: "ADD_TASK", payload: add });
    };

    const markAsCompleted = async (todoId) => {
        try {
            // Marcar la tarea como completada en la API
            const response = await fetch(`https://birsbane-numbat-zjcf.1.us-1.fl0.io/api/todo/${todoId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isCompleted: true }),
            });

            if (response.ok) {
                // Eliminar la tarea completada de la lista de tareas pendientes
                dispatch({ type: 'MARK_AS_COMPLETED', payload: todoId });

                console.log("Tarea marcada como completada con éxito:", todoId);
            } else {
                console.error("Error al marcar la tarea como completada");
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };
    // Actualizar el estado isCompleted de una tarea específica
    // const handleMarkAsCompleted = async (todoId) => {
    //     try {
    //         // Marcar la tarea como completada en la API
    //         const response = await fetch(`https://birsbane-numbat-zjcf.1.us-1.fl0.io/api/todo/${todoId}`, {
    //             method: 'PUT',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ isCompleted: true }),
    //         });

    //         if (response.ok) {
    //             // Actualizar el estado local
    //             dispatch({ type: 'MARK_AS_COMPLETED', payload: todoId });
    //             console.log("Tarea marcada como completada con éxito:", todoId);
    //         } else {
    //             console.error("Error al marcar la tarea como completada");
    //         }
    //     } catch (error) {
    //         console.error('Error de red:', error);
    //     }
    // };

    return (
        <TodoContext.Provider value={{ init, dispatch, getTodo, addToDo, deleteTodo, markAsCompleted }}>
            {children}
        </TodoContext.Provider>
    )
}
