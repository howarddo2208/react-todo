import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Todo {
  id: string;
  done: boolean;
  content: string;
}

function App() {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddTodo = (e: any) => {
    e.preventDefault();
    if (!value) {
      return alert("insert must not be empty");
    }
    const newTodo = { id: uuidv4(), done: false, content: value };
    setTodos([newTodo, ...todos]);
    setValue("");
  };

  const toggleDone = (index: number) => {
    const item: Todo = {
      ...todos[index],
      done: !todos[index].done,
    };

    setTodos([...todos.slice(0, index), item, ...todos.slice(index + 1)]);
  };

  const cleanDone = () => {
    const cleanedList = todos.filter((todo) => !todo.done);
    setTodos(cleanedList);
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl m-3 font-bold underline">TODO APP</h1>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          className="bg-gray-100 rounded-md p-2 mr-4 rounded-md border focus:outline-none focus:border-blue-500"
          placeholder="Insert todo content"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="bg-green-300 p-2 rounded-md">Add todo</button>
      </form>

      {/* todo list */}
      <div className="w-96 max-h-60 overflow-scroll p-2 my-2">
        {todos.map((todo, i) => (
          <div
            key={todo.id}
            className="flex m-2 p-3 rounded-md border justify-between"
          >
            <input
              onChange={() => toggleDone(i)}
              type="checkbox"
              className="rounded-full"
            />
            <p
              style={{
                textDecoration: todo.done ? "line-through" : "none",
              }}
            >
              {todo.content}
            </p>
          </div>
        ))}
      </div>

      <div>
        <button onClick={cleanDone} className="bg-red-300 p-2 px-4 rounded-md">
          Clear Done
        </button>
      </div>
    </div>
  );
}

export default App;
