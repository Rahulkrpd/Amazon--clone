import React from 'react'
import './Header.css';
import SearchIcon from "@material-ui/icons/Search";
import { ShoppingBasket } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from './firbase';

function Header() {
    const [{ basket ,user}, dispatch] = useStateValue();

   const handleAuthentication=()=>{
       if(user)
       {
        auth.signOut();
       }
   }


    return (
        <div className='header'>

            <NavLink to='/'>  <img src="amazon_PNG25.png" alt="" className='header__logo' /></NavLink>



            <div className="header__search">
                <input type="text" className='header__searchInput' />
                <SearchIcon className='header__searchIcon'

                />

            </div>
            <div className="header__nav">
                <NavLink to={!user && '/login'}>
                    <div   onClick={handleAuthentication} className="header__option">
                        <span className='header__optionLineone'>
                            Hello {!user? 'Guest':user.email}
                        </span>
                        <span className='header__optionLinetwo'>
                            {user?'Sing Out':'Sign In'}
                        </span>

                    </div>
                </NavLink>
                <div className="header__option">
                    <span className='header__optionLineone'>
                        Return
                    </span>
                    <span className='header__optionLinetwo'>
                        & Orders
                    </span>
                </div>
                <div className="header__option">
                    <span className='header__optionLineone'>
                        Yours
                    </span>
                    <span className='header__optionLinetwo'>
                        Prime
                    </span>
                </div>


                <NavLink to='/checkout'>
                    <div className="header__optionBasket">
                        <ShoppingBasket />
                        <span className='header__optionLinetwo header__basketCount'>{basket?.length}</span>
                    </div>
                </NavLink>

            </div>



        </div>
    );
}

export default Header
