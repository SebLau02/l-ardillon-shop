import React, { useState, Fragment } from "react";
import styled from "styled-components";
import colors from "../../../utils/style/colors";
import { useNavigate } from "react-router-dom";
import apiUrl from "../../../utils/api";

//-----------------------------------------------------------------------------------------------

const LogForm = styled.form`
	width: 40vmax;
	margin: 5vmax auto;

	label input {
		width: 22vmax;
		height: 4vmax;
		padding: 1vmax;
	}
	label span {
		font-weight: 900;
	}
`;
const Button = styled.button`
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
	const [name, setName] = useState();
	const [prenom, setPrenom] = useState();
	const [logRes, setLogRes] = useState("");
	const [createAcount, setCreateAcount] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();

		fetch(apiUrl + "/api/auth/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				nom: name,
				prenom,
				email: email,
				password: password,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				setLogRes(data.message);
				setCreateAcount(data.acountCreated);
			})
			.catch((error) => setLogRes(error.message));
	};

	createAcount === true && setTimeout(() => navigate("/leurres"), 1000);

	return (
		<>
			<LogForm onSubmit={handleSubmit}>
				<label>
					<span>Nom:</span>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</label>

				<label>
					<span>Prénom:</span>
					<input
						type="text"
						value={prenom}
						onChange={(e) => setPrenom(e.target.value)}
					/>
				</label>

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
				<Button type="submit">Créer un compte</Button>

				{createAcount === true ? (
					<TrueRes>{logRes}</TrueRes>
				) : (
					<FalseRes>{logRes}</FalseRes>
				)}
			</LogForm>
		</>
	);
}
