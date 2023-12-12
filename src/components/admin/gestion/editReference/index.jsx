import React, { useState, Fragment, useEffect } from "react";
import styled from "styled-components";
import colors from "../../../../utils/style/colors";
import apiUrl from "../../../../utils/api";

//-----------------------------------------------------------------------------------------------

const SecondState = styled.div`
	width: 30vmax;
	margin-top: 1vmax;
`;
const SearchReferenceBar = styled.input`
	border-radius: 3vmin;
	padding: 1vmin;
	width: 50%;
`;
const Result = styled.p`
	width: 50%;

	background: ${colors.marron};
	border-radius: 1vmax;

	padding: 1vmax;
	margin-top: 1vmax;

	box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
		rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
		rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
`;
const ColorDeclination = styled.ul`
	li {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: 20vmax;
		border: 1px solid ${colors.kaki};
		border-radius: 1vmax;
		margin: 1vmax;
		padding: 1vmax;
	}
	li img {
		width: 80%;
		border-radius: 1vmax;
	}
`;
const Form = styled.form`
	label img {
		width: 80%;
		border-radius: 1vmax;
		margin: auto;
	}
	label input {
		padding: 1vmax;
	}
`;
const LabelImageContainer = styled.label`
	padding: 0;
`;

const SelectInput = styled.select`
	width: 30vmax;
	border-radius: 8px;
	padding: 0.5vmax;
	box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
		rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
		rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
`;

