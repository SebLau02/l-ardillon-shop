import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

//-----------------------------------------------------------------------------------------------

const SuggestElement = styled.ul`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 20vmax;
	height: 25vmax;
	border: 1px solid black;

	& :nth-child(2) {
		border-top: 1px solid black;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
`;
const SuggestContainer = styled.section`
	display: flex;
`;

export default function Accueil({ leurres }) {
	const suggest = leurres.filter(
		(item) =>
			item._id.match("6496ab9f25ae044abe2156ec") ||
			item._id.match("6496ac8425ae044abe21571a") ||
			item._id.match("6491fa2e4924ee9e546f203c") ||
			item._id.match("64903173d2bf995d3f80416c")
	);
	return (
		<section>
			<h1>Nos suggestions pour le brochet</h1>

			<SuggestContainer>
				<SuggestElement>
					<li>
						<img
							src={suggest[0]?.colors[0].image}
							alt="couleur fire tiger"
						/>
					</li>
					<li>{suggest[0]?.name}</li>
					<li>{suggest[0]?.size} mm</li>
					<li>{suggest[0]?.marque}</li>
				</SuggestElement>

				<SuggestElement>
					<li>
						<img
							src={suggest[1]?.colors[1].image}
							alt="couleur fire tiger"
						/>
					</li>
					<li>{suggest[1]?.name}</li>
					<li>{suggest[1]?.size} mm</li>
					<li>{suggest[1]?.marque}</li>
				</SuggestElement>

				<SuggestElement>
					<li>
						<img
							src={suggest[2]?.colors[0].image}
							alt="couleur fire tiger"
						/>
					</li>
					<li>{suggest[2]?.name}</li>
					<li>{suggest[2]?.size} mm</li>
					<li>{suggest[2]?.marque}</li>
				</SuggestElement>

				<SuggestElement>
					<li>
						<img
							src={suggest[3]?.colors[2].image}
							alt="couleur fire tiger"
						/>
					</li>
					<li>{suggest[3]?.name}</li>
					<li>{suggest[3]?.marque}</li>
				</SuggestElement>
			</SuggestContainer>
		</section>
	);
}
