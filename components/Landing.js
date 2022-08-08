import React from 'react'
import Link from 'next/Link'
import { LockClosedIcon } from '@heroicons/react/solid'
import { ClipboardListIcon } from '@heroicons/react/outline'

const Landing = () => {
    return (
        <div className="container mx-auto h-screen flex items-center justify-center">
            <div className="flex flex-col justify-center bg-white rounded-lg shadow-xl w-80 p-5 text-center items-center">
                <ClipboardListIcon className="h-10 w-10 text-sky-500" />
                <h5 className="py-3">Welcome to your</h5>
                <h1 className="text-5xl font-sans font-bold text-sky-500">
                    TODO&apos;S<span className="font-light">APP</span>
                </h1>
                <p className="py-3 font-serif text-l text-stone-500">
                    A simple organizing tool for managing tasks.
                </p>
                <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <LockClosedIcon
                            className="h-5 w-5 text-sky-500 group-hover:text-sky-400"
                            aria-hidden="true"
                        />
                    </span>
                    <Link href="/api/auth/login">
                        <a>Log In</a>
                    </Link>
                </button>
            </div>
        </div>
    )
}

export default Landing
