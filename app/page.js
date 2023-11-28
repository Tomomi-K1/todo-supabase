// server side component
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers';
import Navbar from './auth-button';

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data : todos} = await supabase.from("todos").select();

  // console.log(JSON.stringify(notes, null, 2));
  return (
    <div className='h-screen flex flex-col items-center pt-10'>
      <main>
        <h1 className='text-xl font-bold'>TO Do APP</h1>
        <ul className='list-decimal'>
        {todos.map((item, idx) =>( <TodoItem key = {idx} item = {item} />))}
        </ul>
      </main>
    </div>
   
  )
}


function TodoItem({item}){
  return (
    <li className='flex'>
      <h5 className='pr-2'>{item.task}</h5>
      <p>{item.is_completed? "done": "Not completed"}</p>
    </li>
  )

}
