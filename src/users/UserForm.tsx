import bootstrapIcons from "bootstrap-icons/bootstrap-icons.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { User } from "./User";
import toast from "react-hot-toast";
import { userAPI } from "./UserAPI";

export default function UserForm() {
  //we will navigate back to the main page when save
  const navigate = useNavigate();
  //I need the id from useParams to pass to the find()
  //in this case, the type needs to specify the key?
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: async () => {
      if (!userId) {
        return Promise.resolve(new User());
      } else {
        return await userAPI.find(userId);
      }
    },
  });

  const save: SubmitHandler<User> = async (user) => {
    try {
      if (user.isNew) {
        await userAPI.post(user);
        toast.success("Successfully created.");
      } else {
        await userAPI.put(user);
        toast.success("Successfully updated.");

      }
      navigate("/users");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <form className="d-flex flex-wrap w-75 gap-2" onSubmit={handleSubmit(save)} noValidate>
      <div className="row-1 d-flex flex-row w-100 gap-4">
        <div className="mb-3 w-25">
          <label htmlFor="code" className="form-label">
            User Code
          </label>
          <input
            id="code"
            type="text"
            className={`form-control ${errors.code && "is-invalid"}`}
            placeholder="Enter short user code"
            {...register("code", { required: true, maxLength: 30 })}
            autoFocus
          />
          <div className="invalid-feedback">{errors?.code?.type === "required" && "User code is required"}</div>
          <div className="invalid-feedback">{errors?.code?.type === "maxLength" && "No longer than 30 characters"}</div>
        </div>
        <div className="mb-3 w-75">
          <label htmlFor="name" className="form-label">
            User Name
          </label>
          <input
            id="name"
            type="text"
            className={`form-control ${errors.name && "is-invalid"}`}
            placeholder="Enter user name"
            {...register("name", { required: true, maxLength: 30 })}
            autoFocus
          />
          <div className="invalid-feedback">{errors?.name?.type === "required" && "Name is required"}</div>
          <div className="invalid-feedback">{errors?.name?.type === "maxLength" && "No longer than 30 characters"}</div>
        </div>
      </div>
      <div className="row-2 d-flex flex-row w-100 gap-4">
        <div className="mb-3 w-100">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            id="address"
            type="text"
            className={`form-control ${errors.address && "is-invalid"}`}
            placeholder="Enter user's address"
            {...register("address", { required: true, maxLength: 30 })}
            autoFocus
          />
          <div className="invalid-feedback">{errors?.address?.type === "required" && "Name is required"}</div>
          <div className="invalid-feedback">
            {errors?.address?.type === "maxLength" && "No longer than 30 characters"}
          </div>
        </div>
      </div>
      <div className="row-3 d-flex flex-row w-100 gap-4">
        <div className="mb-3 w-50">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            id="city"
            type="text"
            className={`form-control ${errors.city && "is-invalid"}`}
            placeholder="Enter city"
            {...register("city", { required: true, maxLength: 30 })}
            autoFocus
          />
          <div className="invalid-feedback">{errors?.city?.type === "required" && "City is required"}</div>
          <div className="invalid-feedback">
            {errors?.city?.type === "maxLength" && "No longer than 30 characters"}
          </div>{" "}
        </div>
        <div className="mb-3 w-25">
          <label htmlFor="state">State</label>
          <select
            id="state"
            className={`form-select ${errors.state && "is-invalid"}`}
            {...register("state", { required: true, maxLength: 2 })}
          >
            <option value="">Select state...</option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>
          <div className="invalid-feedback">{errors?.state?.type === "required" && "State is required"}</div>
          <div className="invalid-feedback">{errors?.state?.type === "maxLength" && "No longer than 2 characters"}</div>
        </div>
        <div className="mb-3 w-25">
          <label htmlFor="zip" className="form-label">
            Zip
          </label>
          <input
            id="zip"
            type="text"
            className={`form-control ${errors.zip && "is-invalid"}`}
            placeholder="Enter zip code"
            {...register("zip", { required: true, maxLength: 5 })}
          />
          <div className="invalid-feedback">{errors?.zip?.type === "required" && "Zip is required"}</div>
          <div className="invalid-feedback">{errors?.zip?.type === "maxLength" && "No longer than 5 characters"}</div>
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
            className={`form-control ${errors.phone && "is-invalid"}`}
            placeholder="Enter phone number"
            {...register("phone", { maxLength: 12 })}
          />
        </div>
        <div className="invalid-feedback">{errors?.phone?.type === "maxLength" && "No longer than 12 characters"}</div>

        <div className="mb-3 w-50">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={`form-control ${errors.email && "is-invalid"}`}
            placeholder="Enter email address"
            {...register("email", { maxLength: 255 })}
          />
        </div>
        <div className="invalid-feedback">{errors?.email?.type === "maxLength" && "No longer than 255 characters"}</div>
      </div>
      <div className="row-3 d-flex flex-row justify-content-end w-100 gap-4">
        <div className="d-flex justify-content-end mt-4">
          <Link className="btn btn-outline-primary me-2" to={"/users"}>
            Cancel
          </Link>
          <button className="btn btn-primary">
            <svg className="bi pe-none me-2" width={16} height={16} fill="#FFFFFF">
              <use xlinkHref={`${bootstrapIcons}#save`} />
            </svg>
            Save user
          </button>
        </div>
      </div>
    </form>
  );
}
