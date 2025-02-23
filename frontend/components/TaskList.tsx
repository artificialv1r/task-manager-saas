"use client"; // Osiguraj da je ova linija prisutna na vrhu datoteke

import axios from "axios";
import React, { useEffect, useState } from "react";
import TaskItem from "./TaskItem";

interface Task {
  id: number;
  title: string;
  description: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [newTaskDescription, setNewTaskDescription] = useState<string>("");

  // Funkcija za preuzimanje zadataka
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tasks"); // API ruta
      setTasks(response.data); // Postavi zadatke
    } catch (error) {
      setError("Failed to fetch tasks");
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false); // Postavi loading na false nakon završetka
    }
  };

  const handleAddTask = async () => {
    const token = localStorage.getItem("token"); // Preuzmi token iz localStorage
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/tasks",
        {
          title: newTaskTitle,
          description: newTaskDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Dodaj token u zaglavlje
          },
        }
      );
      setTasks([...tasks, response.data]);
      setIsModalOpen(false);
      setNewTaskTitle("");
      setNewTaskDescription("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  useEffect(() => {
    fetchTasks(); // Pozovi funkciju pri učitavanju
  }, []);

  if (loading) return <div>Loading...</div>; // Prikazi loading poruku
  if (error) return <div>{error}</div>; // Prikazi grešku ako postoji

  return (
    <div className="p-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Add Task
      </button>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded">
            <h2 className="text-xl mb-4">Add New Task</h2>
            <input
              type="text"
              placeholder="Title"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="mb-2 p-1 rounded w-full"
            />
            <textarea
              placeholder="Description"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              className="mb-2 p-1 rounded w-full"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded w-full"
              onClick={handleAddTask}
            >
              Add Task
            </button>
            <button
              className="mt-2 text-red-500"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
