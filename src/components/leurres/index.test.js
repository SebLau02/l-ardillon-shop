import Leurres from "./";
import React, { createContext } from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("Leurres", () => {
	test("renders Leurres component", () => {
		const MyContext = createContext({ value: "default" });

		const setArticleId = jest.fn();
		const articleId = "1234";
		const filteredLure = [{ _id: "1", colors: [{ image: "image-url" }] }];
		const leurres = [{ _id: "1", colors: [{ image: "image-url" }] }];
		const searchValue = "";
		const isLoading = false;
		const error = false;

		render(
			<MyContext.Provider value={{ value: "test value" }}>
				<Leurres
					setArticleId={setArticleId}
					articleId={articleId}
					filteredLure={filteredLure}
					leurres={leurres}
					searchValue={searchValue}
					isLoading={isLoading}
					error={error}
				/>
			</MyContext.Provider>
		);
		const linkElement = screen.getByText(/Leurres/i);
		expect(linkElement).toBeInTheDocument();
	});
});
