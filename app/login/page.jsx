import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import NavbarServer from "../components/navbar-server";
import { redirect } from "next/navigation";

export default async function Login(){
    const supabase = createServerComponentClient({cookies});
    const { data: { session} } = await supabase.auth.getSession();

    if (session){
      return redirect('/');
    }
    return (
        <main className="h-screen flex flex-col items-center mt-10">
            <h1 className="font-bold mb-10">Welcome to To Do List</h1>
            <h2> Please login first.</h2>
        </main>
    )
}