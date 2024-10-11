import { useContext } from 'react'
import Sign from '../../components/Sign/Sign'
import './Home.css'
import { Authentication } from '../../context/AuthenticationContext/AuthenticationContextProvider';
import Posts from '../../components/Posts/Posts';

export default function Home() {

    let { isLogin } = useContext(Authentication);

    console.log("isLogin : ", isLogin);


    return (
        <section className='home'>
            <div className="container">
                <Sign></Sign>
                {isLogin?
                    <Posts></Posts>
                    :''
                }
            </div>
        </section>
    )
}
