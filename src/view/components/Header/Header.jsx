import './Header.css'
import { Link } from 'react-router-dom'
export const Header = ()=>{
    return(
        <div className="container__home">
            <header>
                <div className='container__logo'>
                    <img className='home__logo' src="https://i.postimg.cc/85n0q9SN/logo-jovenes-Creativos.png" alt="Logo" width="250px" height="150px" />
                </div>

                <div className="container__title">
                    <h1 className='title'>MyToDoList</h1>
                </div>
                <ul className='container__list'>
                    {/* Hacer función para eliminar session con On CliCK */}
                    <li ><Link className='item__link' to='/' >Cerrar Sesion</Link></li>
                    <li ><Link className='item__link' to='/registro'>Registro</Link></li>
                </ul>
            </header>
        </div>
    )
}