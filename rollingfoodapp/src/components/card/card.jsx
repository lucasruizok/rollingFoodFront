import React from "react";
import "./card.css";
import "../../index.css";
import 'animate.css';
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { ButtonCard } from "../buttons/ButtonCard";

export const Card = ({ item }) => {
  const { descuento, detalle, nombre, precio, _id, imgUrl } = item;
  const { addCart } = useContext(DataContext);
  return (
    <div className="card shadow p-3 mb-4 bg-body rounded">
      <div className="row g-0 mt-1">
        <div className="col-4 img-container">
          <img src={imgUrl} className="img-card" />
        </div>
        <div className="col-8">
          <div className="card-body-rolling">
            <div className="content">
              <h5 className="mt-2 title">{nombre}</h5>
            </div>
            <div className="content">
              <p className="price">Precio ${precio - descuento}</p>
              <p className="description">Ingredientes: {detalle}</p>
            </div>
            <ButtonCard addCart={addCart} _id={_id} />
          </div>
        </div>
      </div>
    </div>
  );
}
