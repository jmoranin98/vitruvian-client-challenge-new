import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Task } from './taskModel';

interface TaskFormProps {
  mode: 'create' | 'edit';
  onSubmit(data): void;
  isLoading?: boolean;
  defaultValue?: Omit<Task, 'id'>;
}

const TaskForm = ({ onSubmit, mode, defaultValue, isLoading = false }: TaskFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 w-6/12"
    >
      <div className="flex flex-col">
        <label>Nombre</label>
        <input
          className="p-1 border rounded"
          type="text"
          name="name"
          defaultValue={defaultValue?.name}
          {...register('name', { required: true })}
        />
        {errors.name && (
          <span className="mt-1 text-orange-500 text-xs">
            El campo es requerido
          </span>
        )}
      </div>
      <div className="flex flex-col">
        <label>Descripción</label>
        <input
          className="p-1 border rounded"
          type="text"
          name="description"
          defaultValue={defaultValue?.name}
          {...register('description', { required: true })}
        />
        {errors.description && (
          <span className="mt-1 text-orange-500 text-xs">
            El campo es requerido
          </span>
        )}
      </div>
      <div className="flex flex-col">
        <label>Autor</label>
        <input
          className="p-1 border rounded"
          type="text"
          name="autor"
          defaultValue={defaultValue?.autor}
          {...register('autor', { required: true })}
        />
        {errors.autor && (
          <span className="mt-1 text-orange-500 text-xs">
            El campo es requerido
          </span>
        )}
      </div>
      <div className="flex gap-2 mt-4">
        <Link href="/">
          <button
            className="rounded bg-orange-700 text-white py-2 px-4"
            type="button"
          >
            Cancelar
          </button>
        </Link>
        <button
          className="rounded bg-green-700 text-white py-2 px-4"
          type="submit"
          disabled={isLoading}
        >
          {mode === 'create' && 'Crear'}
          {mode === 'edit' && 'Editar'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
