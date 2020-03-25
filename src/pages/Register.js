import React from "react";
import { useForm } from "react-hook-form";
import "css/app.scss";
import "css/style.scss";
import axios from "../commons/axios";
import { toast } from "react-toastify";

const Register = props => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async data => {
    //console.log(data);
    try {
      const { nickname, email, password } = data;
      const res = await axios.post("/auth/register", {
        email,
        password,
        nickname,
        type: 0
      });
      const jwToken = res.data;
      global.auth.setToken(jwToken);
      toast.success("註冊成功 !");
      props.history.push("/"); //跳轉到首頁
    } catch (error) {
      const { message } = error.response.data;
      toast.error(message);
    }

    //event.preventDefault(); // 阻止默認事件行為
    //    console.log(this.emailRef.current.value);
    //   console.log(this.passwordRef.current.value);
    //獲取表單數據
    /*const formData = {
      email: this.emailRef.current.value,
      password: this.passwordRef.current.value
    };*/
    //this.props.history.push("/"); //跳轉到首頁
  };
  console.log(errors);

  return (
    <div className="login-wrapper">
      <form className="box login-box" onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label className="label">Nickname</label>
          <div className="control">
            <input
              className={`input ${errors.nickname && "is-danger"}`}
              type="text"
              placeholder="Nickname"
              /*ref={this.emailRef}*/
              /*value={this.state.email}
              onChange={this.handleChange}*/
              name="nickname"
              ref={register({
                required: "nickname is required"
              })}
            ></input>
            {errors.nickname && (
              <p className="helper has-text-danger">
                {errors.nickname.message}
              </p>
            )}
          </div>
        </div>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className={`input ${errors.email && "is-danger"}`}
              type="text"
              placeholder="Email"
              /*ref={this.emailRef}*/
              /*value={this.state.email}
              onChange={this.handleChange}*/
              name="email"
              ref={register({
                required: "email is required",
                pattern: {
                  value: /^([\w\.\-]){1,64}\@([\w\.\-]){1,64}$/,
                  message: "無效的email帳號"
                }
              })}
            ></input>
            {errors.email && (
              <p className="helper has-text-danger">{errors.email.message}</p>
            )}
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className={`input ${errors.password && "is-danger"}`}
              type="text"
              placeholder="Password"
              //ref={this.passwordRef}
              /*value={this.state.password}
              onChange={this.handleChange}*/
              name="password"
              ref={register({
                required: true,
                minLength: { value: 6, message: "密碼不得小於六位" }
              })}
            ></input>
            {errors.password && (
              <p className="helper has-text-danger">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>
        <div className="control">
          <button className="button is-fullwidth is-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
