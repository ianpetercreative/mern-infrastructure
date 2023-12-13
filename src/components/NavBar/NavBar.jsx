import './NavBar.css'
import { Link } from 'react-router-dom'
import * as userService from '../../utilities/users-service'

export default function NavBar({ user, setUser }) {
    function handleLogOut(){
        userService.logOut();
        setUser(null);
    }
    return (
        <nav>
            <div>
                <Link to="/orders">Order History</Link>
                &nbsp; | &nbsp;
                <Link to="/orders/new">New Order</Link>
            </div>
            {user && <div>
                <span>Welcome, {user.name}!</span>
                &nbsp; | &nbsp;
                <Link to="" onClick={handleLogOut}>Log Out</Link>
            </div>}
        </nav>
    )
}