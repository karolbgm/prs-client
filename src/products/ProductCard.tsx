import bootstrapIcons from "bootstrap-icons/bootstrap-icons.svg";
import { Product } from "./Product";
import Dropdown from "react-bootstrap/Dropdown";
import { SyntheticEvent } from "react";
import { Badge } from "react-bootstrap";

interface ProductCardProps {
  product: Product;
  onRemove: (product: Product) => void;
}

export default function ProductCard({ product, onRemove }: ProductCardProps) {
  return (
    <>
      <div className="card w-25">
        <div className="progress">
          <div
            className="progress-bar bg-primary"
            role="progressbar"
            style={{ width: "60%" }}
            aria-valuenow={60}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        <address className="py-4 px-4">
          <div className="d-flex justify-content-between align-items-center">
            <span>
              {" "}
              <strong>{product.name}</strong> 
            </span>
            <Dropdown>
              <Dropdown.Toggle variant="" id="dropdown-basic" className="no-arrow">
                <svg className="bi pe-none me-2" width={20} height={20} fill="#007AFF">
                  <use xlinkHref={`${bootstrapIcons}#three-dots-vertical`} />
                </svg>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href={`products/edit/${product.id}`}>Edit</Dropdown.Item>
                <Dropdown.Item
                  onClick={(event: SyntheticEvent) => {
                    event.preventDefault();
                    onRemove(product);
                  }}
                >
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <h6 className="card-subtitle mb-2">${product.price}/{product.unit}</h6>

          <br />
          <span>{product.vendor?.name}</span>
          <br />
          <Badge className="mt-2" bg="primary">{product.partNbr}</Badge>
        </address>
      </div>
    </>
  );
}
