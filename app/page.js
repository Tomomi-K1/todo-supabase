// server side component
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers';
import AuthButton from './auth-button';

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data : notes } = await supabase.from("notes").select();
  // console.log(JSON.stringify(notes, null, 2));
  return (
    <>
      <AuthButton />
      <h1>TO Do APP</h1>
      <p>{JSON.stringify(notes, null, 2)}</p>
    </>
   
  )
}
