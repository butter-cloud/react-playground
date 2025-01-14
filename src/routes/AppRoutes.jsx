import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Layout from '../components/Layout'
import Playground from '../pages/Playground'

const AppRoutes = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playground" element={<Playground />} />
        </Routes>
      </Layout>
    </>
  )
}

export default AppRoutes
