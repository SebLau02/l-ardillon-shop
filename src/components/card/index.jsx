import React, { useState, Fragment, useEffect } from "react";
import "./index.css";
import { useFetch } from "../../utils/hooks";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import colors from "../../utils/style/colors";
import Arrow from "../../utils/images/Arrow.svg";
import Close from "../../utils/images/close.svg";

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
`;
const Image = styled.img`
	border: 2px solid ${colors.grey};
	border-radius: 20px;
`;

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
	const { data, isLoading } = useFetch(
		`https://server-test-vpha.vercel.app/api/leurres/${articleId}`
	);

	const articleDatas = Object.values(data).filter((item) => item !== null)[0];
	const articlesImages = articleDatas?.colors?.map((item) => item.image);

	useEffect(() => {
		setInStock(articleDatas?.colors.inStock);
	}, [inStock, articleDatas]);

	const addToCart = (item) => {
		const article = {
			name: articleDatas.name,
			marque: articleDatas.marque,
			colorName: item.colorName,
			prix: item.price,
			quantite: articleQuantite,
			id: item._id,
			image: item.image,
		};

		if (articlesCart?.length === 0) {
			setArticlesCart([...articlesCart, article]);
		} else {
			let articleExiste = false;
			articlesCart?.forEach((el) => {
				if (Object.values(el).includes(article.id)) {
					el.quantite++;
					articleExiste = true;
				}
			});

			if (!articleExiste) {
				setArticlesCart([...articlesCart, article]);
			} else {
				setArticlesCart([...articlesCart]);
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
				<p>patient !</p>
			) : (
				<article className="card-global-container">
					<div className="product-card">
						<div className="illustration-caracteristique-container">
							<div className="name-brand-container">
								<h1>{articleDatas?.name}</h1>
								<h1>{articleDatas?.marque}</h1>
							</div>

							<div className="product-image-caroussel">
								<img
									src={Arrow}
									alt="image précédente"
									className="arrow-caroussel-nav arrow-left"
									onClick={carrousselNavLeft}
								/>
								<img
									src={Arrow}
									alt="image suivante"
									className="arrow-caroussel-nav arrow-right"
									onClick={carrousselNavRight}
								/>
								<Image
									src={articlesImages[articlesImagesIndex]}
									alt="image du leurre"
									className="card-product-image"
								/>
							</div>
						</div>

						<div className="name-price-container">
							{articleDatas?.size > 0 && (
								<p>Taille: {articleDatas?.size} mm</p>
							)}

							<p>Prix: {articleDatas?.colors[0].price} euro</p>
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
									alt=""
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
