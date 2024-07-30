import styles from "./Navbar.module.css"
import {Link} from "react-router-dom";
import { MdLogout } from "react-icons/md";

function Navbar() {
    return (
        <div className={styles.navContainer}>
            <div className={styles.navLink}>  <Link to="/login"><MdLogout /> <span>Log Out</span></Link> </div>
            
        </div>
    )
}

export default Navbar;