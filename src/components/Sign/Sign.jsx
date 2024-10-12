import './Sign.css'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Alert } from '@mui/material';
import { useSignInMutation, useSignUpMutation } from '../../libs/RTK Query/joyMediaApi';
import { ToastContainer } from 'react-toastify';
import SignUp from '../SignUp/SignUp';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../Language selector/LanguageSelector';
import i18next from 'i18next';
import SignIn from '../SignIn/SignIn';


export default function Sign({postsLoaded}) {

    const checkVertical = window.innerWidth >= 535 ? false : true;
    let [vertical, setVertical] = useState(checkVertical);
    let [sign, setSign] = useState('sign-up');
    let [noDuration, setNoDuration] = useState(false);
    let alertSignUp = useRef();
    let alertSignIn = useRef();

    let [signUp, { isLoading: isLoadingSignUp, isError: isErrorSignUp, error: errorSignUp, isSuccess: isSuccessSignUp }] = useSignUpMutation();
    let [signIn, {data : dataSignIn ,isLoading: isLoadingSignIn, isError: isErrorSignIn, error: errorSignIn, isSuccess: isSuccessSignIn }] = useSignInMutation();

    const handleResize = useCallback(() => {
        let duration;
        setNoDuration(true);
        clearTimeout(duration);
        duration = setTimeout(() => {
            setNoDuration(false);
        }, 100);
        if (window.innerWidth >= 535)
            setVertical(false);
        else
            setVertical(true);
    }, [])

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    useEffect(() => {
        if (isErrorSignUp)
            alertSignUp.current.scrollIntoView();
        if (isErrorSignIn)
            alertSignIn.current.scrollIntoView();

    }, [isErrorSignUp]);

    const { t } = useTranslation();

    return (
        <>
            <div className='fixed w-full h-full z-[99999] top-0 left-0 overflow-auto'>
                <div className={`sign px-4 py-10  w-full min-h-full top-0 left-0  flex justify-center items-center content-center flex-wrap ${postsLoaded?'hide' : ''}`}>
                    <LanguageSelector></LanguageSelector>
                    <div>
                        <h2 className=' text-[2.5rem] w-full text-center mb-8 text-darkBlueColor dark:text-white'>
                            {t("sign.greeting")}
                            <i className="fa-solid fa-comment-dots ms-1" />
                        </h2>
                        {isSuccessSignIn ? <div className='main-load w-fit mx-auto block mb-8'>
                            <span className=" " />
                        </div> : ''}

                        <div dir='ltr' className={`sign-box h-[420px] bg-white dark:bg-grayColor flex items-center sm:w-[600px] md:w-[700px] lg:w-[850px] mx-auto rounded-se-xl rounded-es-xl relative overflow-hidden shadow-2xl py-4 ${isSuccessSignIn ? 'hide' : ''} `}>
                            <SignIn signIn={signIn} results={{dataSignIn, isLoading: isLoadingSignIn, isSuccess: isSuccessSignIn }}></SignIn>
                            <SignUp signUp={signUp} results={{ isLoading: isLoadingSignUp, isSuccess: isSuccessSignUp }}></SignUp>
                            <div className={`drawer text-center rounded-md rounded-ee-none py-4 bg-blueColor dark:bg-darkBlueColor  w-1/2 h-full absolute top-0 left-0 overflow-hidden ${(sign == 'sign-up') && (window.innerWidth >= 535) && !vertical ? 'translate-x-full' : 'translate-x-0'} ${(sign == 'sign-up') && (window.innerWidth < 535) && vertical ? 'translate-y-full' : 'translate-y-0'} transition-transform ${noDuration ? 'duration-0' : 'duration-500'}`}>
                                <div className={`flex items-center sm:w-[600px] md:w-[700px] lg:w-[850px] h-full ${(sign == 'sign-up') && (window.innerWidth >= 535) && !vertical ? 'translate-x-[-50%]' : 'translate-x-0'} ${(sign == 'sign-up') && (window.innerWidth < 535) && vertical ? 'translate-y-[-50%]' : 'translate-y-0'} transition-transform ${noDuration ? 'duration-0' : 'duration-500'}`}>
                                    <div className='sign-in w-1/2  p-3 flex flex-col items-center'>
                                        <h2 className=' capitalize mb-4 text-white'>{t("sign.signIn")}</h2>
                                        <div className='mb-4 text-grayColor'>
                                            <h3 className=' text-h4 capitalize text-white'>
                                                {t("sign.signUpRules.head")}
                                            </h3>
                                            <ul dir={i18next.dir()} className=' text-sm capitalize' >
                                                <li className=' mb-2 text-start'>
                                                    {t("sign.signUpRules.name")}
                                                </li>
                                                <li className=' mb-2 text-start'>
                                                    {t("sign.signUpRules.email")}
                                                </li>
                                                <li className=' mb-2 text-start'>
                                                    {t("sign.signUpRules.password")}
                                                </li>
                                                <li className=' mb-2 text-start lowercase'>
                                                    date of birth : dd-mm-yyyy.
                                                </li>
                                            </ul>
                                        </div>
                                        <button className=' bg-white border-2 border-black py-1 px-2 rounded-md hover:bg-black hover:text-white transition-colors duration-300 capitalize' onClick={() => setSign('sign-up')}>{t("sign.signIn")}</button>
                                    </div>
                                    <div className='sign-up w-1/2 p-3 flex flex-col items-center'>
                                        <h2 className=' capitalize mb-4 text-white'>{t("sign.signUp")}</h2>
                                        <p className='mb-4 text-grayColor'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod, consequuntur voluptate. Iusto aliquam maxime officiis impedit laboriosam ut, itaque vero cum, asperiores necessitatibus, distinctio quibusdam iure facilis officia ducimus eligendi?</p>
                                        <button className=' bg-white border-2 border-black py-1 px-2 rounded-md hover:bg-black hover:text-white transition-colors duration-300 capitalize' onClick={() => setSign('sign-in')}>{t("sign.signUp")}</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {isErrorSignUp ?
                            <Alert ref={alertSignUp} className=' mt-8' severity="error">{errorSignUp.data.error}</Alert> : ''
                        }
                        {isErrorSignIn ?
                            <Alert dir='ltr' ref={alertSignIn} className=' mt-8' severity="error">{t("sign.signInError")}</Alert> : ''
                        }
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
