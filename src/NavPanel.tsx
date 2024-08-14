import bootstrapIcons from "bootstrap-icons/bootstrap-icons.svg";
import { NavLink } from "react-router-dom";

export default function NavPanel() {
  return (
    <nav
      className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary border-end min-vh-100 position-sticky"
      style={{ width: 280 }}
    >
      <a className="mb-4 text-decoration-none fw-bolder">
        <svg className="bi pe-none me-2" width={16} height={16} fill="#007AFF">
          <use xlinkHref={`${bootstrapIcons}#plus-circle-fill`} />
        </svg>
        Create new
      </a>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="text-secondary fw-bold mb-2">Purchase</li>
        <li>
          <NavLink to="/requests" className="nav-link">
            <svg className="bi pe-none me-2" width={16} height={16} fill="#007AFF">
              <use xlinkHref={`${bootstrapIcons}#cart`} />
            </svg>
            Requests
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" className="nav-link">
            <svg className="bi pe-none me-2" width={16} height={16} fill="#007AFF">
              <use xlinkHref={`${bootstrapIcons}#grid`} />
            </svg>
            Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/vendors" className="nav-link">
            <svg className="bi pe-none me-2" width={16} height={16} fill="#007AFF">
              <use xlinkHref={`${bootstrapIcons}#building`} />
            </svg>
            Vendors
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" className="nav-link">
            <svg className="bi pe-none me-2" width={16} height={16} fill="#007AFF">
              <use xlinkHref={`${bootstrapIcons}#people`} />
            </svg>
            Users
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
