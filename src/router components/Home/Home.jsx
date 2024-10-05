import { useState } from 'react'
import './Home.css'

export default function Home() {

    let [sign, setSign] = useState('sign-up');


    return (
        <section className='home'>
            <div className="container">
                <div className='sign px-4 fixed w-full h-screen top-0 left-0  flex justify-center items-center'>
                    <div className='sign-box bg-white flex items-center w-[750px] mx-auto border-2 border-black rounded-se-xl rounded-es-xl relative overflow-hidden'>
                        <div className='sign-in w-1/2  p-3 flex flex-col items-center'>
                            <h2 className=' capitalize mb-4'>sign in</h2>
                            <form action="" className=' w-full'>
                                <div className='email w-full border-2  border-black relative rounded-md mb-3 bg-white'>
                                    <input type="email" className='w-full py-1 px-2 rounded-md mt-1' />
                                    <label className='absolute top-0 left-2 text-sm bg-white translate-y-[-50%] px-2'>email</label>
                                </div>
                                <div className='email w-full border-2 border-black relative rounded-md bg-white'>
                                    <input type="password" className='w-full py-1 px-2 rounded-md mt-1' />
                                    <label className='absolute top-0 left-2 text-sm bg-white translate-y-[-50%] px-2'>password</label>
                                </div>
                                <button  className=' bg-white border-2 border-black py-1 px-2 rounded-md hover:bg-black hover:text-white transition-colors duration-300 mt-4 block mx-auto'>Logout</button>
                            </form>
                        </div>
                        <div className='sign-up w-1/2 p-3 flex flex-col items-center'>
                            <h2 className=' capitalize mb-4'>sign up</h2>
                            <form action="" className='w-full'>
                                <div className='name w-full border-2 border-black relative rounded-md mb-3 bg-white'>
                                    <input type="text" className='w-full py-1 px-2 rounded-md mt-1' />
                                    <label className='absolute top-0 left-2 text-sm bg-white translate-y-[-50%] px-2'>name</label>
                                </div>
                                <div className='email  w-full border-2 border-black relative rounded-md mb-3 bg-white'>
                                    <input type="email" className=' w-full py-1 px-2 rounded-md mt-1' />
                                    <label className='absolute top-0 left-2 text-sm bg-white translate-y-[-50%] px-2'>email</label>
                                </div>
                                <div className='password w-full border-2 border-black relative rounded-md mb-3 bg-white'>
                                    <input type="password" className='w-full py-1 px-2 rounded-md mt-1' />
                                    <label className='absolute top-0 left-2 text-sm bg-white translate-y-[-50%] px-2'>password</label>
                                </div>
                                <div className='repassword w-full border-2 border-black relative rounded-md mb-3 bg-white'>
                                    <input type="password" className='w-full py-1 px-2 rounded-md mt-1' />
                                    <label className='absolute top-0 left-2 text-sm bg-white translate-y-[-50%] px-2'>repassword</label>
                                </div>
                                <div className='birth w-full border-2 border-black relative rounded-md mb-3 bg-white'>
                                    <input type="text" className='w-full py-1 px-2 rounded-md mt-1' />
                                    <label className='absolute top-0 left-2 text-sm bg-white translate-y-[-50%] px-2'>date of birth</label>
                                </div>
                                <div className='gender w-full border-2 border-black relative rounded-md mb-3 bg-white'>
                                    <input type="gender" className='w-full py-1 px-2 rounded-md mt-1' />
                                    <label className='absolute top-0 left-2 text-sm bg-white translate-y-[-50%] px-2'>gender</label>
                                </div>
                                <button  className=' bg-white border-2 border-black py-1 px-2 rounded-md hover:bg-black hover:text-white transition-colors duration-300 mt-4 block mx-auto'>Logout</button>
                            </form>
                        </div>
                        <div className={`bg-blueColor  w-1/2 h-full absolute top-0 left-0 overflow-hidden ${sign == 'sign-up' ? 'translate-x-full' : 'translate-x-0'} transition-transform duration-500`}>
                            <div className={`flex items-center w-[750px] h-full ${sign == 'sign-up' ? 'translate-x-[-50%]' : 'translate-x-0'} transition-transform duration-500`}>
                                <div className='sign-in w-1/2  p-3 flex flex-col items-center'>
                                    <h2 className=' capitalize mb-4 text-white'>sign in</h2>
                                    <p className='mb-4'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod, consequuntur voluptate. Iusto aliquam maxime officiis impedit laboriosam ut, itaque vero cum, asperiores necessitatibus, distinctio quibusdam iure facilis officia ducimus eligendi?</p>
                                    <button className=' bg-white border-2 border-black py-1 px-2 rounded-md hover:bg-black hover:text-white transition-colors duration-300 capitalize' onClick={() => setSign('sign-up')}>sign in</button>
                                </div>
                                <div className='sign-up w-1/2 p-3 flex flex-col items-center'>
                                    <h2 className=' capitalize mb-4 text-white'>sign up</h2>
                                    <p className='mb-4'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod, consequuntur voluptate. Iusto aliquam maxime officiis impedit laboriosam ut, itaque vero cum, asperiores necessitatibus, distinctio quibusdam iure facilis officia ducimus eligendi?</p>
                                    <button className=' bg-white border-2 border-black py-1 px-2 rounded-md hover:bg-black hover:text-white transition-colors duration-300 capitalize' onClick={() => setSign('sign-in')}>sign up</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
