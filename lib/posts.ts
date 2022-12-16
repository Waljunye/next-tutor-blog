import * as fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html'
const postsDir = path.join(process.cwd(), 'posts');

export const getSortedPostsData = () => {
    const fileNames = fs.readdirSync(postsDir);
    const allPostsData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, '');

        const fullPath = path.join(postsDir, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf-8');

        const matterResult = matter(fileContents);

        return{
            id,
            ...matterResult.data
        };
    });

    return allPostsData.sort((a, b) => {
        //@ts-ignore
        if(a.date < b.date){
            return 1;
        }
        return -1;
    })
}

export const getAllPostsId = () => {
    const fileNames = fs.readdirSync(postsDir);
    return fileNames.map((fileName) => {
        return{
            params:{
                id: fileName.replace(/\.md$/, ""),
            }
        }
    })
}
export const getPostData = async (id: string) => {
    const fullPath = path.join(postsDir, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf-8');

    const matterResult = matter(fileContents);
    const content = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = content.toString();

    return{
        id,
        contentHtml,
        ...matterResult.data
    }
}
