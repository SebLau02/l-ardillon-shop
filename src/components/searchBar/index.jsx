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
`;
const CategorySection = styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding: 0.5vw;
	background: ${colors.marron};

	select,
	button {
		border: none;
		border-radius: 1vmax;
		padding: 0.5vmax 0.8vmax;
		font-size: clamp(0.8rem, 2vw, 1.2rem);
		box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
			rgba(0, 0, 0, 0.23) 0px 6px 6px;
		margin: 0 1vmax;
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
				}),
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
				}),
			);
		} else {
			setFilteredLure(leurres);
		}
	};

	return (
		<>
			<section className="search-bar-container">
				<Link className="logo-container" to="/leurres">
					<img
						src={logoHook}
						alt="retourner au menu principale"
						className="logo-image"
					/>
				</Link>

				<SearchContainer>
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
				<button onClick={() => navigate("/leurres")}>Leurres</button>

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
