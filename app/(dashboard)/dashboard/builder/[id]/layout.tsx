import React, { ReactNode } from 'react'

const layout = ({children}:{children:ReactNode}) => {
  return (
      <div className='flex justify-center items-center'>l{children}</div>
  )
}

export default layout