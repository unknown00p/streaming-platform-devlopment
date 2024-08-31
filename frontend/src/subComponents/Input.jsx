import React from 'react'
// import "../App.css"
function Input({ type, className, labelClass, label, placeholder, ...props }, ref) {

    return (
        <div ref={ref}>
            <div>
                <label className={labelClass}>{label}</label>
            </div>
            <input type={type} className={className} placeholder={placeholder} {...props} />
        </div>
    )
}

export default React.forwardRef(Input)
