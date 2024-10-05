
import { createHashRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './router components/Layout/Layout';

function App() {

  const routes = createHashRouter([
    {path : '/', element : <Layout></Layout>, children : [
      
    ]}
  ]);

  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
