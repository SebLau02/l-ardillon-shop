import { useState, useEffect } from "react";

export function useFetch(url) {
	const [data, setData] = useState({});
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const token = localStorage.getItem("token");

	useEffect(() => {
		if (!url) return;
		setLoading(true);

		async function fetchData() {
			try {
				const response = await fetch(url, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				const data = await response.json();
				setData(data);
			} catch (err) {
				console.log(err);
				setError(true);
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, [url]);

	return { isLoading, data, error };
}
