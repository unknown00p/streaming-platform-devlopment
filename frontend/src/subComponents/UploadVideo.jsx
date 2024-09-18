import {useRef} from 'react'
import Button from './Button'
import Input from "./Input"
import {useForm} from 'react-hook-form'


function UploadVideo() {
    const inputRef = useRef()
    const {handleSubmit, register} = useForm()

    function SubFunc(e) {
        e.preventDefault()
    }

    function handleClick() {
        inputRef.current.click()
    }

    return (
        <form action="" onSubmit={handleSubmit(SubFunc)}>
            <div className="fixed top-[3rem] left-0 right-0 h-full m-auto bg-black text-white p-4 sm:p-6 md:p-8">
                <div className="max-w-xl mx-auto pt-3">
                    <div className="flex justify-between items-center w-full mb-4">
                        <p className="text-lg font-semibold mb-2 sm:mb-0">Upload Video</p>
                        <Button 
                        className="bg-[#661fbd] text-[#c6c1c1] font-medium rounded-sm text-sm px-4 py-2 hover:bg-[#7c2ed9] transition-colors duration-300 focus:outline-none"
                        buttonTxt="Save"
                        />
                            
                    </div>
                    <hr className="border-gray-700 mb-4" />
                    <div className="bg-gray-900 rounded-lg p-4 sm:p-2">
                        <div className="border-4 border-dashed border-gray-700 bg-[url('https://th.bing.com/th/id/OIP.JDa_1X-NqdM1K-bZxp99DQHaEo?w=297&h=185&c=7&r=0&o=5&dpr=1.5&pid=1.7')] bg-no-repeat bg-cover rounded-lg p-4 sm:p-8">
                            <svg className="text-indigo-500 w-11 sm:w-14 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <div className="flex flex-col items-center text-center">
                                <label className="mb-2">
                                    <Input className="hidden" ref={inputRef} type="file" />
                                    <Button 
                                    className="bg-indigo-600 text-white rounded font-semibold cursor-pointer py-1 px-4 hover:bg-indigo-500 transition-colors duration-300"
                                    buttonTxt="Select files"
                                    onClick={handleClick}
                                    />
                                </label>

                                <div className="text-indigo-500 uppercase text-sm">or drop files here</div>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <Input className='border-2 p-2 w-full' type="file" label="thumbnail" />

                        <div>
                            <Input className='w-full h-9 px-2 outline-none bg-[#fff0] border-white border-2' type="text" label="title" />
                        </div>
                        <div>
                            <Input className='w-full h-9 px-2 outline-none bg-[#fff0] border-white border-2' type="text" label="description" />
                        </div>
                        
                    </div>
                </div>
            </div>
        </form>
    )
}

export default UploadVideo
