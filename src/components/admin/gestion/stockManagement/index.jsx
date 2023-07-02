import React, { useState, Fragment } from "react";
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
	width: 100%;
`;
const Result = styled.p`
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
export default function StockManagement({ leurres, token, Button }) {
	const [searchValue, setSearchValue] = useState("");
	const [filteredLure, setFilteredLure] = useState([]);
	const [isLureClicked, setIsLureClicked] = useState(false);
	const [isRefClicked, setIsRefClicked] = useState(false);
	const [colorName, setColorName] = useState();
	const [newPrice, setNewPrice] = useState();
	const [newStock, setNewStock] = useState();
	const [colorImage, setColorImage] = useState();
	const [servRes, setServRes] = useState();
	const [reqBody, setReqBody] = useState({
		leurreId: "",
		colorId: "",
		newPrice: null,
		newStock: null,
	});

	const handleSeachFunc = (e) => {
		setSearchValue(e.target.value.toLowerCase());

		leurres.filter((el) => {
			let lureName = el.name;

			lureName.toLowerCase().match(searchValue) && setFilteredLure(el);
		});
	};

	const stockManagementFunc = (e) => {
		e.preventDefault();

		fetch(apiUrl + `/api/leurres/stock-management`, {
			method: "put",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(reqBody),
		})
			.then((response) => response.json())
			.then((data) => {
				setServRes(data.message);
			})
			.catch((error) => console.error(error));
	};

	return (
		<section>
			<SecondState>
				<h3>Etape 2: Trouver la référence à modifier </h3>
				<SearchReferenceBar type="search" onChange={handleSeachFunc} />
				<Result
					onClick={() => {
						setReqBody({ ...reqBody, leurreId: filteredLure._id });

						setIsLureClicked(true);
					}}
				>
					{filteredLure.name}
				</Result>
			</SecondState>
			{isLureClicked && (
				<ColorDeclination>
					<h3>Etape 3: Choisir la référence à modifier </h3>
					{filteredLure.colors.map((color) => (
						<li
							key={color._id + color.colorName}
							onClick={() => {
								setIsRefClicked(true);
								setNewPrice(color.price);
								setNewStock(color.inStock);
								setColorName(color.colorName);
								setColorImage(color.image);
								setReqBody({
									...reqBody,
									colorId: color._id,
									newPrice: newPrice,
									newStock: newStock,
								});
							}}
						>
							<img src={color.image} alt="leurre" />
							<p>{color.colorName}</p>
						</li>
					))}
				</ColorDeclination>
			)}
			{isRefClicked && (
				<Form onSubmit={stockManagementFunc} method="POST">
					<LabelImageContainer>
						<img src={colorImage} alt="leurre" />
					</LabelImageContainer>
					<label>
						Color Name:
						<input
							required="required"
							type="text"
							value={colorName}
							onChange={(e) => setColorName(e.target.value)}
						/>
					</label>
					<label>
						New price:
						<input
							required="required"
							type="number"
							value={newPrice}
							onChange={(e) => {
								setNewPrice(e.target.value);
								setReqBody({
									...reqBody,
									newPrice: Number(e.target.value),
								});
							}}
						/>
					</label>
					<label>
						New stock:
						<input
							required="required"
							type="number"
							value={newStock}
							onChange={(e) => {
								setNewStock(e.target.value);
								setReqBody({
									...reqBody,
									newStock: Number(e.target.value),
								});
							}}
						/>
					</label>
					<button type="submit">Ajouter</button>
					<p>{servRes}</p>
				</Form>
			)}
		</section>
	);
}
