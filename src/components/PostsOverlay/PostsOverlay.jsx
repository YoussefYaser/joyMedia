import { useTranslation } from 'react-i18next'
import './PostsOverlay.css'

export default function PostsOverlay({ file, barProgress, changeFile, click, setClick, modal }) {



    const { t } = useTranslation();

    return (
        <div className='overlay  fixed overflow-hidden'>
            <div className={` py-5 h-screen overflow-auto ${file ? '' : 'flex items-center'}`}>
                <div className="container ">
                    <div className=' w-full max-w-[720px] mx-auto bg-lightGrayColor dark:bg-darkBlueColor px-3 py-5 rounded-md   '>
                        <span className=' text-darkBlueColor block w-fit ms-auto cursor-pointer' onClick={()=>modal.handleOpen()}>
                            <i className="fa-solid fa-x" />
                        </span>
                        <h2 className=' text-h1 lowercase text-center text-darkBlueColor dark:text-white'>joyMedia</h2>
                        <h3 className='  text-black text-center dark:text-white mb-3'>{t("postOverlay.createPost")}</h3>
                        <img src={file.blob} className=' w-full mb-3' alt="" />
                        {/* <video src={file.blob} className=' w-full mb-3' alt="" autoPlay muted /> */}
                        <textarea type="text" className=' w-full h-52 bg-[#e0e0e0] rounded-md p-2' placeholder={t("postOverlay.placeholder")} ></textarea>
                        <div className='flex items-center mt-3'>
                            <label htmlFor='file' className='text-darkBlueColor dark:text-lightGrayColor text-2xl cursor-pointer me-1'>
                                <i className="fa-solid fa-file-arrow-up" />
                            </label>
                            <span className='  max-w-96 text-nowrap text-ellipsis overflow-hidden me-5'>
                                {file ? file.object.name : ''}
                            </span>
                            <input id='file' type="file" className='hidden' onChange={(e) => changeFile(e)} />
                            <button className='block relative z-0 overflow-hidden flex-shrink-0 capitalize py-1 px-4 rounded ms-auto bg-darkBlueColor text-white dark:bg-lightGrayColor dark:text-darkBlueColor hover:bg-darkerBlueColor dark:hover:bg-grayColor transition-colors duration-300' onClick={() =>setClick('click') }>
                                {t("postOverlay.post")}
                                <span className={`absolute bg-[#ffffffa1] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] z-[-1] ${click}`} onAnimationEnd={() => setClick('')}></span>
                            </button>
                        </div>
                        <div className=' flex items-center mt-4 gap-3'>
                            <div className=' bg-[#dcdcdc] h-3 rounded overflow-hidden flex-1'>
                                <div className=' h-full bg-darkBlueColor transition-all duration-500' style={{ width: barProgress.length + '%' }}></div>
                            </div>
                            <span className=' text-green-600 ' style={{ opacity: barProgress.opacity }}>
                                <i className="fa-solid fa-check" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
