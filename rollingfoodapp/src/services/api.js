import axios from "axios";
const BASE_URL = 'http://localhost:3400';

const createProduct = (data) =>
    fetch(`${BASE_URL}/product`, {
        body: JSON.stringify(data),
        method: 'post'
    }).then((response) => response.json())

const getProducts = () =>
    fetch(`${BASE_URL}/products`, {
        method: "get"
    }).then((response) => response.json())

const getProductById = (id) =>
    fetch(`${BASE_URL}/productsById/${id}`, {
        method: "get"
    }).then((response) => response.json())

const editProduct = (data, id) => {
    fetch(`${BASE_URL}/product/${id}`, {
            body: JSON.stringify(data),
            method: "put",
            headers: new Headers({
                Accept: "application/json",
                "Content-Type": "application/json",
            }),
        })
        .then((response) => response.json())
}

const deleteProduct = (id) => {
    axios.delete(`${BASE_URL}/product/${id}`);
}

const deleteUser = (id, token) => 
    fetch(`${BASE_URL}/user/${id}`,{
        method: "delete",
        headers: new Headers({
            Authorization: token,
            Accept: "application/json",
            "Content-Type": "application/json",
          })
    }).then((response) => response.json());

export {
    createProduct,
    getProducts,
    getProductById,
    editProduct,
    deleteProduct,
    deleteUser
};