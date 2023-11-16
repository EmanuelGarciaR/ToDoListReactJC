import { useContext, useEffect } from "react";
import { Get_TODOS } from "../../../services/fetchApi";
import { TodoContext } from "../../context/todoContext";
import { TaskContext } from "../../context/user";
// import "./Form.css";

export const GetToDos = () => {
    const { init, dispatch, getTodo } = useContext(TodoContext);
    const { state } = useContext(TaskContext)
    const { task } = init;
    const { user } = state;
    useEffect(() => {
        const Datafetch = async () => {
            try {
                const response = await Get_TODOS(user._id);
                getTodo(response.todos)
            } catch (error) {
                console.error('Error al obtener la lista de TODOS:', error);
            } finally {
            }
        };

        Datafetch();
    }, [user._id]);
    return (
        task && Array.isArray(task) ? (
            task.map((todo) => (
                <div key={todo._id} className='todo_container'>
                    <h3>{todo.name}</h3>
                    <div>{todo.description}</div>
                </div>
            ))
        ) : (
            <div>No hay tareas disponibles.</div>
        )
    )
};
