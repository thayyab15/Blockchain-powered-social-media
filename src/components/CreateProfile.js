import React from "react";

export default function CreateProfile(props) {
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const name= nameRef.current.value;
    props.createProfile(name);
  };

  const nameRef = React.useRef(null);
  return (
    <div className="create-profile-outer-div">
      <div className="container">
        <h2>Register to DC-SOCIAL</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label for="exampleInputEmail1" className="name-on-createprof">Name</label>
            <input
              id=""
              name
              type="text"
              ref={nameRef}
              className="form-control"
              placeholder="Enter Your name"
              required
            />
          </div>
          <div className="button-from-createprof">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
