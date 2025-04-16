import React from 'react'
import Sidebar from './Sidebar'
import Feed from './Feed'
import { Outlet } from 'react-router-dom'

function Body() {
    return (
        <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <Outlet />

        </div>
    )
}

export default Body