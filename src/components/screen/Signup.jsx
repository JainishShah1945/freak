import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const freakname = useRef();
  const freakemail = useRef();
  const freaklocation = useRef();
  const freakpassword = useRef();
  const handleonsubmit = async (e) => {
    e.preventDefault();
    const username = freakname.current.value;
    const email = freakemail.current.value;
    const location = freaklocation.current.value;
    const password = freakpassword.current.value;

    const response = await fetch("http://localhost:1000/app/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        email: email,
        location: location,
        password: password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      navigate("/");
    } else {
      alert("Please enter valid values");
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleonsubmit}>
          <div className="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              ref={freakname}
              //onChange={handleonchange}
              className="form-control"
              id="exampleInputName1"
              placeholder="Enter your name.."
            />
          </div>

          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              ref={freakemail}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label for="name">Address</label>
            <textarea
              type="text"
              ref={freaklocation}
              className="form-control"
              id="exampleInputAddress1"
              placeholder="Enter your name.."
            />
          </div>

          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              ref={freakpassword}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to={"/Login"} className="m-3 btn btn-danger">
            Already a user?
          </Link>
        </form>
      </div>
    </>
  );
}

export default Signup;
