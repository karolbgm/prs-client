import bootstrapIcons from "bootstrap-icons/bootstrap-icons.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { Product } from "./Product";
import toast from "react-hot-toast";
import { productAPI } from "./ProductAPI";
import { Vendor } from "../vendors/Vendor";
import { useState } from "react";
import { vendorAPI } from "../vendors/VendorAPI";

export default function ProductForm() {
  //LOADING ALL VENDORS
  const [vendors, setVendors] = useState<Vendor[]>([]);

  //we will navigate back to the main page when save
  const navigate = useNavigate();
  //I need the id from useParams to pass to the find()
  //in this case, the type needs to specify the key?
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: async () => {
      let data = await vendorAPI.list();
      setVendors(data);

      if (!productId) {
        return Promise.resolve(new Product());
      } else {
        let foundProduct = await productAPI.find(productId);
        console.log(foundProduct);
        return foundProduct;
      }
    },
  });

  const save: SubmitHandler<Product> = async (product) => {
    try {
      if (product.isNew) {
        await productAPI.post(product);
        toast.success("Successfully created.");
      } else {
        await productAPI.put(product);
        toast.success("Successfully updated.");
      }
      navigate("/products");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <form className="d-flex flex-wrap w-75 gap-2" onSubmit={handleSubmit(save)} noValidate>
      <div className="row-1 d-flex flex-row w-100 gap-4">
        <div className="mb-3 w-25">
          <label htmlFor="number" className="form-label">
            Product Number
          </label>
          <input
            id="number"
            type="text"
            className={`form-control ${errors.partNbr && "is-invalid"}`}
            placeholder="Enter product part number"
            {...register("partNbr", { required: true, maxLength: 30 })}
            autoFocus
          />
          <div className="invalid-feedback">{errors?.partNbr?.type === "required" && "Part Nbr is required"}</div>
          <div className="invalid-feedback">
            {errors?.partNbr?.type === "maxLength" && "No longer than 30 characters"}
          </div>
        </div>
        <div className="mb-3 w-75">
          <label htmlFor="name" className="form-label">
            Product Name
          </label>
          <input
            id="name"
            type="text"
            className={`form-control ${errors.name && "is-invalid"}`}
            placeholder="Enter product name"
            {...register("name", { required: true, maxLength: 30 })}
            autoFocus
          />
          <div className="invalid-feedback">{errors?.name?.type === "required" && "Product name is required"}</div>
          <div className="invalid-feedback">{errors?.name?.type === "maxLength" && "No longer than 30 characters"}</div>
        </div>
      </div>
      <div className="row-2 d-flex flex-row w-100 gap-4">
        <div className="mb-3 w-100">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            id="price"
            type="number"
            min="0"
            step="0.01"
            className={`form-control ${errors.price && "is-invalid"}`}
            placeholder="Enter product's price"
            {...register("price", { required: true })}
            autoFocus
          />
          <div className="invalid-feedback">{errors?.price?.type === "required" && "Price is required"}</div>
        </div>
      </div>
      <div className="row-3 d-flex flex-row w-100 gap-4">
        <div className="mb-3 w-50">
          <label htmlFor="unit" className="form-label">
            Unit
          </label>
          <input
            id="unit"
            type="text"
            className={`form-control ${errors.unit && "is-invalid"}`}
            placeholder="Enter unit"
            {...register("unit", { required: true, maxLength: 30 })}
            autoFocus
          />
          <div className="invalid-feedback">{errors?.unit?.type === "required" && "Unit is required"}</div>
          <div className="invalid-feedback">
            {errors?.unit?.type === "maxLength" && "No longer than 30 characters"}
          </div>{" "}
        </div>
        <div className="mb-3 w-25">
          <label htmlFor="vendor">Vendor</label>
          <select
            id="vendor"
            className={`form-select ${errors.vendorId && "is-invalid"}`}
            {...register("vendorId", { required: true })}
          >
            <option value="">Select a vendor...</option>
            {vendors.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>

          <div className="invalid-feedback">{errors?.vendorId?.type === "required" && "Vendor is required"}</div>
        </div>
      </div>

      <div className="row-3 d-flex flex-row justify-content-end w-100 gap-4">
        <div className="d-flex justify-content-end mt-4">
          <Link className="btn btn-outline-primary me-2" to={"/products"}>
            Cancel
          </Link>
          <button className="btn btn-primary">
            <svg className="bi pe-none me-2" width={16} height={16} fill="#FFFFFF">
              <use xlinkHref={`${bootstrapIcons}#save`} />
            </svg>
            Save product
          </button>
        </div>
      </div>
    </form>
  );
}
