import bootstrapIcons from "bootstrap-icons/bootstrap-icons.svg";
import { Request } from "./Request";
import Dropdown from "react-bootstrap/Dropdown";
import { SyntheticEvent } from "react";

interface RequestCardProps {
  request: Request;
  onRemove: (request: Request) => void;
}

export default function RequestCard({ request, onRemove }: RequestCardProps) {
  return (
    <>
      <div className="d-flex gap-4 " style={{ width: "25rem" }}>
        <div
          style={{ width: "6rem", height: "6rem" }}
          className="d-flex bg-secondary fs-3 text-white align-items-center justify-content-center rounded-circle me-2"
        >
          {request.firstname[0].toUpperCase()}
          {request.lastname[0].toUpperCase()}
        </div>
        <address>
          <div className="d-flex justify-content-between align-items-center">
            <span>
              <strong>
                {request.firstname} {request.lastname}{" "}
              </strong>
            </span>

            <Dropdown>
              <Dropdown.Toggle variant="" id="dropdown-basic" className="no-arrow">
                <svg className="bi pe-none me-2" width={20} height={20} fill="#007AFF">
                  <use xlinkHref={`${bootstrapIcons}#three-dots-vertical`} />
                </svg>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href={`requests/edit/${request.id}`}>Edit</Dropdown.Item>
                <Dropdown.Item
                  onClick={(event: SyntheticEvent) => {
                    event.preventDefault();
                    onRemove(request);
                  }}
                >
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <br />
          <span className="text-secondary">
            {request.isAdmin && "Admin"} {request.isReviewer && "Reviewer"}
          </span>

          <br />
          <span className="text-secondary">{request.phone}</span>
          <br />
          <div className="d-flex justify-content-start">{request.email}</div>
        </address>
      </div>
    </>
  );
}
