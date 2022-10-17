import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import TaskForm from '../../features/tasks/TaskForm';
import { createTask } from '../../features/tasks/tasksAPI';

const TaskCreatePage = () => {
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      await createTask({
        isComplete: false,
        ...data,
      });
      router.push('/');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-semibold my-5">Crear tarea</h1>
      <TaskForm onSubmit={onSubmit} mode="create" />
    </Layout>
  );
};

export default TaskCreatePage;
