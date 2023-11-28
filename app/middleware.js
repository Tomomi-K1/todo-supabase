import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

// we need this middleware so that if the cookie is expired, this middleware will getSession and refresh cookies on server side also.
export async function middleware(req){
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({req, res});
    await supabase.auth.getSession(); // this will refresh cookies from client component.
    return res;
}