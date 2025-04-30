import React from 'react'

function Button({btnText ,type ,bgColor ,textColor ,className = "", ...prpos}) {
  return (
    <button  className={`px-4 py-2 rounded-lg ${textColor} ${bgColor} ${className}`} {...prpos} >{btnText}</button>
  )
}
export default Button