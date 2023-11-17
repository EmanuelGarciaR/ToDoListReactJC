import { useContext, useEffect } from "react";
import { Get_TODOS } from "../../../services/fetchApi";
import { TodoContext } from "../../context/todoContext";
import { TaskContext } from "../../context/user";
import "./MostrarTodo.css";

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
                <div key={todo._id} className='container-todo'>
                    <div className="todo__container">
                        <h3 className="todo__title">{todo.name}</h3>
                        <div className="todo__description">{todo.description}</div>
                        <div className="todo__date">{todo.finishDate}</div>
                    </div>
                </div>
            ))
        ) : (
            <div>No hay tareas disponibles.</div>
        )
    )
};
