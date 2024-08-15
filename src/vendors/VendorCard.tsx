import bootstrapIcons from "bootstrap-icons/bootstrap-icons.svg";
import { Vendor } from "./Vendor";
import Dropdown from "react-bootstrap/Dropdown";

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
            <Dropdown>
              <Dropdown.Toggle  variant=""  id="dropdown-basic">
              <svg className="bi pe-none me-2" width={20} height={20} fill="#007AFF">
                  <use xlinkHref={`${bootstrapIcons}#three-dots-vertical`} />
                </svg>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href={`vendors/edit/${vendor.id}`}>Edit</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <br />
          {vendor.address}
          <br />
          {vendor.city}, {vendor.state} {vendor.zip}
          <br />
          {vendor.phone}
          <br />
          {vendor.email}
        </address>
      </div>
    </>
  );
}
