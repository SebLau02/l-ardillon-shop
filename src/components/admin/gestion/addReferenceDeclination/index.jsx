import React, { useState } from "react";
import styled from "styled-components";
import colors from "../../../../utils/style/colors";

//-----------------------------------------------------------------------------------------------

const FormContainer = styled.div`
	margin-top: 3vmin;
	background: ${colors.grey};
	border-radius: 1vmax;
	border: 2px solid ${colors.kaki};
	padding: 1vmax;

	h3 {
		text-align: center;
	}
`;
const SearchReferenceBar = styled.input`
	border-radius: 3vmin;
	padding: 1vmin;
	width: 100%;
`;
const Result = styled.p`
	width: 100%;
	background: ${colors.marron};
	border-radius: 1vmax;
	padding: 1vmax;
	margin-top: 1vmax;
	cursor: pointer;
	box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
		rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
		rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
`;
const SearchBarResultContainer = styled.div`
	margin-top: 1vmax;
	width: 30vmax;
`;

const ChampObligatoire = styled.p`
	font-size: clamp(0.8rem, 2vw, 1rem);
`;

//-----------------------------------------------------------------------------------------------

export default function AddReferenceDeclination({ leurres, token }) {
	const [searchValue, setSearchValue] = useState("");
	const [filteredLure, setFilteredLure] = useState([]);
	const [filteredLureId, setFilteredLureId] = useState();
	const [refNameClicked, setRefNameClicked] = useState(false);

	const [colorName, setColorName] = useState("");
	const [colorImage, setColorImage] = useState("");
	const [colorPrice, setColorPrice] = useState("");
	const [colorStock, setColorStock] = useState();

	const [addLureRes, setAddLureRes] = useState();

	var newReferenceDeclination = {
		image: colorImage,
		colorName: colorName,
		price: colorPrice,
		inStock: colorStock,
	};

	const handleSeachFunc = (e) => {
		setSearchValue(e.target.value.toLowerCase());

		leurres.filter((el) => {
			let lureName = el.name;
			let lureId = el._id;

			lureName.toLowerCase().match(searchValue) &&
				setFilteredLure({ name: lureName, id: lureId });
		});
	};

	const addReferenceDeclinationSubmit = (e) => {
		e.preventDefault();

		fetch(
			`https://server-test-vpha.vercel.app/api/leurres/${filteredLureId}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(newReferenceDeclination),
			}
		)
			.then((response) => response.json())
			.then((data) => {
				setAddLureRes(data.message);
			})
			.catch((error) => console.error(error));
	};

	return (
		<section className="add-new-lure-color">
			<SearchBarResultContainer>
				<h3>Etape 2: trouver la référence du leurre</h3>
				<SearchReferenceBar type="search" onChange={handleSeachFunc} />

				<Result
					onClick={() => {
						setFilteredLureId(filteredLure.id);
						setRefNameClicked(true);
					}}
				>
					{filteredLure.name}
				</Result>
			</SearchBarResultContainer>

			{refNameClicked === true && (
				<FormContainer>
					<h3>{filteredLure.name}</h3>
					<form
						onSubmit={addReferenceDeclinationSubmit}
						method="POST"
					>
						<label>
							Color Name*:
							<input
								required="required"
								type="text"
								value={colorName}
								onChange={(e) => setColorName(e.target.value)}
							/>
						</label>
						<label>
							Image*:
							<input
								required="required"
								type="text"
								value={colorImage}
								onChange={(e) => setColorImage(e.target.value)}
							/>
						</label>
						<label>
							Prix*:
							<input
								required="required"
								type="text"
								value={colorPrice}
								onChange={(e) => setColorPrice(e.target.value)}
							/>
						</label>
						<label>
							Stock*:
							<input
								required="required"
								type="text"
								value={colorStock}
								onChange={(e) => setColorStock(e.target.value)}
							/>
						</label>
						<button type="submit">Ajouter</button>
					</form>
					<p>{addLureRes}</p>
					<ChampObligatoire>* champ obligatoire</ChampObligatoire>
				</FormContainer>
			)}
		</section>
	);
}
