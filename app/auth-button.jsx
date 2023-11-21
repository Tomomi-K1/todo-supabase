'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export default function AuthButton(){
    const supabase = createClientComponentClient();
    const router = useRouter();
    const [ session, setSession ] = useState();
    console.log(session);

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
        router.refresh();
    }

    const handleSignIn = async () => {
        console.log(`handle signin run?`)
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: 'http://localhost:3000/auth/callback'
            }
        })  }
    
    return session? (  
                <button className="border rounded p-2 bg-red-500" onClick={handleSignOut}> Logout </button>
            ):(
                <button className="border rounded p-2 bg-blue-500" onClick={handleSignIn}> Login </button>
            )
}