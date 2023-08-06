import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MetaData } from "../layout/MetaData";
import { toast } from "react-toastify";
import { allUsers } from "../../features/user/allUsersSlice";
import { Loader } from "../layout/Loader";
import { MDBDataTable } from "mdbreact";
import { Sidebar } from "./Sidebar";

export const UsersList = () => {
  const CLEAR_ERRORS = "CLEAR_ERRORS";
  const dispatch = useDispatch();
  const { loading, error, users } = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(allUsers());
    if (error) {
      toast(`${error.message}`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      dispatch({ type: CLEAR_ERRORS });
    }
    // if (deleteError) {
    //   toast(`${error.message}`, {
    //     position: "top-right",
    //     autoClose: 1000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //   });
    //   dispatch({ type: CLEAR_ERRORS });
    // }
    // if (isDeleted) {
    //   navigate("/admin/orders");
    //   toast(`${message}`, {
    //     position: "top-right",
    //     autoClose: 1000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //   });
    //   dispatch({ type: RESET_DELETE_BOOK });
    // }
  }, [dispatch, error]);

  const setUsers = () => {
    const data = {
      columns: [
        {
          label: "User Id:",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Role",
          field: "role",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    users.forEach((user) => {
      data.rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        actions: (
          <>
            <Link
              to={`/admin/user/${user._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button className="btn btn-danger py-1 px-2 ml-2" type="button">
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });
    return data;
  };
  return (
    <>
      <MetaData title={"All Users"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10 mt-5">
          {loading ? (
            <Loader />
          ) : (
            <>
              <MDBDataTable
                data={setUsers()}
                className="px-3"
                bordered
                striped
                hover
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};
