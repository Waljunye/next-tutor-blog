import Layout from '../../components/Layout';
import { getAllPostsId, getPostData } from '../../lib/posts';
import Head from 'next/head';
import utilStyles from '../../styles/utils.module.css'
import Date from '../../components/Date'
//@ts-ignore
export default ({postData}) => {
    return(<Layout home={false}>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
            <h1 className={utilStyles.heading2Xl}>{postData.title}</h1>
            <div className={utilStyles.lightText}>
                <Date dateString={postData.date}/>
            </div>
            <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}/>
        </article>
    </Layout>);
}
export const getStaticPaths = async () => {
    const paths = getAllPostsId();
    return {
        paths,
        fallback: false,
    }
}
//@ts-ignore
export const getStaticProps = async ({ params }) => {
    const postData = await getPostData(params.id);
    return{
        props: {
            postData,
        }
    }
}
