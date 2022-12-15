import React from 'react'

const Textarea = ({disabled=false,className="",...props}) => {
  return (
    <textarea className={className} disabled={disabled} {...props}>
      
    </textarea>
  )
}

export default Textarea
