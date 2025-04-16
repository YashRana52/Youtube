import React from 'react'

function ChatMesage({ item }) {
    return (
        <div className='flex items-center'>

            <div>
                <img
                    src="https://i.pravatar.cc/40"
                    alt="avatar"
                    className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-300 hover:border-blue-400"
                />
            </div>
            <div className='flex items-center'>
                <h1 className='ml-2 font-bold text-sm '>{item.name} </h1>
                <p className='ml-2 py-2 text-sm'>{item.message} </p>
            </div>





        </div>
    )
}

export default ChatMesage