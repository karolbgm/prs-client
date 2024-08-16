import bootstrapIcons from "bootstrap-icons/bootstrap-icons.svg";
import { User } from "./User";
import Dropdown from "react-bootstrap/Dropdown";
import { SyntheticEvent } from "react";

interface UserCardProps {
  user: User;
  onRemove: (user: User) => void;
}

export default function UserCard({ user, onRemove }: UserCardProps) {
  return (
    <>
      <div className="d-flex gap-4 " style={{ width: "25rem" }}>
        <div
          style={{ width: "6rem", height: "6rem" }}
          className="d-flex bg-secondary fs-3 text-white align-items-center justify-content-center rounded-circle me-2"
        >
          {user.firstname[0].toUpperCase()}
          {user.lastname[0].toUpperCase()}
        </div>
        <address>
          <div className="d-flex justify-content-between align-items-center">
            <span>
              <strong>
                {user.firstname} {user.lastname}{" "}
              </strong>
            </span>

            <Dropdown>
              <Dropdown.Toggle variant="" id="dropdown-basic" className="no-arrow">
                <svg className="bi pe-none me-2" width={20} height={20} fill="#007AFF">
                  <use xlinkHref={`${bootstrapIcons}#three-dots-vertical`} />
                </svg>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href={`users/edit/${user.id}`}>Edit</Dropdown.Item>
                <Dropdown.Item
                  onClick={(event: SyntheticEvent) => {
                    event.preventDefault();
                    onRemove(user);
                  }}
                >
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <br />
          <span className="text-secondary">
            {user.isAdmin && "Admin"} {user.isReviewer && "Reviewer"}
          </span>

          <br />
          <span className="text-secondary">{user.phone}</span>
          <br />
          <div className="d-flex justify-content-start">{user.email}</div>
        </address>
      </div>
    </>
  );
}
