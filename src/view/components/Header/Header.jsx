import './Header.css'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { TaskContext } from '../../context/user';
export const Header = ()=>{
    
    const { handleLogout, state } = useContext(TaskContext);
    const { user }= state;
    // console.log("User state:", state.user.firstName);
    const handleClick = () => {
        handleLogout();
};
    return(
        <div className="container__home">
            <header>
                <div className="container__menu">
                    <div className='container__logo'>
                        <img className='home__logo' src="https://i.postimg.cc/85n0q9SN/logo-jovenes-Creativos.png" alt="Logo" width="250px" height="150px" />
                    </div>

                    <div className="container__title">
                        <h1 className='title'>MyToDoList</h1>
                    </div>
                    <ul className='container__list'>
                        <h3 className='item__name'>{user && `${user.firstName} ${user.lastName}`}</h3>
                        <Link to='/' className='item__link' onClick={handleClick}>Cerrar Sesión</Link>
                    </ul>
                </div>
            </header>
        </div>
    )
}