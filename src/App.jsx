import React, { useState, useEffect } from "react";

import Leurres from "./components/leurres";
import Cart from "./components/cart";
import Card from "./components/card";
import SearchBar from "./components/searchBar";
import Login from "./components/user/login";
import Signup from "./components/user/signup";
import Profile from "./components/profile";
import AddAdress from "./components/profile/addAdress";
import AddLeurre from "./components/admin/gestion/addLeurre";
import Gestion from "./components/admin/gestion";
import AddAdmin from "./components/admin/signup";

import { Routes, Route } from "react-router-dom";
import { useFetch } from "./utils/hooks";
import { UserProvider } from "./utils/context";

function App() {
  const [filteredLure, setFilteredLure] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [articleQuantite, setArticleQuantite] = useState(1);
  const [articleId, setArticleId] = useState("");
  const [articlesCart, setArticlesCart] = useState(
    localStorage.getItem("localCart")
      ? JSON.parse(localStorage.getItem("localCart"))
      : []
  );
  const [totalCart, setTotalCart] = useState(0);
  const [totalArticle, setTotalArticle] = useState();

  const { data, isLoading, error } = useFetch(
    `https://server-test-vpha.vercel.app/api/leurres`
  );

  const leurres = Object.values(data);

  return (
    <div className="App">
      <UserProvider>
        <SearchBar
          totalCart={totalCart}
          leurres={leurres}
          filteredLure={filteredLure}
          setFilteredLure={setFilteredLure}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <Routes>
          <Route
            path="/leurres"
            element={
              <Leurres
                setArticleId={setArticleId}
                articleId={articleId}
                filteredLure={filteredLure}
                leurres={leurres}
                searchValue={searchValue}
              />
            }
          />
          <Route
            path="/panier"
            element={
              <Cart
                articlesCart={articlesCart}
                setTotalCart={setTotalCart}
                setArticlesCart={setArticlesCart}
                totalCart={totalCart}
              />
            }
          />
          <Route
            path="/article/:articleId"
            element={
              <Card
                setArticleQuantite={setArticleQuantite}
                articleQuantite={articleQuantite}
                articleId={articleId}
                setArticlesCart={setArticlesCart}
                articlesCart={articlesCart}
                setTotalCart={setTotalCart}
                totalCart={totalCart}
              />
            }
          />
        </Routes>
        <Routes>
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/signup" element={<Signup />} />

          <Route path="/user/profile/:userId" element={<Profile />} />
          <Route
            path="/user/profile/:userId/add-postale-adress"
            element={<AddAdress />}
          />
        </Routes>
        <Routes>
          <Route
            path="/admin/leurres/addlure"
            element={<AddLeurre leurres={leurres} />}
          />
          <Route
            path="/admin/gestion"
            element={<Gestion leurres={leurres} />}
          />
          <Route path="/admin/signup" element={<AddAdmin />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
