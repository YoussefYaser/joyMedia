import i18n from 'i18next'
import english from '../../assets/english.webp'
import arabic from '../../assets/arabic.webp'
import { useEffect, useState } from 'react'
import './LanguageSelector.css'


export default function LanguageSelector({block}) {    

    let [lang, setLang] = useState('en');
    let [showList, setShowList] = useState('');

    function handleList(){
        if(showList == 'show')
            setShowList('hide');
        else
            setShowList('show');
    }


    function changeToEn(){
        setLang('en');
        i18n.changeLanguage('en');
    }

    function changeToAr(){
        setLang('ar');
        i18n.changeLanguage('ar');
    }

    useEffect(()=>{
        document.body.dir = i18n.dir();
    }, [i18n, i18n.language])

    return (
        <div className={`lang-selector min-w-32 bg-grayColor text-darkBlueColor cursor-pointer shadow-md ${block?'relative':'absolute top-5 left-1/2 translate-x-[-50%]'}  w-fit capitalize px-2 py-1 rounded-t flex items-center`} onClick={handleList}>
            {lang=='en'?'English':'العربية'}
            <img src={lang=='en'?english:arabic} className=' w-5 ms-2' alt="" />
            <i className="fa-solid fa-chevron-down ms-auto" />
            <ul className={`w-full absolute top-full left-0 bg-[#e5e5e5] shadow-md shadow-darkerBlueColor  rounded-b  origin-top overflow-hidden transition duration-300 ${showList}`}>
                <li className='flex items-center px-2 py-1 hover:bg-darkBlueColor hover:text-white transition-colors duration-100' onClick={changeToEn}>
                    english
                    <img src={english} className=' w-5 ms-2' alt="" />
                </li>
                <li className='flex items-center px-2 py-1 hover:bg-darkBlueColor hover:text-white transition-colors duration-100' onClick={changeToAr}>
                    العربية
                    <img src={arabic} className=' w-5 ms-6' alt="" />
                </li>
            </ul>

        </div>
    )
}
