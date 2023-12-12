import React, { useState, Fragment } from "react";
import styled from "styled-components";
import apiUrl from "../../../../utils/api";

//-----------------------------------------------------------------------------------------------

const SearchInput = styled.input`
	border-radius: 3vmin;
	padding: 1vmin;
	width: 100%;
`;

const Result = styled.ul`
	margin: 2vmin 0;
`;

const Recap = styled.span`
	color: red;
	font-weight: 900;
`;

const SubmitButton = styled.button`
	font-size: clamp(0.8rem, 2vw, 1.4rem);
	font-weight: 900;

	border-radius: 50%;
	border: none;

	height: 5vmax;
	width: 5vmax;

	margin: auto;

	cursor: pointer;

	background: linear-gradient(137deg, #f60000 0%, #ff7171 42%, #a30000 100%);
	box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
		rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
		rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;

	&:active {
		transform: translateY(2px);
		box-shadow: none;
		background: linear-gradient(
			120deg,
			#f60000 0%,
			#ff7171 42%,
			#a30000 100%
		);
	}
`;
const Li = styled.li`
	cursor: pointer;
`;

//-----------------------------------------------------------------------------------------------

//********** permet de supprimer une déclinaison référence **********

export default function DeleteReference({
	leurres,
	token,
	serverRes,
	setServerRes,
	isLoading,
	setIsLoading,
}) {
	const [searchValue, setSearchValue] = useState("");
	const [filteredLure, setFilteredLure] = useState([]);
	const [referenceName, setReferenceName] = useState({});

	const handleSeachFunc = (e) => {
		setSearchValue(e.target.value.toLowerCase());

		leurres.filter((el) => {
			let lureName = el.name;
			let lureId = el._id;
			let colorsDatas = [];

			el.colors.forEach((color) =>
				colorsDatas.push({
					colorName: color.colorName,
					colorId: color._id,
				}),
			);

			lureName.toLowerCase().match(searchValue) &&
				setFilteredLure({ name: lureName, id: lureId, colorsDatas });
		});
	};

	const deleteRefDeclinFunc = (e) => {
		e.preventDefault();

		fetch(
			apiUrl + `/api/leurres/delete/${referenceName.id}`,

			{
				method: "delete",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			},
		)
			.then((response) => response.json())
			.then((data) => {
				setServerRes(data.message);
				setIsLoading(false);
			})
			.catch((error) => console.error(error));
	};
	return (
		<section>
			<h3>Etape 2: Trouver la référence à supprimer </h3>
			<SearchInput type="search" onChange={handleSeachFunc} />
			<Result>
				<Li
					onClick={() => {
						setReferenceName({
							name: filteredLure.name,
							id: filteredLure.id,
						});
					}}
				>
					{filteredLure.name}
				</Li>
			</Result>

			<form onSubmit={deleteRefDeclinFunc} className="delete-form">
				<p>
					Référence à supprimer: <Recap>{referenceName.name}</Recap>
				</p>

				<SubmitButton type="submit">Supp</SubmitButton>
			</form>
			<p>{serverRes}</p>
		</section>
	);
}
