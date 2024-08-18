import { useEffect, useState } from "react";
import { Request } from "./Request";
import { requestAPI } from "./RequestAPI";
import RequestCard from "./RequestCard";
import toast from "react-hot-toast";

export default function RequestList() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [busy, setBusy] = useState(false);

  async function loadRequests() {
    setBusy(true);
    let data = await requestAPI.list();
    setRequests(data);
    setBusy(false);
  }

  //side effect: bringing new data
  //useEffect wants to have a function or nothing returned, that's why we need to pass loadRequests
  //the array [] means "how often do you want to run the function?" -> render the page blank and after the first render, run RequestList top to bottom again
  useEffect(() => {
    loadRequests();
  }, []);

  async function remove(request: Request) {
    if (confirm("Are you sure you want to delete this Request?")) {
      if (request.id) {
        await requestAPI.delete(request.id);
        let updatedRequests = requests.filter((v) => v.id !== request.id);
        setRequests(updatedRequests);
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

      {requests.map((request) => (
        <RequestCard key={request.id} request={request} onRemove={remove} />
      ))}
    </section>
  );
}
