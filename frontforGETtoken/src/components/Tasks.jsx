import React from 'react'
import axios from 'axios'
import { useEffect,useState } from 'react';

export default function Tasks({token}) {
  const [tasks, setTasks] = useState([])
  const fetchData = async(token)=>{
    const response = await axios.get('https://burency.aminabedi.com/api/tasks',{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    });
    setTasks(response.data.tasks)
    console.log(response.data);
  }
  useEffect(()=>{
   if(token){
    fetchData(token);
   }
  },[]);


  return (
    <div>
       {token}
    </div>
  )
}
