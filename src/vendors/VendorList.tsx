import { useEffect, useState } from "react";
import { Vendor } from "./Vendor";
import { vendorAPI } from "./VendorAPI";
import VendorCard from "./VendorCard";

export default function VendorList() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [busy, setBusy] = useState(false);

  async function loadVendors() {
    setBusy(true);
    let data = await vendorAPI.list();
    setVendors(data);
    setBusy(false);
  }

  useEffect(() => {
    loadVendors();
  }, []);

  return (
    <section className="list d-flex flex-row flex-wrap bg-light gap-5 p-4 rounded-4">
      {busy && (
        <div className="d-flex justify-content-center align-items-center w-100 vh-100">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {vendors.map((vendor) => (
        <VendorCard key={vendor.id} vendor={vendor} />
      ))}
    </section>
  );
}
