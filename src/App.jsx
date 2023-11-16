// import './App.css'
import { RouterProvider } from "react-router-dom";
import { router } from "./view/routes/routes";
import { TaskProvider } from "./view/context/user";
import { ToDoProvider } from "./view/context/todoContext";
function App() {

  return (
    <TaskProvider>
      <ToDoProvider>
        <RouterProvider router={router} />
      </ToDoProvider>
    </TaskProvider>
  );
}

export default App;
