import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import "./cart.css"

export const Cart = () => {
  const [price, setPrice] = useState(0);
  const { cart, setCart } = useContext(DataContext);

  const handleRemove = (id) => {
    if (window.confirm('¿Está seguro de querer elminar esta pizza de su pedido?')) {
      const pizza = cart.filter((item) => item._id !== id);
      setCart(pizza);
      localStorage.setItem('dataCart', JSON.stringify(pizza))
      handlePrice();
    }
  };
  const handleChange = (item, d) => {
    const ind = cart.indexOf(item);
    const pizza = cart;
    pizza[ind].amount += d;
    if (pizza[ind].amount === 0) pizza[ind].amount = 1;
    setCart([...pizza]);
  };
  const handlePrice = () => {
    let ans = 0;
    cart.map((item) => {
      ans += item.amount * item.precio});
    setPrice(ans);
  };

  useEffect(() => {
    handlePrice();
  });

  return (
    <article>
      {cart ?
        cart.map((item) => (
          <div className="cart_box" key={item._id}>
            <div className="cart_img">
              <img src={item.imgUrl} />
              <p>{item.nombre}</p>
            </div>
            <div>
              <button onClick={() => handleChange(item, 1)}>+</button>
              <button>{item.amount}</button>
              <button onClick={() => handleChange(item, -1)}>-</button>
            </div>
            <div>
              <span>$ {item.precio}</span>
              <button onClick={() => handleRemove(item._id)}>Eliminar</button>
            </div>
          </div>
        ))
        : ' '
        }
      <div className="total">
        <span>Precio total de tu compra</span>
        <span>${price}</span>
      </div>
    </article>
  );
};