import React, { useState } from "react";
import HardLureForm from "./hardLureForm";
import SoftLureForm from "./softLureForm";
import MetallicLureForm from "./metallicLureForm";
import apiUrl from "../../../../utils/api";

//-----------------------------------------------------------------------------------------------

export default function AddLeurre({ leurres, token }) {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [marque, setMarque] = useState("");
	const [category, setCategory] = useState("");
	const [price, setPrice] = useState();
	const [size, setSize] = useState();
	const [inStock, setInStock] = useState();
	const [famille, setFamille] = useState();
	const [typeLure, setTypeLure] = useState("");
	const [swimDepth, setSwimDepth] = useState("");
	const [weight, setWeight] = useState("");
	const [addLureRes, setAddLureRes] = useState("");
	const [image, setImage] = useState("");
	const colors = [];

	var newLeurre = {};

	const handleChange = (e) => {
		setTypeLure(e.target.value);
	};

	typeLure === "leurre-souple"
		? (newLeurre = {
				name,
				description,
				marque,
				category: typeLure,
				size,
				famille,
		  })
		: typeLure === "leurre-dur"
		? (newLeurre = {
				name,
				description,
				marque,
				category: typeLure,
				size,
				swimDepth,
				weight,
				colors,
				famille,
		  })
		: (newLeurre = {
				name,
				description,
				marque,
				category: typeLure,
				size,
				weight,
				famille,
		  });

	const handleSubmit = (e) => {
		e.preventDefault();

		fetch(apiUrl + `/api/leurres?typeLeurre=${typeLure}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(newLeurre),
		})
			.then((response) => response.json())
			.then((data) => {
				setAddLureRes(data.message);
			})
			.catch((error) => console.error(error));
	};

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
						name={name}
						description={description}
						marque={marque}
						category={category}
						price={price}
						size={size}
						inStock={inStock}
						setName={setName}
						setDescription={setDescription}
						setMarque={setMarque}
						setCategory={setCategory}
						setPrice={setPrice}
						setSize={setSize}
						setInStock={setInStock}
						handleSubmit={handleSubmit}
						image={image}
						setImage={setImage}
						typeLure={typeLure}
						famille={famille}
						setFamille={setFamille}
					/>
				) : typeLure === "leurre-dur" ? (
					<HardLureForm
						name={name}
						description={description}
						marque={marque}
						category={category}
						price={price}
						size={size}
						swimDepth={swimDepth}
						weight={weight}
						inStock={inStock}
						setName={setName}
						setDescription={setDescription}
						setMarque={setMarque}
						setCategory={setCategory}
						setPrice={setPrice}
						setSize={setSize}
						setInStock={setInStock}
						setSwimDepth={setSwimDepth}
						setWeight={setWeight}
						handleSubmit={handleSubmit}
						image={image}
						setImage={setImage}
						typeLure={typeLure}
						famille={famille}
						setFamille={setFamille}
					/>
				) : (
					typeLure === "leurre-metallique" && (
						<MetallicLureForm
							name={name}
							description={description}
							marque={marque}
							category={category}
							price={price}
							size={size}
							swimDepth={swimDepth}
							weight={weight}
							inStock={inStock}
							setName={setName}
							setDescription={setDescription}
							setMarque={setMarque}
							setCategory={setCategory}
							setPrice={setPrice}
							setSize={setSize}
							setInStock={setInStock}
							setWeight={setWeight}
							handleSubmit={handleSubmit}
							image={image}
							setImage={setImage}
							typeLure={typeLure}
							famille={famille}
							setFamille={setFamille}
						/>
					)
				)}
				<p>{addLureRes}</p>
			</section>
		</article>
	);
}
