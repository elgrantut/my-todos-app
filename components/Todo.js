import React, { useContext } from 'react'
import { TodosContext } from '../context/TodosContext'

export default function Todo({ todo }) {
    const { updateTodos, deleteTodos } = useContext(TodosContext)
    const handleToggleCompleted = () => {
        const updatedFields = {
            ...todo.fields,
            completed: !todo.fields.completed,
            color: todo.fields.color,
        }

        const updatedTodo = { id: todo.id, fields: updatedFields }
        updateTodos(updatedTodo)
    }

    return (
        <li className="bg-white flex items-center shadow-lg rounded-lg my-2 py-2 px-4">
            <input
                type="checkbox"
                name="completed"
                id="completed"
                value={todo.fields.completed}
                checked={todo.fields.completed}
                onChange={handleToggleCompleted}
                className="mr-2 form-checkbox h-5 w-5"
            />
            <p
                className={`flex-1 ${
                    todo.fields.completed ? 'line-through' : ''
                } `}
                style={{
                    color:
                        todo.fields.completed === true ? '#0000ff' : '#ff0000',
                }}
            >
                {todo.fields.description}
            </p>
            <button
                type="button"
                className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
                onClick={() => deleteTodos(todo.id)}
            >
                Delete
            </button>
        </li>
    )
}
