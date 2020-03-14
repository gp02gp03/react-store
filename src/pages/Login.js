import React from "react";
import "css/app.scss";
import "css/style.scss";

class Login extends React.Component {
  //state
  state = { email: "", password: "" };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value.toUpperCase() });
  };

  /*ref
  emailRef = React.createRef();
  passwordRef = React.createRef();

  handleSummit = event => {
    event.preventDefault(); // 阻止默認事件行為
    //    console.log(this.emailRef.current.value);
    //   console.log(this.passwordRef.current.value);
    //獲取表單數據
    const formData = {
      email: this.emailRef.current.value,
      password: this.passwordRef.current.value
    };

    this.props.history.push("/"); //跳轉到首頁
  };*/

  render() {
    return (
      <div className="login-wrapper">
        <form className="box login-box" onSubmit={this.handleSummit}>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Email"
                /*ref={this.emailRef}*/

                value={this.state.email}
                onChange={this.handleChange}
              ></input>
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Password"
                //ref={this.passwordRef}
                value={this.state.password}
                onChange={this.handleChange}
              ></input>
            </div>
          </div>
          <div className="control">
            <button className="button is-fullwidth is-primary">Login</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
