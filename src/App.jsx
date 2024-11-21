
import { createHashRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './router components/Layout/Layout';
import Home from './router components/Home/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Myposts from './router components/MyPosts/Myposts';
import ProtectedRoute from './components/Protected Route/ProtectedRoute';
import PostDetails from './router components/PostDetails/PostDetails';
import { useState } from 'react';


const queryClient = new QueryClient();

function App() {

  let startDark = localStorage.getItem('joyMediaTokenDark')?localStorage.getItem('joyMediaTokenDark'):null;

  let [dark, setDark] = useState(startDark);

  if(dark == 'light' || dark == null){
    document.body.classList.remove('dark');
    document.body.classList.add('light');
  }
  else if(dark == 'dark'){
    document.body.classList.remove('light');
    document.body.classList.add('dark');
  }

  const routes = createHashRouter([
    {path : '/', element : <Layout></Layout>, children : [
      {index : true, element : <Home></Home>},
      {path : '/myPosts', element : <ProtectedRoute><Myposts></Myposts></ProtectedRoute> },
      {path : '/postDetails/:postId', element : <ProtectedRoute><PostDetails></PostDetails></ProtectedRoute> },
    ]}
  ]);



  function handleDark(){
    if(dark == 'dark'){
      document.body.classList.remove('dark');
      document.body.classList.add('light');
      localStorage.setItem('joyMediaTokenDark', 'light');
      setDark('light');
    }
    else if(dark == 'light' || dark == null){
      document.body.classList.remove('light');
      document.body.classList.add('dark');
      localStorage.setItem('joyMediaTokenDark', 'dark');
      setDark('dark');
    }

  }

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes}></RouterProvider>
    </QueryClientProvider>

    <div className=' size-12 fixed bottom-4 left-4 z-[99999999] shadow-md shadow-black bg-darkBlueColor dark:bg-grayColor flex justify-center items-center rounded-full cursor-pointer' onClick={handleDark}>
      <span className={`absolute text-white ${dark=='light'|| dark == null?'opacity-1':'opacity-0'}`}>
        <i className="fa-solid fa-moon" />
      </span>
      <span className={`text-black ${dark=='dark'?'opacity-1':'opacity-0'} `}>
        <i className="fa-solid fa-sun" />
      </span>
    </div>
    </>
  )
}

export default App
