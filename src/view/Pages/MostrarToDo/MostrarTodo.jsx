import { useContext, useEffect } from "react";
import { Get_TODOS } from "../../../services/fetchApi";
import { TodoContext } from "../../context/todoContext";
import { TaskContext } from "../../context/user";
import "./MostrarTodo.css";

export const GetToDos = () => {
    const { init, dispatch, getTodo, deleteTodo } = useContext(TodoContext);
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

    const handleDelete = (todoId) => {
        deleteTodo(todoId);
    }

    // Al cerrar sesión, después de limpiar el contexto local
    // const handleLogout = async () => {
    //     try {
    //         await api.delete('/eliminar-tareas');  // Sustituye con tu endpoint real
    //     } catch (error) {
    //         console.error('Error al eliminar tareas en el servidor:', error);
    //     }

    //     // Otras acciones de cierre de sesión...
    // };

    return (
        task && Array.isArray(task) ? (
            task.map((todo) => (
                <div key={todo._id} className='container-todo'>
                    <div className="todo__container">
                        <h3 className="todo__title">{todo.name}</h3>
                        <div className="todo__description">{todo.description}</div>
                        <div className="todo__date">{todo.finishDate}</div>
                        <button onClick={() => handleDelete(todo._id)}>Eliminar</button>
                    </div>
                </div>
            ))
        ) : (
            <div>No hay tareas disponibles.</div>
        )
    )
};
