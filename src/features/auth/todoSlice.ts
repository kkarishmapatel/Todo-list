import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  searchTerm: string;
}

const initialState: TodoState = {
  todos: [],
  searchTerm: "",
};

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (userId: number) => {
    const response = await axios.get(`http://localhost:5000/todos/${userId}`);
    return response.data;
  }
);

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (todo: { userId: number; title: string }) => {
    const response = await axios.post("http://localhost:5000/todos/add", todo);
    return { ...todo, id: response.data.todoId, completed: false };
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (todo: Todo) => {
    await axios.put(`http://localhost:5000/todos/${todo.id}`, todo);
    return todo;
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: number) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    return id;
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.todos = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<number>) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
