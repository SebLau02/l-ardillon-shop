import React, { useContext, useState, Fragment } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import "./index.css";

import { useFetch } from "../../utils/hooks";
import profileLogo from "../../utils/images/profile-logo.svg";
import { UserContext } from "../../utils/context";
import colors from "../../utils/style/colors";
import Burger from "../../utils/images/burger.svg";
import Loader from "../loader";
import Error from "../error";
import apiUrl from "../../utils/api";

//-----------------------------------------------------------------------------------------------
const Article = styled.article`
	padding: 5vmin;
	position: relative;
	height: 83vh;
`;

const ProfileContainer = styled.div`
	width: 25vmax;
	text-align: center;
`;
const ProfileTitle = styled.h1`
	width: 60%;
	height: 3vmax;
	border-radius: 1vmax;
	background: ${colors.marron};
	box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
		rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
		rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
`;
const ProfileCard = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	background: linear-gradient(
		117deg,
		${colors.kaki} 0%,
		${colors.marron} 28%,
		${colors.marronDark} 100%
	);
	box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
		rgba(0, 0, 0, 0.23) 0px 6px 6px;
	border: 1px solid black;
	border-radius: 20px;
	width: 100%;
	padding: 2vmin;
	margin: 1vmin 0;
`;

const ProfileLogo = styled.img`
	width: 10vmax;
`;
const Nom = styled.span`
	font-weight: 900;
`;
const AdresseContainer = styled.div`
	margin: 1vw 0;
	width: 25vmax;
`;
const Buttons = styled.button`
	width: 100%;
	height: 3vmax;
	background: ${colors.marron};
	border-radius: 1vmax;
	border: none;
	margin: 1vmin 0;
	cursor: pointer;
	box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
		rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
		rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

	&:active {
		transform: translateY(1px);
		box-shadow: none;
	}
`;
const Adresses = styled.div`
	background: ${colors.kaki};
	border: 1px solid black;
	border-radius: 20px;
	width: 100%;
	padding: 2vmin;
	margin: 1vmin 0;
	line-height: 1.5;
	box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
		rgba(0, 0, 0, 0.23) 0px 6px 6px;

	div span {
		font-weight: 900;
		color: #005596;
	}
`;
const CommandesContainer = styled.div`
	width: 25vmax;
	p {
		background: ${colors.kaki};
		border: 1px solid black;
		border-radius: 20px;
		width: 100%;
		padding: 2vmin;
		margin: 1vmin 0;
		line-height: 1.5;
		box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
			rgba(0, 0, 0, 0.23) 0px 6px 6px;
	}
`;
const BurgerMenu = styled.button`
	width: 3vmax;
	height: 3vmax;
	position: absolute;
	top: 3vmin;
	right: 3vmin;
	z-index: 5;
	background: none;
	border: none;
	cursor: pointer;

	img {
		width: 100%;
	}
`;

const MenuSection = styled.section`
	position: absolute;
	top: 0;
	right: 0;
	z-index: 4;
	height: 100%;
	width: 20vmax;
	background: linear-gradient(
		180deg,
		${colors.marronDark},
		${colors.marron} 16%
	);
	border-top-left-radius: 20px;
	border-bottom-left-radius: 20px;
	padding: 10vmin 5vmin;

	* {
		margin: 1vmin 0;
		cursor: pointer;
	}
	p {
		position: relative;
		display: inline-block;
		width: auto;
	}
	p:active::after,
	button:active::after {
		opacity: 0;
	}

	button::after,
	p::after {
		content: "";
		display: block;
		position: absolute;
		width: 100%;
		height: 2px;
		background: ${colors.dark};
		transform: scale(0);
		transition: transform 0.2s ease-in-out, opacity 0.3s ease;
	}

	button:hover::after,
	p:hover::after {
		transform: scale(0.8);
	}
`;
const Deconexion = styled.button`
	position: relative;
	border: none;
	background: none;
`;
const LinkToGestion = styled.div`
	margin-left: 3vmin;
