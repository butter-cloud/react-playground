import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Layout from '../components/Layout'
import Playground from '../pages/Playground'
import Login from '../pages/Login'

const AppRoutes = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </>
  )
}

export default AppRoutes
