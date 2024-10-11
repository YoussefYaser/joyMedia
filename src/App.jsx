
import { createHashRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './router components/Layout/Layout';
import Home from './router components/Home/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();

function App() {

  const routes = createHashRouter([
    {path : '/', element : <Layout></Layout>, children : [
      {index : true, element : <Home></Home>}
    ]}
  ]);

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes}></RouterProvider>
    </QueryClientProvider>
    </>
  )
}

export default App
