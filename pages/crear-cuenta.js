import React from 'react';
import Layout  from '../componets/layouts/Layout';



const CrearCuenta = () => (
  
	<div>
		<Layout>
			<>
			<h1>Crear Cuenta</h1>
			<form>
				<div>
					<label htmlFor="nombre">Nombre</label>
						<input type="Text"
						id="nombre"
						placeholder="Tu nombre"
						name= "nombre"
					 />
				</div>

				<div>
					<label htmlFor="email">Email</label>
						<input type="email"
						id="email"
						placeholder=" Tu Email"
						name= "email"
					 />
				</div>

				<div>
					<label htmlFor="password">Password</label>
						<input type="password"
						id="password"
						placeholder=" Tu Password"
						name= "password"
					 />
				</div>

				<input 
						type ="submit"
						value="Crear cuenta" 
					/>

			</form>
			</>
		</Layout>
	</div>
)
export default CrearCuenta

