import bootstrapIcons from "bootstrap-icons/bootstrap-icons.svg";
import { Link } from "react-router-dom";
import VendorList from "./VendorList";

export default function VendorsPage() {
  return (
    <>
      <header className="d-flex justify-content-between pb-4 mb-4 border-bottom border-2">
        <h2>Vendors</h2>
         <Link to="/vendors/create" className="btn btn-primary">
                <svg className="bi pe-none me-2" width={32} height={32} fill="#FFFFFF">
                  <use xlinkHref={`${bootstrapIcons}#plus`} />
                </svg>
                Create a vendor
              </Link>
      </header>
        <VendorList />
    </>
  );
}
