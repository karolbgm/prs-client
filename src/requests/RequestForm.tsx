import bootstrapIcons from "bootstrap-icons/bootstrap-icons.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { Request } from "./Request";
import toast from "react-hot-toast";
import { requestAPI } from "./RequestAPI";
import { useState } from "react";
import { userAPI } from "../users/UserAPI";
import { User } from "../users/User";

export default function RequestForm() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  //we will navigate back to the main page when save
  const navigate = useNavigate();
  //I need the id from useParams to pass to the find()
  //in this case, the type needs to specify the key?
  const { id } = useParams<{ id: string }>();
  const requestId = Number(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Request>({
    defaultValues: async () => {
      let data = await userAPI.list();
      setUsers(data);
      if (!requestId) {
        return Promise.resolve(new Request());
      } else {
        setIsDisabled(false);
        return await requestAPI.find(requestId);
      }
    },
  });

  const save: SubmitHandler<Request> = async (request) => {
    try {
      if (request.isNew) {
        await requestAPI.post(request);
        toast.success("Successfully created.");
      } else {
        await requestAPI.put(request);
        toast.success("Successfully updated.");
      }
      navigate("/requests");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(save)} noValidate>
      <div className="request-header">
        <div className="column1 w-75">
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              id="description"
              type="text"
              className={`form-control ${errors.description && "is-invalid"}`}
              placeholder="Enter a brief description for your purchase request"
              {...register("description", { required: true, maxLength: 80 })}
            />
            <div className="invalid-feedback">
              {errors?.description?.type === "required" && "Description is required"}
            </div>
            <div className="invalid-feedback">
              {errors?.description?.type === "maxLength" && "No longer than 80 characters"}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="justification" className="form-label">
              Justification
            </label>
            <input
              id="justification"
              type="text"
              className={`form-control ${errors.justification && "is-invalid"}`}
              placeholder="Enter a justification for your purchase request"
              {...register("justification", { required: true, maxLength: 80 })}
            />
            <div className="invalid-feedback">
              {errors?.justification?.type === "required" && "Justification is required"}
            </div>
            <div className="invalid-feedback">
              {errors?.justification?.type === "maxLength" && "No longer than 80 characters"}
            </div>
          </div>
        </div>
        <div className="column2 w-50">
          <div className="mb-3">
            <label htmlFor="delivery" className="form-label">
              Delivery Method
            </label>
            <select
              id="delivery"
              className={`form-select ${errors.deliveryMode && "is-invalid"}`}
              {...register("deliveryMode", { required: true })}
            >
              <option value="">Select...</option>
              <option value="Pickup">Pickup</option>
              <option value="Delivery">Delivery</option>
              <option value="Signature Delivery">Signature Delivery</option>
            </select>
            <div className="invalid-feedback">
              {errors?.deliveryMode?.type === "required" && "Delivery Mode is required"}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="status">Status</label>
            <select id="status" className="form-select" {...register("status")} disabled={isDisabled}>
              <option value="">Select...</option>
              <option value="NEW">New</option>
              <option value="REVIEW">Pending Review</option>
              <option value="APPROVED">Approved</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="user">Requested By</label>
            <select id="user" className="form-select" {...register("userId")} disabled>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.firstname} {u.lastname}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end mt-4">
        <Link className="btn btn-outline-primary me-2" to={`/requests/detail/${requestId}`}>
          Cancel
        </Link>
        <button className="btn btn-primary">
          <svg className="bi pe-none me-2" width={16} height={16} fill="#FFFFFF">
            <use xlinkHref={`${bootstrapIcons}#save`} />
          </svg>
          Save request
        </button>
      </div>
    </form>
  );
}
