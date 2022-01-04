import Head from 'next/head'
import Image from 'next/image'
import ClientOnly from '../components/ClientOnly'
import Header from '../components/Header'
import Posts from '../components/Posts/Posts'
import styles from '../styles/Home.module.css'

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <meta name="description" content="Alex's daily programming-related notes" />
                <title>Today I Learned</title>
            </Head>
            <Header />
            <ClientOnly>
                <Posts />
            </ClientOnly>
        </div>
    )
}
