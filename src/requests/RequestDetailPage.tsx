import bootstrapIcons from "bootstrap-icons/bootstrap-icons.svg";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, Route, Routes, useParams, useSearchParams } from "react-router-dom";
import { Request } from "./Request";
import { requestAPI } from "./RequestAPI";
// import CreditTable from "../credits/CreditTable";
// import { creditAPI } from "../credits/CreditAPI";
// import { Credit } from "../credits/Credit";
// import CreditCreatePage from "../credits/CreditCreatePage";
// import CreditEditPage from "../credits/CreditEditPage";

export default function RequestDetailPage() {
  const { requestId: requestIdAsString } = useParams<{
    requestId: string;
  }>();
  let [searchParams] = useSearchParams();
  const requestId = Number(requestIdAsString);
  const [request, setRequest] = useState<Request | undefined>(undefined);
  const [busy, setBusy] = useState(false);

  async function loadRequest() {
    try {
      if (!requestId) return;
      setBusy(true);
      //   const data = await requestAPI.findWithDetails(requestId);
      const data = await requestAPI.find(requestId);
      setRequest(data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    loadRequest();
  }, [searchParams.get("lastUpdated")]);

  //   async function removeCredit(credit: Credit) {
  //     if (confirm("Are you sure you want to delete this Request?")) {
  //       if (credit.id) {
  //         await creditAPI.delete(credit.id);
  //         toast.success("Successfully deleted.");
  //         let updatedCredits = request?.credits?.filter((c) => c.id !== credit.id);
  //         if (request) {
  //           setRequest({ ...request, credits: updatedCredits } as Request);
  //         }
  //       }
  //     }
  //   }

  if (!request) return null;

  return (
    <>
      <header className="d-flex justify-content-between pb-4 mb-4 border-bottom border-2">
        <h2>Requests</h2>
        <div>
        <Link to="/" className="btn btn-primary">
          <svg className="bi pe-none me-2" width={16} height={16} fill="#FFFFFF">
            <use xlinkHref={`${bootstrapIcons}#person-check`} />
          </svg>
          Send for Review
        </Link>
        <Link to={`/requests/edit/${request.id}`} className="ms-3">
          <svg className="bi pe-none me-2" width={16} height={16} fill="currentColor">
            <use xlinkHref={`${bootstrapIcons}#pencil`} />
          </svg>
        </Link>
        </div>
      </header>
      {busy && (
        <section className="d-flex justify-content-center align-items-center align-content-center vh-100">
          <div className=" spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </section>
      )}
      {request && (
        <section className="d-flex flex-row justify-content-between p-4 bg-light rounded-4">
          <dl className="">
            <dt>Description</dt>
            <dd>{request.description}</dd>
            <dt>Justification</dt>
            <dd>{request.justification}</dd>
          </dl>
          <dl>
            <dt>Delivery Method</dt>
            <dd>{request.deliveryMode}</dd>
            <dt>Status</dt>
            <dd className={`badge ${request.status === "NEW" && "text-bg-primary"} ${
              request.status === "REJECTED" && "text-bg-danger"
            } ${request.status === "APPROVED" && "text-bg-success"} ${
              request.status === "REVIEW" && "text-bg-warning"
            }`}>{request.status}</dd>
          </dl>
          <dl>
            <dt>Requested By</dt>
            <dd>{request.userId}</dd>
          </dl>
        </section>
      )}
    </>
  );
}
