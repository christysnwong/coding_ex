import { useState } from "react";

const NewTodoForm = ({addTodo}) => {


    const [task, setTask] = useState("");

    const handleChange = e => {
        setTask(e.target.value);
    }
    

    const handleSubmit = e => {
        e.preventDefault();
        addTodo({task});
        setTask("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="task">Task </label>
            <input 
              id="task"
              type="text"
              name="task"
              placeholder="...type in task description"
              value={task}
              onChange={handleChange}
            />
            <button>Add</button>
        </form>
    );
}

export default NewTodoForm;