import PropTypes from 'prop-types'
const LoginForm = ({ userLoginData, setUserLoginData, loginHandler }) => (
  <form onSubmit={loginHandler}>
    <div>
      Username
      <input type="text" value={userLoginData.uName} name="Username"
        onChange={({ target }) => setUserLoginData({ ...userLoginData, uName: target.value })} />
    </div>
    <div>
      Password
      <input type="text" value={userLoginData.pass} name="Password"
        onChange={({ target }) => setUserLoginData({ ...userLoginData, pass: target.value })} />
    </div>
    <button type="submit">Login</button>
  </form>
)

LoginForm.propTypes = {
  userLoginData: PropTypes.object.isRequired,
  setUserLoginData: PropTypes.func.isRequired,
  loginHandler: PropTypes.func.isRequired
}

export default LoginForm
