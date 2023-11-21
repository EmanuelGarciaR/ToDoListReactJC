import { createContext, useReducer } from "react";
import { initialState, reducer } from "../../reducer/todos";

export const TaskContext = createContext()

export const TaskProvider = ({ children }) => {
    const [state, dispatch] = useReducer (reducer, initialState)
    const handleLoginUser = (dataUser) => {
        dispatch({ type: "LOGIN_USER", payload: dataUser  });
    };

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    };

    const addTask = (task) => {
        dispatch({ type: "ADD_TASK", payload: task });
    };
    return(
        <TaskContext.Provider value={{ state, dispatch, handleLoginUser, addTask, handleLogout }}>
            {children}
        </TaskContext.Provider>
    )
}