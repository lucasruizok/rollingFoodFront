import React, { useContext, useState } from "react";
import { editProduct, getProductById } from "../../services/api";
import { Form, Modal, Button } from 'antd';
import useForm from '../../useForm';
import 'antd/dist/antd.css';
import { DataContext } from "../../context/DataContext";

export const ModalEditProduct = ({ idProduct }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    let initialState = {};
    const { getPizzas } = useContext(DataContext);
    const colInput = 'col-9'
    const colLabel = 'col-3'

    const getProductId = () => {
        getProductById(idProduct)
            .then((response) => {
                const { nombre, precio, descuento, categoria, detalle } = response.producto;
                initialState = {
                    name: nombre,
                    price: precio,
                    discount: descuento,
                    category: categoria,
                    detail: detalle
                };
                setFormData(initialState);
            })
            .catch((error) => console.log(error));
    };

    const onSubmit = () => {
        const data = {
            nombre: name,
            precio: price,
            descuento: discount,
            detalle: detail,
            categoria: category
        };
        editProduct(data, idProduct);
        setIsModalVisible(false);
        getPizzas();
    };

    const { formData, handleInputChange, handleSubmit, setFormData } = useForm(
        initialState,
        onSubmit
    );

    const { category, discount, detail, name, price } = formData;

    const showModal = () => {
        setIsModalVisible(true);
        getProductId();
    };
    const handleCancelModal = () => {
        setIsModalVisible(false);
    };
    return (
        <>
            <button
                className='mb-2 btn btn-primary'
                onClick={showModal}>
                Modificar
            </button>
            <Modal title="Administracion de Pizzas"
                visible={isModalVisible}
                onCancel={handleCancelModal}
                footer={[
                    <Form.Item key={1}>
                        <Button htmlType='button' onClick={handleCancelModal}>Cancelar</Button>
                        <Button htmlType='submit' onClick={handleSubmit}>Modificar Pizza</Button>
                    </Form.Item>
                ]}>
                <div>
                    <div className="row">
                        <div className="col-12">
                            <h5 className='text-center mb-3'>Agregar Pizza</h5>
                            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                                
                                <div className='row mb-3'>
                                    <label htmlFor="name" className={colLabel}>Pizza</label>
                                    <div className={colInput}>
                                        <input
                                            type="text"
                                            name="name"
                                            value={name}
                                            onChange={handleInputChange}
                                            maxLength={20}
                                            className='form-control'
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="price" className={colLabel}>Precio: $</label>
                                    <div className={colInput}>
                                        <input
                                            type="number"
                                            name="price"
                                            value={price}
                                            onChange={handleInputChange}
                                            maxLength={4}
                                            className='form-control'
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="discount" className={colLabel}>Descuento: $</label>
                                    <div className={colInput}>
                                        <input
                                            type="number"
                                            name="discount"
                                            value={discount}
                                            onChange={handleInputChange}
                                            maxLength={4}
                                            className='form-control'
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="detail" className={colLabel}>Categoria:</label>
                                    <div className={colInput}>
                                        <select
                                            name="category"
                                            value={category}
                                            onChange={handleInputChange}
                                            className='form-select'>
                                            <option value="" selected>Seleccionar Categoria</option>
                                            <option value="Tradicionales">Tradicionales</option>
                                            <option value="Especiales">Especiales</option>
                                            <option value="Vegetarianas">Vegetarianas</option>
                                            <option value="Calzones">Calzones</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <label htmlFor="detail" className={colLabel}>Detalle:</label>
                                    <div className={colInput}>
                                        <textarea
                                            type="text"
                                            name="detail"
                                            value={detail}
                                            onChange={handleInputChange}
                                            maxLength={70}
                                            className='form-control text-area-form'
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Modal >
        </>
    )
}