import { HashRouter, Routes, Route } from 'react-router-dom'
import Loader from './components/Loader'
import AppNav from './components/AppNav'
import Login from './pages/Login'
import ProductDetail from './pages/ProductDetail'
import Purchases from './pages/Purchases'
import Home from './pages/Home'
import Container from 'react-bootstrap/Container'
import { useSelector} from 'react-redux/es/hooks/useSelector'
import './App.css'

function App() {
const stateLoader = useSelector(state => state.isLoader)

  return (
    <>
      <HashRouter>
        <AppNav/>
        <Container>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Purchase" element={<Purchases/>}/>
          <Route path="/ProductDetail/:id" element={<ProductDetail/>}/>
        </Routes>
        </Container>
        {stateLoader && <Loader/>}
      </HashRouter>
    </>
  )
}

export default App
