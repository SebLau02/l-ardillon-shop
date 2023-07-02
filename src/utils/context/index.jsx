import React, { useEffect, useState, createContext } from "react";
import { useFetch } from "../../utils/hooks";
import apiUrl from "../api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [userId, setUserId] = useState("");
	const [token, setToken] = useState("");
	const [isConnected, setIsConnected] = useState(false);

	const { data, isLoading, error } = useFetch(apiUrl + `/api/verify-token`);

	useEffect(() => {
		setToken(data.token);
		setIsConnected(data.isconnected);
		setUserId(data.id);
	}, [data]);

	return (
		<UserContext.Provider
			value={{
				token,
				setToken,
				userId,
				setUserId,
				isConnected,
				setIsConnected,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
