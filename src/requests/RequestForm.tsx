import bootstrapIcons from "bootstrap-icons/bootstrap-icons.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { Request } from "./Request";
import toast from "react-hot-toast";
import { requestAPI } from "./RequestAPI";

export default function RequestForm() {
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
      if (!requestId) {
        return Promise.resolve(new Request());
      } else {
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
    <form className="d-flex flex-wrap w-75 gap-2" onSubmit={handleSubmit(save)} noValidate>
      <div className="row-1 d-flex flex-row w-100 gap-4">
        <div className="mb-3 w-50">
          <label htmlFor="firstname" className="form-label">
            First
          </label>
          <input
            id="firstname"
            type="text"
            className={`form-control ${errors.firstname && "is-invalid"}`}
            placeholder="Enter first name"
            {...register("firstname", { required: true, maxLength: 30 })}
          />
        <div className="invalid-feedback">{errors?.firstname?.type === "required" && "First name is required"}</div>
        <div className="invalid-feedback">
          {errors?.firstname?.type === "maxLength" && "No longer than 30 characters"}
        </div>
        </div>
        <div className="mb-3 w-50">
          <label htmlFor="lastname" className="form-label">
            Last
          </label>
          <input
            id="lastname"
            type="text"
            className={`form-control ${errors.lastname && "is-invalid"}`}
            placeholder="Enter last name"
            {...register("lastname", { required: true, maxLength: 30 })}
          />
        <div className="invalid-feedback">{errors?.lastname?.type === "required" && "Last name is required"}</div>
           <div className="invalid-feedback">{errors?.lastname?.type === "maxLength" && "No longer than 30 characters"}</div>
        </div>
      </div>
      <div className="row-1 d-flex flex-row w-100 gap-4">
        <div className="mb-3 w-50">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            id="phone"
            type="text"
            className="form-control"
            placeholder="Enter phone number"
            {...register("phone")}
          />
        </div>
        <div className="mb-3 w-50">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="form-control"
            placeholder="Enter email address"
            {...register("email")}
          />
        </div>
      </div>
      <div className="row-2 d-flex flex-row w-100 gap-4">
        <div className="mb-3 w-50">
          <label htmlFor="requestname" className="form-label">
            Requestname
          </label>
          <input
            id="requestname"
            type="text"
            className={`form-control ${errors.requestname && "is-invalid"}`}
            placeholder="Enter requestname"
            {...register("requestname", { required: true, maxLength: 30 })}
          />
          <div className="invalid-feedback">{errors?.requestname?.type === "required" && "Requestname is required"}</div>
          <div className="invalid-feedback">{errors?.requestname?.type === "maxLength" && "No longer than 30 characters"}</div>
        </div>
        <div className="mb-3 w-50">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            className={`form-control ${errors.password && "is-invalid"}`}
            placeholder="Enter password"
            {...register("password", { required: true, maxLength: 30 })}
          />
          <div className="invalid-feedback">{errors?.password?.type === "required" && "Password is required"}</div>
          <div className="invalid-feedback">{errors?.password?.type === "maxLength" && "No longer than 30 characters"}</div>
        </div>
        <div className="mb-3 w-50">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <br />
          <div className="form-check form-check-inline">
            <input id="isReviewer" type="checkbox" className="form-check-input" {...register("isReviewer")} />
            <label htmlFor="isReviewer" className="form-check-label">
              Reviewer
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input id="isAdmin" type="checkbox" className="form-check-input" {...register("isAdmin")} />
            <label htmlFor="isAdmin" className="form-check-label">
              Admin
            </label>
          </div>
        </div>
      </div>
      <div className="row-3 d-flex flex-row justify-content-end w-100 gap-4">
        <div className="d-flex justify-content-end mt-4">
          <Link className="btn btn-outline-primary me-2" to={"/requests"}>
            Cancel
          </Link>
          <button className="btn btn-primary">
            <svg className="bi pe-none me-2" width={16} height={16} fill="#FFFFFF">
              <use xlinkHref={`${bootstrapIcons}#save`} />
            </svg>
            Save request
          </button>
        </div>
      </div>
    </form>
  );
}
