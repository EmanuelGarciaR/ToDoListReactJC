import { createContext, useReducer } from "react";
import { initialState, reducer } from "../../reducer/reducerTask";

export const TodoContext = createContext()

export const ToDoProvider = ({ children }) => {
    const [init, dispatch] = useReducer (reducer, initialState)
    
    const getTodo = (tasks)=>{
        dispatch({ type: "GET_TASK", payload: tasks });
        console.log(init.task)
    }

    const addToDo = (add) =>{
        dispatch({type: "ADD_TASK", payload: add});
    }
    return(
        <TodoContext.Provider value={{ init, dispatch, getTodo, addToDo }}>
            {children}
        </TodoContext.Provider>
    )
}
