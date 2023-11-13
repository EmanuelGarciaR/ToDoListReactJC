import { useState, useContext } from "react";
import { TaskContext } from "../../context/tasks";

export function ToDos() {
    const{state,dispatch} = useContext(TaskContext)
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [finishDate, setFinishDate] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    const [toDoError, setToDoError] = useState(null);

    const TaskData = async (event) => {
        event.preventDefault();

        // Verificar si todos los campos están llenos
        if (name.trim() === '' || description.trim() === '' || finishDate.trim() === '') {
            setToDoError("Por favor, completa todos los campos");
            return;
        }

        let todo = {
            name,
            description,
            finishDate,
            isCompleted,
            userId: state.user.id

        };

// Agregar la tarea al estado
        dispatch({ type: "ADD_TASK", payload: todo });

        try {
            // Enviar la tarea a la API
            const response = await fetch('https://birsbane-numbat-zjcf.1.us-1.fl0.io/api/todo', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(todo),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Tarea creada con éxito:", data);
            } else {
                console.error("Error al crear la tarea", response.statusText);
                // Tratar el caso en que no se pueda crear la tarea
            }
        } catch (error) {
            console.error("Error de red:", error);
            // Tratar el caso en que ocurra un error de red
        }
    };
    console.log("userId en el estado global:", state.userId);


    return (
        <div>
            <form onSubmit={TaskData}>
                <input type="text" placeholder="Ingresa el Título de la tarea" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Ingresa la descripción de la tarea" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input type="date" placeholder="Ingresa la fecha para finalizar" name="finishDate" value={finishDate} onChange={(e) => setFinishDate(e.target.value)} />
                <input type="checkbox" name="isCompleted" checked={isCompleted} onChange={(e) => setIsCompleted(e.target.checked)} />
                {toDoError && (
                    <p className="error-message">{toDoError}</p>
                )}
                <input type="submit" value="Crear Tarea" />
                
            </form>
        </div>
    );
}
