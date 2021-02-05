import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { register, loadUser } from '../../actions/auth';
import pineapple from '../../img/graphics/pineapple.png';


const Register = ({ register, loadUser, history, isAuthenticated }) => {
  useEffect(() => {
    loadUser();

  }, [loadUser]);

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated, history])

  const [formData, setFormData] = useState({
    name: '',
    password: '',
    password2: ''
  });


  const { name, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      console.log('Passwords don\'t match ');
    }

    register(name, password);
  }

  return (
      <div className="container">
        <div className="stitched-box auth">
          <div className="form-container register">
            <img class="form-icon" src={pineapple} alt="" />
            <h2 className="form-heading">Create a new account</h2>
            <form onSubmit={onSubmit}>
              <input type="text" name="name" id="name" placeholder="Username" value={name} onChange={onChange} />
              <input className="mt-4" type="password" name="password" id="password" placeholder="Password" value={password} onChange={onChange} />
              <input type="password" name="password2" id="password2" placeholder="Confirm Password" value={password2} onChange={onChange} />
              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      </div>

  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { register, loadUser })(Register);
