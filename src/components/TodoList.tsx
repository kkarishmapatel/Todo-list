import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// import { signup } from "../features/auth/authSlice";
// import { useNavigate } from "react-router-dom";

import { RootState, AppDispatch } from "../app/store";
import {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  setSearchTerm,
  Todo,
} from "../features/auth/todoSlice";
// import { fetchTodos, addTodo } from "../features/auth/todoSlice";

const TodoList: React.FC = () => {
  const [title, setTitle] = useState("");
  // const [titleSearch, setTitleSearch] = useState("");
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.auth.user);
  const todos = useSelector((state: RootState) => state.todos.todos);
  const searchTerm = useSelector((state: RootState) => state.todos.searchTerm);

  //   const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      dispatch(fetchTodos(user.id));
    }
  }, [dispatch, user]);

  const handleAddTodo = () => {
    if (user && title) {
      dispatch(addTodo({ userId: user.id, title }));
      setTitle("");
    }
  };

  const handleCompletedTodo = (todo: Todo) => {
    dispatch(updateTodo({ ...todo, completed: !todo.completed }));
  };

  const handleUpdateTodo = (todo: Todo) => {
    dispatch(updateTodo({ ...todo, title: editTitle }));
    setIsEditing(null);
    setEditTitle("");
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const handleEditButtonClick = (todo: Todo) => {
    setIsEditing(todo.id);
    setEditTitle(todo.title);
  };

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  // const handleSearchTodo = () => {
  //   const result = todos.filter((item) => item.title === titleSearch);
  //   console.log("result ", result);

  //   // titleSearch;
  // };

  // const filteredTodos = todos.filter((todo) =>
  // /   todo.title.toLowerCase().includes(titleSearch.toLowerCase())
  // );
  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Todo List</h2>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo"
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>

      {/* <input
        type="text"
        value={titleSearch}
        onChange={(e) => setTitleSearch(e.target.value)}
        placeholder="search todo item"
      /> */}
      {/* <button onClick={handleSearchTodo}>search</button> */}

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchTermChange}
        placeholder="Search todos"
      />
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            {isEditing === todo.id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <button onClick={() => handleUpdateTodo(todo)}>Save</button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                  onClick={() => handleCompletedTodo(todo)}
                >
                  {todo.title}
                </span>
                <button onClick={() => handleEditButtonClick(todo)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteTodo(todo.id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
