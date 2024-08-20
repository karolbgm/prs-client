import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./Header";
import NavPanel from "./NavPanel";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export default function Layout() {
  return (
    <>
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
            <Outlet />
          </section>
        </main>
      </div>
    </>
  );
}
