import { useContext, useEffect } from 'react'
import Sign from '../../components/Sign/Sign'
import './Home.css'
import { Authentication } from '../../context/AuthenticationContext/AuthenticationContextProvider';
import Posts from '../../components/Posts/Posts';
export default function Home() {

    
    let { isLogin } = useContext(Authentication);
    let { postsLoaded, setPostsLoaded } = useContext(Authentication);
    let { hideSign, setHideSign } = useContext(Authentication);
    

    useEffect(()=>{
        if(postsLoaded){
            setTimeout(()=>{
                setHideSign(true);
            }, 1000);
        }
    }, [postsLoaded])


    return (
        <section className='home'>
            <div className="container">
                {hideSign?'':<Sign postsLoaded={postsLoaded}></Sign>}
                {isLogin?
                    <Posts setPostsLoaded={setPostsLoaded}></Posts>
                    :''
                }
            </div>
        </section>
    )
}
