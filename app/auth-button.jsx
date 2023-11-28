"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
// const BASE_URL = process.env.NEXT_PUBLIC_DEV?'http://localhost:3000/':'https://todo-supabase-nu.vercel.app/';

export default function Navbar(){
    const supabase = createClientComponentClient();
    const router = useRouter();
    const [ session, setSession ] = useState();
    // console.log(session);

    useEffect(() => {
        const getSession = async () => {
            const {data} =await supabase.auth.getSession()
            setSession(data.session) 
        }
        getSession();
    })

    const handleSignOut = async () => {
        console.log(`handle signin run?`)
        await supabase.auth.signOut();
        //we do router.refresh to run server component again otherwise even though user signout, the page will keep showing user related information
        router.refresh();
    }

    const handleSignIn = async () => {
        console.log(`handle signin run?`)
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `http://localhost:3000/auth/callback`
            }
        })
        router.refresh(); 
     }
    
    return(
        <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">To DO List</span>
            </a>
            <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
            <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                    <a href="#" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
                </li>
                <li>
                {session? (  
                        <button className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" onClick={handleSignOut}> Logout </button>
                    ):(
                        <button className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" onClick={handleSignIn}> Login </button>
                    )}
                </li>
            </ul>
            </div>
        </div>
        </nav>
        ) 
}

// session? (  
//     <button className="border rounded p-2 bg-red-500" onClick={handleSignOut}> Logout </button>
// ):(
//     <button className="border rounded p-2 bg-blue-500" onClick={handleSignIn}> Login </button>
// )