import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { Navigate } from 'react-router-dom'
const Navbar = () => {

    const { logout } = useLogout()

    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
        window.location = "/login"
        
    }

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Movie Storage</h1>
                </Link>
            </div>
            {user && <div className="container-links">
                <Link to='/'>
                    <div>To-Watch List</div>
                </Link>
                <Link to='/watched'>
                    <div>Watched List</div>
                </Link>
                <Link to='/friends'>
                    <div>My Friends</div>
                </Link>
                <span id="nav-right-align">
                    <span>{user.username}</span>
                    <button onClick={handleClick}>Log Out</button>
                </span>
            </div>}
            {!user && (
                <div className="container-links auth-links">
                    <Link to='/login'>
                        <div>Login</div>
                    </Link>
                    <Link to='/signup'>
                        <div>Signup</div>
                    </Link>
                </div>
            )}
                {user && (
                    <div>
                        
                    </div>
                )}
        </header>
    )
}

export default Navbar