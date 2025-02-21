import React from "react";
import './UserDetails.scss';

function UserDetails(props) {
  const onEditUser = (event, user) => {
    props.onEditUser(user);
  }

  const onDeleteUser = (user) => {
    props.onDeleteUser(user);
  }

  return (
    <div className="user-details" >
      {props.users.length === 0 && <p>No users!</p>}
      {/* props.users.length && <table ... */} {/* megjelenít egy 0-át a DOM-ban */}
      {props.users.length > 0 &&
        <table className="users-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Date Of Birth</th>
              <th>Gender</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.fname} {user.lname}</td>
                  <td>{user.email}</td>
                  <td>{user.dateOfBirth}</td>
                  <td>{user.gender}</td>
                  <td>
                    <button className="btn btn-primary" onClick={(event) => onEditUser(event, user)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => onDeleteUser(user)}>Delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      }
    </div>
  )
}

export default UserDetails;