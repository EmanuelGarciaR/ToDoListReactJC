import { useContext, useEffect } from "react";
import { Get_TODOS } from "../../../services/fetchApi";
import { TodoContext } from "../../context/todoContext";
import { TaskContext } from "../../context/user";
import "./MostrarTodo.css";

export const GetToDos = () => {
    const { init, dispatch, getTodo, deleteTodo, markAsCompleted } = useContext(TodoContext);
    const { state } = useContext(TaskContext)
    const { task, completedTasks } = init;
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

    const handleDelete = (dispatch, todoId) => {
        deleteTodo(dispatch, todoId);
    }

    const handleMarkAsCompleted = (todoId) => {
        markAsCompleted(todoId);
    };

    // const handleComplete = async(todoId) => {
    //     // Para marcar la tarea como completada
    //     try {
    //         const response = await fetch(`https://birsbane-numbat-zjcf.1.us-1.fl0.io/api/todo/${todoId}`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 isCompleted: true,
    //             }),
    //         });

    //         if (response.ok) {
    //             console.log('Tarea completada con éxito');
    //             // Recargar la lista de tareas después de completar una tarea
    //             const updatedResponse = await Get_TODOS(user._id);
    //             getTodo(updatedResponse.todos);
    //         } else {
    //             console.error('Error al completar la tarea');
    //         }
    //     } catch (error) {
    //         console.error('Error de red al completar la tarea:', error);
    //     }
    // };
    // //         if (response.ok) {
    // //             // Actualizar el estado o realizar otras acciones necesarias
    // //             console.log('Tarea completada con éxito');
    // //         } else {
    // //             console.error('Error al completar la tarea');
    // //         }
    // //     } catch (error) {
    // //         console.error('Error de red al completar la tarea:', error);
    // //     }
    // // };

    return (
        task && Array.isArray(task) ? (
            task.map((todo) => (
                <div key={todo._id} className='container-todo'>
                    <div className="todo__container">
                        <h3 className="todo__title">{todo.name}</h3>
                        <div className="todo__description">{todo.description}</div>
                        <div className="todo__date">{todo.finishDate}</div>
                        <button className="btn__todo" onClick={() => handleMarkAsCompleted(todo._id)}>Completa</button>
                        <button className="btn__todo" onClick={() => handleDelete(todo._id)}>Eliminar</button>
                    </div>

                    {completedTasks && Array.isArray(completedTasks) ? (
                        completedTasks.map((completedTodo) => (
                            <div key={completedTodo._id} className='container-todo'>
                                {/* Renderizar detalles de la tarea completada */}
                                <div className="todo__container">
                                    <h3 className="todo__title">{completedTodo.name}</h3>
                                    <div className="todo__description">{completedTodo.description}</div>
                                    <div className="todo__date">{completedTodo.finishDate}</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>No hay tareas completadas.</div>
                    )}
                </div>
            ))
        ) : (
            <div>No hay tareas disponibles.</div>
        )
    )
};
