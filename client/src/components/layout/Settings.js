import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Settings = ({ auth: {user, isAuthorized}, logout }) => {
    return (
        <div className="settings" id="settings">
            { isAuthorized ? <h4> {user.name} </h4> : null }
            <button className="transparent-btn" onClick={logout}>Log Out</button>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Settings);
