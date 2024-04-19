import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import Todo from '../components/Todo';
import '../components/TodoList.css';

const reducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TODO':
        return [...state, action.payload];
      case 'DELETE_TODO':
        return state.filter(todo => todo.id !== action.payload);
      case 'TOGGLE_COMPLETE':
        return state.map(todo => {
          if (todo.id === action.payload) {
            return { ...todo, completed: !todo.completed };
          }
          return todo;
        });
      case 'EDIT_TODO':
        return state.map(todo => {
          if (todo.id === action.payload.id) {
            return { ...todo, title: action.payload.newText };
          }
          return todo;
        });
      case 'SET_TODOS':
        return action.payload;
      default:
        return state;
    }
  };
  
  const TodoList = () => {
    const [todos, dispatch] = useReducer(reducer, []);
    const [newTodo, setNewTodo] = useState('');
  
    useEffect(() => {
      axios.get('https://jsonplaceholder.typicode.com/todos')
        .then(response => {
          dispatch({ type: 'SET_TODOS', payload: response.data });
        })
        .catch(error => {
          console.error('Error fetching todos: ', error);
        });
    }, []);
  
    const handleInputChange = (e) => {
      setNewTodo(e.target.value);
    };
  
    const handleAddTodo = () => {
      if (newTodo.trim() === '') {
        return;
      }
  
      const newTodoObj = {
        id: todos.length + 1,
        title: newTodo,
        completed: false,
      };
  
      dispatch({ type: 'ADD_TODO', payload: newTodoObj });
      setNewTodo('');
    };
  
    const handleDeleteTodo = (id) => {
      dispatch({ type: 'DELETE_TODO', payload: id });
    };
  
    const handleToggleComplete = (id) => {
      dispatch({ type: 'TOGGLE_COMPLETE', payload: id });
    };
  
    const handleEditTodo = (id, newText) => {
      dispatch({ type: 'EDIT_TODO', payload: { id, newText } });
    };
  
    return (
      <div>
        <h1>Todo List</h1>
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          placeholder="Add a new todo"
        />
        <button onClick={handleAddTodo}>Add Todo</button>
        {todos.map(todo => (
          <Todo
            key={todo.id}
            text={todo.title}
            completed={todo.completed}
            onDelete={() => handleDeleteTodo(todo.id)}
            onToggleComplete={() => handleToggleComplete(todo.id)}
            onEdit={(newText) => handleEditTodo(todo.id, newText)}
          />
        ))}
      </div>
    );
  };
  
  export default TodoList;

// const TodoList = () => {
    // const [todos, setTodos] = useState([]);
    // const [newTodo, setNewTodo] = useState('');
//   
    // useEffect(() => {
    //   axios.get('https://jsonplaceholder.typicode.com/todos')
        // .then(response => {
        //   setTodos(response.data);
        // })
        // .catch(error => {
        //   console.error('Error fetching todos: ', error);
        // });
    // }, []);
//   
    // const handleInputChange = (e) => {
    //   setNewTodo(e.target.value);
    // };
//   
    // const handleAddTodo = () => {
    //   if (newTodo.trim() === '') {
        // return;
    //   }
//   
    //   const newTodoObj = {
        // id: todos.length + 1,
        // title: newTodo,
        // completed: false,
    //   };
//   
    //   setTodos([newTodoObj, ...todos]);
    //   setNewTodo('');
    // };
//   
    // const handleDeleteTodo = (id) => {
    //   setTodos(todos.filter(todo => todo.id !== id));
    // };
//   
    // const handleToggleComplete = (id) => {
    //   setTodos(todos.map(todo => {
        // if (todo.id === id) {
        //   return { ...todo, completed: !todo.completed };
        // }
        // return todo;
    //   }));
    // };
//   
    // const handleEditTodo = (id, newText) => {
    //   setTodos(todos.map(todo => {
        // if (todo.id === id) {
        //   return { ...todo, title: newText };
        // }
        // return todo;
    //   }));
    // };
//   
    // return (
    //   <div className="todo-list-container">
        {/* <h1>Todo List</h1> */}
        {/* <div className="add-todo"> */}
          {/* <input */}
            // type="text"
            // value={newTodo}
            // onChange={handleInputChange}
            // placeholder="Add a new todo"
        //   />
          {/* <button onClick={handleAddTodo}>Add Todo</button> */}
        {/* </div> */}
        {/* {todos.map(todo => ( */}
        //   <Todo
            // key={todo.id}
            // text={todo.title}
            // completed={todo.completed}
            // onDelete={() => handleDeleteTodo(todo.id)}
            // onToggleComplete={() => handleToggleComplete(todo.id)}
            // onEdit={(newText) => handleEditTodo(todo.id, newText)}
        //   />
        // ))}
      {/* </div> */}
    // );
//   };
//   
//   export default TodoList;