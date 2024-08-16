import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./Header";
import NavPanel from "./NavPanel";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import IndexPage from "./IndexPage";
import VendorsPage from "./vendors/VendorsPage";
import RequestlinesPage from "./requestlines/RequestlinesPage";
import RequestsPage from "./requests/RequestsPage";
import ProductsPage from "./products/ProductsPage";
import VendorCreatePage from "./vendors/VendorCreatePage";
import VendorEditPage from "./vendors/VendorEditPage";
import { Toaster } from "react-hot-toast";
import UsersPage from "./users/UsersPage";
import UserEditPage from "./users/UserEditPage";
import UserCreatePage from "./users/UserCreatePage";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <main className="d-flex">
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
          <NavPanel />
          <section className="content container-fluid mx-5 my-2 py-4">
            <Routes>
              <Route path="/" element={<IndexPage />} />
              <Route path="/vendors" element={<VendorsPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/requests" element={<RequestsPage />} />
              <Route path="/requestlines" element={<RequestlinesPage />} />
              <Route path="/vendors/create" element={<VendorCreatePage />} />
              <Route path="/vendors/edit/:id" element={<VendorEditPage />} />
              <Route path="/users/create" element={<UserCreatePage />} />
              <Route path="/users/edit/:id" element={<UserEditPage />} />
              {/* <Route path="/requests/detail/:requestId/*" element={} /> */}
            </Routes>
          </section>
        </main>
      </div>
    </Router>
  );
}

export default App;
