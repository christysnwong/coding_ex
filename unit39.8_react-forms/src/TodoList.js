import React, {useState} from "react";
import NewTodoForm from "./NewTodoForm";
import Todo from "./Todo";

const TodoList = () => {
    const INITIAL_STATE = [];
    const [todos, setTodos] = useState(INITIAL_STATE);
    const [todoId, setTodoId] = useState(1);

    const addTodo = (newTodo) => {
        setTodos(todos => [...todos, { ...newTodo, id: todoId}]);
        setTodoId(todoId => todoId + 1);
    }

    const removeTodo = (id) => {
        setTodos(todos => todos.filter( t => t.id !== id));
    }
    

    const updateTodo = (id, updatedTodo) => {
        setTodos(todos =>
            todos.map(todo =>
                todo.id === id? {...todo, task: updatedTodo} : todo
            )    
        );
    }

    return (
        <div>
            <h3>TodoList</h3>
            <NewTodoForm addTodo={addTodo} remove={removeTodo}/>
            <div>
                {todos.map(todo => 
                    <Todo
                        key={todo.id}
                        id={todo.id}
                        task={todo.task}
                        removeTodo={removeTodo}
                        updateTodo={updateTodo}
                    />

                )}
                
            </div>
           
        </div>
    )
}

export default TodoList;