import RequestlineForm from "./RequestlineForm";

function RequestlineCreatePage() {
  return (
    <>
      <nav className="d-flex justify-content-between">
        <h4>New Requestline</h4>
      </nav>
      <hr />
      <RequestlineForm />
    </>
  );
}

export default RequestlineCreatePage;
