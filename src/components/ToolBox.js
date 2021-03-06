import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";

class ToolBox extends React.Component {
  state = {
    searchText: ""
  };

  handleChange = e => {
    const value = e.target.value;
    this.setState({
      searchText: value
    });
    this.props.search(value);
  };

  clearSearchText = () => {
    this.setState({
      searchText: ""
    });
    this.props.search("");
  };

  goCart = () => {
    if (!global.auth.isLogin()) {
      this.props.history.push("/login");
      toast.info("請先進行登入 !");
    }
    this.props.history.push("/cart");
  };

  render() {
    return (
      <div className="tool-box">
        <div className="logo-text">Store</div>
        <div className="search-box">
          <div className="field has-addons">
            <div className="control">
              <input
                type="text"
                placeholder="Rounded input"
                className="input search-input"
                value={this.state.searchText}
                onChange={this.handleChange}
              ></input>
            </div>
            <div className="control">
              <button className="button" onClick={this.clearSearchText}>
                X
              </button>
            </div>
          </div>
        </div>
        <Link to="/cart" className="cart-box" onClick={this.goCart}>
          <i class="fas fa-shopping-cart"></i>
          <span className="cart-num">({this.props.cartNum})</span>
        </Link>
      </div>
    );
  }
  // eslint-disable-next-line no-unused-expressions
}

export default withRouter(ToolBox);
