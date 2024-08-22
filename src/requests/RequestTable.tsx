import { SyntheticEvent, useEffect, useState } from "react";
import { Request } from "./Request";
import { requestAPI } from "./RequestAPI";
import RequestRow from "./RequestRow";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

export default function RequestTable() {
  const [requests, setRequests] = useState<Request[]>([]);
  //searchParams will manage the query params
  const [searchParams, setSearchParams] = useSearchParams();
  // const [busy, setBusy] = useState(false);

  // async function loadRequests() {
  //   setBusy(true);
  //   let data = await requestAPI.list();
  //   // searchParams.get("status") ?? undefined
  //   setRequests(data);
  //   setBusy(false);
  // }

  async function loadRequests() {
    try {
      const data = await requestAPI.list(searchParams.get("status") ?? undefined);
      setRequests(data);
    } catch (error: any) {
      toast.error(error.message, { duration: 6000 });
    }
  }

  //side effect: bringing new data
  //useEffect wants to have a function or nothing returned, that's why we need to pass loadRequests
  //the array [] means "how often do you want to run the function?" -> render the page blank and after the first render, run RequestTable top to bottom again
  // useEffect(() => {
  //   loadRequests();
  // }, []);

  //it will rerender everytime the status changes
  useEffect(() => {
    loadRequests();
  }, [searchParams.get("status")]);

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

  //updates the URL’s status query parameter based on the selected value in the dropdown. Changing this parameter triggers the useEffect to reload the requests.
  function handleStatusChange(event: SyntheticEvent) {
    //created an object with status as key and the value of the selected option
    setSearchParams({ status: (event.target as HTMLSelectElement).value });
  }

  return (
    <>
      <div className="d-flex flex-column mb-4 w-25">
        <label htmlFor="status" className="form-label">
          Status
        </label>
        <select
          id="status"
          className="form-select"
          value={searchParams.get("status") ?? undefined}
          onChange={handleStatusChange}
        >
          <option value="">All</option>
          <option value="NEW">New</option>
          <option value="REVIEW">Pending Review</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>
      <section className="list d-flex flex-row flex-wrap bg-light gap-5 p-4 rounded-4">
        {/* {busy && (
          <div className="d-flex justify-content-center align-items-center w-100 vh-100">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )} */}

        <table className="table table-hover w-75 table rounded-4">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Description</th>
              <th scope="col">Status</th>
              <th scope="col">Total</th>
              <th scope="col">Requested By</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <RequestRow key={request.id} request={request} onRemove={remove} />
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
