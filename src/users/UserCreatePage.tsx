import UserForm from "./UserForm";
export default function UserCreatePage() {
  return (
    <>
      <header className="d-flex justify-content-between pb-4 mb-4 border-bottom border-2">
        <h2>New User</h2>
      </header>

      <section className="d-flex bg-light gap-5 p-4 rounded-4 flex-wrap">
        <UserForm />
      </section>
    </>
  );
}
