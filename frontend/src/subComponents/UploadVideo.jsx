import { useRef, useEffect, useState } from 'react'
import Button from './Button'
import Input from "./Input"
import { useForm } from 'react-hook-form'
import useHandleCssStore from '../zustand/useHandleCssStore'
import { postVideo } from '../api/videos//videoApi'
import { videoStore } from '../zustand/videoStore'


function UploadVideo() {
  const inputRef = useRef()
  const { handleSubmit, register } = useForm()
  const showUploadVideo = useHandleCssStore((state) => state.showUploadVideo)
  const [uploading, setUploading] = useState(false)

  async function SubFunc(e) {
    setUploading(true)
    const response = await postVideo(e?.title, e?.description, e?.video[0], e?.thumbnail[0])
    setUploading(false)
    // console.log(response);
  }

  function handleClick() {
    inputRef.current.click()
  }

  function closeCardFunc() {
    showUploadVideo("hidden")
  }

  return (
    <form onSubmit={handleSubmit(SubFunc)}>
      <div id='uploadVideo' className="fixed top-32 left-0 right-0 max-w-md sm:mx-auto mx-4 bg-[#0f141f] text-white p-6 rounded-lg">
        <div className="flex flex-col h-full space-y-4">
          {/* Header */}
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold">Upload Video</p>
            <img onClick={closeCardFunc} className="cursor-pointer w-5 h-5 uploadVideoBtn" src="/x.svg" alt="Close" />
          </div>

          <hr className="border-gray-700" />

          {/* Form Inputs */}
          <div className="space-y-4 overflow-y-auto">
            <Input
              className="rounded-md border-[1.5px] p-2 w-full bg-transparent border-[#3c3f46]" type="file" label="Video"
              {...register('video')}
            />
            <Input
              className="rounded-md border-[1.5px] p-2 w-full bg-transparent border-[#3c3f46]" type="file" label="Thumbnail"
              {...register('thumbnail')}
            />
            <Input
              className="rounded-md border-[1.5px] p-2 w-full bg-transparent border-[#3c3f46] outline-none" type="text" placeholder="Title"
              {...register('title')}
            />
            <Input
              className="rounded-md border-[1.5px] p-2 w-full bg-transparent border-[#3c3f46] outline-none" type="text" placeholder="Description"
              {...register('description')}
            />
          </div>

          {/* Save Button */}
          <Button
            className="w-full bg-purple-700 text-white font-medium rounded-sm text-sm px-4 py-2 hover:bg-purple-600 transition-colors"
            buttonTxt={uploading ? "Uploading..." : "Upload"}
          />
        </div>
      </div>
    </form>
  )
}

export default UploadVideo
