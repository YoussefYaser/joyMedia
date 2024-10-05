
import { createHashRouter, RouterProvider } from 'react-router-dom'
import './App.css'

function App() {

  const routes = createHashRouter([

  ]);

  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
