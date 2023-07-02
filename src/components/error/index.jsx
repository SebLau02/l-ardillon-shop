import React from "react";
import styled from "styled-components";
import Rod from "../../utils/images/rod.svg";

//-----------------------------------------------------------------------------------------------

const ErrorContainer = styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
	height: 100vh;

	h1 {
		font-size: clamp(3rem, 3vw, 5rem);
	}
	img {
		width: 40vmax;
	}
`;

//-----------------------------------------------------------------------------------------------

export default function Error() {
	return (
		<ErrorContainer>
			<h1>ERREUR</h1>
			<img src={Rod} alt="image canne à pêche avec une ligne cassé " />
			<p>Oups ! Il semble que la ligne a cédé...</p>
		</ErrorContainer>
	);
}
