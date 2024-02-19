import React, { useEffect } from "react";

export default function HardLureForm({
	handleSubmit,
	typeLure,
	newLure,
	setNewLure,
}) {
	useEffect(() => {
		return () => {
			console.log(newLure);
		};
	}, [newLure]);
	return (
		<form onSubmit={handleSubmit} method="POST">
			<label>
				Name:
				<input
					required="required"
					type="text"
					value={newLure.name}
					onChange={(e) =>
						setNewLure((prevValues) => ({
							...prevValues,
							name: e.target.value,
						}))
					}
				/>
			</label>
			<label>
				Description:
				<textarea
					id="description"
					className="description"
					required={true}
					value={newLure.description}
					onChange={(e) =>
						setNewLure((prevValues) => ({
							...prevValues,
							description: e.target.value,
						}))
					}
				/>
			</label>
			<label>
				Marque:
				<input
					required="required"
					type="text"
					value={newLure.marque}
					onChange={(e) =>
						setNewLure((prevValues) => ({
							...prevValues,
							marque: e.target.value,
						}))
					}
				/>
			</label>
			<label>
				Categorie:
				<input required="required" type="text" value={typeLure} />
			</label>

			<label>
				Size (mm):
				<input
					required="required"
					type="text"
					value={newLure.size}
					onChange={(e) =>
						setNewLure((prevValues) => ({
							...prevValues,
							size: e.target.value,
						}))
					}
				/>
			</label>
			<label>
				Weight (g):
				<input
					required="required"
					type="text"
					value={newLure.weight}
					onChange={(e) =>
						setNewLure((prevValues) => ({
							...prevValues,
							weight: e.target.value,
						}))
					}
				/>
			</label>
			<label>
				SwimDepth (cm):
				<input
					required="required"
					type="text"
					value={newLure.swimDepth}
					onChange={(e) =>
						setNewLure((prevValues) => ({
							...prevValues,
							swimDepth: e.target.value,
						}))
					}
				/>
			</label>
			<label>
				Mots clé:
				<input
					required="required"
					type="text"
					value={newLure.famille}
					onChange={(e) =>
						setNewLure((prevValues) => ({
							...prevValues,
							famille: e.target.value,
						}))
					}
				/>
			</label>

			<button type="submit">Ajouter</button>
		</form>
	);
}
