import React, { useContext } from 'react'
import { Space, Switch, Table } from 'antd';
import { ModalAddProduct } from '../../components/modalAddProduct/ModalAddProduct';
import { ModalEditProduct } from '../../components/modalEditProduct/ModalEditProduct';
import { DataContext } from '../../context/DataContext';

export const AdminProducts = () => {

  const { pizzas, handleDeletePizza, setPizzas } = useContext(DataContext);

  const columns = [
    {
      title: 'Imagen',
      dataIndex: 'imgUrl',
      key: 'imagen',
      render: (urlImg) => <img src={urlImg} width={50} height={50} />,
    },
    {
      title: 'Pizza',
      dataIndex: 'nombre',
      key: 'nombre',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Categoria',
      dataIndex: 'categoria',
      key: 'categoria',
    },
    {
      title: 'Detalle',
      dataIndex: 'detalle',
      key: 'detalle',
    },
    {
      title: 'Precio',
      dataIndex: 'precio',
      key: 'precio',
      render: (precio) => (<span> $ {precio}</span>)
    },
    {
      title: 'Descuento',
      dataIndex: 'descuento',
      key: 'descuento',
      render: (descuento) => (<span> $ {descuento}</span>)
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      render: (_, pizza) => (
        pizza.estado ?
          <div>
            <Switch size="small" onClick={() => handleStatus(pizza)} checked='true' />
            <span>Activo</span>
          </div> :
          <div>
            <Switch size="small" onClick={() => handleStatus(pizza)} />
            <span>Inactivo</span>
          </div>
      )
    },
    {
      title: 'Acciones',
      key: 'action',
      render: (pizza) => (
        <Space size="middle">
          <ModalEditProduct idProduct={pizza._id} />
          <button onClick={() => handleDeletePizza(pizza._id)} className='btn btn-danger'>Eliminar</button>
        </Space>
      ),
    },
  ];

  const handleStatus = (pizza) => {
    const newPizzas = [...pizzas];
    const newPizza = newPizzas.find((pizzaDb) => pizzaDb.id === pizza.id);
    newPizza.estado = !newPizza.estado;
    setPizzas(newPizzas);
  }

  const dataTable = [
    {
      image: 1,
      pizza: 'muzza',
      category: 'tradicionales',
      detail: 'muzza con cebolla y salsa',
      price: 150,
      discount: 20,
      state: true,
    }
  ]
  return (
    <>
      <h1 className='text-center p-0 m-0'>ADMINISTRADOR DE PRODUCTOS</h1>
      <ModalAddProduct />
      <Table columns={columns} dataSource={dataTable} />
    </>
  )
}
