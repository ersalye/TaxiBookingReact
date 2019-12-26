import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsers, deleteUser } from "../actions/UserActions.action";
import { confirmAlert } from "react-custom-confirm-alert"; // Import

class Users extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>USERS</h1>
            </div>
        );
    }
}
// const mapStateToProps = (state) => {
//     return {
//         users: state.users.users
//     };
// };
// export default connect(mapStateToProps)(Users);
export default Users;
