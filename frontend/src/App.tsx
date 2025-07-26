import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import  Signup  from './pages/Signup'
import  Signin  from './pages/Signin'
import Dashboard from './pages/Dashboard'
import Publish from './pages/Publish'
import HomePage from './pages/HomePage';
import { BlogDetails } from './pages/BlogDetails';

function App() {
  

  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/blogs" element={<HomePage />} />
          <Route path="/publish" element={<Publish />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App




