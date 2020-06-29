import React, { useState, useEffect } from 'react';

const useValidation = (stateInicial, validar, funcion) => {

	const[valores, guardarValores] = useState(stateInicial);
	const[errores, guardarErrores] = useState({});
	const[submitForm, guardarSubmitForm ] = useState(false);
	
	useEffect(() => {
		if(submitForm) {
			const noErrores = Object.keys(errores).length === 0;

			if(noErrores) {
				funcion(); // Función que se ejecuta en el componente
			}
			guardarSubmitForm(false); 
		}
	}, [errores]);

	//Función  que se ejecuta conforme el usuario escribe algo
	const handleChange = e => {
		guardarValores({
			...valores,
			[e.target.name] : e.target.value
		})
	}

	// Función que se ejecuta cuando el usuario hace submit
	const handleSubmit = e => {
		e.preventDefault();
		const erroresValidaciones = validar(valores);
		guardarErrores(erroresValidaciones);
		guardarSubmitForm(true);
	}

	// cuando se realiza el evento de blur

	const handleBlur = () => {
		const erroresValidaciones = validar(valores);
		guardarErrores(erroresValidaciones);
	}
	return {
		valores,
		errores,
		handleSubmit,
		handleChange,
		handleBlur

	};
}
 
export default useValidation;