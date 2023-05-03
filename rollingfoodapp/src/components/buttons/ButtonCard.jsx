import React from 'react'

export const ButtonCard = ({addCart, _id}) => {
  return (
    <div className="content mb-1">
              <button className="btn btn-rolling" onClick={() => addCart(_id)}>Añadir a mi carrito</button>
    </div>
  )
}
