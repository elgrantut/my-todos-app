import { createContext, useState } from 'react'

const TodosContext = createContext()
const TodosProvider = ({ children }) => {
    const [todos, setTodos] = useState([])

    // GET TODOS

    const refreshTodos = async () => {
        try {
            const res = await fetch('/api/tasks/list')
            const latestTodos = await res.json()
            setTodos(latestTodos)
        } catch (error) {
            console.error(error)
        }
    }

    // ADD TODOS

    const addTodo = async (description) => {
        try {
            const res = await fetch('/api/tasks/create', {
                method: 'POST',
                body: JSON.stringify({ description }),
                headers: { 'content-Type': 'application/json' },
            })
            const newTodo = await res.json()
            setTodos((prevTodos) => {
                return [newTodo, ...prevTodos]
            })
        } catch (error) {
            console.error(error)
        }
    }

    // UPDATE TODOS

    const updateTodos = async (updatedTodo) => {
        try {
            const res = await fetch('/api/tasks/update', {
                method: 'PUT',
                body: JSON.stringify(updatedTodo),
                headers: { 'content-Type': 'application/json' },
            })
            await res.json()
            setTodos((prevTodos) => {
                const existingTodos = [...prevTodos]
                const existingTodo = existingTodos.find(
                    (todo) => todo.id === updatedTodo.id
                )
                existingTodo.fields = updatedTodo.fields
                return existingTodos
            })
        } catch (error) {
            console.error(error)
        }
    }

    //DELETE TODOS

    const deleteTodos = async (id) => {
        try {
            await fetch('/api/tasks/delete', {
                method: 'DELETE',
                body: JSON.stringify({ id }),
                headers: { 'content-Type': 'application/json' },
            })
            setTodos((prevTodos) => {
                return prevTodos.filter((todo) => todo.id !== id)
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <TodosContext.Provider
            value={{
                todos,
                setTodos,
                refreshTodos,
                updateTodos,
                deleteTodos,
                addTodo,
            }}
        >
            {children}
        </TodosContext.Provider>
    )
}

export { TodosProvider, TodosContext }
