import { createContext, useReducer } from "react";
import { initialState, reducer } from "../../reducer/reducerTask";
import { API_DELETETODOS } from "../../services/urlApi";

export const TodoContext = createContext()

export const ToDoProvider = ({ children }) => {
    const [init, dispatch] = useReducer (reducer, initialState)
    
    const getTodo = (tasks)=>{
        dispatch({ type: "GET_TASK", payload: tasks });
        console.log(init.task)
    }

    const deleteTodo = async (todoId) => {
        try {
            // Eliminar la tarea en la API
            await fetch(`${API_DELETETODOS}/${todoId}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json',},
            });
        } catch (error) {
            console.error('Error al eliminar tarea en el servidor:', error);
        }

        // Eliminar la tarea del estado local
        dispatch({ type: "DELETE_TASK", payload: todoId });
    };

    const addToDo = (add) =>{
        dispatch({type: "ADD_TASK", payload: add});
    }

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    };
    return(
        <TodoContext.Provider value={{ init, dispatch, getTodo, addToDo, deleteTodo, handleLogout }}>
            {children}
        </TodoContext.Provider>
    )
}