export default function EditReference({ leurres, token }) {
	const [searchValue, setSearchValue] = useState("");
	const [filteredLure, setFilteredLure] = useState([]);
	const [isStepComplete, setIsStepComplete] = useState({
		1: false,
		2: false,
		3: false,
	});

	const [servRes, setServRes] = useState();

	const [rord, setRord] = useState(); //rord === ref or ref decl
	const [selectedColor, setSelectedColor] = useState({});
	const [selectedLure, setSelectedLure] = useState({});

	const handleSeachFunc = (e) => {
		setSearchValue(e.target.value.toLowerCase());

		leurres.filter((el) => {
			let lureName = el.name;

			lureName.toLowerCase().match(searchValue) && setFilteredLure(el);
		});
	};

	const fetchApi = () => {
		rord === "edit-ref-declination"
			? fetch(
					apiUrl +
						`/api/leurres/modify-lure/edit-one-ref-declination/${selectedLure._id}`,
					{
						method: "put",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify(selectedColor),
					},
			  )
					.then((response) => response.json())
					.then((data) => {
						setServRes(data.message);
					})
					.catch((error) => console.error(error))
			: fetch(
					apiUrl +
						`/api/leurres/modify-lure/edit-one-ref/${selectedLure._id}`,
					{
						method: "put",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify(selectedLure),
					},
			  )
					.then((response) => response.json())
					.then((data) => {
						setServRes(data.message);
					})
					.catch((error) => console.error(error));
	};

	const stockManagementFunc = (e) => {
		e.preventDefault();

		fetchApi();
	};

	return (
		<section>
			<SecondState>
				<div>
					<h3>
						Etape 2: Modifier une référence ou une déclinaison ?
					</h3>
					<SelectInput
						name="ref-or-ref-decl"
						id="rord"
						onInput={(e) => {
							setRord(e.target.value);
							setIsStepComplete({ 1: true, 2: false });
						}}
					>
						<option value=""></option>
						<option value="edit-ref">Modifier une référence</option>
						<option value="edit-ref-declination">
							Modifier un déclinaison d'une référence
						</option>
					</SelectInput>
				</div>
			</SecondState>

			{isStepComplete[1] && (
				<>
					<div>
						<h3>Etape 3: Trouver la référence à modifier </h3>
						<SearchReferenceBar
							type="search"
							onChange={handleSeachFunc}
						/>
						<Result
							onClick={() => {
								setSelectedLure(filteredLure);
								setIsStepComplete({ 1: true, 2: true });
							}}
						>
							{filteredLure.name}
						</Result>
					</div>
				</>
			)}

			{rord === "edit-ref-declination" ? (
				<article>
					{isStepComplete[2] && (
						<>
							<ColorDeclination>
								<h3>
									Etape 4: Choisir la référence à modifier
								</h3>
								{filteredLure?.colors?.map((color) => (
									<li
										key={color._id + color.colorName}
										onClick={() => {
											setSelectedColor(color);

											setIsStepComplete({
												1: true,
												2: true,
												3: true,
											});
										}}
									>
										<img src={color.image} alt="leurre" />
										<p>{color.colorName}</p>
									</li>
								))}
							</ColorDeclination>
							{isStepComplete[3] && (
								<Form
									onSubmit={stockManagementFunc}
									method="POST"
								>
									<LabelImageContainer>
										<img
											src={selectedColor.image}
											alt="leurre"
										/>
									</LabelImageContainer>
									<label>
										Color Name:
										<input
											required="required"
											type="text"
											value={selectedColor.colorName}
											onChange={(e) =>
												setSelectedColor(
													(prevColor) => ({
														...prevColor,
														colorName:
															e.target.value,
													}),
												)
											}
										/>
									</label>
									<label>
										Color image:
										<input
											required="required"
											type="text"
											value={selectedColor.image}
											onChange={(e) =>
												setSelectedColor(
													(prevColor) => ({
														...prevColor,
														image: e.target.value,
													}),
												)
											}
										/>
									</label>
									<label>
										New price:
										<input
											required="required"
											type="number"
											value={selectedColor.price}
											onChange={(e) => {
												setSelectedColor(
													(prevColor) => ({
														...prevColor,
														price: e.target.value,
													}),
												);
											}}
										/>
									</label>
									<label>
										New stock:
										<input
											required="required"
											type="number"
											value={selectedColor.inStock}
											onChange={(e) => {
												setSelectedColor(
													(prevColor) => ({
														...prevColor,
														inStock: e.target.value,
													}),
												);
											}}
										/>
									</label>
									<button type="submit">Ajouter</button>
									<p>{servRes}</p>
								</Form>
							)}
						</>
					)}
				</article>
			) : (
				<>
					{isStepComplete[2] && (
						<Form onSubmit={stockManagementFunc} method="POST">
							<label>
								Name:
								<input
									required="required"
									type="text"
									value={selectedLure.name}
									onChange={(e) =>
										setSelectedLure((prevColor) => ({
											...prevColor,
											name: e.target.value,
										}))
									}
								/>
							</label>
							<label>
								Marque:
								<input
									required="required"
									type="text"
									value={selectedLure.marque}
									onChange={(e) =>
										setSelectedLure((prevColor) => ({
											...prevColor,
											marque: e.target.value,
										}))
									}
								/>
							</label>
							<label>
								Description:
								<input
									required="required"
									type="text"
									value={selectedLure.description}
									onChange={(e) => {
										setSelectedLure((prevColor) => ({
											...prevColor,
											description: e.target.value,
										}));
									}}
								/>
							</label>
							<label>
								Catégorie:
								<input
									required="required"
									type="text"
									value={selectedLure.category}
									onChange={(e) => {
										setSelectedLure((prevColor) => ({
											...prevColor,
											category: e.target.value,
										}));
									}}
								/>
							</label>

							<label>
								Size:
								<input
									required="required"
									type="number"
									value={selectedLure.size}
									onChange={(e) => {
										setSelectedLure((prevColor) => ({
											...prevColor,
											size: e.target.value,
										}));
									}}
								/>
							</label>

							<label>
								Famille:
								<input
									required="required"
									type="text"
									value={selectedLure.famille}
									onChange={(e) => {
										setSelectedLure((prevColor) => ({
											...prevColor,
											famille: e.target.value,
										}));
									}}
								/>
							</label>

							{selectedLure.weight && (
								<label>
									Poids:
									<input
										required="required"
										type="text"
										value={selectedLure.weight}
										onChange={(e) => {
											setSelectedLure((prevColor) => ({
												...prevColor,
												weight: e.target.value,
											}));
										}}
									/>
								</label>
							)}

							{selectedLure.swimDepth && (
								<label>
									Prof. Nage:
									<input
										required="required"
										type="text"
										value={selectedLure.swimDepth}
										onChange={(e) => {
											setSelectedLure((prevColor) => ({
												...prevColor,
												swimDepth: e.target.value,
											}));
										}}
									/>
								</label>
							)}

							<button type="submit">Ajouter</button>

							<p>{servRes}</p>
						</Form>
					)}
				</>
			)}
		</section>
	);
}
