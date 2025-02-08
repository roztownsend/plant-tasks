import { Task } from "../annotations";
import { createContext, useState, ReactNode } from "react";

//write an interface to hold task ACTIONS:

interface TaskContextProps {
    tasks: Task[];
    currentTask: Task | null;
    addTask: (text: string) => void;
    deleteTask: (text: string) => void;
    toggleTask: (text: string) => void;
    editTask: (id: number, text: string) => void;
    isEditing: boolean;
    saveEditTask: (id: number, editedText: string) => void;
    cancelEditTask: () => void;
}

interface TaskProviderProps {
    children: ReactNode;
}

  const dummyTasks: Task[] = [
    {id: Math.random(), text: "Steal hearts", isComplete: false},
    {id: Math.random(), text: "Boggle minds", isComplete: false},
    {id: Math.random(), text: "Add a cool task", isComplete: false},
  ];

  export const TaskContext = createContext<TaskContextProps>({
    tasks: [],
    currentTask: null,
    addTask: () => {},
    deleteTask: () => {},
    toggleTask: () => {},
    editTask: () => {},
    isEditing: false,
    saveEditTask: () => {},
    cancelEditTask: () => {}
});

const TaskProvider: React.FC<TaskProviderProps> = ({children}) => {
    const [tasks, setTasks] = useState<Task[]>(dummyTasks);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [currentTask, setCurrentTask] = useState<Task | null>(null);

    let updatedTasks;

    const addTask = (text: string) => {
        if (text === "") {
            alert("You entered nothing into the input. Enter a descriptive task.")
        } else {
            setTasks(oldTasks => [
                ...oldTasks, 
                { id: Math.random(), text, isComplete: false }
            ]);
        };
    };

    const deleteTask = (text: string) => {
        setTasks((tasks) => tasks.filter((task) => task.text !== text))
    }

    const toggleTask = (text: string) => {
        setTasks((oldTasks) => {
            updatedTasks = oldTasks.map((task) => 
                task.text === text ? 
                {...task, isComplete: !task.isComplete} : task)
                return updatedTasks;
            });
    } 
    
    const editTask = (id: number, text: string) => {
        setIsEditing(true);
        setCurrentTask({ id, text, isComplete: false})
    };
    
    const saveEditTask = (id: number, editedText: string) => {
        setTasks((oldTasks) =>
            oldTasks.map((task) =>
            task.id == id ? {...task, text: editedText} : task)
        );
        setIsEditing(false);
        setCurrentTask(null);
    }

    const cancelEditTask = () => {
        setIsEditing(false);
        setCurrentTask(null);
    }

    const contextValues = {
        tasks,
        addTask,
        currentTask,
        deleteTask,
        toggleTask,
        editTask,
        isEditing,
        saveEditTask,
        cancelEditTask
    }
    
    return <TaskContext.Provider value={contextValues}>{children}
    </TaskContext.Provider>
}

export default TaskProvider;