import { useTranslation } from 'react-i18next'
import './PostsOverlay.css'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useEffect, useState } from 'react';
import { useCreatePostMutation } from '../../libs/RTK Query/joyMediaApi';
import { useNavigate } from 'react-router-dom';

export default function PostsOverlay({ modal, setShowOverlay }) {

    let navigate = useNavigate();

    let [file, setFile] = useState('');
    let [click, setClick] = useState('');
    let [barProgress, setBarProgress] = useState({
        length: 0,
        opacity: 0
    });


    let [post, { data, isLoading, isSuccess, isError, error }] = useCreatePostMutation();

    console.log(isSuccess);
    

    let initialValues = {
        body: '',
        image: ''
    }

    let validationSchema = Yup.object({
        body: Yup.string().required()
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            let token = localStorage.getItem('joyMediaToken');
            let headers = {
                token: token
            }
            let formData = new FormData();
            formData.append('body', values.body);
            formData.append('image', values.image);
            post({ formData, headers });
        }
    })

    function changeFile(e) {
        const img = URL.createObjectURL(e.target.files[0]);
        setFile({
            blob: img,
            object: e.target.files[0]
        });
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        let percentLoaded;

        reader.onloadstart = () => setBarProgress({ opacity: 0, length: 0 })

        reader.onprogress = (e) => {
            if (e.lengthComputable) {
                percentLoaded = Math.round((e.loaded / e.total) * 100);
                setBarProgress({ opacity: 0, length: percentLoaded });
            }
        }

        reader.onloadend = () => setBarProgress({ opacity: 1, length: percentLoaded });
    }

    useEffect(()=>{
        if(isSuccess){
            setShowOverlay(false);
            navigate('/myPosts');
        }
    }, [isSuccess]);


    const { t } = useTranslation();

    return (
        <div className='overlay  fixed overflow-hidden'>
            <div className={` py-5 h-screen overflow-auto ${file ? '' : 'flex items-center'}`}>
                <div className="container ">
                    <div className=' w-full max-w-[720px] mx-auto bg-lightGrayColor dark:bg-darkBlueColor px-3 py-5 rounded-md   '>
                        <span className=' text-darkBlueColor dark: text-grayColor block w-fit ms-auto cursor-pointer' onClick={() => modal.handleOpen()}>
                            <i className="fa-solid fa-x" />
                        </span>
                        <h2 className=' text-h1 lowercase text-center text-darkBlueColor dark:text-white'>joyMedia</h2>
                        <h3 className='  text-black text-center dark:text-white mb-3'>{t("postOverlay.createPost")}</h3>
                        <img src={file.blob} className=' w-full mb-3' alt="" />
                        {/* <video src={file.blob} className=' w-full mb-3' alt="" autoPlay muted /> */}
                        <textarea type="text" name='body' className={` w-full h-52 border-2 ${formik.errors.body ? 'border-red-600' : ''}  bg-[#e0e0e0] rounded-md p-2`} placeholder={t("postOverlay.placeholder")} onChange={formik.handleChange}></textarea>
                        <div className='flex items-center mt-3'>
                            <label htmlFor='file' className='text-darkBlueColor dark:text-lightGrayColor text-2xl cursor-pointer me-1'>
                                <i className="fa-solid fa-file-arrow-up" />
                            </label>
                            <span className='  max-w-96 text-nowrap text-ellipsis overflow-hidden me-5'>
                                {file ? file.object.name : ''}
                            </span>
                            <input id='file' type="file" name='image' className='hidden' onChange={(e) => { changeFile(e); formik.setFieldValue('image', e.target.files[0]) }} />
                            <button type='submit' className='block relative z-0 overflow-hidden flex-shrink-0 capitalize py-1 px-4 rounded ms-auto bg-darkBlueColor text-white dark:bg-lightGrayColor dark:text-darkBlueColor hover:bg-darkerBlueColor dark:hover:bg-grayColor transition-colors duration-300' onClick={(e) => { setClick('click'); formik.handleSubmit(e) }}>
                                {t("postOverlay.post")}
                                <span className={`absolute bg-[#ffffffa1] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] z-[-1] ${click}`} onAnimationEnd={() => setClick('')}></span>
                            </button>
                        </div>
                        <div className=' flex items-center mt-4 gap-3'>
                            <div className=' bg-[#dcdcdc] h-3 rounded overflow-hidden flex-1'>
                                <div className=' h-full bg-darkBlueColor dark:bg-darkerBlueColor transition-all duration-500' style={{ width: barProgress.length + '%' }}></div>
                            </div>
                            <span className=' text-green-600 ' style={{ opacity: barProgress.opacity }}>
                                <i className="fa-solid fa-check" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {isLoading?<div className={`reload flex justify-center items-center bg-[#084480c2] fixed top-0 left-0 w-full h-full  z-[9999999]`}>
                <span className=" " />
            </div>:''}
        </div>
    )
}
