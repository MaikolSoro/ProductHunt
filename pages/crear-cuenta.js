import React from 'react';
import { css } from '@emotion/core';
import Layout  from '../componets/layouts/Layout';
import { Formulario, Campo, InputSubmit } from '../componets/ui/Formulario';


const CrearCuenta = () => (
  
	<div>
		<Layout>
			<>
			<h1
			css={css`
			text-align: center;
			margin-top: 5rem;
			`}
			>Crear Cuenta</h1>
			<Formulario>
				<Campo>
					<label htmlFor="nombre">Nombre</label>
						<input type="Text"
						id="nombre"
						placeholder="Tu nombre"
						name= "nombre"
					 />
				</Campo>

				<Campo>
					<label htmlFor="email">Email</label>
						<input type="email"
						id="email"
						placeholder=" Tu Email"
						name= "email"
					 />
				</Campo>

				<Campo>
					<label htmlFor="password">Password</label>
						<input type="password"
						id="password"
						placeholder=" Tu Password"
						name= "password"
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
)
export default CrearCuenta

