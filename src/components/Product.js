import React from "react";
import axios from "../commons/axios";
import { toast } from "react-toastify";
import Panel from "components/Panel";
import EditInventory from "components/EditInventory";
import { withRouter } from "react-router-dom";
class Product extends React.Component {
  toEdit = () => {
    Panel.open({
      component: EditInventory,
      props: {
        product: this.props.product,
        deleteProduct: this.props.delete
      },
      cb: data => {
        if (data) {
          this.props.update(data);
        }
      }
    });
  };

  addCart = async () => {
    if (!global.auth.isLogin()) {
      this.props.history.push("/login");
      toast.info("請先進行登入 !");
      return;
    }

    try {
      const user = global.auth.getUser() || {};
      const { id, name, image, price } = this.props.product;
      const res = await axios.get("/carts", { params: { productId: id } });
      const carts = res.data;
      if (carts && carts.length > 0) {
        const cart = carts[0];
        cart.mount += 1;
        await axios.put(`/carts/${cart.id}`, cart);
      } else {
        const cart = {
          productId: id,
          name,
          image,
          price,
          mount: 1,
          userId: user.email
        };
        await axios.post("/carts", cart);
      }
      this.props.updateCartNum();

      toast.success("Add	Cart	Success");
    } catch (error) {
      toast.error("Add	Cart	Failed");
    }
  };

  rederManageBtn = () => {
    const user = global.auth.getUser() || {};
    if (user.type === 1) {
      return (
        <div className="p-head has-text-right" onClick={this.toEdit}>
          <span className="icon edit-btn">
            <i className="fas fa-sliders-h"></i>
          </span>
        </div>
      );
    }
  };

  render() {
    const { name, image, tags, price, status } = this.props.product;
    const _pClass = {
      available: "product",
      unavailable: "product out-stock"
    };

    return (
      <div className={_pClass[status]}>
        <div className="p-content">
          {this.rederManageBtn()}
          <div className="img-wrapper">
            <div className="out-stock-text">Out of Stock</div>
            <figure class="image is-4by3">
              <img src={image} alt={name} />
            </figure>
            <p className="p-tags">{tags}</p>
            <p className="p-name">{name}</p>
          </div>
        </div>
        <div className="p-footer">
          <p className="price "> $ {price} </p>
          <button
            className="add-cart"
            disabled={status === "unavailable"}
            onClick={this.addCart}
          >
            <i class="fas fa-cart-plus"></i>
            <i class="fas fa-exclamation"></i>
          </button>
        </div>
      </div>
    );
  }
  // eslint-disable-next-line no-unused-expressions
}

export default withRouter(Product);
