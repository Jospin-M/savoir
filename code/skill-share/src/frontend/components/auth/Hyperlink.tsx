import styles from "./Auth.module.css"

export default function Hyperlink({ prompt } : { prompt: string }) {
    return (
        <a className={styles.hyperlink}>
                {prompt}
        </a>
    );
}