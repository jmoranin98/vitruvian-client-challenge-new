import { Task } from './taskModel';

export async function fetchTasks() {
  const response = await fetch('http://localhost:8000/tasks', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new Error('Error inesperado');

  const data = await response.json();
  return data;
}

export async function createTask(task: Task) {
  const response = await fetch(`http://localhost:8000/task`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) throw new Error('Error inesperado');
}

export async function updateTask(id: number | string, task: Task) {
  const response = await fetch(`http://localhost:8000/task/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) throw new Error('Error inesperado');
}

export async function deleteTask(taskID: number | string) {
  const response = await fetch(`http://localhost:8000/task/${taskID}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new Error('Error inesperado');
}

export async function fetchTaskById(taskID: number | string) {
  const response = await fetch(`http://localhost:8000/task/${taskID}`);
  if (!response.ok) throw new Error('Error obteniendo el detalle de la tarea');

  const task = await response.json();
  return task;
}