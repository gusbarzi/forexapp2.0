import Header from "../../components/Nav/Nav";
import styles from "../../../styles/Animation.module.css";

export default function Home() {
    return (
        <main className={styles.mainBackground}>
            <Header home={false} />
            <div>
                <div className={styles.animated_title}>
                    <div className={styles.text_top}>
                        <div>
                            <span>The best</span>
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