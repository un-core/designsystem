import fs from 'fs'
import matter from 'gray-matter';

import { extname, resolve, join }  from 'path';

const fsPromises = fs.promises;

export const postsDirectory = join(process.cwd(), '_posts');

async function getFiles(dir) {
  const dirents = await fsPromises.readdir(dir, { withFileTypes: true });

  const files = await Promise.all(dirents.map((dirent) => {
    const res = resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  }));
  return Array.prototype.concat(...files);
}

export async function getPostSlugs() {

  const files = await getFiles(postsDirectory);

  const filesFiltered = files.filter(el => extname(el) === '.mdx');
  const results : any = [];

  filesFiltered.map(f => {
    const fileContents = fs.readFileSync(f, 'utf8');
    const { data } = matter(fileContents);
    results.push({slug: data.slug.replace("tab:", ""), path: f});
    if(data.slug.includes("/tab:Code")) {
      results.push({slug: data.slug.replace("tab:Code", "Props"), path: f});
    }
  });

 return results;
}


export function getPostByPath(path:any, fields:any = []) {

  //const realSlug = slug.replace(/\.mdx$/, '')
 // const fullPath = foundSlug.path // join(postsDirectory, `${slug.joi}.mdx`);
  const fileContents = fs.readFileSync(path, 'utf8')
  const { data, content } = matter(fileContents);

  const items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    /*if (field === 'slug') {
      items[field] = realSlug
    }*/
    if (field === 'content') {
      items[field] = content
    }
    if (data[field]) {
      items[field] = data[field]
    }
  })
  return {...items, path};
}

export async function getAllPosts(fields :any= []) {

  const slugs = await getPostSlugs();
  const posts = slugs
    .map((slug) => getPostByPath(slug.path, fields))
    .sort((post1: any, post2:any) => (post1.date > post2.date ? -1 : 1))
  return posts
}