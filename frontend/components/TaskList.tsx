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

  // Funkcija za preuzimanje zadataka
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks"); // API ruta
      setTasks(response.data); // Postavi zadatke
    } catch (error) {
      setError("Failed to fetch tasks");
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false); // Postavi loading na false nakon završetka
    }
  };

  useEffect(() => {
    fetchTasks(); // Pozovi funkciju pri učitavanju
  }, []);

  if (loading) return <div>Loading...</div>; // Prikazi loading poruku
  if (error) return <div>{error}</div>; // Prikazi grešku ako postoji

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
