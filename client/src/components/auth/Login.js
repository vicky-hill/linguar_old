import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { login, loadUser } from '../../actions/auth';
import pineapple from '../../img/graphics/pineapple.png';



const Login = ({ login, loadUser, history, isAuthenticated, user }) => {
    useEffect(() => {
        if (user !== 'loggedOut') {
            loadUser();
        }

    }, [loadUser, user, history]);

    useEffect(() => {
        if (isAuthenticated) {
            history.push('/');
        }
    }, [isAuthenticated, history])

    const [formData, setFormData] = useState({
        name: '',
        password: ''
    })

    const { name, password } = formData;


    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = async e => {
        e.preventDefault();

        login(name, password);
    }

    const guestSignin = () => {
        login('guest', '1234');
    }



    return (
        <div className="container">
            <div className="stitched-box auth">
                <div className="form-container">
                    <img className="form-icon" src={pineapple} alt="" />
                    <h2 className="form-heading">Sign in to your account</h2>
                    <form onSubmit={onSubmit} >
                        <input type="text" name="name" id="name" placeholder="Username" value={name} onChange={onChange} />
                        <input type="password" name="password" id="password" placeholder="Password" value={password} onChange={onChange} />
                        <button type="submit">Sign in</button>
                    </form>
                    <div className="guest-login-box" onClick={guestSignin}>
                    <p className="guest-login"> Sign in as a guest,</p> <p className="guest-login"> No account needed!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps, { login, loadUser})(Login);

