import React from 'react'
import Link from 'next/Link'
import Image from 'next/Image'

export default function NavBar({ user }) {
    console.log('user', user)

    return (
        <nav className="flex justify-between items-center py-4">
            <div className="flex">
                <h1 className="text-2xl font-bold text-grey-800">My Todos</h1>
                <Link href="/api/auth/logout">
                    <a className="rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4">
                        Log Out
                    </a>
                </Link>
                <Image src={user.picture} alt="avatar" width={50} height={50} />
            </div>
        </nav>
    )
}
