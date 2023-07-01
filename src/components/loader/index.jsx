import React from "react";
import styled from "styled-components";
import Corp from "../../utils/images/corp.svg";
import Poignee from "../../utils/images/poignee.svg";

//-----------------------------------------------------------------------------------------------

const GlobalContainer = styled.section`
	display: flex;
	justify-content: center;
	align-items: start;
	padding-top: 20vh;
	height: 90vh;
	width: 100%;
	background: none;
`;

const LoaderContainer = styled.div`
	position: relative;
	width: auto;
	height: auto;

	img {
		width: 15vmax;
	}

	& :nth-child(2) {
		position: absolute;
		top: 56%;
		left: 13%;
		animation: rotate 0.8s linear infinite;
	}

	@keyframes rotate {
		to {
			transform: rotateZ(360deg);
		}
	}
`;

//-----------------------------------------------------------------------------------------------

export default function Loader() {
	return (
		<GlobalContainer>
			<LoaderContainer>
				<img src={Corp} alt="corp du moulinet loader" />
				<img src={Poignee} alt="poignee du moulinet loader" />
			</LoaderContainer>
		</GlobalContainer>
	);
}
