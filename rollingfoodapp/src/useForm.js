import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

const useForm = (initialState = {}, onSubmit) => {
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const inputFileRef = useRef();
    
    useEffect( () => {
        validate(initialState)
    }, [initialState]);

    const handleInputChange = (e) => {
        const form = { ...formData, [e.target.name]: e.target.value }
        setFormData(form);
        validate(form);
    }

    const validate = (form) => {
        const keys = Object.keys(form)
        const errors = keys.reduce((accumulator, current) => {
            if (form[current] === "") {
                return { ...accumulator, [current]: current + " no puede ser vacío"  };
            }
            return accumulator;
        }, {});
        setErrors(errors)
    } 

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(errors).length > 0) {
            alert('errores: ' + JSON.stringify(errors))
        } else {
            onSubmit?.(formData);
        }
    }

    const cleanFormData = (data)=> setFormData(data);

    return { formData, handleInputChange, setFormData, handleSubmit, errors, cleanFormData, inputFileRef };
}

export default useForm