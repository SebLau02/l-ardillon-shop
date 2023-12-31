import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import apiUrl from "../../../utils/api";

//-----------------------------------------------------------------------------------------------

export default function AddAdmin() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [signup, setSignupRes] = useState("");
	const [createAcount, setCreateAcount] = useState(false);
	const token = localStorage.getItem("token");
	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();

		fetch(apiUrl + "/api/admin/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				setSignupRes(data.message);
				setCreateAcount(true);
			})
			.catch((error) => setSignupRes(error));
	};

	createAcount && setTimeout(() => navigate("/leurres"), 1000);

	return (
		<>
			<form onSubmit={handleSubmit}>
				<p>Add admin</p>

				<label>
					Email:
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
				<label>
					Password:
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<button type="submit">Créer un compte</button>
				<p>{signup}</p>
			</form>
		</>
	);
}
