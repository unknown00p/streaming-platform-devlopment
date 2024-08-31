import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { Input, Button, SelectImage } from '../index'
import { Link } from "react-router-dom";

function Signup() {
    const { register, handleSubmit, getValues, setError } = useForm()
    const [avatarImage, setAvatarImage] = useState("")
    const [coverImage, setCoverImage] = useState("")

    function InputValues(data) {
        data.avatar = avatarImage
        data.coverImage = coverImage

        console.log(data);
    }

    // function getAvatarFile(e) {
    //     setCoverImage(e.target.files)
    // }

    // function getCoverImageFile(e) {
    //     setAvatarImage(e.target.files)
    // }

    return (
        <>
            <div className='flex flex-col items-center justify-center h-screen'>
                {/* <h1 className='text-white text-[1.3rem]'>Sign up</h1> */}
                <form className="flex flex-col gap-2 px-7 py-6 bg-slate-800 rounded-md" onSubmit={handleSubmit(InputValues)}>

                    <Input
                        type="text"
                        className="bg-[#00000000] h-10 px-3 w-[28vw] text-[1.1rem] outline-none border-white border-[1.5px] text-white rounded-sm"
                        label="Username"
                        labelClass="text-white"
                        placeholder="Enter your username"
                        autocomplete={false}
                        {...register("username", {
                            required: true,
                        })}
                    />

                    <Input
                        type="text"
                        className="bg-[#00000000] h-10 px-3 w-[28vw] text-[1.1rem] outline-none border-white border-[1.5px] text-white rounded-sm"
                        label="fullname"
                        labelClass="text-white"
                        placeholder="Enter your fullname"
                        {...register("fullname", {
                            required: true,
                        })}
                    />

                    <Input
                        type="email"
                        className="bg-[#00000000] h-10 px-3 w-[28vw] text-[1.1rem] outline-none border-white border-[1.5px] text-white rounded-sm"
                        label="email"
                        labelClass="text-white"
                        placeholder="Enter your email"
                        {...register("email", {
                            required: true,
                        })}
                    />

                    <Input
                        type="password"
                        className="bg-[#00000000] h-10 px-3 w-[28vw] text-[1.1rem] outline-none border-white border-[1.5px] text-white rounded-sm"
                        label="password"
                        labelClass="text-white"
                        placeholder="Enter your password"
                        {...register("password")}
                    />

                    {/* <div className='flex justify-between items-center'> */}
                        <Button type="submit" buttonTxt="Submit" className="bg-white rounded-sm mt-2 py-2 w-full " />
                        <p className='text-white'>Already have an account 
                             <Link className='text-[#4f5bff] ml-2' to="/login">Log in</Link>
                        </p>
                    {/* </div> */}

                </form>
            </div>
        </>
    )
}

export default Signup