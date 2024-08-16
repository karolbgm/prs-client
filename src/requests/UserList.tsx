import { useEffect, useState } from "react";
import { User } from "./User";
import { userAPI } from "./UserAPI";
import UserCard from "./UserCard";
import toast from "react-hot-toast";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [busy, setBusy] = useState(false);

  async function loadUsers() {
    setBusy(true);
    let data = await userAPI.list();
    setUsers(data);
    setBusy(false);
  }

  //side effect: bringing new data
  //useEffect wants to have a function or nothing returned, that's why we need to pass loadUsers
  //the array [] means "how often do you want to run the function?" -> render the page blank and after the first render, run UserList top to bottom again
  useEffect(() => {
    loadUsers();
  }, []);

  async function remove(user: User) {
    if (confirm("Are you sure you want to delete this User?")) {
      if (user.id) {
        await userAPI.delete(user.id);
        let updatedUsers = users.filter((v) => v.id !== user.id);
        setUsers(updatedUsers);
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

      {users.map((user) => (
        <UserCard key={user.id} user={user} onRemove={remove} />
      ))}
    </section>
  );
}
