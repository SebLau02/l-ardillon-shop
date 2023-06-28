import React, { useState, Fragment } from "react";
import styled from "styled-components";

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
	background: linear-gradient(137deg, #f60000 0%, #ff7171 42%, #a30000 100%);
	font-weight: 900;
	border-radius: 50%;
	border: none;
	height: 5vmax;
	width: 5vmax;
	margin: auto;
	cursor: pointer;
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

export default function ModifyReference({
	leurres,
	token,
	serverRes,
	setServerRes,
	isLoading,
	setIsLoading,
}) {
	const [searchValue, setSearchValue] = useState("");
	const [filteredLure, setFilteredLure] = useState([]);
	const [filteredLureId, setFilteredLureId] = useState();
	const [refNameClicked, setRefNameClicked] = useState(false);
	const [ids, setIds] = useState({});
	const [colorId, setColorId] = useState();

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
				})
			);

			lureName.toLowerCase().match(searchValue) &&
				setFilteredLure({ name: lureName, id: lureId, colorsDatas });
		});
	};

	const deleteRefDeclinFunc = (e) => {
		e.preventDefault();

		fetch(
			`https://server-test-vpha.vercel.app/api/leurres/delete/delete-ref-declination`,
			{
				method: "delete",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(ids),
			}
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
			<h3>Etape 2: Trouver la référence à modifier </h3>
			<SearchInput type="search" onChange={handleSeachFunc} />
			<Result>
				<Li
					onClick={() => {
						setFilteredLureId(filteredLure.lureId);
						setRefNameClicked(true);
						setIds({ ...ids, lureId: filteredLure.id });
					}}
				>
					{filteredLure.name}
				</Li>
			</Result>

			{refNameClicked === true && (
				<div>
					<h3>Etape 3: Choisir le modèle à modifier</h3>
					<Result>
						{filteredLure?.colorsDatas?.map((item) => (
							<Li
								onClick={() => {
									setColorId({
										name: item.colorName,
										id: item.colorId,
									});
									setIds({
										...ids,
										colorId: item.colorId,
									});
								}}
							>
								{item.colorName}
							</Li>
						))}
					</Result>
				</div>
			)}

			<form onSubmit={deleteRefDeclinFunc}>
				<p>
					Modèle: <Recap>{filteredLure.name}</Recap>
				</p>
				<p>
					Référence à supprimer:
					<Recap>{colorId?.name}</Recap>
				</p>
				<SubmitButton type="submit">Supp</SubmitButton>
			</form>
			<p>{serverRes}</p>
		</section>
	);
}
