import { Outlet } from 'react-router-dom'
import Nav from '../../components/Nav/Nav'
import './Layout.css'
import { useContext, useEffect, useRef, useState } from 'react'
import { Authentication } from '../../context/AuthenticationContext/AuthenticationContextProvider';

export default function Layout() {

    let [navHeight, setNavHeight] = useState({});
    let nav = useRef();

    let { isLogin } = useContext(Authentication);

    useEffect(() => {
        setNavHeight({
            paddingTop: nav?.current?.clientHeight
        });
    }, [nav, isLogin]);

    return (
        <section className='layout min-h-screen flex flex-col' style={navHeight}>
            {isLogin ?
                <Nav ref={{ nav }}></Nav>
                : ''
            }
            <Outlet></Outlet>
        </section>
    )
}
