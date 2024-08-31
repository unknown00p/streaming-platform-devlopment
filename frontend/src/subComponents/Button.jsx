import React from 'react'

function Button({buttonTxt, type, className, ...props}) {
  return (
    <div>
      <button type={type} className={className} {...props} >{buttonTxt}</button>
    </div>
  )
}

export default Button
