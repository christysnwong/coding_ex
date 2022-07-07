import { useState } from "react";
import "./Todo.css"

const Todo = ({id, task, removeTodo, updateTodo}) => {
    const [editTask, setEditTask] = useState(task);
    const [isEditing, setIsEditing] = useState(false);
    const [isMarked, setIsMarked] = useState(false);

    const toggleEdit = () => {
      setIsEditing((edit) => !edit);
    };

    const toggleMarked = () => {
      setIsMarked((marked) => !marked);
    };

    const handleChange = (e) => {
      setEditTask(e.target.value);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      updateTodo(id, editTask);
      setIsEditing(false);
    };

    const classes = isMarked ? "marked" : "not-marked";

    return (
      <p>
        <span className={classes}>{`- ${task} `}</span>
        <button onClick={() => removeTodo(id)}>X</button>
        {!isMarked && <button onClick={() => toggleEdit()}>Update</button>}
        <button onClick={() => toggleMarked()}>Mark as completed</button>
        {isEditing && (
          <form onSubmit={handleSubmit}>
            <label htmlFor="edit-task">Change </label>
            <input id="edit-task" type="text" value={editTask} onChange={handleChange} />
            <button>Edit</button>
          </form>
        )}
      </p>
    );
}

export default Todo;