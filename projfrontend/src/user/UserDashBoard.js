import React from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/index";

const UserDashboard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const userLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">User Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
                     <Link  to="/order/create/userId" className="nav-link text-success"> Create Order</Link>
                    </li>
          <li className="list-group-item">
                     <Link  to="/order/status/userId" className="nav-link text-success"> Status</Link>
                    </li>
          <li className="list-group-item">
            <Link to="/order/all/userId" className="nav-link text-success">
              
              Manage Orders
            </Link>
          </li>
          {/* <li className="list-group-item">
                     <Link  to="/admin/products" className="nav-link text-success"> Manage Products</Link>
                    </li> */}
        </ul>
      </div>
    );
  };

  const userRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">User Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2 text-success">Name:</span>{" "}
            {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2 text-success">
              Email:
            </span>{" "}
            {email}
          </li>
          <li className="list-group-item">
            <span className="badge text-danger">User Area</span>
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Base
      title="UserDashboard Page"
      description="Manage all your ordered products here"
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col-3">{userLeftSide()}</div>
        <div className="col-9">{userRightSide()}</div>
      </div>
    </Base>
  );
};

export default UserDashboard;
