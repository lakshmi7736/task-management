import { Avatar } from '@mui/material'
import './Navbar.css'

import React from 'react'

const Navbar = () => {
  return (
    <div className='nav z-10 sticky left-0 right-0 top-0 py-3 px-5 lg:px-10,
     flex justify-between items-center'>
      <p className='font-bold text-lg'>Task Manager</p>
      <div className='flex items-center gap-5'>
        <p>code with laksh</p>
        <Avatar src='https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjc5MS10YW5nLTM1LnBuZw.png' />
      </div>
    </div>
  )
}

export default Navbar
