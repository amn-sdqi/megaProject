import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin, login } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Signup() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { register, handleSubmit } = useForm(null);
	const [error, setError] = useState(null);

	const create = async (data) => {
		setError("");
		try {
			const session = await authService.createAccount(data);
			if (session) {
				const userData = await authService.getCurrentUser();
				if (userData) dispatch(login(userData));
				navigate("/");
			}
		} catch (error) {
			setError(error);
		}
	};

	return (
		<div className="felx items-center justify-center">
			<div className="{`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border-black/10`}">
				<div className="mb-2 flex justify-center">
					<span className="inline-block w-full max-w-[100px]">
						<Logo width="100%" />
					</span>
				</div>
				<h2 className="text-center text-2xl font-bold leading-tight">
					Sign up to create account
				</h2>
				<p>
					Already have an accounct?&nbsp;
					<Link
						to="/login"
						className="font-medium text-primary transition-all duration-200 hover:underline">
						Signup
					</Link>
				</p>

				{error && <p className="text-red-600 mt-8 text-center">{error}</p>}

				<form onSubmit={handleSubmit(create)}>
					<div>
						<Input
							lable="name"
							placeholder="Enter your name"
							type="text"
							{...register("name", { required: true })}
						/>
						<Input
							lable="Email: "
							placeholder="Enter your email."
							type="email"
							{...register("email", {
								required: true,
								validate: {
									matchPatern: (value) =>
										/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
										"Email address must be a valid address",
								},
							})}
						/>
						<Input
							lable="Paassword: "
							placeholder="Enter your password."
							type="password"
							{...register("password", {
								required: true,
							})}
						/>
						<Button className="w-full">Create Account</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Signup;
