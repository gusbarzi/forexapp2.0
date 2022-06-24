import Header from "../../components/Nav/Nav";
import styles from "../../../styles/Animation.module.css";

import { useRouter } from "next/router";
import { en, pt } from '../../../translations';
import { useState, useEffect } from "react";

export const Dashboard = () => {
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

    return (
        <main className={styles.mainBackground}>
            <Header home={true} />
            <div>
                <div className={styles.animated_title}>
                    <div className={styles.text_top}>
                        <div>
                            <span>{ a.phraseOne }</span>
                            <span>{ a.phraseTwo }</span>
                        </div>
                    </div>
                    <div className={styles.text_bottom}>
                        <div>{ a.phraseTree }</div>
                    </div>
                </div>
            </div>
        </main>

)
}

export default Dashboard;