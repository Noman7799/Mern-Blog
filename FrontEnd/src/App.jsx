import {Routes , Route } from "react-router-dom"
import Home from "./Pages/Home"
import About from "./Pages/About"
import Projects from "./Pages/Projects"
import SignIn from "./Pages/SignIn"
import SignUp from "./Pages/SignUp"
import DashBoard from "./Pages/DashBoard"
import Header from "./Components/Header"
const App = () => {
  return (
   <>
   <Header/>
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/projects" element={<Projects />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/dashboard" element={<DashBoard />} />
   </Routes>
   
   </>
  )
}

export default App