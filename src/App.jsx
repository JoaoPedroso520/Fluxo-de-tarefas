import { useState, useEffect } from "react";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!text.trim()) return;
    setTasks([...tasks, { id: Date.now(), text, done: false }]);
    setText("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">🧭 Fluxo de tarefasgit</h1>
      <div className="flex gap-2 mb-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none"
          placeholder="Nova tarefa..."
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
        >
          Adicionar
        </button>
      </div>

      <ul className="w-full max-w-md">
        {tasks.map((t) => (
          <li
            key={t.id}
            className={`flex justify-between items-center p-3 mb-2 rounded ${
              t.done ? "bg-green-700/40" : "bg-gray-800"
            }`}
          >
            <span
              onClick={() => toggleTask(t.id)}
              className={`cursor-pointer ${
                t.done ? "line-through text-gray-400" : ""
              }`}
            >
              {t.text}
            </span>
            <button
              onClick={() => deleteTask(t.id)}
              className="text-red-400 hover:text-red-200"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}