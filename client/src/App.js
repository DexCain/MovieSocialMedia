import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { useAuthContext } from './hooks/useAuthContext'

import MovieWantList from './pages/MovieWantList'
import Navbar from './components/Navbar'

import MovieWatchedList from './pages/MovieWatchedList'

import AddReview from './pages/AddReview'

import Error404 from './pages/404'

import Login from './pages/Login'

import Signup from './pages/Signup'
import FriendsPage from './pages/FriendsPage'


function App() {

  const { user } = useAuthContext()

  console.log(user)

  return (
    <div className="App">
      <BrowserRouter>
      
        <Navbar />

        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={user ?<MovieWantList /> : <Navigate to="/login"/>}
            />
            <Route 
              path="/watched"
              element={user ?<MovieWatchedList />: <Navigate to="/"/>}
            />
            <Route 
              path="/review/:id"
              element={<AddReview />}
            />
            <Route 
              path="/friends"
              element={user ?<FriendsPage /> : <Navigate to="/login"/>}
            />
            <Route 
              path="/login"
              element={!user ? <Login />: <Navigate to="/"/>}
            />
            <Route 
              path="/signup"
              element={!user ? <Signup />: <Navigate to="/"/>}
            />
            <Route 
              path="*"
              element={<Error404 />}
            />
            
          </Routes>
        </div>
      </BrowserRouter>
    </div>

  );
}

export default App;
