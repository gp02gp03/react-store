import React, { useState } from "react";
import axios from "../commons/axios";

const CartItem = props => {
  const [mount, setMount] = useState(props.cart.mount);
  const { id, name, image, price } = props.cart;
  const sumPrice = mount * parseInt(price);

  const handleChange = e => {
    const _mount = e.target.value;
    setMount(_mount);
    const newCart = {
      ...props.cart,
      mount: _mount
    };

    axios.put(`/carts/${id}`, newCart).then(res => {
      props.updateCart(newCart);
    });
  };

  const deleteCart = () => {
    axios.delete(`/carts/${id}`).then(res => {
      props.deleteCart(props.cart);
    });
  };
  return (
    <div className="columns is-vcentered">
      <div className="is-narrow">
        <img src={image} name={image} width="100" />
      </div>
      <div className="column cart-name">{name}</div>
      <div className="column">
        <div className="price">{price}</div>
      </div>

      <div className="column ">
        <input
          type="number"
          className="input num-input"
          defaultValue={mount}
          min={1}
          onChange={handleChange}
        />
      </div>

      <div className="column ">
        <span className="sum-price">$ {sumPrice}</span>
      </div>
      <div className="column is-narrow">
        <button
          className="close"
          class="button is-link is-rounded"
          onClick={deleteCart}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CartItem;
