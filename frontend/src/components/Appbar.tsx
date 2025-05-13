import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Appbar({bulk,create} : {bulk : boolean,create:boolean}) {
    const navigate = useNavigate();
    function Logout(){
        localStorage.removeItem("jwt");
        navigate("/signin")
    }
    function back(){
        navigate("/blog")
    }
    function decide(){
        if(bulk){
            Logout()
        }else{
            back()
        }
    }
  return (
    <div className='flex justify-between w-screen border-b border-gray-400 mb-3 h-15 pt-5 pb-15 px-20'> 
        <div className='flex space-x-2'>
            <div className='mt-1 w-7 h-7 rounded-full bg-slate-500 text-white flex items-center justify-center text-md'>B</div>
            <Link to={"/blog"}>
                <div className='text-3xl font-extrabold'>Blogo</div>
            </Link>
        </div>
        
        <div>
            {!create ? <button onClick={() => {navigate("/create")}} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                create
            </button>: null}
            {bulk ? <button onClick={decide} className='text-white bg-red-500 hover:bg-red-700 px-3 py-1 rounded ml-4'>
                Log out
            </button> : 
            <button onClick={decide} className='text-white bg-neutral-600 hover:bg-neutral-800 px-3 py-1 rounded ml-4'>
                Back
            </button>}
        </div> 
    </div>
  )
}



export default Appbar