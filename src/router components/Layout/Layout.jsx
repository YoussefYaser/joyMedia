import { Outlet } from 'react-router-dom'
import Nav from '../../components/Nav/Nav'
import './Layout.css'
import { useEffect, useRef } from 'react'

export default function Layout() {

    let nav = useRef();
    
    useEffect(()=>{
        console.log(nav);
    }, []);

    return (
        <section className='layout'>
            <Nav ref={{nav}}></Nav>
            <Outlet></Outlet>
        </section>
    )
}
