import React from "react";

interface Task {
  id: number;
  title: string;
  description: string;
}

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-xl font-bold mb-2">{task.title}</h3>
      <p className="text-gray-700">{task.description}</p>
    </div>
  );
};

export default TaskItem;
