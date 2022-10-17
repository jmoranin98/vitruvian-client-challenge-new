import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import TaskForm from '../../features/tasks/TaskForm';
import { Task } from '../../features/tasks/taskModel';
import { fetchTaskById, updateTask } from '../../features/tasks/tasksAPI';

const defaultTask: Omit<Task, 'id'> = {
  name: '',
  description: '',
  autor: '',
  isComplete: false,
  createAt: '',
  updateAt: '',
};

const TaskEditPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(false);
  const [currentTask, setCurrentTask] = useState<Omit<Task, 'id'>>(defaultTask);

  useEffect(() => {
    const fetchTask = async (id) => {
      setLoading(true);

      try {
        const task = await fetchTaskById(id);
        setCurrentTask(task);
      } catch (error) {
        alert(error);
        router.push('/');
      }

      setLoading(false);
    };

    if (id) fetchTask(id);
  }, [id]);

  const onSubmit = async (data) => {
    try {
      await updateTask(id.toString(), {
        isComplete: currentTask.isComplete,
        ...data,
      });
      router.push('/');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Layout>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <h1 className="text-3xl font-semibold my-5">Editar tarea #{id}</h1>
          <TaskForm
            onSubmit={onSubmit}
            mode="edit"
            defaultValue={currentTask}
          />
        </>
      )}
    </Layout>
  );
};

export default TaskEditPage;
