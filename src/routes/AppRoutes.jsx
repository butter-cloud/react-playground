import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Layout from '../components/Layout'
import Playground from '../pages/Playground'
import Login from '../pages/Login'
import Request from '../pages/supporter/Request'
import NewMeetingPage from '../pages/chime/meeting/new/page'

const AppRoutes = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/login" element={<Login />} />
          <Route path="/supporter/request" element={<Request />} />
          <Route path="/chime/meeting/new" element={<NewMeetingPage />} />
        </Routes>
      </Layout>
    </>
  )
}

export default AppRoutes
