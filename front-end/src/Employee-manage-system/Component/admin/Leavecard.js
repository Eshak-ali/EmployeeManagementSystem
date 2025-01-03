import React from "react";
import { useOutletContext } from "react-router-dom";

const Leavecard = () => {
    const context = useOutletContext();
    return (
        <div>
            <div className="leave-card">
                {context.EmpDetails.filter(
                    (each) => each.leave?.LeaveReq === null
                ).map((each) => (
                    <section className="leave-cart">
                        <div className="leave-profile">
                            <img
                                src={`${each.image}`}
                                alt="employee"
                            />
                        </div>
                        <div className="leave-detail mt-3">
                            <p>
                                <span className="text-success">
                                    {each.name}
                                </span>
                                <br />
                                <span className="leave-position ">
                                    {each.position}
                                </span>
                            </p>
                            <p>
                                <span>Reason</span>
                                <br />
                                <span className="leave-position text-primary">
                                    {each.leave?.reason}
                                </span>
                            </p>
                            <p>
                                <span>Leave Days</span>
                                <br />
                                <span className="leave-position text-primary">
                                    <span>{each.days?.leaveday || 0}</span> days
                                    Already taken
                                </span>
                            </p>
                            <div className="leave-btn">
                                <button
                                    className="btn btn-danger"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal1"
                                    onClick={() => context.setEmployee(each)}
                                >
                                    Reject
                                </button>
                                <button
                                    className="btn btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    onClick={() => context.setEmployee(each)}
                                >
                                    Approved
                                </button>
                            </div>
                        </div>
                    </section>
                ))}
            </div>

            {/* position */}
            <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1
                                class="modal-title fs-5 text-dark text-bold"
                                id="exampleModalLabel"
                            >
                                Leave Request
                            </h1>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="modal-body rating-box text-dark">
                            Approve {context.employee.name} leave Request ?
                            <br />
                            Already taken Leavedays -{" "}
                            {context.employee.days?.leaveday || 0}
                        </div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn border-danger text-danger reject"
                                data-bs-dismiss="modal"
                            >
                                No
                            </button>
                            <button
                                type="button"
                                class="btn border-success text-success position"
                                data-bs-dismiss="modal"
                                onClick={context.handleapprove}
                            >
                                yes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}

            {/* position */}
            <div
                class="modal fade"
                id="exampleModal1"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1
                                class="modal-title fs-5 text-dark text-bold"
                                id="exampleModalLabel"
                            >
                                Leave Request
                            </h1>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="modal-body rating-box text-dark">
                            Reject {context.employee?.name} leave Request ?
                            <br />
                            Already taken Leavedays -{" "}
                            {context.employee?.days?.leaveday || 0}
                        </div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn border-danger text-danger reject"
                                data-bs-dismiss="modal"
                            >
                                No
                            </button>
                            <button
                                type="button"
                                class="btn border-success text-success position"
                                data-bs-dismiss="modal"
                                onClick={context.handleleave}
                            >
                                yes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}
        </div>
    );
};

export default Leavecard;
