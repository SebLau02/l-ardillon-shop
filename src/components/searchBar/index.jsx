import React, { useState, useContext, Fragment } from "react";
import logoHook from "../../utils/images/logo-hook.png";
import profileLogo from "../../utils/images/profile-logo.svg";
import cartLogo from "../../utils/images/cart.svg";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import styled from "styled-components";
import colors from "../../utils/style/colors";

import { UserContext } from "../../utils/context";

//-----------------------------------------------------------------------------------------------

const SearchContainer = styled.div`
	display: flex;
	align-items: center;

	margin-top: 1vmax;
	}
`;
const CategorySection = styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 5vh;
	background: ${colors.marron};

	select {
		border: none;
		border-radius: 0.8vmax;
		padding: 0.3vmax;
		font-size: clamp(0.8rem, 2vw, 1.2rem);
	}
`;

//-----------------------------------------------------------------------------------------------

export default function SearchBar({
	totalCart,
	leurres,
	filteredLure,
	setFilteredLure,
	setSearchValue,
}) {
	const [typeLure, setTypeLure] = useState("tout");

	const navigate = useNavigate();
	const { userId, token } = useContext(UserContext);
	const profileUri = token ? `/user/profile/${userId}` : "/user/login";

	const handleSearchLeurre = (e) => {
		if (e.key === "Enter") {
			const value = e.target.value.toLowerCase();

			setSearchValue(value);

			setFilteredLure(
				leurres.filter((el) => {
					return (
						el.marque.toLowerCase().includes(value) ||
						el.name.toLowerCase().includes(value) ||
						el.famille.toLowerCase().includes(value) ||
						el.description.toLowerCase().includes(value)
					);
				})
			);
		}
	};

	const handleChangeCategory = (e) => {
		setTypeLure(e.target.value);
		if (e.target.value !== "tout") {
			setFilteredLure(
				leurres.filter((el) => {
					return el.category
						.toLowerCase()
						.includes(e.target.value.toLowerCase());
				})
			);
		} else {
			setFilteredLure(leurres);
		}
		navigate("/leurres");
	};

	return (
		<>
			<section className="search-bar-container">
				<div
					className="logo-container"
					onClick={() => navigate("/leurres")}
				>
					<img
						src={logoHook}
						alt="retourner au meni principale"
						className="logo-image"
					/>
				</div>

				<SearchContainer className="search-input-container">
					<input
						type="search"
						className="search-input"
						onKeyDown={handleSearchLeurre}
					/>
				</SearchContainer>

				<div className="profile-cart-input-container">
					<Link to="/panier" className="img-link">
						<img
							src={cartLogo}
							alt="naviguer vers le panier"
							className="cart-logo"
						/>
						<p className="total-cart"> {totalCart}</p>
					</Link>

					<Link to={profileUri} className="img-link">
						<img
							src={profileLogo}
							alt="naviger vers mon profile"
							className="profile-logo"
						/>
					</Link>
				</div>
			</section>
			<CategorySection>
				<select value={typeLure} onChange={handleChangeCategory}>
					<option value="tout">Tout</option>
					<option value="leurre-dur">Leurre dur</option>
					<option value="leurre-souple">Leurre souple</option>
					<option value="leurre-metallique">Leurre métallique</option>
				</select>
			</CategorySection>
		</>
	);
}
