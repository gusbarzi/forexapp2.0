import { Button, ButtonGroup } from '@mui/material';
import { Link } from "../../components/Link/Link";
import styles from '../../../styles/Nav.module.css';
import Userbutton from '../Userbutton/Userbutton';

export const Header = ({ home }: any) => {
    return (
        <div>
            <header className={styles.container}>
                <nav className={styles.nav}>

                    <a className={styles.nav__logo} href={"/dashboard"}>Forex Tranding App</a>
                    {

                        home === true && <ul className={styles.nav__list}>
                            <li>
                                <ButtonGroup aria-label="small outlined button group" variant="text">
                                    <Button className={styles.button}>EN</Button>
                                    <Button className={styles.button}>PT</Button>
                                </ButtonGroup>
                            </li>
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

                    }

                    {
                        home === false && <ul className={styles.nav__list}>
                            <li>
                                <ButtonGroup aria-label="small outlined button group" variant="text">
                                    <Button className={styles.button}>EN</Button>
                                    <Button className={styles.button}>PT</Button>
                                </ButtonGroup>
                            </li>
                            <li>
                                <Link href="/portifolio">
                                    <Button className={styles.button} color="primary">Wallet</Button>
                                </Link>
                            </li>
                            <li>
                                <Link href="/trading">
                                    <Button className={styles.button} color="primary">Forex Trade</Button>
                                </Link>
                            </li>
                            <li>
                                <Link href="/transactions">
                                    <Button className={styles.button} color="primary">Transactions History</Button>
                                </Link>
                            </li>
                            <li>
                                <Link href="#">
                                    <Userbutton />
                                </Link>
                            </li>
                        </ul>

                    }
                </nav>
            </header>
        </div>
    )

}

export default Header;