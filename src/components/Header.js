import React from "react";
import { Link, withRouter } from "react-router-dom";
import UserProfile from "./UserProfile";
import Panel from "./Panel";

class Header extends React.Component {
  toProfile = () => {
    //const { email, password, nickname, type } = this.props;
    console.log("email(in Header): ", this.props.email);
    console.log("password(in Header) : ", this.props.password);
    console.log("nickname(in Header): ", this.props.nickname);
    console.log("type(in Header): ", this.props.type);

    Panel.open({
      component: UserProfile,
      props: {
        user: {
          email: this.props.email,
          password: this.props.password,
          nickname: this.props.nickname,
          type: this.props.type
        }
      },
      cb: data => {
        console.log(data);
        if (data === "logout") {
          this.props.history.go(0);
        }
      }
    });
  };
  //console.log("nickname: " + nickname);
  render() {
    return (
      <div className="header">
        <div className="grid">
          <div className="start">
            <Link to="/">Home</Link>
          </div>
          <div className="end">
            {this.props.nickname ? (
              <span className="nickname" onClick={this.toProfile}>
                <i className="far	fa-user"></i> {this.props.nickname}
              </span>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
