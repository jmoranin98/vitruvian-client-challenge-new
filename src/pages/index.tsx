import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { AppState } from '../app/store';
import { loadTasks } from '../features/tasks/tasksSlice';
import Layout from '../components/Layout';
import TasksList from '../features/tasks/TasksList';

const IndexPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state: AppState) => state.tasks.tasks);

  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  return (
    <section>
      <Layout>
        <h1 className="text-3xl font-semibold my-5">TODO List</h1>
        <div className="flex justify-end my-5">
          <Link href="/task">
            <button className="rounded bg-green-700 text-white py-2 px-4">
              Nueva tarea
            </button>
          </Link>
        </div>
        <div>
          <TasksList tasks={tasks} />
        </div>
      </Layout>
    </section>
  );
};

export default IndexPage;
