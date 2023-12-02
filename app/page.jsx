// server side component
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Input from './components/Input';
import TodoItem from './components/TodoItem';

export default async function Home() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: { session} } = await supabase.auth.getSession();

  if (!session){
    console.log("no session, redirect to /login inside home")
    redirect('/login');
  }

  const { data : todos} = await supabase.from("todos").select();
  // console.log(JSON.stringify(notes, null, 2));
  return (
      <main className='h-screen w-screen flex flex-col items-center pt-10'>
        <div className='w-11/12 md:w-8/12 lg:w-6/12'>
          <h1 className='text-xl font-bold mb-10'>Add more todos!</h1>
          <Input />
          <h2 className='text-xl font-bold mb-10'>List of todos</h2>
          <ul>
          {todos.map((item, idx) =>( <TodoItem key = {idx} item = {item} />))}
          </ul>
        </div>
      </main>  
  )
}



