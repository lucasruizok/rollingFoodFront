import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Form, Modal, Button } from 'antd';
import 'antd/dist/antd.css';
import useForm from '../../useForm';
import '../../layout/admin/admin.css';
import { DataContext } from '../../context/DataContext';

export const ModalAdmin = ({ handleAddUser }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const initialState = { firstName: '', lastName: '', mail: '', nameUser: '', password: '', confirmPassword:'', age:0, phone:0 };
    const {URL} = useContext(DataContext);

    const onSubmit = () => {
        if (password === confirmPassword) {
            const newUser = {
                firstName: firstName,
                lastName: lastName,
                mail: mail,
                nameUser: nameUser,
                password: password,
                age: age,
                phone: phone
            }
            handleAddUser(newUser);
            axios.post(`${URL}/user`, newUser);
        } else {
            alert('Las contraseñas no coinciden');
        }
    }
    const { formData, handleInputChange, handleSubmit } = useForm(
        initialState,
        onSubmit
    );
    const { firstName, lastName, mail, nameUser, password, confirmPassword, phone, age } = formData;
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleCancelModal = () => {
        setIsModalVisible(false);
    };

    return (
        <>

            <Button type="primary"
                className='mb-2'
                onClick={showModal}>
                Registrar Usuario
            </Button>
            <Modal title="Registro de Usuario"
                visible={isModalVisible}
                onCancel={handleCancelModal}
                footer={[
                    <Form.Item key={1}>
                        <Button htmlType='button' onClick={handleCancelModal}>Cancelar</Button>
                        <Button htmlType='submit' onClick={handleSubmit}>Registrar</Button>
                    </Form.Item>
                ]}>
                <div>
                    <div className='row'>
                        <div className="mb-3 col-6">
                            <label for="firstName" className="form-label">Nombre</label>
                            <input type="text"
                                value={firstName}
                                onChange={handleInputChange}
                                className="form-control"
                                id="firstName"
                                minLength={3}
                                maxlength={20}
                                required />
                        </div>
                        <div className="mb-3 col-6">
                            <label for="lastName" className="form-label">Apellido</label>
                            <input type="text"
                                value={lastName}
                                onChange={handleInputChange}
                                className="form-control"
                                id="lastName"
                                minLength={3}
                                maxlength={20}
                                required />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label for="mail" className="form-label">Email</label>
                        <input type="email"
                            value={mail}
                            onChange={handleInputChange}
                            className="form-control"
                            id="mail"
                            placeholder="nombre@ejemplo.com"
                            minLength={10}
                            maxLength={30}
                            required />
                    </div>
                    <div>
                        <label htmlFor="phone" className='form-label'>Telefono Celular</label>
                        <div className='input-group mb-3'>
                            <span for="phone" className='input-group-text'>+54</span>
                            <input type="number"
                                value={phone}
                                onChange={handleInputChange}
                                id='phone'
                                required
                                minLength={1}
                                maxLength={10}
                                className='form-control' />
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3 col-6">
                            <label for="nameUser" className="form-label">Usuario</label>
                            <input type="text"
                                value={nameUser}
                                onChange={handleInputChange}
                                className="form-control" id="nameUser"
                                required
                                maxLength={15}
                                minLength={4} />
                        </div>
                        <div className="col-6">
                            <label for="age" className="form-label">Edad</label>
                            <input type="number"
                                value={age}
                                onChange={handleInputChange}
                                className="form-control" id="age"
                                required
                                max={99}
                                min={18} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3 col-6">
                            <label for="password" className="form-label">Ingresar Contraseña</label>
                            <input type="password"
                                value={password}
                                onChange={handleInputChange}
                                className="form-control" id="password"
                                minlength="4" maxlength="12"
                                required />
                        </div>
                        <div className="mb-3 col-6">
                            <label for="password2" className="form-label">Confirmar Contraseña</label>
                            <input type="password"
                                value={confirmPassword}
                                onChange={handleInputChange}
                                className="form-control" id="password2"
                                minlength="4" maxlength="12"
                                required />
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}
