import React from "react";
import DataTable from "react-data-table-component";
import { useOutletContext } from "react-router-dom";

const Admintaskview = () => {
  const context = useOutletContext();

  const handleinput = () => {
    const input = document.getElementById("inpt");
    const inputDes = document.getElementById("inptDes");
    input.value = "";
    inputDes.value = "";
  };

  return (
    <div>
      <div className="empl-table d-none d-xl-block table-responsive mt-3 p-2 p-md-0">
        <DataTable
          columns={context.columns}
          data={context.empltask}
          pagination
          highlightOnHover
        />
      </div>

      <div className="empl-table mx-0 d-xl-none d-block table-responsive mt-3 col-12  mx-md-0">
        <DataTable
          columns={context.smallcolumn}
          data={context.empltask}
          pagination
          highlightOnHover
        />
      </div>

      {/* assign task */}
      <div>
        <div
          class="modal fade index"
          id="exampleModal"
          tabindex="1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog   ">
            <div class="modal-content">
              <div class="modal-header">
                <h1
                  class="modal-title fs-5 text-dark text-bold"
                  id="exampleModalLabel"
                >
                  Assign-Task
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleinput}
                ></button>
              </div>
              <div class="modal-body">
                <div>
                  <h4 className="profile-emp text-dark ">
                    <img
                      src={`${process.env.REACT_APP_API}/uploads/${context.assign.image}`}
                      alt="name"
                    />
                    {context.assign.name}
                  </h4>
                </div>
                <div className="task-box">
                  <form className="form">
                    <div className="form-details text-light">
                      <label>Task name</label>
                      <input
                        type="text"
                        id="inpt"
                        onChange={(e) =>
                          context.setTaskfield((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="form-details text-light">
                      <label>Description</label>
                      <textarea
                        type="text"
                        id="inptDes"
                        onChange={(e) =>
                          context.setTaskfield((prev) => ({
                            ...prev,
                            description: e.target.value,
                            status: "pending",
                          }))
                        }
                      />
                    </div>
                  </form>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={handleinput}
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn border-success text-success"
                  data-bs-dismiss="modal"
                  onClick={context.handleassign}
                >
                  Assign
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
    </div>
  );
};

export default Admintaskview;
