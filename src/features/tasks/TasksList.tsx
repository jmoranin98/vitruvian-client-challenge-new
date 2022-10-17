import Link from 'next/link';
import { useAppDispatch } from '../../app/hooks';
import { markTaskAsCompleted, removeTask } from './tasksSlice';
import { MdCheck } from 'react-icons/md';
import { Task } from './taskModel';

interface TasksListProps {
  loading?: boolean;
  tasks: Array<Task>;
}

const TasksList = ({ tasks, loading = false }: TasksListProps) => {
  const dispatch = useAppDispatch();

  const onToggleComplete = (task) => {
    dispatch(markTaskAsCompleted(task));
  };
  
  const onDeleteTask = (id: number) => () => {
    const isAccepted = confirm('Está seguro de eliminar la tarea?');
    if (isAccepted) dispatch(removeTask(id));
  };

  if (loading) return <p>Loading...</p>;
  if (tasks.length === 0) return <p>Empty list</p>;

  return (
    <div className="flex flex-col gap-4">
      {tasks.map((task) => {
        return (
          <div key={task.id} className="p-4 bg-neutral-200 rounded-lg">
            <div className="flex items-center gap-4">
              <h5 className="text-2xl font-semibold">
                {task.name}
                <span className="ml-2 text-zinc-500 text-lg font-light">
                  #{task.id}
                </span>
              </h5>
              <div>
                <button
                  onClick={() => onToggleComplete(task)}
                  className={`rounded-full p-1 text-white ${
                    task.isComplete ? 'bg-green-500' : 'bg-zinc-500'
                  }`}
                >
                  <MdCheck />
                </button>
              </div>
              <div className="flex-1 flex justify-end gap-2 items-center">
                <Link href={`/task/${task.id}`}>
                  <button className="rounded bg-blue-700 text-white py-2 px-4">
                    Editar
                  </button>
                </Link>
                <button className="rounded bg-red-700 text-white py-2 px-4" onClick={onDeleteTask(task.id)}>
                  Eliminar
                </button>
              </div>
            </div>
            <p className="my-1">{task.description}</p>
            <p className="text-zinc-500">by {task.autor}</p>
          </div>
        );
      })}
    </div>
  );
};

export default TasksList;
