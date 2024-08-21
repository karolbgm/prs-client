import bootstrapIcons from "bootstrap-icons/bootstrap-icons.svg";
import { Request } from "./Request";
import Dropdown from "react-bootstrap/Dropdown";
import { SyntheticEvent } from "react";

interface RequestCardProps {
  request: Request;
  onRemove: (request: Request) => void;
}

export default function RequestCard({ request, onRemove }: RequestCardProps) {
  //Changing badge color
  function badgeType(request: Request) {
    let badgeInfo;
    if (request.status === "NEW") {
      badgeInfo = "text-bg-primary";
    } else if (request.status === "APPROVED") {
      badgeInfo = "text-bg-success";
    } else if (request.status === "REJECTED") {
      badgeInfo = "text-bg-danger";
    } else if (request.status === "REVIEW") {
      badgeInfo = "text-bg-warning";
    }
    return badgeInfo;
  }

  return (
    <>
      <tr>
        <th scope="row">{request.id}</th>
        <td>
          {request.description} <br />
          <span className="text-body-secondary small text-wrap">{request.justification}</span>
        </td>

        <td>
          <span className={`badge ${badgeType(request)}`}>{request.status}</span>
        </td>
        <td>${request.total}</td>
        <td>
          {request.user?.firstname} {request.user?.lastname}
          <br />
          <span className="text-body-secondary small text-wrap">{request.deliveryMode}</span>
        </td>
        <td>
          <Dropdown>
            <Dropdown.Toggle variant="" id="dropdown-basic" className="no-arrow">
              <svg className="bi pe-none me-2" width={20} height={20} fill="#007AFF">
                <use xlinkHref={`${bootstrapIcons}#three-dots-vertical`} />
              </svg>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href={`requests/detail/${request.id}`}>Review</Dropdown.Item>
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
        </td>
      </tr>
    </>
  );
}
