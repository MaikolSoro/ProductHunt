import React from 'react';
import { css } from '@emotion/core';
import Layout  from '../componets/layouts/Layout';
import { Formulario, Campo, InputSubmit } from '../componets/ui/Formulario';

// validaciones

import useValidation from '../hooks/useValidation';
import validarCrearCuenta from '../validacion/validarCrearCuenta';

const STATE_INICIAL = {
	nombre:  '',
	email:   '',
	password:''
}
const CrearCuenta = () => {

	const {
		valores,
		errores,
		submitForm,
		handleSubmit,
		handleChange} = useValidation(STATE_INICIAL, validarCrearCuenta, crearCuenta )

	const { nombre, email, password } = valores;
	function crearCuenta() {
		console.log('..Creando cuenta')
	}

	return(
		<div>
			<Layout>
				<>
				<h1
				css={css`
				text-align: center;
				margin-top: 5rem;
				`}
				>Crear Cuenta</h1>
				<Formulario
				onSubmit={handleSubmit}
				noValidate
				>
					<Campo>
						<label htmlFor="nombre">Nombre</label>
							<input type="Text"
							id="nombre"
							placeholder="Tu nombre"
							name= "nombre"
							value={nombre}
							onChange={handleChange}
						 />
					</Campo>
	
					<Campo>
						<label htmlFor="email">Email</label>
							<input type="email"
							id="email"
							placeholder=" Tu Email"
							name= "email"
							value={email}
							onChange={handleChange}
						 />
					</Campo>
	
					<Campo>
						<label htmlFor="password">Password</label>
							<input type="password"
							id="password"
							placeholder=" Tu Password"
							name= "password"
							value={password}
							onChange={handleChange}
						 />
					</Campo>
	
					<InputSubmit 
							type ="submit"
							value="Crear cuenta" 
						/>
						
	
				</Formulario>
				</>
			</Layout>
		</div>
	);
}

export default CrearCuenta

