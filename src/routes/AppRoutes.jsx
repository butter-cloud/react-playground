import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Playground from '../pages/Playground'
import Login from '../pages/Login'
import Request from '../pages/supporter/Request'
import NewMeetingPage from '../pages/chime/meeting/new/page'
import JoinMeetingPage from '../pages/chime/meeting/join/page'

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/login" element={<Login />} />
        <Route path="/supporter/request" element={<Request />} />
        <Route path="/chime/meeting/new" element={<NewMeetingPage />} />
        <Route path="/chime/meeting/join" element={<JoinMeetingPage />} />
      </Routes>
    </>
  )
}

export default AppRoutes
