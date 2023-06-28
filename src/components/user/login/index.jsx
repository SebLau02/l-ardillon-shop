import React, { useState, Fragment, useContext, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../utils/context";
import colors from "../../../utils/style/colors";

//-----------------------------------------------------------------------------------------------

const LogForm = styled.form`
	width: 40vmax;
	margin: 20vmax auto;

	label input {
		width: 22vmax;
		height: 4vmax;
		padding: 1vmax;
	}
	label span {
		font-weight: 900;
	}
`;
const Buttons = styled.button`
	width: 15vmax;
	height: auto;
	min-height: 5vmax;
	margin: 1vmin 0;

	background: linear-gradient(
		117deg,
		${colors.kaki} 0%,
		${colors.marron} 28%,
		${colors.marronDark} 100%
	);

	&:active {
		transform: translateY(2px);
		background: linear-gradient(
			140deg,
			${colors.kaki} 0%,
			${colors.marron} 40%,
			${colors.marronDark} 100%
		);
	}
`;

const TrueRes = styled.p`
	margin: 1vmax;
	color: #00ff00;
`;
const FalseRes = styled.p`
	margin: 1vmax;
	color: #ff0000;
`;

//-----------------------------------------------------------------------------------------------

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [logRes, setLogRes] = useState("");
	const navigate = useNavigate();
	const { setToken, setUserId, setIsConnected, userId, isConnected } =
		useContext(UserContext);

	const logFunc = (event) => {
		event.preventDefault();

		fetch("https://server-test-vpha.vercel.app/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				setIsConnected(data.isConnected);

				setLogRes(data.message);

				setUserId(data.id);

				setToken(data.token);
				localStorage.setItem("token", data.token);
			})
			.catch((error) => setLogRes(error.message));
	};

	useEffect(() => {
		isConnected === true &&
			setTimeout(() => {
				navigate(`/user/profile/${userId}`);
			}, 2000);
	}, [userId, isConnected]);

	return (
		<>
			<LogForm onSubmit={logFunc}>
				<label>
					<span>Email:</span>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
				<label>
					<span>Password:</span>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<Buttons type="submit">Login</Buttons>
				<Buttons
					type="submit"
					onClick={() => {
						navigate("/user/signup");
					}}
				>
					Crée un compte
				</Buttons>

				{isConnected === true ? (
					<TrueRes>{logRes}</TrueRes>
				) : (
					<FalseRes>{logRes}</FalseRes>
				)}
			</LogForm>
		</>
	);
}
