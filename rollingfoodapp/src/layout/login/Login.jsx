import React from 'react'
import { Button, Form, Input, Row, Col } from 'antd';
import { DataContext } from '../../context/DataContext';
import { useContext } from 'react';

export const Login = () => {
  const { login } = useContext(DataContext);

  async function handleSubmitFinish(values) {
    const loginData = values;
    login(loginData);
  }
  function createUser() {

  }

  return (
    <>
      <Row justify='center' className='p-lg pt-5'>
        <Col span={16}>
          <h2 className='text-center'>INICIAR SESION</h2>
          <Form labelCol={{ span: 8 }}
            wrapperCol={{ span: 12 }}
            onFinish={(handleSubmitFinish)}>
            <Form.Item
              label='Email'
              name='mail'
              rules={[
                { required: true, message: 'Por favor introducir email' },
                { type: 'email', message: 'el correo debe ser valido' }
              ]}>
              <Input type='email' minLength={3} />
            </Form.Item>
            <Form.Item
              label='Contraseña'
              name='password'
              rules={[
                { required: true, message: 'Por favor introducir contraseña' },
                { type: 'password' },
                { min: 4, message: 'Este campo necesita minimo de 4 caracteres' }
              ]}>
              <Input type='password'
                minLength={4}
                maxLength={12} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 12, span: 12 }}>
              <Button type="primary"
                danger
                onClick={createUser}
                htmlType="submit"
                className='mx-5'>
                Registrarse
              </Button>
              <Button type="primary"
                htmlType="submit">
                Ingresar
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>

    </>
  )
}
