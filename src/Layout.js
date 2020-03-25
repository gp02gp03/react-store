import React, { useMemo } from "react";
import Header from "./components/Header.js";
class Layout extends React.Component {
  user = () => {
    return global.auth.getUser() || {};
  };

  render() {
    //const userInfo = JSON.stringify(global.auth.getUser());
    //console.log("Layout get user info : ", userInfo);
    const { email, password, nickname, type } = global.auth.getUser() || {};
    console.log("email(in Layout): ", email);
    console.log("password(in Layout): ", password);
    console.log("nickname(in Layout): ", nickname);
    console.log("type(in Layout): ", type);

    return (
      <div className="main">
        <Header
          email={email}
          password={password}
          nickname={nickname}
          type={type}
        />
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
