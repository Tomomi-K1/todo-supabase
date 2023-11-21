import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET (request) {
    console.log("did get run?")
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');

    if(code){
        const cookieStore = cookies()
        // console.log(cookieStore);
        const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
        await supabase.auth.exchangeCodeForSession(code)
    }

    return NextResponse.redirect(requestUrl.origin);
    
}