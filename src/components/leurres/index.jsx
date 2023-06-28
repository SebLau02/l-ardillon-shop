import React from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import colors from "../../utils/style/colors.jsx";

const StyledLink = styled(Link)`
	display: grid;
	grid-template-rows: 2fr 1fr;
	grid-gap: 1vmin;
	height: 28vmax;
	width: 20vmax;
	text-decoration: none;
	color: black;
	border: 1px solid ${colors.marron};
	border-radius: 20px;
	padding: 2vmin;
	background: ${colors.grey};
	margin: 1vmin;
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
}) {
	const navigate = useNavigate();

	return (
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

									<NameBrandsize className="name-brand-size-container">
										<h3 className="product-name">
											{item.name}
										</h3>
										<h3 className="product-brand">
											{item.marque}
										</h3>
										{item.size > 0 && (
											<h3 className="product-price">
												{item.size} mm
											</h3>
										)}
									</NameBrandsize>
								</StyledLink>
							)
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

									<NameBrandsize className="name-brand-size-container">
										<h3 className="product-name">
											{item.name}
										</h3>
										<h3 className="product-brand">
											{item.marque}
										</h3>
										{item.size > 0 && (
											<h3 className="product-price">
												{item.size} mm
											</h3>
										)}
									</NameBrandsize>
								</StyledLink>
							)
				  )}
		</article>
	);
}
