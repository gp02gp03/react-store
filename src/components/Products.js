import React from "react";

import ToolBox from "components/ToolBox";
import Product from "components/Product";
import axios from "../commons/axios";

import { TransitionGroup, CSSTransition } from "react-transition-group";

import Panel from "components/Panel";
import AddInventory from "components/AddInventory";

class Products extends React.Component {
  /*products = [
    {
      id: 1,
      name: "Air	Jordan	4",
      image: "/images/1.jpg",
      tags: "92	",
      price: 5800,
      status: "available"
    },
    {
      id: 2,
      name: "Nike	Paul	George	PG	3",
      image: "/images/2.jpg",
      tags: "25	Colors",
      price: 4600,
      status: "available"
    },
    {
      id: 3,
      name: "Jordan	Why	Not	Zer0.2",
      image: "/images/3.jpg",
      tags: "16	Color,	y",
      price: 5200,
      status: "available"
    },
    {
      id: 4,
      name: "Nike	Air	Foamposite	One",
      image: "/images/4.jpg",
      tags: "84	Colors",
      price: 3990,
      status: "available"
    },
    {
      id: 5,
      name: "adidas	Harden	Vol.3",
      image: "/images/5.jpg",
      tags: "34	Colors",
      price: 4250,
      status: "unavailable"
    }
  ];*/

  state = { products: [], sourceProducts: [], cartNum: 0 };
  componentDidMount() {
    axios.get("/products").then(response => {
      console.log(response.data);
      this.setState({
        products: response.data,
        sourceProducts: response.data
      });
    });
    this.updateCartNum();
  }

  search = text => {
    let _products = [...this.state.sourceProducts];
    _products = _products.filter(p => {
      const matchArray = p.name.match(new RegExp(text, "gi"));
      return !!matchArray;
    });

    this.setState({ products: _products });
  };

  toAdd = () => {
    Panel.open({
      component: AddInventory,
      cb: data => {
        if (data) {
          this.add(data);
        }
        console.log("Products Data: ", data);
      }
    });
  };

  add = product => {
    const _products = [...this.state.products];
    _products.push(product);
    const _sProducts = [...this.state.sourceProducts];
    _sProducts.push(product);
    this.setState({ products: _products, sourceProducts: _sProducts });
  };

  update = product => {
    const _products = [...this.state.products];
    const _index = _products.findIndex(p => p.id === product.id);
    _products.splice(_index, 1, product);

    const _sProducts = [...this.state.sourceProducts];
    const _sIndex = _products.findIndex(p => p.id === product.id);
    _sProducts.splice(_sIndex, 1, product);

    this.setState({ products: _products, sourceProducts: _sProducts });
  };

  delete = id => {
    const _products = this.state.products.filter(p => p.id !== id);
    const _sProducts = this.state.sourceProducts.filter(p => p.id !== id);
    this.setState({ products: _products, sourceProducts: _sProducts });
  };

  updateCartNum = async () => {
    const num = await this.getCartCount();
    this.setState({ cartNum: num });
  };

  getCartCount = async () => {
    const res = await axios.get(`/carts`);
    const carts = res.data || [];
    const cartNum = carts
      .map(c => c.mount)
      .reduce((accumulator, value) => accumulator + value, 0);
    return cartNum || 0;
  };

  render() {
    return (
      <div>
        <ToolBox search={this.search} cartNum={this.state.cartNum} />
        <div className="products">
          <div class="columns is-multiline is-desktop">
            <TransitionGroup component={null}>
              {this.state.products.map(element => {
                return (
                  <CSSTransition
                    className="product-fade"
                    timeout={300}
                    key={element.id}
                  >
                    <div className=" is-3" key={element.id}>
                      <Product
                        product={element}
                        update={this.update}
                        delete={this.delete}
                        updateCartNum={this.updateCartNum}
                      />
                    </div>
                  </CSSTransition>
                );
              })}
            </TransitionGroup>

            {/*<div className="columns is-3">
              <Product />
            </div>
            <div className="columns is-3">
              <Product />
            </div>

            <div className="columns is-3">
              <Product />
            </div>
            <div className="columns is-3">
              <Product />
    </div>*/}
          </div>
          <button className="button is-primary add-btn" onClick={this.toAdd}>
            add
          </button>
        </div>
      </div>
    );
  }
}

export default Products;
