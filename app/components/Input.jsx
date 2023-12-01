'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Input(){
    const [newToDo, setNewToDo] = useState("");  
    const router = useRouter();

    async function handleSubmit(e){
        const supabase = createClientComponentClient();
        const { data: { user}} = await supabase.auth.getUser();
        if(user){
            setNewToDo("");
            const {error} =await supabase.from('todos').insert({user_id: user.id, task:newToDo})
            router.refresh();
           
            console.log(error);
        }
    }
    
    return (
        <div className='w-full flex mb-10'>
            <input className='border p-2 mr-2 grow' value={newToDo} onChange ={(e)=>setNewToDo(e.target.value)} />
            <button className='p-2 rounded bg-green-200' onClick={handleSubmit}> Add </button>
        </div>
    )

}