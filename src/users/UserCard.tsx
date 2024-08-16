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
      <div className="d-flex gap-4 w-25">
        <img src="./images/users/image-1.png" width={96} height={96} className="rounded-circle me-2" />
        <address>
          <strong title="cmckeachie">{user.firstname} {user.lastname}</strong>
          <br />
          <span className="text-secondary">{user.isAdmin} {user.isReviewer}</span>
          <br />
          <span className="text-secondary">{user.phone}</span>
          <br />
          <a href="mailto:sedial@yahoo.com" title="sedial@yahoo.com">
            {user.email}
          </a>
        </address>
      </div>
    </>
  );
}
