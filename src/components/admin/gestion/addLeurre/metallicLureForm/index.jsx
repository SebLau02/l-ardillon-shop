import React from "react";

export default function MetallicLureForm({
	name,
	description,
	marque,
	size,
	weight,
	setName,
	setDescription,
	setMarque,
	setCategory,
	setSize,
	setWeight,
	handleSubmit,
	typeLure,
	famille,
	setFamille,
}) {
	return (
		<form onSubmit={handleSubmit} method="POST">
			<label>
				Name:
				<input
					required="required"
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</label>
			<label>
				Description:
				<textarea
					id="description"
					className="description"
					required={true}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</label>
			<label>
				Marque:
				<input
					required="required"
					type="text"
					value={marque}
					onChange={(e) => setMarque(e.target.value)}
				/>
			</label>
			<label>
				Categorie:
				<input
					required="required"
					type="text"
					value={typeLure}
					onChange={(e) => setCategory(e.target.value)}
				/>
			</label>
			<label>
				Size:
				<input
					required="required"
					type="text"
					value={size}
					onChange={(e) => setSize(e.target.value)}
				/>
			</label>
			<label>
				Weight:
				<input
					required="required"
					type="text"
					value={weight}
					onChange={(e) => setWeight(e.target.value)}
				/>
			</label>
			<label>
				Famille:
				<input
					required="required"
					type="text"
					value={famille}
					onChange={(e) => setFamille(e.target.value)}
				/>
			</label>
			<button type="submit">Ajouter</button>
		</form>
	);
}
