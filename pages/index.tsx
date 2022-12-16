import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/Layout';
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts';
import Date from '../components/Date'
//@ts-ignore
export default function Home({allPostsData}) {
    return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
        <section className={utilStyles.headingMd}>
            <p>Matvey Volkov</p>
            <p>
                Full-Stack web-developer. Feel free to contact me on {' '}
                <a href="https://gitlab.com/Waljunye">GitLab</a>
            </p>
            <p>
                <ul className={utilStyles.list}>
                    {//@ts-ignore
                        allPostsData.map(({id, date, title}) => {
                        return(
                            <li key={id} className={`${utilStyles.listItem}`}>
                                <Link href={`posts/${id}`}>{title}</Link>
                                <br/>
                                <small className={utilStyles.lightText}>
                                    <Date dateString={date}/>
                                </small>
                            </li>
                        )
                    } )}
                </ul>

            </p>

        </section>
    </Layout>
  )
}
export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData,
        },
    }
}
