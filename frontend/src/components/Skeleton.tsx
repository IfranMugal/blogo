import React from 'react'

function Skeleton() {
  return (
    <div>
        <div className='text-left w-lg p-6 '>
            <div role="status" className='flex animate-pulse'>
                <div className="w-6 h-6 rounded-full text-white flex items-center justify-center text-md ">
                    <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
                </div>
                <div className='text-sm text-gray-500 px-2 mt-1'>
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                </div>
            </div>
            <div className='text-black text-xl font-semibold mt-1 mb-2'>
                <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
            </div>
            <div className='text-sm text-gray-500'>
                <div className="h-3 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
            </div>
            <div className='flex justify-between mt-6'>
                <div className=' text-xs text-gray-400'>
                    <div className="h-1.5 bg-gray-200 rounded-full w-48 mb-4"></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Skeleton