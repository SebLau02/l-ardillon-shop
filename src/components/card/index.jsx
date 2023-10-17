import React, { useState, Fragment, useEffect } from "react";
import "./index.css";
import { useFetch } from "../../utils/hooks";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import colors from "../../utils/style/colors";
import Arrow from "../../utils/images/Arrow.svg";
import Close from "../../utils/images/close.svg";
import Loader from "../loader";
import Error from "../error";
import apiUrl from "../../utils/api";

//-----------------------------------------------------------------------------------------------

const Ajouter = styled.button`
	background: linear-gradient(
		117deg,
		${colors.kaki} 0%,
		${colors.marron} 28%,
		${colors.marronDark} 100%
	);
`;

const Description = styled.div`
	border: 2px solid ${colors.grey};
	border-radius: 20px;

	p {
		margin-top: 1vmax;
		line-height: 1.5;
	}
`;
const Image = styled.img``;

const ColorImageGreatSize = styled.img`
	width: 40vmax;
	border: 1px solid black;
	border-radius: 20px;
`;

//-----------------------------------------------------------------------------------------------

export default function Card({
	articleQuantite,
	setArticleQuantite,
	setArticlesCart,
	articlesCart,
	setTotalCart,
	totalCart,
}) {
	const [articlesImagesIndex, setArticlesImagesIndex] = useState(0);
	const [descriptionActive, setDescriptionActive] = useState(false);
	const [inStock, setInStock] = useState();
	const [imageHandleClick, setImageHandleClick] = useState(false);
	const [elargedImage, setElargedImage] = useState();

	const articleId = Object.values(useParams());

	const { data, isLoading, error } = useFetch(
		apiUrl + `/api/leurres/${articleId}`,
	);

	const articleDatas = Object.values(data).filter((item) => item !== null)[0];
	const articlesImages = articleDatas?.colors?.map((item) => ({
		image: item.image,
		colorName: item.colorName,
	}));

	console.log(articleDatas?.swimDepth);

	useEffect(() => {
		setInStock(articleDatas?.colors.inStock);
	}, [inStock, articleDatas]);

	const addToCart = (item) => {
		//********** je créer un objet qui contient les données de mon article **********

		const article = {
			name: articleDatas.name,
			marque: articleDatas.marque,
			colorName: item.colorName,
			prix: item.price,
			quantite: articleQuantite,
			id: item._id,
			image: item.image,
		};

		//********** si mon panier est vide j'ajoute l'article **********

		if (articlesCart?.length === 0) {
			setArticlesCart([...articlesCart, article]);
		} else {
			//********** si le produit est déjà dans mon panier alors j'incrémente sa quantité de 1 **********

			//********** sinon je l'ajoute dans mon panier **********

			let isArticleExist = false;

			articlesCart?.forEach((el) => {
				if (Object.values(el).includes(article.id)) {
					el.quantite++;
					isArticleExist = true;
				}
			});

			if (!isArticleExist) {
				setArticlesCart([...articlesCart, article]);
			}
		}

		//********** nombre total d'article dans le panier, nombre utlisé pour la barre de recherche **********

		setTotalCart(totalCart + Number.parseInt(articleQuantite));

		//********** on met le contenu du panier dans le localstorage pour pouvoir le récuperer au premier chargement du site **********

		localStorage.setItem("localCart", JSON.stringify(articlesCart));
	};

	//********** fonction pour naviguer dans le caroussel et faire défiler les images **********

	const carrousselNavLeft = () => {
		articlesImagesIndex === 0
			? setArticlesImagesIndex(articlesImages.length - 1)
			: setArticlesImagesIndex(articlesImagesIndex - 1);
	};

	const carrousselNavRight = () => {
		articlesImagesIndex < articlesImages.length - 1
			? setArticlesImagesIndex(articlesImagesIndex + 1)
			: setArticlesImagesIndex(0);
	};
	const descriptionActiveHandleClick = () => {
		setDescriptionActive(!descriptionActive);
	};

	const imageHandleClickFunc = (item) => {
		setImageHandleClick(true);
		setElargedImage(item.image);
	};
	//-----------------------------------------------------------------------------------------------

	return (
		<>
			{isLoading ? (
				<Loader />
			) : error ? (
				<Error />
			) : (
				<article className="card-global-container">
					<div className="product-card">
						<div className="illustration-caracteristique-container">
							<div className="name-brand-container">
								<h1>{articleDatas?.name}</h1>
								<h1>{articleDatas?.marque}</h1>
							</div>

							<div className="product-image-caroussel">
								<button
									onClick={carrousselNavLeft}
									className="arrow-caroussel-nav arrow-left"
								>
									<img src={Arrow} alt="image précédente" />
								</button>
								<button
									onClick={carrousselNavRight}
									className="arrow-caroussel-nav arrow-right"
								>
									<img src={Arrow} alt="image suivante" />
								</button>
								<Image
									src={
										articlesImages[articlesImagesIndex]
											.image
									}
									alt={
										articlesImages[articlesImagesIndex]
											.colorName
									}
									className="card-product-image"
								/>
							</div>
						</div>

						<div className="card-product-description">
							<Description className="descriptions">
								<button
									onClick={descriptionActiveHandleClick}
									className="product-description-title"
								>
									Description:
								</button>
								{descriptionActive === true && (
									<p>{articleDatas?.description}</p>
								)}
							</Description>
						</div>
					</div>

					<div className="product-colors-container">
						{articleDatas?.colors.map((item) => (
							<div
								className="color-price-container"
								key={item._id}
							>
								<img
									src={item.image}
									alt="coloris du leurre"
									className="color-image"
									key={"image" + item.id}
									onClick={() => {
										imageHandleClickFunc(item);
									}}
								/>

								{imageHandleClick === true && (
									<div className="elarged-image-container">
										<img
											src={Close}
											alt="femer image"
											className="close-elarged-image"
											onClick={() =>
												setImageHandleClick(false)
											}
										/>
										<ColorImageGreatSize
											src={elargedImage}
											key={"elargedImage" + item.id}
											alt="image du leurre aggrandi"
										/>
									</div>
								)}

								<div className="price-colorName-container">
									<p>{item.colorName}</p>
									<p>
										{articleDatas.weight &&
											articleDatas.weight + "g"}
									</p>
									<p>
										{articleDatas?.swimDepth &&
											"Prof. nage " +
												articleDatas?.swimDepth +
												"cm"}
									</p>
									<p>
										{item.inStock > 0
											? "En stock"
											: "Victime de son succès"}
									</p>
									<p>{item.price} euro</p>

									<Ajouter
										onClick={() => addToCart(item)}
										className="add-to-cart-btn"
									>
										Ajouter 1
									</Ajouter>
								</div>
							</div>
						))}
					</div>
				</article>
			)}
		</>
	);
}
