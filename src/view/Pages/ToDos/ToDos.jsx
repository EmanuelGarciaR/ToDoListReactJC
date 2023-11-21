import { useState, useContext } from "react";
import { TaskContext } from "../../context/user";
import { GetToDos } from "../MostrarToDo/MostrarTodo";
import { TodoContext } from "../../context/todoContext";
import "./ToDos.css"

export function ToDos() {
  const { state, dispatch } = useContext(TaskContext);
  const { addToDo, markAsCompleted } = useContext(TodoContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [isCompleted, setIsCompleted] = useState({});
  const [toDoError, setToDoError] = useState(null);

  const TaskData = async (event) => {
    event.preventDefault();

    // Verificar si todos los campos están llenos
    if (
      name.trim() === "" ||
      description.trim() === "" ||
      finishDate.trim() === ""
    ) {
      setToDoError("Por favor, completa todos los campos");
      return;
    }

    let todo = {
      name,
      description,
      finishDate,
      isCompleted: false,
      userId: state.user._id,
    };

    // Agregar la tarea al estado
    dispatch({ type: "ADD_TASK", payload: todo });

    try {
      // Enviar la tarea a la API
      const response = await fetch(
        "https://birsbane-numbat-zjcf.1.us-1.fl0.io/api/todo",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(todo),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Tarea creada con éxito:", data.todo);
        addToDo(data.todo);
        //Limpiar el formulario después de agregar una tarea
        setName("");
        setDescription("");
        setFinishDate("");
        setIsCompleted(false);
        setToDoError(null);
      } else {
        console.error("Error al crear la tarea");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const handleMarkAsCompleted = async (todoId) => {
    try {
        // Marcar la tarea como completada en la API
        const response = await fetch(`https://birsbane-numbat-zjcf.1.us-1.fl0.io/api/todo/${todoId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isCompleted: true }),
        });

        if (response.ok) {
            // Actualizar el estado local
            markAsCompleted(todoId);
            console.log("Tarea marcada como completada con éxito:", todoId);
        } else {
            console.error("Error al marcar la tarea como completada");
        }
    } catch (error) {
        console.error('Error de red:', error);
    }
};

  // const handleCompleteTask = (todoId) => {
  //   setIsCompleted((prevState) => ({
  //     ...prevState,
  //     [todoId]: !prevState[todoId], // Cambiar el estado de true a false y viceversa
  //   }));
  // };

  // Función para cambiar el estado isCompleted de la tarea
  // const handleCompleteTask = async (taskId) => {
  //   try {
  //     const response = await fetch(
  //       `https://birsbane-numbat-zjcf.1.us-1.fl0.io/api/todo/${taskId}/complete`,
  //       {
  //         method: "PUT",
  //         headers: { "Content-Type": "application/json" },
  //       }
  //     );

  //     if (response.ok) {
  //       console.log("Tarea completada con éxito");
  //       // Actualizar el estado local o volver a cargar las tareas si es necesario
  //     } else {
  //       console.error("Error al completar la tarea");
  //     }
  //   } catch (error) {
  //     console.error("Error de red:", error);
  //   }
  // };

  return (
    <>
      <div className="container">
        <form className="container__task" onSubmit={TaskData}>
          <input className="task__input"
            type="text"
            placeholder="Título de la tarea"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input className="task__input"
            type="text"
            placeholder="Descripción de la tarea"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input className="task__input"
            type="date"
            placeholder="Ingresa la fecha para finalizar"
            name="finishDate"
            value={finishDate}
            onChange={(e) => setFinishDate(e.target.value)}
          />
          <input className="task__input-check"
            type="checkbox"
            name="isCompleted"
            checked={isCompleted}
            onChange={(e) => setIsCompleted(e.target.checked)}
          />
          {toDoError && <p className="error-message">{toDoError}</p>}
          <input type="submit" value="Crear Tarea" className="task__btn" />
        </form>
      </div>

      <GetToDos />
    </>
  );
}
