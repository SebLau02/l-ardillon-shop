import React, { useState, useEffect } from "react";

import HardLureForm from "./hardLureForm";
import SoftLureForm from "./softLureForm";
import MetallicLureForm from "./metallicLureForm";
import apiUrl from "../../../../utils/api";

//-----------------------------------------------------------------------------------------------

export default function AddLeurre({ leurres, token }) {
	const [newLure, setNewLure] = useState({});
	const [typeLure, setTypeLure] = useState("");
	const [addLureRes, setAddLureRes] = useState("");

	const handleChange = (e) => {
		setTypeLure(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		fetch(apiUrl + `/api/leurres?typeLeurre=${typeLure}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(newLure),
		})
			.then((response) => response.json())
			.then((data) => {
				setAddLureRes(data.message);
			})
			.catch((error) => console.error(error));
	};

	useEffect(() => {
		setNewLure((prevValues) => ({
			...prevValues,
			category: typeLure,
		}));
	}, [typeLure]);

	return (
		<article>
			<section>
				<h3>Etape 2: Choisir la catégorie</h3>

				<select
					value={typeLure}
					onInput={handleChange}
					className="add-lure-select-type-lure"
				>
					<option value=""></option>
					<option value="leurre-dur">Leurre dur</option>
					<option value="leurre-souple">Leurre souple</option>
					<option value="leurre-metallique">Leurre métallique</option>
				</select>

				{typeLure === "leurre-souple" ? (
					<SoftLureForm
						handleSubmit={handleSubmit}
						typeLure={typeLure}
						newLure={newLure}
						setNewLure={setNewLure}
					/>
				) : typeLure === "leurre-dur" ? (
					<HardLureForm
						handleSubmit={handleSubmit}
						typeLure={typeLure}
						newLure={newLure}
						setNewLure={setNewLure}
					/>
				) : (
					typeLure === "leurre-metallique" && (
						<MetallicLureForm
							handleSubmit={handleSubmit}
							typeLure={typeLure}
							newLure={newLure}
							setNewLure={setNewLure}
						/>
					)
				)}
				<p>{addLureRes}</p>
			</section>
		</article>
	);
}
