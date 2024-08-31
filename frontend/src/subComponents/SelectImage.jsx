import React, { useState } from 'react'

const SelectImage = React.forwardRef(({ type, onChange, label, labelClass, className, accept, ...props }, ref) => {

    const [imgUrl, setImgUrl] = useState("")

    function getUrl(e) {
        onChange(e)
        const file = e.target.files
        const url = URL.createObjectURL(file[0])
        setImgUrl(url)
    }

    return (
        <>
            <img src={imgUrl} alt="" />
            <div>
                <div>
                    <label className={labelClass}>{label}</label>
                </div>
                <input onChange={getUrl} ref={ref} className={className} type={type} accept={accept} {...props} />
            </div>
        </>
    )
})

export default SelectImage
