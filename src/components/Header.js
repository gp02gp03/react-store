import React from "react";

class Header extends React.Component {
  renderLink = () => {
    const { username } = this.props;
    return username ? (
      <span className="username">
        <i class="fas fa-user-check"></i>
        {username}
      </span>
    ) : (
      <React.Fragment>
        <a href="/">LOGIN</a>
        <a href="/">REGISTER</a>
        <span className="username">{username}</span>
      </React.Fragment>
    );
  };
  render() {
    return (
      <div className="header">
        <div className="grid">
          <div className="start">
            <a href="/">Home</a>
          </div>
          <div className="end">{this.renderLink()}</div>
        </div>
      </div>
    );
  }
}

export default Header;

/*
const Header = props => {
  const { username } = props;
  return (
    <div className="header">
      <div className="grid">
        <div className="start">
          <a href="/">Home</a>
        </div>
        <div className="end">
          {username ? (
            <span className="username">
              <i class="fas fa-user-check"></i>
              <span>{username}</span>
            </span>
          ) : (
            <React.Fragment>
              <a href="/">LOGIN</a>
              <a href="/">REGISTER</a>
              <span className="username">{username}</span>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};
 */
