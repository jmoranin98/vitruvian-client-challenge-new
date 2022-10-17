import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { Task } from './taskModel';
import { deleteTask, fetchTasks, updateTask } from './tasksAPI';

export interface TasksState {
  tasks: Array<Task>;
  status: 'idle' | 'loading';
}

const initialState: TasksState = {
  tasks: [],
  status: 'idle',
};

export const loadTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const tasks = await fetchTasks();
  return tasks;
});

export const markTaskAsCompleted = createAsyncThunk(
  'tasks/markAsCompleted',
  async (task: Task) => {
    const taskToUpdate = { ...task };
    taskToUpdate.isComplete = !taskToUpdate.isComplete;
    await updateTask(task.id, taskToUpdate);
    return;
  }
);

export const removeTask = createAsyncThunk(
  'tasks/removeTask',
  async (taskId: number) => {
    await deleteTask(taskId);
    return;
  }
);

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadTasks.pending, (state) => {
        state.tasks = [];
        state.status = 'loading';
      })
      .addCase(loadTasks.rejected, (state) => {
        state.tasks = [];
        state.status = 'idle';
      })
      .addCase(loadTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.status = 'idle';
      })
      .addCase(markTaskAsCompleted.pending, (state, action) => {
        const taskId = action.meta.arg.id;
        const taskIndex = state.tasks.findIndex((task) => task.id === taskId);

        if (taskIndex !== -1) {
          state.tasks[taskIndex].isComplete =
            !state.tasks[taskIndex].isComplete;
        }
      })
      .addCase(markTaskAsCompleted.rejected, (state, action) => {
        const taskId = action.meta.arg.id;
        const taskIndex = state.tasks.findIndex((task) => task.id === taskId);

        if (taskIndex !== -1) {
          state.tasks[taskIndex].isComplete =
            !state.tasks[taskIndex].isComplete;
        }
      })
      .addCase(removeTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const taskId = action.meta.arg;
        const taskIndex = state.tasks.findIndex((task) => task.id === taskId);

        if (taskIndex !== -1) {
          state.tasks.splice(taskIndex, 1);
        }
        state.status = 'idle';
      })
      .addCase(removeTask.rejected, (state) => {
        state.status = 'idle';
      });
  },
});

export default tasksSlice.reducer;
