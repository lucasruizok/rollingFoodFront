import { Badge, Table } from 'antd';
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { DataContext } from '../../context/DataContext';

export const AdminOrders = () => {
  const { cart } = useContext(DataContext);
  const URL = 'http://localhost:3400';
  const [pizzasOrders, setPizzasOrders] = useState([]);
  const [usersOrders, setUsersOrders] = useState([]);

  const getOrders = async () => {
    const response = await axios.get(`${URL}/pedidos`);
    const orders = response.data.pedidos;
    orders.forEach((order) => setPizzasOrders(order.producto));
  }

  useEffect(() => {
    getOrders();
  }, [])

  const expandedRowRender = () => {
    const columns = [
      {
        title: 'Pizza',
        dataIndex: 'precio',
        key: 'precio',
      },
      {
        title: 'Cantidad',
        dataIndex: 'cantidad',
        key: 'cantidad',
      },
    ];
    return <Table columns={columns} dataSource={pizzasOrders} pagination={false} />;

  }
  const columns = [
    {
      title: 'Cliente',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Fecha',
      dataIndex: 'platform',
      key: 'platform',
    },
    {
      title: 'Telefono',
      dataIndex: 'version',
      key: 'version',
    },
    {
      title: 'Importe Total',
      dataIndex: 'upgradeNum',
      key: 'upgradeNum',
    },
    {
      title: 'Estado Pedido',
      dataIndex: 'estado',
      key: 'estado',
    },
    {
      title: 'NADAAA',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Action',
      key: 'operation',
      render: () => <button>Realizado</button>,
    },
  ];
  const data = [];

  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i.toString(),
      name: 'Screem',
      platform: 'iOS',
      version: '10.3.4.5654',
      upgradeNum: 500,
      creator: 'Jack',
      createdAt: '2014-12-24',
    });
  }
  return (
    <>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender,
          defaultExpandedRowKeys: ['0'],
        }}
        dataSource={data}
        size="small"
      />
    </>

  )

}
