export interface Task {
    id: number;
    text: string;
    isComplete: boolean;
}

export interface TaskContextProps {
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