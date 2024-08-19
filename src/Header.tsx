import bootstrapIcons from "bootstrap-icons/bootstrap-icons.svg";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "./users/UserContext";

export default function Header() {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  function signout() {
    localStorage.removeItem("user");
    setUser(undefined);
    navigate("/signin");
  }

  return (
    <header>
      <div className="navbar bg-body-tertiary py-4 border-bottom">
        <div className="container-fluid">
          <Link
            to="/"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
          >
            <svg id="logo-35" width={50} height={39} viewBox="0 0 50 39" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" className="ccompli1" fill="#007AFF" />
              <path
                d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
                className="ccustom"
                fill="#312ECB"
              />
            </svg>
            <span className="small mx-2 fw-semibold">Purchase Request System</span>
          </Link>

          {user?.id ? (
            <Dropdown>
              <Dropdown.Toggle variant="" id="dropdown-basic" className="no-arrow">
                <div className="d-flex">
                  <span
                    style={{ width: "2.5rem", height: "2.5rem" }}
                    className="d-flex  bg-primary-subtle fs-5 text-secondary align-items-center justify-content-center rounded-circle me-2"
                  >
                    {user.firstname[0].toUpperCase()}
                    {user.lastname[0].toUpperCase()}
                  </span>
                  <span className="mt-2">
                    {" "}
                    {user?.firstname} {user?.lastname}
                  </span>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="">Settings</Dropdown.Item>
                <Dropdown.Item>Profile</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={signout}>Sign out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Link className="btn btn-primary me-2" to="/signin">
              <svg width={16} height={16} fill="currentColor" className="bi bi-person me-2">
                <use xlinkHref={`${bootstrapIcons}#person`} />
              </svg>
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
