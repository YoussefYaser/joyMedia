import { forwardRef, useCallback, useContext, useEffect, useState } from 'react'
import './Nav.css'
import LanguageSelector from '../Language selector/LanguageSelector';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Authentication } from '../../context/AuthenticationContext/AuthenticationContextProvider';
import { useCreatePostMutation } from '../../libs/RTK Query/joyMediaApi';
import PostsOverlay from '../PostsOverlay/PostsOverlay';
import PostsOverlayModal from '../PostsOverlayModal/PostsOverlayModal';
import { use } from 'i18next';
import { useQuery } from '@tanstack/react-query';
import getUserDetails from '../../javaScript files/functions/getUserDetails';
import { useDispatch, useSelector } from 'react-redux';
import { changeDetails } from '../../libs/slices/userDetailsSlice';

const Nav = forwardRef(function Nav(props, { nav }) {

    let [bar, setBar] = useState(false);
    let { setIsLogin, setHideSign, setPostsLoaded } = useContext(Authentication);
    let [showOverlay, setShowOverlay] = useState(false);
    let [logOutLoading, setLogOutLoading] = useState(false);
    let [navScroll, setNavScroll] = useState(false);

    let userDetails = useSelector((store) => store.userDetails);
    let dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    let navigate = useNavigate();

    let { data: user, isLoading: isLoadingUser, isFetching: isFetchingUser, isError: isErrorUser, error: errorUser, isSuccess: isSuccessUser } = useQuery({
        queryKey: ['userDetails'],
        queryFn: getUserDetails,
        select: (data) => data.data.user
    });


    const handleOverlay = useCallback(() => {
        setShowOverlay(true);
        document.body.style.setProperty('overflow', 'hidden');
    }, []);

    const handleLogout = useCallback(() => {
        setLogOutLoading(true);
        setTimeout(() => {
            setLogOutLoading(false);
            setIsLogin(false);
            setPostsLoaded(false);
            setHideSign(false);
            localStorage.removeItem('joyMediaToken');
            navigate('/');
        }, 300);
    }, []);

    let start = window.scrollY;
    const handleNavScroll = useCallback(()=>{        
        if(window.scrollY > start && window.scrollY > 550){
            setNavScroll(true);
            start = window.scrollY;
        }
        else if(window.scrollY < start){
            setNavScroll(false);
            start = window.scrollY
        }
    }, []);

    useEffect(()=>{
        window.addEventListener('scroll', handleNavScroll);
        return ()=>{
            window.removeEventListener('scroll', handleNavScroll);
        }
    }, []);


    useEffect(() => {
        if (isSuccessUser) {
            const temp = {
                name: user.name,
                dateOfBirth: user.dateOfBirth,
                gender: user.gender,
                photo: user.photo
            }
            dispatch(changeDetails(temp));
        }
    }, [isSuccessUser])

    const { t } = useTranslation();

    return (
        <>
            <nav dir='ltr' className={`bg-lightGrayColor dark:bg-darkerBlueColor fixed w-full top-0 start-0 shadow z-[9999] ${navScroll?'opacity-50':'opacity-100'} hover:opacity-100 transition-opacity duration-500`} ref={nav}>
                <div className="container">
                    <div className=' flex justify-between items-center py-2'>
                        <h1 className='text-h2 '>
                            <Link to={'/'} className='text-darkBlueColor dark:text-white'>
                                joyMedia
                            </Link>
                        </h1>
                        <div className='flex items-center  md:w-1/2'>
                            <div className='profile size-10 bg-slate-400 rounded-full me-2 overflow-hidden  hover:scale-125 transition-transform duration-200'>
                                <Link to={'/myPosts'}>
                                    <img src={userDetails.photo} className='profile-img w-full h-full' alt="" />
                                </Link>
                            </div>
                            <div className={`create-post fixed bottom-4 right-4 md:relative md:bottom-0 md:right-0 
                            flex items-center flex-grow bg-darkBlueColor text-white dark:text-black 
                            md:bg-white md:text-black dark:bg-lightGrayColor md:hover:bg-[#dfdfdf] capitalize border-2 
                            border-darkBlueColor dark:border-lightGrayColor md:border-black py-4 px-4 md:py-1 md:px-2 rounded-full md:rounded-lg cursor-pointer transition-colors duration-300 ${showOverlay ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`} onClick={handleOverlay}>
                                <span className=' hidden md:inline'>
                                    {t("nav.createPost")}
                                </span>
                                <i className="fa-regular fa-pen-to-square ms-auto" />
                            </div>
                        </div>
                        <div className="bar flex items-center relative z-[999]">
                            <div className={` flex items-center rounded-md ${bar ? 'show' : ''}`}>
                                <button className=' bg-white text-black dark:bg-lightGrayColor border-2 border-black dark:border-darkerBlueColor py-1 px-2 me-3 rounded-md hover:bg-black dark:hover:bg-darkBlueColor hover:text-white transition-colors duration-300' onClick={handleLogout}>
                                    {t("sign.logout")}
                                </button>
                                <LanguageSelector block="block"></LanguageSelector>
                            </div>
                            <span className={` hidden text-darkerBlueColor dark:text-white size-8 justify-center items-center text-2xl cursor-pointer ${bar ? 'rotate-90' : 'rotate-0'} transition-transform duration-300`} onClick={() => setBar(!bar)}>
                                <i className="fa-solid fa-bars" />
                            </span>
                        </div>
                    </div>
                </div>
            </nav>
            {showOverlay ?
                <PostsOverlay modal={{ handleClose, handleOpen }} setShowOverlay={setShowOverlay}></PostsOverlay>
                : ''
            }
            <PostsOverlayModal open={open} modal={{ handleClose }} setShowOverlay={setShowOverlay}></PostsOverlayModal>
            {logOutLoading ? <div className={`logout-loading flex justify-center items-center bg-[#084480c2] fixed top-0 left-0 w-full h-full  z-[9999999]`}>
                <span className=" " />
            </div> : ''}

            {isErrorUser ? <div className=' fixed rounded-md p-2 text-center min-w-80 shadow-md shadow-darkerBlueColor bottom-5 left-1/2 translate-x-[-50%] z-[99999] bg-red-500 text-white font-bold'>
                {errorUser.message} ,please reload the page to try again
            </div> : ''}


        </>
    )
});


export default Nav;

