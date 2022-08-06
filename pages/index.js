import { useEffect, useContext } from 'react'
import Head from 'next/head'
// Components
import Navbar from '../components/Navbar'
import Todo from '../components/Todo'
import TodoForm from '../components/TodoForm'
//Utils
import { table, minifyRecords } from './api/utils/airtable'
import { TodosContext } from '../context/TodosContext'
import { useUser, getSession } from '@auth0/nextjs-auth0'

export default function Home({ initialTodos }) {
    const { todos, setTodos } = useContext(TodosContext)
    const { user, error, isLoading } = useUser()

    useEffect(() => {
        setTodos(initialTodos)
    }, [])

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>

    return (
        <div>
            <Head>
                <title>Next JS - Task Manager</title>
                <link rel="icon" href="/favicon.ico" />
                <meta charSet="UTF-8" />
            </Head>
            <Navbar user={user} />
            <main>
                {user ? (
                    <>
                        <h1 className="text-2xl text-center mb-4">
                            This is <span> {user.nickname} </span> TO DO´s
                        </h1>
                        <TodoForm />
                        <ul>
                            {todos &&
                                todos.map((todo) => (
                                    <Todo key={todo.id} todo={todo} />
                                ))}
                        </ul>
                    </>
                ) : (
                    <h1 className="text-2xl text-center mb-4">
                        Please Sign in.
                    </h1>
                )}
            </main>
        </div>
    )
}

export async function getServerSideProps(context) {
    let session
    if (context.req && context.res) {
        session = await getSession(context.req, context.res)
    }

    let todos = []
    if (session?.user) {
        todos = await table
            .select({ filterByFormula: `userId = '${session.user.sub}'` })
            .firstPage()
    }

    return {
        props: {
            initialTodos: minifyRecords(todos) || [],
            user: session?.user || null,
        },
    }
}
