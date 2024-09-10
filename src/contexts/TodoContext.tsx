import { createContext, useContext } from 'react';

// Define your Todo type
interface Todo {
  id: number;
  todo: string;
  check: boolean;
}

interface TodoContextType {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  updateTodo: (id: number, todo: Todo) => void;
  deleteTodo: (id: number) => void;
  toggleComplete: (id: number) => void;
}

// Provide a default value for your context
export const TodoContext = createContext<TodoContextType>({
  todos: [],
  addTodo: () => {},
  updateTodo: () => {},
  deleteTodo: () => {},
  toggleComplete: () => {},
});

export const useTodo = () => {
  return useContext(TodoContext);
};

// Export the provider
export const TodoProvider = TodoContext.Provider;
