import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';
import NavbarClient from "./navbar-client";

export default async function NavbarServer(){
    const supabase = createServerComponentClient({ cookies });
    const { data: {session} } = await supabase.auth.getSession();

    return <NavbarClient session={session} />
} 