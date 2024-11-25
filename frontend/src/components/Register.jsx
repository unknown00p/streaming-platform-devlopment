import { useForm } from "react-hook-form"
import { Input, Button, SelectImage } from '../index'
import { Link } from "react-router-dom";
import { SignUp } from '../api/authentication/authApi';
import Wrapper from './Wrapper';
import { useState } from "react";

function Register() {
	const { register, handleSubmit, getValues, setError } = useForm()
	const [slide, setSlide] = useState(1)

	async function InputValues(data) {
		const returendData = await SignUp(data)
		console.log(returendData);
	}

	function handleNext() {
		setSlide(slide + 1)
	}

	function handlePrevious(params) {
		setSlide(slide - 1)
	}

	return (
		<>
			<Wrapper>
				<div className='flex flex-col items-center justify-center'>
					<form className="flex flex-col gap-4 px-7 py-6 bg-[#250e29] rounded-md w-full max-w-md" onSubmit={handleSubmit(InputValues)}>

						<h1 className='text-white text-[1.3rem]'>Sign up</h1>
						<hr />

						{slide == 1 &&
							<>
								<div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full">
									<img src="google.svg" alt="" />
									<p className="text-black">Sign up with Google</p>
								</div>
								<p className="text-center">Or</p>

								<div className="animate-slide-in-right flex flex-col gap-4">
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
								</div>
							</>
						}

						{slide == 2 &&
							<div className="animate-slide-in-right flex flex-col gap-4">
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
							</div>
						}

						{slide == 3 &&
							<div className="animate-slide-in-right flex flex-col gap-4">
								<Input
									id="avatar"
									type="file"
									className="bg-transparent py-3 px-3 w-full text-[1.1rem] outline-none border-white border-[1.5px] text-white rounded-sm"
									label="Avatar"
									labelClass="text-white"
									placeholder="Choose your avatar"
									{...register("avatar")}
								/>
								<Input
									id="coverImage"
									type="file"
									className="bg-transparent py-3 px-3 w-full text-[1.1rem] outline-none border-white border-[1.5px] text-white rounded-sm"
									label="CoverImage"
									labelClass="text-white"
									placeholder="Choose your coverImage"
									{...register("coverImage")}
								/>
							</div>
						}

						{slide >= 1 && slide < 3 ?
							<div>
								<Button type={'button'} buttonTxt={'Next'} className="bg-white text-black rounded-sm mt-2 py-2 w-full" onClick={handleNext} />

								{slide != 1 ? <Button type={'button'} buttonTxt={'Previous'} className="bg-white text-black rounded-sm mt-2 py-2 w-full" onClick={handlePrevious} /> : ''}
							</div>
							:
							<div>
								<Button type="button" onClick={handleSubmit(InputValues)} buttonTxt="Submit" className="bg-white text-black rounded-sm mt-2 py-2 w-full" />

								<Button type={'button'} buttonTxt={'Previous'} className="bg-white text-black rounded-sm mt-2 py-2 w-full" onClick={handlePrevious} />
							</div>
						}

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