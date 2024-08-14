import VendorForm from "./VendorForm";
export default function VendorCreatePage() {
  return (
    <>
      <header className="d-flex justify-content-between pb-4 mb-4 border-bottom border-2">
        <h2>New Vendor</h2>
      </header>

      <section className="d-flex bg-light gap-5 p-4 rounded-4 flex-wrap">
        <VendorForm />
      </section>
    </>
  );
}
