import { forwardRef, useCallback, useContext, useState } from 'react'
import './Nav.css'
import LanguageSelector from '../Language selector/LanguageSelector';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Authentication } from '../../context/AuthenticationContext/AuthenticationContextProvider';

const Nav = forwardRef(function Nav(props, { nav }) {

    let [bar, setBar] = useState(false);

    let { setIsLogin, setHideSign, setPostsLoaded } = useContext(Authentication);
    let navigate = useNavigate();


    const handleLogout = useCallback(() => {
        setIsLogin(false);
        setPostsLoaded(false);
        setHideSign(false);
        localStorage.removeItem('joyMediaToken');
        navigate('/');
    }, [])

    const { t } = useTranslation();

    return (
        <nav className='bg-lightGrayColor dark:bg-darkerBlueColor fixed w-full top-0 start-0 shadow z-[9999]' ref={nav}>
            <div className="container">
                <div className=' flex justify-between items-center py-2'>
                    <h1 className='text-h2 text-darkBlueColor dark:text-white'>joyMedia</h1>
                    <div className='flex items-center  md:w-1/2'>
                        <div className='profile size-10 bg-slate-400 rounded-full me-2'>
                            {/* <img src="" className='profile-img w-full h-full' alt="" /> */}
                        </div>
                        <div className='create-post fixed bottom-4 right-4 md:relative md:bottom-0 md:right-0 flex items-center flex-grow bg-darkBlueColor text-white dark:text-black md:bg-white md:text-black dark:bg-lightGrayColor md:hover:bg-[#dfdfdf] capitalize border-2 border-darkBlueColor dark:border-lightGrayColor md:border-black py-4 px-4 md:py-1 md:px-2 rounded-full md:rounded-lg cursor-pointer transition-colors duration-300'>
                            <span className=' hidden md:inline'>
                                {t("nav.createPost")}
                            </span>
                            <i className="fa-regular fa-pen-to-square ms-auto" />
                        </div>
                    </div>
                    <div className="bar flex items-center relative">
                        <div className={` flex items-center rounded-md ${bar?'show':''}`}>
                            <button className=' bg-white dark:bg-lightGrayColor border-2 border-black dark:border-darkerBlueColor py-1 px-2 me-3 rounded-md hover:bg-black dark:hover:bg-darkBlueColor hover:text-white transition-colors duration-300' onClick={handleLogout}>
                                {t("sign.logout")}
                            </button>
                            <LanguageSelector block="block"></LanguageSelector>
                        </div>
                        <span className={` hidden text-darkerBlueColor dark:text-white size-8 justify-center items-center text-2xl cursor-pointer ${bar?'rotate-90':'rotate-0'} transition-transform duration-300`} onClick={()=>setBar(!bar)}>
                            <i className="fa-solid fa-bars" />
                        </span>
                    </div>
                </div>
            </div>
        </nav>
    )
});


export default Nav;

