import { Button, ButtonGroup } from '@mui/material';
import { Link } from "../../components/Link/Link";
import styles from '../../../styles/Nav.module.css';
import Userbutton from '../Userbutton/Userbutton';

import { useRouter } from "next/router";
import { en, pt } from '../../../translations'; 
import { useEffect, useState } from 'react';

export const Header = ({ home }: any) => {
    const router = useRouter();
    const {locale} = router;

    const [language, setLanguage] = useState()

    const getLanguage = () => {
       return window.localStorage.getItem('i18nextLng')
    }
    
    useEffect(() => {
        const get: any = getLanguage();
        setLanguage(get);
    }, [])

    const a = locale === language ? pt : en;

    const handleSelectChange = (value: any) => {
        window.localStorage.setItem("i18nextLng", value);
        window.location = window.location
    }

    return (
        <div>
            <header className={styles.container}>
                <nav className={styles.nav}>

                    <a className={styles.nav__logo} href={"/"}>{a.logo}</a>
                    {

                        home === true && <ul className={styles.nav__list}>
                            <li>
                                <ButtonGroup  aria-label="small outlined button group" variant="text">
                                    <Button onClick={() => {handleSelectChange('en-US')}} className={styles.button} value="en-US">EN</Button>
                                    <Button onClick={() => {handleSelectChange('pt-BR')}} className={styles.button} value="pt-BR">PT</Button>
                                </ButtonGroup>
                            </li>
                            <li>
                                <Link href="/login">
                                    <Button className={styles.button} color="primary">{a.signin}</Button>
                                </Link>
                            </li>
                            <li>
                                <Link href="/register">
                                    <Button className={styles.button} color="primary">{a.signup}</Button>
                                </Link>
                            </li>
                        </ul>

                    }

                    {
                        home === false && <ul className={styles.nav__list}>
                            <li>
                                <ButtonGroup aria-label="small outlined button group" variant="text">
                                    <Button onClick={() => {handleSelectChange('en-US')}} className={styles.button}>EN</Button>
                                    <Button onClick={() => {handleSelectChange('pt-BR')}} className={styles.button}>PT</Button>
                                </ButtonGroup>
                            </li>
                            <li>
                                <Link href="/portifolio">
                                    <Button className={styles.button} color="primary">{a.wallet}</Button>
                                </Link>
                            </li>
                            <li>
                                <Link href="/trading">
                                    <Button className={styles.button} color="primary">{a.forextrade}</Button>
                                </Link>
                            </li>
                            <li>
                                <Link href="/transactions">
                                    <Button className={styles.button} color="primary">{a.transactions}</Button>
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