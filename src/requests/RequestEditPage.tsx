import RequestForm from "./RequestForm";

export default function RequestEditPage() {
  return (
    <>
      <header className="d-flex justify-content-between pb-4 mb-4 border-bottom border-2">
        <h2>Edit Request</h2>
      </header>

      <section className="bg-light gap-5 p-4 rounded-4">
        <RequestForm />
      </section>
    </>
  );
}
