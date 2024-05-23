import { Button } from '@mui/material'
import React from 'react'

const IfAccountHolder = ({togglepanel}) => {
  return (
    <div className='mt-5 flex items-center gap-2 py-5 justify-center'>
    <span>Already have an account?</span>
    <Button onClick={togglepanel}>signin</Button>
</div>
  )
}

export default IfAccountHolder
