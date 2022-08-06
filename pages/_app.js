import '../styles/globals.css'
import { TodosProvider } from '../context/TodosContext'
import { UserProvider } from '@auth0/nextjs-auth0'

function MyApp({ Component, pageProps }) {
    const { user } = pageProps

    return (
        <TodosProvider>
            <UserProvider user={user}>
                <div className="container mx-auto my-10 max-w-sm">
                    <Component {...pageProps} />
                </div>
            </UserProvider>
        </TodosProvider>
    )
}

export default MyApp
