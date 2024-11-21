import { useTranslation } from 'react-i18next';
import './SignIn.css'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { createContext, useContext, useEffect } from 'react';
import { Authentication } from '../../context/AuthenticationContext/AuthenticationContextProvider';

export default function SignIn({ signIn, results }) {

    let {setIsLogin} = useContext(Authentication);
    

    const {dataSignIn,  isLoading, isSuccess } = results;
    


    let initialValuesSignIn = {
        email: "",
        password: ""
    }

    const validationSchema = Yup.object({
        email : Yup.string().required(),
        password : Yup.string().required()
    })

    const formikSignIn = useFormik({
        initialValues: initialValuesSignIn,
        validationSchema,
        onSubmit: (values)=>{
            signIn({values});
        }
    })

    const { t } = useTranslation();

    useEffect(()=>{
        if(isSuccess){
            setTimeout(()=>{                
                localStorage.setItem('joyMediaToken', dataSignIn?.token);
                setIsLogin(true);
            }, 1000)
        }
    }, [isSuccess])

    return (
        <div className='sign-in w-1/2  p-3 flex flex-col items-center'>
            <h2 className=' capitalize mb-4 text-darkBlueColor'>{t("sign.signIn")}</h2>
            <form action="" className=' w-full' onSubmit={formikSignIn.handleSubmit}> 
                <div className={`email w-full border-2 ${formikSignIn.errors.email && formikSignIn.touched.email?'border-red-500':'border-darkBlueColor'} relative rounded-md mb-3 bg-white dark:bg-grayColor`}>
                    <input type="email" name='email' className='w-full text-darkerBlueColor py-1 px-2 rounded-md mt-1 bg-transparent' onChange={formikSignIn.handleChange} onBlur={formikSignIn.handleBlur} />
                    <label className='absolute top-0 left-2 text-sm bg-white dark:bg-grayColor translate-y-[-50%] px-2 text-grayColor dark:text-darkBlueColor capitalize'>{t("sign.inputs.email")}</label>
                </div>
                <div className={`email w-full border-2 ${formikSignIn.errors.password && formikSignIn.touched.password?'border-red-500':'border-darkBlueColor'} relative rounded-md bg-white dark:bg-grayColor`}>
                    <input type="password" name='password' className='w-full text-darkerBlueColor py-1 px-2 rounded-md mt-1 bg-transparent'  onChange={formikSignIn.handleChange} onBlur={formikSignIn.handleBlur}/>
                    <label className='absolute top-0 left-2 text-sm bg-white dark:bg-grayColor translate-y-[-50%] px-2 text-grayColor dark:text-darkBlueColor capitalize'>{t("sign.inputs.password")}</label>
                </div>
                <button type='submit' className=' bg-white relative z-0 dark:bg-grayColor border-2 border-darkerBlueColor py-1 px-2 rounded-md hover:bg-darkerBlueColor dark:hover:bg-darkerBlueColor hover:text-white transition-colors duration-300 mt-4 block mx-auto capitalize'>
                    <span className={`${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                        {t("sign.signIn")}
                    </span>
                    {isLoading ?
                        <span className={`loader absolute z-[-1] top-0 left-1/2 translate-x-[-50%] ${isLoading ? 'opacity-100' : 'opacity-0'}`} />
                        : ''}
                </button>
            </form>
        </div>
    )
}
