"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
// const BASE_URL = process.env.NEXT_PUBLIC_DEV?'http://localhost:3000/':'https://todo-supabase-nu.vercel.app/';

export default function NavbarClient({session}){
    const supabase = createClientComponentClient();
    const router = useRouter();
    // console.log(session);

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
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">To DO List</span>
            </a>
            <div className="block w-auto" id="navbar-default">
            <ul className="font-medium flex p-0 border-gray-100 rounded-lg flex-row space-x-8 rtl:space-x-reverse mt-0 border-0 bg-white">
                <li>
                    <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded" aria-current="page">Home</a>
                </li>
                <li>
                {session? (  
                        <button className="block py-2 px-3 text-white bg-blue-700 rounded" onClick={handleSignOut}> Logout </button>
                    ):(
                        <button className="block py-2 px-3 text-white bg-blue-700 rounded" onClick={handleSignIn}> Login </button>
                    )}
                </li>
            </ul>
            </div>
        </div>
        </nav>
        ) 
}
