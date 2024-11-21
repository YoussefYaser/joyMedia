import { useFormik } from 'formik';
import { useEffect } from 'react'
import * as Yup from 'yup'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import './SignUp.css'
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';


export default function SignUp({ signUp, results }) {

    const { isLoading, isSuccess } = results;

    const { t } = useTranslation();


    let initialValuesSignUp = {
        name: '',
        email: '',
        password: '',
        rePassword: '',
        dateOfBirth: '',
        gender: ''
    }

    const validationSchema = Yup.object({
        name: Yup.string().matches(/^(\w+\s?)+$/).required(),
        email: Yup.string().matches(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/).required(),
        password: Yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required(),
        rePassword: Yup.string().oneOf([Yup.ref('password')]).required(),
        dateOfBirth: Yup.string().matches(/^([0-2][1-9]|30)-(0[1-9]|10|11|12)-[1-9][0-9][0-9]{2}$/).required(),
        gender: Yup.string().required()
    })

    const formikSignUp = useFormik({
        initialValues: initialValuesSignUp,
        validationSchema,
        onSubmit: (values) => {
            signUp({ values });
        }
    });


    useEffect(() => {
        if (isSuccess) {
            toast.success('Your account has successfuly created!');
        }
    }, [isSuccess]);

    return (
        <div className='sign-up w-1/2 p-3 flex flex-col items-center'>
            <h2 className=' capitalize mb-4 text-darkBlueColor'>{t("sign.signUp")}</h2>
            <form className='w-full' onSubmit={formikSignUp.handleSubmit}>
                <div className={`name w-full border-2  ${formikSignUp.errors.name && formikSignUp.touched.name ? 'border-red-500' : 'border-darkBlueColor'} relative rounded-md mb-3 bg-white dark:bg-grayColor`}>
                    <input type="text" id='name' className='w-full text-darkerBlueColor py-1 px-2 rounded-md mt-1 bg-transparent text-sm' placeholder={t("sign.inputs.name.placeholder")} onChange={formikSignUp.handleChange} onBlur={formikSignUp.handleBlur} />
                    <label className='absolute top-0 left-2 text-sm bg-white dark:bg-grayColor text-grayColor dark:text-darkBlueColor capitalize translate-y-[-50%] px-2'>{t("sign.inputs.name.name")}</label>
                </div>
                <div className={`email  w-full border-2 border-darkBlueColor ${formikSignUp.errors.email && formikSignUp.touched.email ? 'border-red-500' : 'border-darkBlueColor'} relative rounded-md mb-3 bg-white dark:bg-grayColor`}>
                    <input type="email" id='email' className=' w-full text-darkerBlueColor py-1 px-2 rounded-md mt-1 bg-transparent text-sm' placeholder='example@mail.com' onChange={formikSignUp.handleChange} onBlur={formikSignUp.handleBlur} />
                    <label className='absolute top-0 left-2 text-sm bg-white dark:bg-grayColor text-grayColor dark:text-darkBlueColor capitalize translate-y-[-50%] px-2'>{t("sign.inputs.email")}</label>
                </div>
                <div className={`password w-full border-2  border-darkBlueColor ${formikSignUp.errors.password && formikSignUp.touched.password ? 'border-red-500' : 'border-darkBlueColor'} relative rounded-md mb-3 bg-white dark:bg-grayColor`}>
                    <input type="password" id='password' className='w-full py-1 px-2 text-darkerBlueColor rounded-md mt-1 bg-transparent text-sm' onChange={formikSignUp.handleChange} onBlur={formikSignUp.handleBlur} />
                    <label className='absolute top-0 left-2 text-sm bg-white dark:bg-grayColor text-grayColor dark:text-darkBlueColor capitalize translate-y-[-50%] px-2'>{t("sign.inputs.password")}</label>
                </div>
                <div className={`repassword w-full border-2 border-darkBlueColor ${formikSignUp.errors.rePassword && formikSignUp.touched.rePassword ? 'border-red-500' : 'border-darkBlueColor'} relative rounded-md mb-3 bg-white dark:bg-grayColor`}>
                    <input type="password" id='rePassword' className='w-full text-darkerBlueColor py-1 px-2 rounded-md mt-1 bg-transparent text-sm' onChange={formikSignUp.handleChange} onBlur={formikSignUp.handleBlur} />
                    <label className='absolute top-0 left-2 text-sm bg-white dark:bg-grayColor text-grayColor dark:text-darkBlueColor capitalize translate-y-[-50%] px-2'>{t("sign.inputs.repassword")}</label>
                </div>
                <div className={`birth w-full border-2 border-darkBlueColor ${formikSignUp.errors.dateOfBirth && formikSignUp.touched.dateOfBirth ? 'border-red-500' : 'border-darkBlueColor'} relative rounded-md mb-3 bg-white dark:bg-grayColor`}>
                    <input type="text" id='dateOfBirth' className='w-full py-1 text-darkerBlueColor px-2 rounded-md mt-1 bg-transparent text-sm' placeholder='dd-mm-yyyy' onChange={formikSignUp.handleChange} onBlur={formikSignUp.handleBlur} />
                    <label className='absolute top-0 left-2 text-sm bg-white dark:bg-grayColor text-grayColor dark:text-darkBlueColor capitalize translate-y-[-50%] px-2'>{t("sign.inputs.dateOfBirth")}</label>
                </div>
                <div dir={i18next.dir()} className='inline-block w-full'>
                    <label className={`capitalize  ${formikSignUp.errors.gender && formikSignUp.touched.gender ? 'text-red-600' : 'text-grayColor'} `}>{t("sign.inputs.gender.gender")}</label>
                    <input type="radio" name='gender' id='male' value={'male'} className='align-middle ms-3' onChange={formikSignUp.handleChange} />
                    <label htmlFor='male' className='capitalize font-bold text-sm text-darkBlueColor ms-1'>{t("sign.inputs.gender.male")}</label>
                    <input type="radio" name='gender' id='female' value={'female'} className='align-middle ms-3' onChange={formikSignUp.handleChange} />
                    <label htmlFor='female' className='capitalize text-darkBlueColor font-bold text-sm ms-1'>{t("sign.inputs.gender.female")}</label>
                </div>
                <button type='submit' className=' bg-white relative z-0 dark:bg-grayColor border-2 border-darkerBlueColor py-1 px-2 rounded-md hover:bg-darkerBlueColor dark:hover:bg-darkerBlueColor hover:text-white transition-colors duration-300 mt-4 block mx-auto capitalize'>
                    <span className={`${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                        {t("sign.signUp")}
                    </span>
                    {isLoading ?
                        <span className={`loader absolute z-[-1] top-0 left-1/2 translate-x-[-50%] ${isLoading ? 'opacity-100' : 'opacity-0'}`} />
                        : ''}
                </button>
            </form>
        </div>
    )
}
