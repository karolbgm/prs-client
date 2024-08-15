import { useEffect, useState } from "react";
import { Vendor } from "./Vendor";
import { vendorAPI } from "./VendorAPI";
import VendorCard from "./VendorCard";
import toast from "react-hot-toast";

export default function VendorList() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [busy, setBusy] = useState(false);

  async function loadVendors() {
    setBusy(true);
    let data = await vendorAPI.list();
    setVendors(data);
    setBusy(false);
  }

  //side effect: bringing new data
  //useEffect wants to have a function or nothing returned, that's why we need to pass loadVendors
  //the array [] means "how often do you want to run the function?" -> render the page blank and after the first render, run VendorList top to bottom again
  useEffect(() => {
    loadVendors();
  }, []);

  async function remove(vendor: Vendor) {
    if (confirm("Are you sure you want to delete this Vendor?")) {
      if (vendor.id) {
        await vendorAPI.delete(vendor.id);
        let updatedVendors = vendors.filter((v) => v.id !== vendor.id);
        setVendors(updatedVendors);
        toast.success("Successfully deleted.");
      }
    }
  }

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
        <VendorCard key={vendor.id} vendor={vendor} onRemove={remove} />
      ))}
    </section>
  );
}
