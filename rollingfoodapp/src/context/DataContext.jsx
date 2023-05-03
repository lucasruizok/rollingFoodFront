import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { notification } from 'antd';
import { deleteProduct, getProducts } from "../services/api";

export const DataContext = createContext();
export const DataProvider = ({ children }) => {
    const URL = 'http://localhost:3400';
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [pizzas, setPizzas] = useState([]);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    const openNotification = (message, description, type) => {
        notification[type]({
            message: message,
            description: description,
            placement: 'top'
        })
    }

    const login = async (formData) => {
        try {
            const response = await axios.post(`${URL}/login`, formData)
            const tokenLogin = response.data.token
            const userLogin = response.data.usuario
            setUser(userLogin)
            setToken(tokenLogin)
            localStorage.setItem('user', JSON.stringify(userLogin));
            localStorage.setItem('token', tokenLogin);
            openNotification('Login correcto', 'Ha ingresado correctamente', 'success')
            setTimeout(() => { navigate('/') }, 1000)
        } catch (error) {
            openNotification('Login incorrecto', 'No pudo ingresar verificar datos ingresados', 'error')
        }
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        navigate('login')
    }

    const addCart = (id) => {
        const check = cart.every(item => item._id !== id);
        if (check) {
            const data = pizzas.filter(pizza => pizza._id === id);
            setCart([...cart, ...data]);
            localStorage.setItem('dataCart', JSON.stringify([...cart, ...data]));
        } else {
            alert('La pizza que quiere agregar ya se encuentra dentro del carrito');
        }
    }

    useEffect(() =>{
        const dataCart = JSON.parse(localStorage.getItem('dataCart'));
        if(dataCart){
            setCart(dataCart);
        }
    },[])

    useEffect(() => {
        getPizzas();
    }, []);

    const getPizzas =  () => {
        getProducts().then((resp) => {
            const pizzasArray = resp.productosEncontrados;
            setPizzas(pizzasArray)
        })
    };

    const handleDeletePizza = (id) =>{
        const proced = window.confirm("Estas seguro que quieres eliminar esta tarea?");
        if(proced){
            deleteProduct(id);
            getPizzas();            
        }
      };

    const data = {
        user,
        token,
        login,
        logout,
        pizzas,
        setPizzas,
        cart,
        setCart,
        addCart,
        handleDeletePizza,
        getPizzas,
        URL
    }

    return <DataContext.Provider value={data}>{children}</DataContext.Provider>
}