"use client"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function TodoItem({item}){
    const router = useRouter();
    const supabase = createClientComponentClient();

    async function handleCompleteState(){
        await supabase.from('todos').update({is_complete: !item.is_complete}).eq('task',item.task)
        router.refresh();
    }

    async function handleDelete(){
        await supabase.from('todos').delete().eq('task',item.task)
        router.refresh();
    }

    return (
      <li className='flex gap-2 mb-2'>
        <h5 className='grow p-2 border border-b-gray-50'>{item.task}</h5>
        <button onClick={handleCompleteState} className={`${item.is_complete? "text-black bg-slate-300 ":"bg-blue-500 text-white"} p-2 w-[100px]`}>{item.is_complete? "done": "Not done"}</button>
        <button onClick={handleDelete} className="bg-red-500 text-white p-2"> Delete </button>
      </li>
    )
  }