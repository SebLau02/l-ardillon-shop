import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import colors from "../../utils/style/colors";
import Loader from "../loader";
import Error from "../error";

//-----------------------------------------------------------------------------------------------

const GlobalContainer = styled.article`
	position: relative;
	h1 {
		font-size: clamp(2rem, 2vw, 2.4rem);
	}
	h1,
	h3 {
		background: ${colors.marron};
		border-radius: 1vmax;
		margin: 1vmax;
		padding: 1vmax;
		text-align: center;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	}
	h3 {
		margin: 2vmax auto;
		width: fit-content;
	}
`;

const SuggestElement = styled.ul`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 20vmax;
	height: 25vmax;

	& :nth-child(2) {
		border-top: 1px solid black;
	}

	img {
		width: 90%;
		height: 90%;
		object-fit: contain;
	}
`;
const SuggestContainer = styled.section`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	border: 1px solid black;
	border-radius: 2vmax;
	padding: 1vmax;
	margin: auto;
	box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	width: 90%;

	div {
		display: flex;
		align-items: center;
	}
	div p {
		font-size: clamp(2rem, 5vw, 5rem);
		font-weight: 900;
	}
`;

const AddPack = styled.button`
	width: 10vmax;
	height: 8vmax;
	background: linear-gradient(
		117deg,
		${colors.kaki} 0%,
		${colors.marron} 28%,
		${colors.marronDark} 100%
	);
`;

const AddSucced = styled.h2`
	margin-left: 2vw;
	color: green;
	font-size: clamp(2rem, 3vw, 3rem);
`;

export default function Accueil({
	leurres,
	isLoading,
	error,
	setArticlesCart,
	articlesCart,
	setTotalCart,
	totalCart,
}) {
	const [isAdd, setIsAdd] = useState(false);
	const suggest = leurres.filter(
		(item) =>
			item._id.match("6496ab9f25ae044abe2156ec") ||
			item._id.match("6496ac8425ae044abe21571a") ||
			item._id.match("6491fa2e4924ee9e546f203c") ||
			item._id.match("64903173d2bf995d3f80416c"),
	);

	const suggestImages = [
		suggest[0]?.colors[0].image,
		suggest[1]?.colors[1].image,
		suggest[2]?.colors[0].image,
		suggest[3]?.colors[2].image,
	];

	const addPackToCard = () => {
		const pack = [
			{
				name: suggest[0]?.name,
				marque: suggest[0]?.marque,
				colorName: suggest[0]?.colors[0].colorName,
				prix: suggest[0]?.colors[0].price,
				quantite: 1,
				id: suggest[0]?._id,
				image: suggest[0]?.colors[0].image,
			},
			{
				name: suggest[1]?.name,
				marque: suggest[1]?.marque,
				colorName: suggest[1]?.colors[1].colorName,
				prix: suggest[1]?.colors[1].price,
				quantite: 1,
				id: suggest[1]?._id,
				image: suggest[1]?.colors[1].image,
			},
			{
				name: suggest[2]?.name,
				marque: suggest[2]?.marque,
				colorName: suggest[2]?.colors[0].colorName,
				prix: suggest[2]?.colors[0].price,
				quantite: 1,
				id: suggest[2]?._id,
				image: suggest[2]?.colors[0].image,
			},
			{
				name: suggest[3]?.name,
				marque: suggest[3]?.marque,
				colorName: suggest[3]?.colors[2].colorName,
				prix: suggest[3]?.colors[2].price,
				quantite: 1,
				id: suggest[3]?._id,
				image: suggest[3]?.colors[2].image,
			},
		];

		if (articlesCart?.length === 0) {
			setArticlesCart(articlesCart.concat(pack));
		} else {
			let isArticleExist = false;

			pack.forEach((packArticle) => {
				articlesCart?.forEach((cartArticle) => {
					if (Object.values(cartArticle).includes(packArticle.id)) {
						cartArticle.quantite++;
						isArticleExist = true;
					}
				});
			});

			if (!isArticleExist) {
				setArticlesCart(articlesCart.concat(pack));
			}
		}
		setIsAdd(true);
	};

	return (
		<>
			{isLoading ? (
				<Loader />
			) : error ? (
				<Error />
			) : (
				<GlobalContainer>
					<h1>
						Retrouvez notre sélection des meilleurs leurres pour le
						brochet du marché !
					</h1>
					<h3>Pour le brochet, nous vous suggérons ce pack 👇</h3>
					<SuggestContainer>
						{suggest.map((leurre, index) => (
							<div key={leurre._id}>
								<SuggestElement>
									<li>
										<img
											src={suggestImages[index]}
											alt="leurre"
										/>
									</li>
									<li>{leurre?.name}</li>

									{leurre?.size > 0 && (
										<li>{leurre?.size} mm</li>
									)}
									<li>{leurre?.marque}</li>
								</SuggestElement>
								{index !== suggest.length - 1 && <p>+</p>}
							</div>
						))}
						<AddPack
							onClick={() => addPackToCard()}
							className="add-to-cart-btn"
						>
							Ajouter le pack
						</AddPack>
						{isAdd && <AddSucced>Pack ajouté ✔</AddSucced>}
					</SuggestContainer>
				</GlobalContainer>
			)}
		</>
	);
}
