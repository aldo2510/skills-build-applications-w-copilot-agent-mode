import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import appLogo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Teams', path: '/teams' },
  { label: 'Users', path: '/users' },
  { label: 'Workouts', path: '/workouts' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="container py-3">
          <NavLink className="brand" to="/activities">
            <img src={appLogo} alt="" />
            <span>OctoFit Tracker</span>
          </NavLink>
        </div>
      </header>

      <nav className="navbar navbar-expand-md app-nav" aria-label="Main navigation">
        <div className="container">
          <div className="navbar-nav flex-row flex-wrap" id="main-navigation">
            {navigation.map(({ label, path }) => (
              <NavLink
                className={({ isActive }) =>
                  `nav-link${isActive ? ' active' : ''}`
                }
                key={path}
                to={path}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <main className="container app-content py-4">
        <Routes>
          <Route path="/" element={<Navigate replace to="/activities" />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate replace to="/activities" />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
