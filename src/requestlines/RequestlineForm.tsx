import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Requestline } from "./Requestline";
import toast from "react-hot-toast";
import { requestlineAPI } from "./RequestlineAPI";
import { useState } from "react";
import { Product } from "../products/Product";
import { productAPI } from "../products/ProductAPI";

function RequestlineForm() {
  const navigate = useNavigate();
  let { requestlineId: requestlineIdAsString } = useParams<{ requestlineId: string }>();
  let { requestId: requestIdAsString } = useParams<{ requestId: string }>();
  let requestlineId = Number(requestlineIdAsString);
  let requestId = Number(requestIdAsString);
  const [products, setProducts] = useState<Product[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Requestline>({
    defaultValues: async () => {
      let productsData = await productAPI.list();
      setProducts(productsData);

      if (!requestlineId) {
        let newRequestline = new Requestline({ requestId: requestId });
        return Promise.resolve(newRequestline);
      } else {
        return await requestlineAPI.find(requestlineId);
      }
    },
  });

  const save: SubmitHandler<Requestline> = async (requestline) => {
    try {
      if (requestline.isNew) {
        await requestlineAPI.post(requestline);
      } else {
        await requestlineAPI.put(requestline);
      }
      navigate(`/requests/detail/${requestId}?lastUpdated=${Date.now()}`);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <form className="w-50" onSubmit={handleSubmit(save)} noValidate>
      <div className="mb-3">
        <label className="form-label" htmlFor="product">
          Product
        </label>
        <select
          {...register("productId", {
            required: "Product is required",
          })}
          className={`form-select ${errors.productId && "is-invalid"} `}
          id="product"
        >
          <option value="">Select...</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        <div className="invalid-feedback">{errors?.productId?.message}</div>
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="quantity">
          Quantity
        </label>
        <input
          {...register("quantity", {
            required: "Quantity is required",
          })}
          className={`form-control ${errors.quantity && "is-invalid"} `}
          type="text"
          id="quantity"
        />
        <div className="invalid-feedback">{errors?.quantity?.message}</div>
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-outline-primary">Save</button>
        <Link className="btn btn-outline-secondary" to={`/requests/detail/${requestId}`}>
          Cancel
        </Link>
      </div>
    </form>
  );
}

export default RequestlineForm;
