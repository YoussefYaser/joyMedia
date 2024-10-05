import { forwardRef, useEffect } from 'react'
import './Nav.css'

const Nav = forwardRef(function Nav(props, { nav }) {


    return (
        <nav className='bg-[#f4f4f4]' ref={nav}>
            <div className="container">
                <div className=' flex justify-between items-center py-2'>
                    <h1 className='text-h2'>joyApp</h1>
                    <div className='flex items-center w-1/2'>
                        <div className='profile w-10 h-10 bg-slate-400 rounded-full me-2'>
                            {/* <img src="" className='profile-img w-full h-full' alt="" /> */}
                        </div>
                        <div className='create-post flex items-center flex-grow bg-white hover:bg-[#dfdfdf] capitalize border-2 border-black py-1 px-2 rounded-lg cursor-pointer transition-colors duration-300'>
                            create post
                            <i className="fa-regular fa-pen-to-square ms-auto" />
                        </div>
                    </div>
                    <button className=' bg-white border-2 border-black py-1 px-2 rounded-md hover:bg-black hover:text-white transition-colors duration-300'>Logout</button>
                </div>
            </div>
        </nav>
    )
});


export default Nav;

