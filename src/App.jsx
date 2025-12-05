import { Route, Routes } from 'react-router'
import './App.css'
import { Home } from './Pages/Home'
import { Articles } from './Pages/Articles'
import { Article } from './Pages/Article'
import { SignIn } from './Pages/SignIn'
import { SignUp } from './Pages/SignUp'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
function App() {
  return (
   <div>
    {/* header */}
    <Header/>
    {/* main sections bage */}
    <main>
      {/* routes bages */}
        <Routes>
          {/* public bage  */}
          <Route path='/' element={<Home/>}/>
          <Route path='/articles' element={<Articles/>}/>
          <Route path='/article/:id' element={<Article/>}/>
          {/* authantication pages (rediration to if login ) */}
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/signup' element={<SignUp/>}/>
        </Routes>
    </main>
 {/* footer */}
    <Footer/>
   </div>
  )
}

export default App
