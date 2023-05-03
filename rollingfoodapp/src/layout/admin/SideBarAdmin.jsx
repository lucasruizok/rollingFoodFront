import React from 'react'
import { List } from 'antd';
import { NavLink } from 'react-router-dom';
import './admin.css'


export const SideBarAdmin = () => {
    const data = [
        {
            title: 'Usuarios',
            path: 'users',
            class: 'bi bi-people-fill'
        },
        {
            title: 'Productos',
            path: 'products',
            class: 'bi bi-shop'
        },
        {
            title: 'Pedidos',
            path: 'orders',
            class: 'bi bi-border-width'
        },
    ];
    let activeStyle = {
        textDecoration: "underline",
    };
    return (
        <>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                    <NavLink to={item.path ?? '/'}
                        className='elementSideBar'
                        style={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }>
                        <List.Item className='sideBarItem'>
                            <i className={item.class + ' px-3'}></i>
                            <List.Item.Meta
                                title={item.title} />
                        </List.Item>
                    </NavLink>
                )}
            />
        </>
    )
}
