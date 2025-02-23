import React from "react";

interface Task {
  id: number;
  title: string;
  description: string;
}

interface TaskItemProps {
  task: Task; // Očekuje se prop 'task'
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
    </div>
  );
};

export default TaskItem;
