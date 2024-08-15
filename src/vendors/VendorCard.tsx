import bootstrapIcons from "bootstrap-icons/bootstrap-icons.svg";
import { Vendor } from "./Vendor";

interface VendorCardProps {
  vendor: Vendor;
}

export default function VendorCard({ vendor }: VendorCardProps) {
  return (
    <>
      <div className="card w-25">
        <div className="progress">
          <div
            className="progress-bar bg-primary"
            role="progressbar"
            style={{ width: "60%" }}
            aria-valuenow={60}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        <address className="py-4 px-4">
          <div className="d-flex justify-content-between align-items-center">
            <span>
              {" "}
              <strong>{vendor.name}</strong> <span className="badge text-bg-secondary">{vendor.code}</span>{" "}
            </span>
            <div className="dropdown d-inline">
              <button
                className="btn btn-light"
                style={{ background: "none" }}
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <svg className="bi pe-none me-2" width={20} height={20} fill="#007AFF">
                  <use xlinkHref={`${bootstrapIcons}#three-dots-vertical`} />
                </svg>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a href="vendor-edit.html" className="dropdown-item" type="button">
                    Edit
                  </a>
                </li>
                <li>
                  <button className="dropdown-item" type="button">
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <br />
          {vendor.address}
          <br />
          {vendor.state} {vendor.zip}
          <br />
          {vendor.phone}
          <br />
          {vendor.email}
        </address>
      </div>
    </>
  );
}
