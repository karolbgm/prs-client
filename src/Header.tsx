import bootstrapIcons from "bootstrap-icons/bootstrap-icons.svg";

export default function Header() {
  return (
    <header>
      <div className="navbar bg-body-tertiary py-4 border-bottom">
        <div className="container-fluid">
          <a
            href="/"
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
          </a>
          <div className="dropdown me-4">
            <a
              href="#"
              className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <a className="btn btn-primary me-2" href="login.html">
                <svg width={16} height={16} fill="currentColor" className="bi bi-person me-2">
                  <use xlinkHref={`${bootstrapIcons}#person`} />
                </svg>
                Sign in
              </a>

              <strong>Karol Morgan</strong>
            </a>
            <ul className="dropdown-menu text-small shadow">
              <li>
                <a className="dropdown-item" href="#">
                  Settings
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Profile
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a href="signin.html" className="dropdown-item">
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
