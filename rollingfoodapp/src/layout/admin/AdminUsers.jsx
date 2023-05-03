import React, { useState, useContext, useEffect } from 'react'
import { Switch, Table, Space } from 'antd';
import { ModalAdmin } from '../../components/modalAddUser/ModalAdmin';
import axios from 'axios';
import { deleteUser } from '../../services/api';
import { DataContext } from '../../context/DataContext';

export const AdminUsers = () => {
  const [data, setData] = useState([]);
  const {URL} = useContext(DataContext);
  const columns = [
    {
      title: 'Usuario',
      dataIndex: 'nameUser',
      key: 'nameUser'
    },
    {
      title: 'Telefono Celular',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Email',
      dataIndex: 'mail',
      key: 'mail'
    },
    {
      title: 'Estado',
      dataIndex: 'state',
      key: 'state',
      render: (_, user) =>
      (
        user.state ?
          <div>
            <Switch size="small" onClick={() => handleStatus(user)} checked='true' />
            <span className='mx-1'>Activo</span>
          </div> :
          <div>
            <Switch size="small" onClick={() => handleStatus(user)} />
            <span className='bg-danger text-white mx-1'>Inactivo</span>
          </div>
      )
    },
    {
      title: 'Rol',
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: 'Acciones',
      key: 'action',
      render: (_, user) => (
        <Space size="middle">
          <button className='btn btn-outline-danger' onClick={() => handleDeleteUser(user)}>Eliminar</button>
          <a className='btn btn-outline-warning'>Modificar</a>
        </Space>
      ),
    },
  ];


  useEffect(function () {
    getUsers();
  }, [])

  const handleStatus = (user) => {
    const newUsers = [...data];
    const newUser = newUsers.find((userDb) => { return userDb._id === user._id });
    newUser.state = !newUser.state;
    setData(newUsers);
  }

  const getUsers = async () => {
    const res = await axios.get(URL + '/users');
    const usersDB = res.data.users;
    setData(usersDB);
  }
  const handleDeleteUser = (user) => {
    const tokenAdmin = localStorage.getItem('token');
    const deleteUserConfirm = window.confirm(`Esta seguro de que quiere eliminar el usuario ${user.nameUser}`);
    if(deleteUserConfirm){
      console.log('quier',user)
      deleteUser(user._id, tokenAdmin);
      setData([...data].filter(userDB => userDB._id != user._id));
    }
  }
  const handleAddUser = (newUser) => {
    setData([...data], newUser);
  }

  return (

    <div className='container'>
      <h4>LISTA DE USUARIOS</h4>
      <ModalAdmin handleAddUser={handleAddUser} />
      <hr />
      <Table columns={columns} dataSource={data} size="middle" />
    </div>
  )
}
