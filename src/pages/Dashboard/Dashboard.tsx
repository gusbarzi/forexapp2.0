import Header from "../../components/Nav/Nav";
import styles from "../../../styles/Animation.module.css";

import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";


export const Dashboard = () => {
    const { t } = useTranslation('dashboard');
    
    return (
        <main className={styles.mainBackground}>
            <Header home={true} />
            <div>
                <div className={styles.animated_title}>
                    <div className={styles.text_top}>
                        <div>
                            <span>{t('phrase_one')}</span>
                            <span>Forex Trading</span>
                        </div>
                    </div>
                    <div className={styles.text_bottom}>
                        <div>Application</div>
                    </div>
                </div>
            </div>
        </main>

)
}

export const getStaticProps = async ({ locale }: any) => ({
    props: {
        ...await serverSideTranslations(locale, ["dashboard"])
    },
});

export default Dashboard;