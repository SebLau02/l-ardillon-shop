import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Close from "../../utils/images/close.svg";
import colors from "../../utils/style/colors";

//-----------------------------------------------------------------------------------------------

const CartContainer = styled.section`
	padding: 5vmin;
	width: 100%;
`;
const ArticleDatasGlobalContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;
const ArticleDatasContainer = styled.div`
	height: auto;
	min-height: 8vmax;
	margin-top: 3vh;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	border: 3px solid ${colors.kaki};
	border-radius: 15px;
	width: 100%;
	padding: 1vmin;
`;
const ArticlePriceQuantite = styled.div`
	margin-right: 3vmin;
	display: flex;
`;
const ArticlePrice = styled.p`
	border-left: 1px solid black;
	margin-left: 3vmin;
	align-self: center;
`;
const ArticleQuantite = styled.input`
	width: 7vmin;
	min-height: 3vmin;
	height: auto;
	border: 1px solid ${colors.kaki};
	border-radius: 5px;
	align-self: center;
	padding-left: 1vmax;
`;
const Supprimer = styled.button`
	width: 5vmin;
	border: none;
	background: none;
	margin-left: 5vmin;

	&:hover {
		cursor: pointer;
	}
`;

const IdentifiantContainer = styled.div`
	display: flex;
	height: 100%;

	& p {
		margin-left: 1vmin;
	}
`;

const RemoveProduct = styled.img`
	width: 3vmax;
`;
const ImageColor = styled.img`
	width: 5vmax;
	object-fit: contain;
`;

const TotalContainer = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-direction: column;
	width: 20vmax;
	height: 15vmax;
	background: ${colors.marron};
	border-radius: 10px;
	margin: 3vmax;
`;

const Payer = styled.button`
	width: 8vmax;
	height: 5vmax;
	border-radius: 18px;
	background: linear-gradient(
		117deg,
		${colors.kaki} 0%,
		${colors.marron} 28%,
		${colors.marronDark} 100%
	);
	box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
		rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
		rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;

	&:active {
		transform: translateY(2px);
		box-shadow: none;
	}
`;

const Total = styled.p`
	font-weight: 900;
`;

//-----------------------------------------------------------------------------------------------

export default function Cart({
	articlesCart,
	setArticlesCart,
	setTotalCart,
	totalCart,
}) {
	const [nombreTotalParArticle, setNombreTotalParArticle] = useState(1);
	const [nombreTotalArticlePanier, setNombreTotalArticlePanier] = useState(0);
	const [prixTotalPanier, setPrixTotalPanier] = useState(0);

	//********** suppprimer produit du panier **********

	const deleteArticle = (el) => {
		let articleId = el.id;

		const filteredArticlesCart = articlesCart.filter(
			(item) => item.id !== articleId
		);
		setArticlesCart(filteredArticlesCart);
	};

	//********** useEffect se lancera à chaque fois que je modifie le nombre de produit **********

	useEffect(() => {
		let quantiteForCart = 0;
		let prix = 1;
		let quantity = 1;
		let prixTotal = 0;

		articlesCart?.forEach((el) => {
			//********** calcul du nombre total d'article dans le panier **********

			quantiteForCart += el.quantite;

			//********** calcul du prix total du panier **********

			prix = el.prix;
			quantity = Number.parseInt(el.quantite);
			prixTotal += prix * quantity;
		});

		setTotalCart(quantiteForCart);
		setNombreTotalArticlePanier(nombreTotalArticlePanier + 1);
		setPrixTotalPanier(prixTotal);
		localStorage.setItem("localCart", JSON.stringify(articlesCart));
	}, [nombreTotalParArticle, articlesCart]);

	//********** modifier la quantité des article depuis le panier **********

	const changeQuantity = (e, item) => {
		let inputValue = Number.parseInt(e.target.value);
		let articleId = item.id;

		setNombreTotalParArticle(inputValue);

		articlesCart.forEach((el) => {
			Object.values(el).includes(articleId) && (el.quantite = inputValue);
		});
	};

	const payer = () => {};

	return (
		<CartContainer>
			{articlesCart?.length > 0 ? (
				<ArticleDatasGlobalContainer>
					{articlesCart?.map((item) => (
						<ArticleDatasContainer key={item.id}>
							<IdentifiantContainer>
								<ImageColor src={item.image} alt="" />
								<p>{item.marque}</p>
								<p>{item.name}</p>
								<p>{item.colorName}</p>
							</IdentifiantContainer>

							<ArticlePriceQuantite>
								<ArticleQuantite
									type="number"
									min="1"
									value={item.quantite}
									onChange={(e) => changeQuantity(e, item)}
								/>
								<ArticlePrice>{item.prix} €/pièce</ArticlePrice>
								<Supprimer
									onClick={() => {
										deleteArticle(item);
									}}
								>
									<RemoveProduct
										src={Close}
										alt="supprimer produit"
									/>
								</Supprimer>
							</ArticlePriceQuantite>
						</ArticleDatasContainer>
					))}
				</ArticleDatasGlobalContainer>
			) : (
				<h3>Votre panier est vide</h3>
			)}

			<TotalContainer>
				<Total>Total: {prixTotalPanier} €</Total>
				<Payer onClick={payer}>Payer</Payer>
			</TotalContainer>
		</CartContainer>
	);
}
