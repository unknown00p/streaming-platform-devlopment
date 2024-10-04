import { useForm } from "react-hook-form"
import { Input, Button, SelectImage } from '../index'
import { Link } from "react-router-dom";
import { SignUp } from '../api/authentication/authApi';
import Wrapper from './Wrapper';

function Register() {
    const { register, handleSubmit, getValues, setError } = useForm()

    async function InputValues(data) {
        const returendData = await SignUp(data)
        console.log(returendData);
    }

    return (
        <>
            <Wrapper>
                <div className='flex flex-col items-center justify-center'>
                    <form className="flex flex-col gap-4 px-7 py-6 bg-slate-800 rounded-md w-full max-w-md" onSubmit={handleSubmit(InputValues)}>

                        <h1 className='text-white text-[1.3rem]'>Sign up</h1>
                        <hr />
                        <Input
                            id="username"
                            type="text"
                            className="bg-transparent h-10 px-3 w-full text-[1.1rem] outline-none border-white border-[1.5px] text-white rounded-sm"
                            label="Username"
                            labelClass="text-white"
                            placeholder="Enter your username"
                            {...register("username", { required: true })}
                        />

                        <Input
                            id="fullname"
                            type="text"
                            className="bg-transparent h-10 px-3 w-full text-[1.1rem] outline-none border-white border-[1.5px] text-white rounded-sm"
                            label="Full Name"
                            labelClass="text-white"
                            placeholder="Enter your full name"
                            {...register("fullname", { required: true })}
                        />

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

                        <p className='text-white text-center'>Already have an account?
                            <Link className='text-[#4f5bff] ml-2' to="/login">Log in</Link>
                        </p>
                    </form>
                </div>
            </Wrapper>
        </>
    )
}

export default Register