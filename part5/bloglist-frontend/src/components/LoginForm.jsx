const LoginForm = ({ setuName, setPass, loginHandler, currentuName, currentpass }) => (
    <form onSubmit={loginHandler}>
        <div>
            Username
            <input type="text" value={currentuName} name="Username" onChange={({ target }) => setuName(target.value)} />
        </div>
        <div>
            Password
            <input type="text" value={currentpass} name="Password" onChange={({ target }) => setPass(target.value)} />
        </div>
        <button type="submit">Login</button>
    </form>
)

export default LoginForm
