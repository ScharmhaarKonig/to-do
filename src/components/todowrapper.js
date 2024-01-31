import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Todo } from './todo';
import { Todoform } from './todoform';
import { EditTodoform } from './edittodoform';

const API_URL = 'http://127.0.0.1:5000/todos';

export const Todowrapper = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data.todos);
    } catch (error) {
      console.log('Error fetching todos:', error);
    }
  };

  const addTodo = async (todo) => {
    try {
      const response = await axios.post(API_URL, { todo });
      setTodos([...todos, response.data]);
    } catch (error) {
      console.log('Error adding todo:', error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      await axios.put(`${API_URL}/${id}/toggleComplete`);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } catch (error) {
      console.log('Error toggling complete:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.log('Error deleting todo:', error);
    }
  };

  const editTodo = async (id) => {
    try {
      await axios.put(`${API_URL}/${id}/toggleEditing`);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
        )
      );
    } catch (error) {
      console.log('Error toggling editing:', error);
    }
  };

  const editTask = async (task, id) => {
    try {
      await axios.put(`${API_URL}/${id}`, { task });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
        )
      );
    } catch (error) {
      console.log('Error editing task:', error);
    }
  };

  return (
    <div className="Todowrapper">
      <Todoform addTodo={addTodo} />
      {todos.map((todo, index) =>
        todo.isEditing ? (
          <EditTodoform editTodo={editTask} task={todo} key={index} />
        ) : (
          <Todo
            task={todo}
            key={index}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        )
      )}
    </div>
  );
};