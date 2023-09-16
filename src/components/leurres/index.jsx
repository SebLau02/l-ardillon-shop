import React, { Fragment } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
import colors from "../../utils/style/colors.jsx";
import Loader from "../loader";
import Error from "../error";

const StyledLink = styled(Link)`
	display: grid;
	grid-template-rows: 2fr 1fr;
	grid-gap: 1vmin;
	height: 20vmax;
	width: 15vmax;
	text-decoration: none;
	color: black;
	border: 1px solid ${colors.marron};
	border-radius: 20px;
	padding: 2vmin;
	background: ${colors.grey};
	margin: 1vmin;
	font-size: clamp(0.8rem, 1vw, 1.2rem);
`;

const NameBrandsize = styled.div`
	background: ${colors.grey};
`;

export default function Leurres({
	setArticleId,
	articleId,
	filteredLure,
	leurres,
	searchValue,
	isLoading,
	error,
}) {
	return (
		<>
			{isLoading ? (
				<Loader />
			) : error ? (
				<Error />
			) : (
				<article className="products-container">
					{searchValue?.length > 0 || filteredLure.length > 0
						? filteredLure?.map(
								(item) =>
									item.colors.length > 0 && (
										<StyledLink
											to={`/article/${item._id}`}
											key={item._id}
										>
											<div className="img-container">
												<img
													src={item.colors[0].image}
													alt="illustration leurre"
													className="product-image"
												/>
											</div>

											<NameBrandsize>
												<h3>{item.name}</h3>
												<h3>{item.marque}</h3>
												{item.size > 0 && (
													<h3>{item.size} mm</h3>
												)}
											</NameBrandsize>
										</StyledLink>
									),
						  )
						: leurres?.map(
								(item) =>
									item.colors.length > 0 && (
										<StyledLink
											to={`/article/${item._id}`}
											key={item._id}
										>
											<div className="img-container">
												<img
													src={item.colors[0].image}
													alt="illustration leurre"
													className="product-image"
												/>
											</div>

											<NameBrandsize>
												<h3>{item.name}</h3>
												<h3>{item.marque}</h3>
												{item.size > 0 && (
													<h3>{item.size} mm</h3>
												)}
											</NameBrandsize>
										</StyledLink>
									),
						  )}
				</article>
			)}
		</>
	);
}
