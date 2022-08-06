import React from 'react'

export default function NavBar({ user }) {
    return (
        <nav className="flex justify-between items-center py-4">
            <p className="text-2xl font-bold text-grey-800">My Todos</p>
            <div className="flex">
                {!user ? (
                    <a
                        href="/api/auth/login"
                        className="rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
                    >
                        Log In
                    </a>
                ) : (
                    <a
                        href="/api/auth/logout"
                        className="rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
                    >
                        Log Out
                    </a>
                )}
            </div>
        </nav>
    )
}
