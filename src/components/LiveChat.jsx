import React, { useEffect } from 'react'
import ChatMesage from './ChatMesage'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/utils/store'
import { setMessage } from '@/utils/chatSlice'
import { generateRandomMessage, generateRandomName } from '@/utils/helper'

function LiveChat() {
    const message = useSelector((store) => store.chat.message)
    const dispatch = useDispatch();
    useEffect(() => {
        const timer = setInterval(() => {
            dispatch(setMessage({
                name: generateRandomName(),
                message: generateRandomMessage(15)

            }))

        }, 1000)
        return (() => {
            clearInterval(timer)
        })

    }, [])
    return (
        <div className='px-4 py-1'>

            <div>{
                message.map((item, idx) => {
                    return (
                        <ChatMesage key={idx} item={item} />

                    )

                })}




            </div>
        </div>
    )
}

export default LiveChat