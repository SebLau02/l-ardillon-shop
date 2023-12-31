import React, { useState, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../../utils/context";

import AddLeurre from "./addLeurre";
import AddReferenceDeclination from "./addReferenceDeclination";
import ModifyReference from "./modifyReference";
import StockManagement from "./stockManagement";
import DeleteReference from "./deleteReference";
import EditReference from "./editReference";

import "./index.css";

//-----------------------------------------------------------------------------------------------

const GlobalContainer = styled.article`
	display: flex;
	justify-content: start;
	font-size: clamp(1.4rem, 2vw, 1.6rem);
	padding: 3vmin;
`;
const Container = styled.section`
	width: 100%;
	line-height: 2;
`;
const SelecteurFonction = styled.select`
	width: 30vmax;
	border-radius: 8px;
	padding: 0.5vmax;
	box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
		rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
		rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
`;

//-----------------------------------------------------------------------------------------------

export default function Gestion({ leurres }) {
	const [whichFunction, setWhichFunction] = useState("");
	const [serverRes, setServerRes] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const { token } = useContext(UserContext);

	return (
		<GlobalContainer>
			<Container>
				<h3>Etape 1: Que faire ?</h3>

				<SelecteurFonction
					value={whichFunction}
					onInput={(e) => setWhichFunction(e.target.value)}
				>
					<option value=""></option>
					<option value="add-reference">Ajouter une référence</option>
					<option value="add-reference-declination">
						Ajouter une déclinaison d'une référence
					</option>
					<option value="stock-management">Gérer les stocks</option>

					<option value="edit-reference">Modifier référence</option>
					<option value="delete-reference-declination">
						Supprimer une déclinaison d'une référence
					</option>
					<option value="delete-a-reference">
						Supprimer une référence
					</option>
				</SelecteurFonction>

				{whichFunction === "add-reference" ? (
					<AddLeurre
						token={token}
						serverRes={serverRes}
						setServerRes={setServerRes}
					/>
				) : whichFunction === "add-reference-declination" ? (
					<AddReferenceDeclination
						leurres={leurres}
						token={token}
						serverRes={serverRes}
						setServerRes={setServerRes}
					/>
				) : whichFunction === "stock-management" ? (
					<StockManagement leurres={leurres} token={token} />
				) : whichFunction === "edit-reference" ? (
					<EditReference
						leurres={leurres}
						token={token}
						serverRes={serverRes}
						setServerRes={setServerRes}
						isLoading={isLoading}
						setIsLoading={setIsLoading}
					/>
				) : whichFunction === "delete-reference-declination" ? (
					<ModifyReference
						leurres={leurres}
						token={token}
						serverRes={serverRes}
						setServerRes={setServerRes}
						isLoading={isLoading}
						setIsLoading={setIsLoading}
					/>
				) : (
					whichFunction === "delete-a-reference" && (
						<DeleteReference
							leurres={leurres}
							token={token}
							serverRes={serverRes}
							setServerRes={setServerRes}
							isLoading={isLoading}
							setIsLoading={setIsLoading}
						/>
					)
				)}
			</Container>
		</GlobalContainer>
	);
}
