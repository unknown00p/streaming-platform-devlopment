import React, { useState } from 'react';

const SelectImage = React.forwardRef(({ type, onChange, label, labelClass = '', className = '', accept = 'image/*',noImageText,ImagePreviewClassName, ...props }, ref) => {
  const [imgUrl, setImgUrl] = useState("");

  function getUrl(e) {
    onChange(e);
    const file = e.target.files;
    const url = URL.createObjectURL(file[0]);
    setImgUrl(url);
  }

  return (
    <>
      <div className="mb-4">
        {imgUrl ? (
          <img className={ImagePreviewClassName} src={imgUrl} alt="Selected preview" />
        ) : (
          <div className={ImagePreviewClassName}>
            {noImageText}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div>
          <label className={`${labelClass} block font-medium text-gray-700`}>{label}</label>
        </div>
        <input
          onChange={getUrl}
          ref={ref}
          className={`${className}`}
          type={type}
          accept={accept}
          {...props}
        />
      </div>
    </>
  );
});

SelectImage.displayName = 'SelectImage';

export default SelectImage;
