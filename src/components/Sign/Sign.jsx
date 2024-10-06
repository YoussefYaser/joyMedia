import { useFormik } from 'formik';
import './Sign.css'
import { useCallback, useEffect, useState } from 'react'
import * as Yup from 'yup'

export default function Sign() {

    const checkVertical = window.innerWidth >= 535 ? false : true;
    let [vertical, setVertical] = useState(checkVertical);
    let [sign, setSign] = useState('sign-up');
    let [noDuration, setNoDuration] = useState(false);



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
            console.log(values);

        }
    })


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


    return (
        <div className='sign px-4 py-10 fixed w-full h-screen top-0 left-0  flex justify-center items-center content-center flex-wrap overflow-auto'>
            <h2 className=' text-[2.5rem] w-full text-center mb-8 text-darkBlueColor dark:text-white'>Welcome to joyApp
                <i className="fa-solid fa-message align-middle ms-2" />
            </h2>
            <div className='sign-box bg-white dark:bg-grayColor flex items-center sm:w-[600px] md:w-[700px] lg:w-[850px] mx-auto rounded-se-xl rounded-es-xl relative overflow-hidden shadow-2xl py-4 '>
                <div className='sign-in w-1/2  p-3 flex flex-col items-center'>
                    <h2 className=' capitalize mb-4 text-darkBlueColor'>sign in</h2>
                    <form action="" className=' w-full'>
                        <div className='email w-full border-2  border-darkBlueColor relative rounded-md mb-3 bg-white dark:bg-grayColor'>
                            <input type="email" className='w-full py-1 px-2 rounded-md mt-1 bg-transparent' />
                            <label className='absolute top-0 left-2 text-sm bg-white dark:bg-grayColor translate-y-[-50%] px-2 text-grayColor dark:text-darkBlueColor capitalize'>email</label>
                        </div>
                        <div className='email w-full border-2 border-darkBlueColor relative rounded-md bg-white dark:bg-grayColor'>
                            <input type="password" className='w-full py-1 px-2 rounded-md mt-1 bg-transparent' />
                            <label className='absolute top-0 left-2 text-sm bg-white dark:bg-grayColor translate-y-[-50%] px-2 text-grayColor dark:text-darkBlueColor capitalize'>password</label>
                        </div>
                        <button className=' bg-white dark:bg-grayColor text-darkerBlueColor border-2 border-darkBlueColor py-1 px-2 rounded-md hover:bg-darkerBlueColor dark:hover:bg-darkerBlueColor hover:text-white transition-colors duration-300 mt-4 block mx-auto capitalize'>sign in</button>
                    </form>
                </div>
                <div className='sign-up w-1/2 p-3 flex flex-col items-center'>
                    <h2 className=' capitalize mb-4 text-darkBlueColor'>sign up</h2>
                    <form className='w-full' onSubmit={formikSignUp.handleSubmit}>
                        <div className={`name w-full border-2  ${formikSignUp.errors.name && formikSignUp.touched.name ? 'border-red-500' : 'border-darkBlueColor'} relative rounded-md mb-3 bg-white dark:bg-grayColor`}>
                            <input type="text" id='name' className='w-full py-1 px-2 rounded-md mt-1 bg-transparent text-sm' placeholder='No Numbers' onChange={formikSignUp.handleChange} onBlur={formikSignUp.handleBlur} />
                            <label className='absolute top-0 left-2 text-sm bg-white dark:bg-grayColor text-grayColor dark:text-darkBlueColor capitalize translate-y-[-50%] px-2'>name</label>
                        </div>
                        <div className={`email  w-full border-2 border-darkBlueColor ${formikSignUp.errors.email && formikSignUp.touched.email ? 'border-red-500' : 'border-darkBlueColor'} relative rounded-md mb-3 bg-white dark:bg-grayColor`}>
                            <input type="email" id='email' className=' w-full py-1 px-2 rounded-md mt-1 bg-transparent text-sm' placeholder='example@mail.com' onChange={formikSignUp.handleChange} onBlur={formikSignUp.handleBlur} />
                            <label className='absolute top-0 left-2 text-sm bg-white dark:bg-grayColor text-grayColor dark:text-darkBlueColor capitalize translate-y-[-50%] px-2'>email</label>
                        </div>
                        <div className={`password w-full border-2 border-darkBlueColor ${formikSignUp.errors.password && formikSignUp.touched.password ? 'border-red-500' : 'border-darkBlueColor'} relative rounded-md mb-3 bg-white dark:bg-grayColor`}>
                            <input type="password" id='password' className='w-full py-1 px-2 rounded-md mt-1 bg-transparent text-sm' onChange={formikSignUp.handleChange} onBlur={formikSignUp.handleBlur} />
                            <label className='absolute top-0 left-2 text-sm bg-white dark:bg-grayColor text-grayColor dark:text-darkBlueColor capitalize translate-y-[-50%] px-2'>password</label>
                        </div>
                        <div className={`repassword w-full border-2 border-darkBlueColor ${formikSignUp.errors.rePassword && formikSignUp.touched.rePassword ? 'border-red-500' : 'border-darkBlueColor'} relative rounded-md mb-3 bg-white dark:bg-grayColor`}>
                            <input type="password" id='rePassword' className='w-full py-1 px-2 rounded-md mt-1 bg-transparent text-sm' onChange={formikSignUp.handleChange} onBlur={formikSignUp.handleBlur} />
                            <label className='absolute top-0 left-2 text-sm bg-white dark:bg-grayColor text-grayColor dark:text-darkBlueColor capitalize translate-y-[-50%] px-2'>repassword</label>
                        </div>
                        <div className={`birth w-full border-2 border-darkBlueColor ${formikSignUp.errors.dateOfBirth && formikSignUp.touched.dateOfBirth ? 'border-red-500' : 'border-darkBlueColor'} relative rounded-md mb-3 bg-white dark:bg-grayColor`}>
                            <input type="text" id='dateOfBirth' className='w-full py-1 px-2 rounded-md mt-1 bg-transparent text-sm' placeholder='dd-mm-yyyy' onChange={formikSignUp.handleChange} onBlur={formikSignUp.handleBlur} />
                            <label className='absolute top-0 left-2 text-sm bg-white dark:bg-grayColor text-grayColor dark:text-darkBlueColor capitalize translate-y-[-50%] px-2'>date of birth</label>
                        </div>
                        <div className='inline-block'>
                            <label className={`capitalize  ${formikSignUp.errors.gender && formikSignUp.touched.gender ? 'text-red-600' : 'text-grayColor'} `}>gender</label>
                            <input type="radio" name='gender' id='male' value={'male'} className='align-middle ms-3' onChange={formikSignUp.handleChange} />
                            <label htmlFor='male' className='capitalize font-bold text-sm text-darkBlueColor ms-1'>male</label>
                            <input type="radio" name='gender' id='female' value={'female'} className='align-middle ms-3' onChange={formikSignUp.handleChange} />
                            <label htmlFor='female' className='capitalize text-darkBlueColor font-bold text-sm ms-1'>female</label>
                        </div>
                        <button type='submit' className=' bg-white dark:bg-grayColor border-2 border-darkerBlueColor py-1 px-2 rounded-md hover:bg-darkerBlueColor dark:hover:bg-darkerBlueColor hover:text-white transition-colors duration-300 mt-4 block mx-auto capitalize'>sign up</button>
                    </form>
                </div>
                <div className={`drawer text-center  py-4 bg-blueColor dark:bg-darkBlueColor  w-1/2 h-full absolute top-0 left-0 overflow-hidden ${(sign == 'sign-up') && (window.innerWidth >= 535) && !vertical ? 'translate-x-full' : 'translate-x-0'} ${(sign == 'sign-up') && (window.innerWidth < 535) && vertical ? 'translate-y-full' : 'translate-y-0'} transition-transform ${noDuration ? 'duration-0' : 'duration-500'}`}>
                    <div className={`flex items-center sm:w-[600px] md:w-[700px] lg:w-[850px] h-full ${(sign == 'sign-up') && (window.innerWidth >= 535) && !vertical ? 'translate-x-[-50%]' : 'translate-x-0'} ${(sign == 'sign-up') && (window.innerWidth < 535) && vertical ? 'translate-y-[-50%]' : 'translate-y-0'} transition-transform ${noDuration ? 'duration-0' : 'duration-500'}`}>
                        <div className='sign-in w-1/2  p-3 flex flex-col items-center'>
                            <h2 className=' capitalize mb-4 text-white'>sign in</h2>
                            <div className='mb-4 text-grayColor'>
                                <h3 className=' text-h4 capitalize text-white'>
                                    sign up fields rules:
                                </h3>
                                <ul className=' text-sm capitalize'>
                                    <li className=' mb-2 text-start'>
                                        Name : the name can not contain any numbers.
                                    </li>
                                    <li className=' mb-2 text-start'>
                                        email : The email could not start or finish with a dot, should not contain spaces, special chars and The email could contain a double domain.
                                    </li>
                                    <li className=' mb-2 text-start'>
                                        password : The password has minimum 8 characters at least one uppercase, lowercase, digit and special character.
                                    </li>
                                    <li className=' mb-2 text-start lowercase'>
                                        date of birth : dd-mm-yyyy.
                                    </li>
                                </ul>
                            </div>
                            <button className=' bg-white border-2 border-black py-1 px-2 rounded-md hover:bg-black hover:text-white transition-colors duration-300 capitalize' onClick={() => setSign('sign-up')}>sign in</button>
                        </div>
                        <div className='sign-up w-1/2 p-3 flex flex-col items-center'>
                            <h2 className=' capitalize mb-4 text-white'>sign up</h2>
                            <p className='mb-4 text-grayColor'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod, consequuntur voluptate. Iusto aliquam maxime officiis impedit laboriosam ut, itaque vero cum, asperiores necessitatibus, distinctio quibusdam iure facilis officia ducimus eligendi?</p>
                            <button className=' bg-white border-2 border-black py-1 px-2 rounded-md hover:bg-black hover:text-white transition-colors duration-300 capitalize' onClick={() => setSign('sign-in')}>sign up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
