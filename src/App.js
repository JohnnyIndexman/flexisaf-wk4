import React from 'react'
import Nav from './components/Nav'
import Home  from './pages/Home'
// import Layout from './Layout'
// import { 
//   Route,
//   createRoutesFromElements,
//   RouterProvider,
//   createBrowserRouter
// } from "react-router-dom"

// const homeLoader = async () => {
//   const res = await fetch('https://api.jsonbin.io/v3/b/67062cb1e41b4d34e43f95c9')
//   if(!res.ok) {
//     throw new Error("Failed to fetch posts");
//   }
//   return res.json()
// }


function App() {
  // const router = createBrowserRouter(createRoutesFromElements (
  //   <Route element = {<Layout />} >
  //     <Route path="/" element={<Home />} loader={homeLoader}/>
  //     {/* <Route path="/" element={<Home />} /> */}
  //   </Route>
  // ))
  return (
    <div className='App'>
      <Nav />
      <Home />
      {/* <RouterProvider router = {router} /> */}
    </div>
  )
}

export default App
