import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./Header";
import NavPanel from "./NavPanel";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndexPage from "./IndexPage";
import VendorsPage from "./vendors/VendorsPage";

import VendorCreatePage from "./vendors/VendorCreatePage";
import VendorEditPage from "./vendors/VendorEditPage";
import { Toaster } from "react-hot-toast";
import UsersPage from "./users/UsersPage";
import UserEditPage from "./users/UserEditPage";
import UserCreatePage from "./users/UserCreatePage";
import ProductsPage from "./products/ProductsPage";
import ProductCreatePage from "./products/ProductCreatePage";
import ProductEditPage from "./products/ProductEditPage";
import RequestsPage from "./requests/RequestsPage";
import RequestCreatePage from "./requests/RequestCreatePage";
import RequestEditPage from "./requests/RequestEditPage";
import RequestDetailPage from "./requests/RequestDetailPage";
import RequestlineCreatePage from "./requestlines/RequestlineCreatePage";
import RequestlineEditPage from "./requestlines/RequestlineEditPage";
import SignInPage from "./account/SignInPage";
import { useState } from "react";
import { User } from "./users/User";
import { UserContext } from "./users/UserContext";
import Layout from "./Layout";

function getPersistedUser() {
  const userAsJSON = localStorage.getItem("user");
  if (!userAsJSON) return undefined;
  const user = JSON.parse(userAsJSON);
  return user;
}

function App() {
  const [user, setUser] = useState<User | undefined>(getPersistedUser());

  return (
    <>
    <Toaster
    toastOptions={{
      success: {
        iconTheme: {
          primary: "#0d6efd",
          secondary: "white",
        },
      },
      style: {
        maxWidth: 500,
      },
    }}
  />
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route element={<Layout />}>
            <Route path="/" element={<IndexPage />} />

            <Route path="/vendors" element={<VendorsPage />} />
            <Route path="/vendors/create" element={<VendorCreatePage />} />
            <Route path="/vendors/edit/:id" element={<VendorEditPage />} />

            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/edit/:id" element={<UserEditPage />} />
            <Route path="/users/create" element={<UserCreatePage />} />

            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/edit/:id" element={<ProductEditPage />} />
            <Route path="/products/create" element={<ProductCreatePage />} />

            <Route path="/requests" element={<RequestsPage />} />
            <Route path="/requests/edit/:id" element={<RequestEditPage />} />
            <Route path="/requests/create" element={<RequestCreatePage />} />
            <Route path="/requests/detail/:requestId/*" element={<RequestDetailPage />} />

            <Route path="/requests/detail/:requestId/requestline/create" element={<RequestlineCreatePage />} />
            <Route
              path="/requests/detail/:requestId/requestline/edit/:requestlineId"
              element={<RequestlineEditPage />}
            />
          </Route>
        </Routes>
      </UserContext.Provider>
    </Router>
    </>);
}

export default App;
