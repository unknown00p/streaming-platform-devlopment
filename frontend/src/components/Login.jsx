import { useForm } from "react-hook-form"
import { Input, Button } from '../index'
import { Link } from "react-router-dom";
import Wrapper from './Wrapper';
import SignIn from "../api/authentication/SignIn";
import { useNavigate } from 'react-router-dom'

function Login() {
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()

    async function InputValues(data) {
       const responseData = await SignIn(data)
       if (responseData.status === 200) {
        navigate("/")        
       }
       console.log(responseData);       
    }

    return (
        <>
            <Wrapper>
                <div className='flex flex-col items-center justify-center'>
                    <form className="flex flex-col gap-4 px-7 py-6 bg-slate-800 rounded-md w-full max-w-md" onSubmit={handleSubmit(InputValues)}>

                    <h1 className='text-white text-[1.3rem]'>Login</h1>
                    <hr />
                        <Input
                            id="email"
                            type="email"
                            className="bg-transparent h-10 px-3 w-full text-[1.1rem] outline-none border-white border-[1.5px] text-white rounded-sm"
                            label="Email"
                            labelClass="text-white"
                            placeholder="Enter your email"
                            {...register("email", { required: true })}
                        />

                        <Input
                            id="password"
                            type="password"
                            className="bg-transparent h-10 px-3 w-full text-[1.1rem] outline-none border-white border-[1.5px] text-white rounded-sm"
                            label="Password"
                            labelClass="text-white"
                            placeholder="Enter your password"
                            {...register("password")}
                        />

                        <Button type="submit" buttonTxt="Submit" className="bg-white rounded-sm mt-2 py-2 w-full" />

                        <p className='text-white text-center'>Does not have an account?
                            <Link className='text-[#4f5bff] ml-2' to="/register">Sign Up</Link>
                        </p>
                    </form>
                </div>
            </Wrapper>
        </>
    )
}

export default Login
