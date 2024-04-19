import React, { useState } from 'react';

const Todo = ({ text, completed, onDelete, onToggleComplete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveEdit = () => {
    onEdit(editedText);
    setIsEditing(false);
  };

  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  return (
    <div className="todo-item">
      {isEditing ? (
        <div>
          <input type="text" value={editedText} onChange={handleTextChange} />
          <button onClick={handleSaveEdit}>Save</button>
        </div>
      ) : (
        <div>
          <input type="checkbox" checked={completed} onChange={onToggleComplete} />
          <span className={completed ? 'completed' : ''}>{text}</span>
          <button onClick={handleToggleEdit}>Edit</button>
          <button onClick={onDelete} disabled={!completed}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Todo;