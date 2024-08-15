<div className="dropdown d-inline">
              <button
                className="btn btn-light"
                style={{ background: "none" }}
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <svg className="bi pe-none me-2" width={20} height={20} fill="#007AFF">
                  <use xlinkHref={`${bootstrapIcons}#three-dots-vertical`} />
                </svg>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a href={`/vendors/edit/${vendor.id}`} className="dropdown-item" type="button">
                    Edit
                  </a>
                </li>
                <li>
                  <button className="dropdown-item" type="button">
                    Delete
                  </button>
                </li>
              </ul>
            </div>