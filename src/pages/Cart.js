import React, { useState, useEffect } from "react";
import Layout from "Layout";
import CartItem from "components/CartItem";
import axios from "../commons/axios";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const Cart = () => {
  const [carts, setCarts] = useState([]);
  useEffect(() => {
    axios.get("/carts").then(res => {
      setCarts(res.data);
    });
  }, []);

  const totalPrice = () => {
    return carts
      .map(cart => cart.mount * parseInt(cart.price))
      .reduce((a, value) => a + value, 0);
  };

  const updateCart = cart => {
    const newCarts = [...carts];
    const _index = newCarts.findIndex(c => c.id === cart.id);
    newCarts.splice(_index, 1, cart);
    setCarts(newCarts);
  };

  const deleteCart = cart => {
    const _carts = carts.filter(c => c.id !== cart.id);
    setCarts(_carts);
  };

  return (
    <Layout>
      <div className="cart-page">
        <span className="cart-title">Shopping Cart</span>
        <div className="cart-list">
          <TransitionGroup component={null}>
            {/**<CartItem /> */}
            {carts.map(cart => (
              <CSSTransition className="cart-item" timeout={300} key={cart.id}>
                <CartItem
                  key={cart.id}
                  cart={cart}
                  updateCart={updateCart}
                  deleteCart={deleteCart}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        {carts.length === 0 ? (
          <p className="no-cart">購物車中無任何商品</p>
        ) : (
          ""
        )}
        <div className="cart-total">
          <div className="total-price">Total: {totalPrice()}</div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
