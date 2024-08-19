import { Requestline } from "./Requestline";
import { Link } from "react-router-dom";
import { Request } from "../requests/Request";
import bootstrapIcons from "bootstrap-icons/bootstrap-icons.svg";



interface RequestlinesTableProps {
  request: Request;
  onRemove: (requestline: Requestline) => void;
}
export default function RequestlinesTable({request, onRemove} : RequestlinesTableProps) {
  return (
    <table className="table table-hover w-50">
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Amount</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {request.requestLines?.map((requestline) => (
          <tr key={requestline.id}>
            <td>{requestline.product?.name}</td>
            <td>${requestline.product?.price}</td>
            <td>{requestline.quantity}</td>
            <td>${(requestline.product?.price??0) * requestline.quantity} </td>
            
           
            <td className="d-flex gap-2">
              <Link to={`/requests/detail/${request.id}/requestline/edit/${requestline.id}`}><svg className="bi pe-none me-2" width={16} height={16} fill="currentColor">
              <use xlinkHref={`${bootstrapIcons}#pencil`} />
            </svg></Link>
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  onRemove(requestline);
                }}
              >
                <svg className="bi pe-none me-2" width={16} height={16} fill="currentColor">
              <use xlinkHref={`${bootstrapIcons}#trash`} />
            </svg>
              </a>
            </td>
          </tr>
        ))}
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td><strong>Total:</strong> ${request.total}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
}
