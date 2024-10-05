
import { createHashRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './router components/Layout/Layout';
import Home from './router components/Home/Home';

function App() {

  const routes = createHashRouter([
    {path : '/', element : <Layout></Layout>, children : [
      {index : true, element : <Home></Home>}
    ]}
  ]);

  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
