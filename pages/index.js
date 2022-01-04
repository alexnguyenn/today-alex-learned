import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <meta name="description" content="Alex's daily programming-related notes" />
                <title>Today I Learned</title>
            </Head>
        </div>
    )
}
