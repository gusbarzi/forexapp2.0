import { Button } from '@mui/material';
import { Link } from "../../components/Link/Link";
import styles from '../../../styles/Nav.module.css';

export const Header = () => {
    return (
        <div>
            <header className={styles.container}>
                <nav className={styles.nav}>

                    <a className={styles.nav__logo} href={"/dashboard"}>Forex Tranding App</a>

                    <ul className={styles.nav__list}>
                        <li>
                            <Link href="/login">
                                <Button className={styles.button} color="primary">Sign in</Button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/register">
                                <Button className={styles.button} color="primary">Create an account</Button>
                            </Link>
                        </li>
                    </ul>

                </nav>
            </header>
        </div>
    )

}

export default Header;