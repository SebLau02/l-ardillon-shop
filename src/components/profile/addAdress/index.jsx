import React, { useState, useContext } from "react";
import { UserContext } from "../../../utils/context";
import styled from "styled-components";
import colors from "../../../utils/style/colors";

//-----------------------------------------------------------------------------------------------

const AddAdressForm = styled.form`
	width: 50%;
	margin: 15vmax auto;

	input {
		width: 60%;
		padding: 1vmax;
	}
	label span {
		font-weight: 900;
	}
	p {
		font-size: clamp(0.8rem, 2vw, 1.2rem);
		color: red;
	}
	h4 {
		color: #38ed7e;
	}
`;
const AjouterAdresse = styled.button`
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

export default function AddAdress() {
	const [nomVoie, setNomVoie] = useState();
	const [numero, setNumero] = useState();
	const [codePostale, setCodePostale] = useState();
	const [ville, setVille] = useState();
	const [complement, setComplement] = useState();
	const [res, setRes] = useState();

	const { userId, token } = useContext(UserContext);

	const addAdress = (e) => {
		e.preventDefault();

		const adress = {
			nomVoie,
			numero,
			codePostale,
			ville,
			complement,
		};

		fetch(
			`https://server-test-vpha.vercel.app/api/auth/add-adresse/${userId}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(adress),
			}
		)
			.then((response) => response.json())
			.then((data) => {
				setRes(data.message);
			})
			.catch((error) => console.error(error));
	};

	return (
		<AddAdressForm onSubmit={addAdress} method="post">
			<label>
				<span>Numéro*</span>
				<input
					required="required"
					type="text"
					value={numero}
					onChange={(e) => setNumero(e.target.value)}
				/>
			</label>

			<label>
				<span>Nom de Voie*</span>
				<input
					required="required"
					type="text"
					value={nomVoie}
					onChange={(e) => setNomVoie(e.target.value)}
				/>
			</label>

			<label>
				<span>Code Postale*</span>
				<input
					required="required"
					type="text"
					value={codePostale}
					onChange={(e) => setCodePostale(e.target.value)}
				/>
			</label>

			<label>
				<span>Ville*</span>
				<input
					required="required"
					type="text"
					value={ville}
					onChange={(e) => setVille(e.target.value)}
				/>
			</label>

			<label>
				<span>Complément</span>
				<input
					type="text"
					value={complement}
					onChange={(e) => setComplement(e.target.value)}
				/>
			</label>
			<AjouterAdresse type="submit">Ajouter</AjouterAdresse>
			<p>* Champ obligatoire</p>
			<h4>{res}</h4>
		</AddAdressForm>
	);
}
