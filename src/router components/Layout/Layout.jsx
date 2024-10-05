import { Outlet } from 'react-router-dom'
import Nav from '../../components/Nav/Nav'
import './Layout.css'
import { useEffect, useRef, useState } from 'react'

export default function Layout() {
    
    let [navHeight, setNavHeight] = useState({});
    let nav = useRef();
    
    useEffect(()=>{
        setNavHeight({
            paddingTop : nav.current.clientHeight
        });
    }, []);

    return (
        <section className='layout' style={navHeight}>
            <Nav ref={{nav}}></Nav>
            <Outlet></Outlet>
        </section>
    )
}
