// src/components/404/NotFoundPage.jsx
import styles from '../styles/404.module.css';
import GlossyButton from '../components/buttons/mirrorbutton';

export const NotFoundPage = () => {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.content}>
                <h1 className={styles.errorCode}>404</h1>
                <div className={styles.textWrapper}>
                    <h2 className={styles.mainMessage}>Whoa!</h2>
                    <h3 className={styles.subMessage}>That didn't work out.</h3>
                    <p className={styles.description}>
                        The page you are looking for either doesn't exist or currently not available
                    </p>
                </div>
                <GlossyButton href="/">Go Back Home</GlossyButton>
            </div>
        </div>
    );
};