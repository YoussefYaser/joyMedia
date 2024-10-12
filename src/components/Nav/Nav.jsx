import { forwardRef, useCallback, useContext } from 'react'
import './Nav.css'
import LanguageSelector from '../Language selector/LanguageSelector';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Authentication } from '../../context/AuthenticationContext/AuthenticationContextProvider';

const Nav = forwardRef(function Nav(props, { nav }) {

    let { setIsLogin, setHideSign, setPostsLoaded } = useContext(Authentication);
    let navigate = useNavigate();


    const handleLogout = useCallback(()=>{
        setIsLogin(false);
        setPostsLoaded(false);
        setHideSign(false);
        localStorage.removeItem('joyMediaToken');
        navigate('/');
    }, [])

    const {t} = useTranslation();

    return (
        <nav className='bg-lightGrayColor dark:bg-darkerBlueColor fixed w-full top-0 start-0 shadow z-[9999]' ref={nav}>
            <div className="container">
                <div className=' flex justify-between items-center py-2'>
                    <h1 className='text-h2 text-darkBlueColor dark:text-white'>joyMedia</h1>
                    <div className='flex items-center w-1/2'>
                        <div className='profile w-10 h-10 bg-slate-400 rounded-full me-2'>
                            {/* <img src="" className='profile-img w-full h-full' alt="" /> */}
                        </div>
                        <div className='create-post flex items-center flex-grow bg-white dark:bg-lightGrayColor hover:bg-[#dfdfdf] capitalize border-2 border-black py-1 px-2 rounded-lg cursor-pointer transition-colors duration-300'>
                            {t("nav.createPost")}
                            <i className="fa-regular fa-pen-to-square ms-auto" />
                        </div>
                    </div>
                    <div className="flex">
                        <button className=' bg-white dark:bg-lightGrayColor border-2 border-black dark:border-darkerBlueColor py-1 px-2 me-3 rounded-md hover:bg-black dark:hover:bg-darkBlueColor hover:text-white transition-colors duration-300' onClick={handleLogout}>
                            {t("sign.logout")}
                        </button>
                        <LanguageSelector block="block"></LanguageSelector>
                    </div>
                </div>
            </div>
        </nav>
    )
});


export default Nav;

