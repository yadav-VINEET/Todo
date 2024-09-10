import { useEffect, useState } from 'react';
import './App.css';
import { TodoProvider } from './contexts';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

// Define the Todo type
interface Todo {
  id: number;
  todo: string;
  check: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]); // Explicitly define the type of the state

  // Add a new todo
  const addTodo = (todo: Todo) => {
    setTodos((prev) => [{...todo }, ...prev]);
  };

  // Update a specific todo by id
  const updateTodo = (id: number, updatedTodo: Omit<Todo, 'id'>) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, ...updatedTodo } : todo
      )
    );
  };

  // Delete a specific todo by id
  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Toggle the completion status of a todo
  const toggleComplete = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, check: !todo.check } : todo
      )
    );
  }; 

  useEffect(() => {
    const todosFromStorage = localStorage.getItem("todos");
  if (todosFromStorage) {
    setTodos(JSON.parse(todosFromStorage));
  }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  
  

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <TodoForm/>
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo)=>(
              <div key={todo.id} className='w-full'>
                <TodoItem todo={todo}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
