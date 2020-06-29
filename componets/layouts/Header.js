import React from 'react';
import Buscar from '../ui/Buscar';
import Navegation from './Navegation';
import Link from 'next/link';

const Header = () => {
	return ( 
			<header>
				<div>
					<div>
						<p>P</p>
							<Buscar />

							<Navegation />
					</div>
					<div>
						{/* Menu  de administracion */}

						<p>Hola: Juan</p>
						<button type="button">Cerrar Sección</button>

						<Link href= "/">Login</Link>
						<Link href= "/">Crear Cuenta</Link>
					</div>
				</div>
			</header>
	 );
}
 
export default Header;