`;

//-----------------------------------------------------------------------------------------------

export default function Profile() {
	const [isActiveMenu, setIsActiveMenu] = useState(false);
	const [gestionHandleClick, setGestionHandleClick] = useState(false);
	const [isAdresseVisible, setIsAdresseVisible] = useState(false);
	const [isCommandesVisible, setIsCommandesVisible] = useState(false);

	const userId = useParams();
	const { setToken, token, setIsConnected, setUserId } =
		useContext(UserContext);
	const navigate = useNavigate();

	//********** recuperation des donnés de l'utilisateur **********

	const { data, isLoading, error } = useFetch(
		apiUrl + `/api/profile/${userId.userId}`,
	);

	const datas = Object.values(data);
	const user = datas && datas.filter((item) => item !== null).shift();
	const role = user?.role;

	//-----------------------------------------------------------------------------------------------

	const deconnexion = () => {
		fetch(apiUrl + "/api/add-inactive-token", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				token: token,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				setIsConnected(false);
				setUserId("");
				setToken();
				localStorage.removeItem("token");
			})
			.catch((error) => console.error(error.message));

		setTimeout(() => navigate("/user/login"), 2000);
	};

	//-----------------------------------------------------------------------------------------------

	return (
		<>
			{isLoading ? (
				<Loader />
			) : error ? (
				<Error />
			) : (
				<Article>
					<ProfileContainer>
						<ProfileTitle>Profile</ProfileTitle>
						<ProfileCard>
							<ProfileLogo
								src={profileLogo}
								alt="photo de profile de l'utilisateur"
							/>

							<div>
								<p>
									<Nom>{user?.nom.toUpperCase()}</Nom>
									{" " + user?.prenom}
								</p>
							</div>
						</ProfileCard>
					</ProfileContainer>
					<AdresseContainer>
						<Buttons
							aria-label="afficher mes adresses"
							onClick={() =>
								setIsAdresseVisible(!isAdresseVisible)
							}
						>
							Adresses
						</Buttons>
						{isAdresseVisible === true && (
							<Adresses>
								<div>
									<h3>Adresse-mail actuel: </h3>
									<span>{user?.email}</span>
								</div>
								<div>
									<h3>Adresse de livraison:</h3>

									{user?.adresse[0] ? (
										<span>
											{user?.adresse[0].numero +
												" " +
												user?.adresse[0].nomVoie +
												", " +
												user?.adresse[0].codePostale +
												", " +
												user?.adresse[0].ville}
										</span>
									) : (
										<Link to={`add-postale-adress`}>
											Ajouter une adresse postale
										</Link>
									)}
								</div>
							</Adresses>
						)}
					</AdresseContainer>

					<CommandesContainer>
						<Buttons
							aria-label="afficher mes commandes en cours"
							onClick={() =>
								setIsCommandesVisible(!isCommandesVisible)
							}
						>
							Suivre ma commande
						</Buttons>
						{isCommandesVisible === true && <p>Mes commandes</p>}
					</CommandesContainer>

					<button
						className="burger-menu"
						aria-label="menu"
						onClick={() => {
							setIsActiveMenu(!isActiveMenu);
						}}
					>
						<div className="ligne-container">
							<span
								className={
									isActiveMenu ? "ligne rotate-left" : "ligne"
								}
							></span>
							<span
								className={
									isActiveMenu ? "ligne rotate" : "ligne"
								}
							></span>
							<span
								className={
									isActiveMenu
										? "ligne rotate-right"
										: "ligne"
								}
							></span>
						</div>
					</button>

					{isActiveMenu === true && (
						<MenuSection>
							<Deconexion onClick={deconnexion}>
								Déconnexion
							</Deconexion>
							<p>Mon historique de commande</p>
							<p>Changer mes identifiants</p>

							{role === "admin" && (
								<div>
									<p
										onClick={() =>
											setGestionHandleClick(
												!gestionHandleClick,
											)
										}
									>
										Admin
									</p>
									{gestionHandleClick === true && (
										<LinkToGestion>
											<Link
												key=""
												to="/admin/gestion"
												state={{ role }}
											>
												Gestion
											</Link>
										</LinkToGestion>
									)}
								</div>
							)}
						</MenuSection>
					)}
				</Article>
			)}
		</>
	);
}
