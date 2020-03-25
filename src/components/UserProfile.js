import React from "react";

class UserProfile extends React.Component {
  logout = () => {
    global.auth.logout();
    this.props.close("logout");
  };

  render() {
    const { email, password, nickname, type } = this.props.user;
    console.log("email(in UserProfile): ", email);
    console.log("password(in UserProfile) : ", password);
    console.log("nickname(in UserProfile): ", nickname);
    console.log("type(in UserProfile): ", type);

    return (
      <div className="user-profile">
        <p className="title	has-text-centered">Profile</p>
        <fieldset disabled>
          <div className="field">
            <div className="control">
              <label className="label">Nickname</label>
              <input className="input" type="text" defaultValue={nickname} />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">Email</label>
              <input className="input" type="text" defaultValue={email} />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">Type</label>
              <input
                className="input"
                type="text"
                defaultValue={type === 1 ? "Manager" : "General	User"}
              />
            </div>
          </div>
        </fieldset>
        <br /> <br />
        <div className="field	is-grouped	is-grouped-centered">
          <div className="control">
            <button
              className="button	is-danger"
              type="button"
              onClick={this.logout}
            >
              Logout
            </button>
          </div>
          <div className="control">
            <button
              className="button"
              type="button"
              onClick={() => {
                this.props.close();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
