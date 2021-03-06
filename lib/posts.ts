import fs from "fs";
import path from "path";
import matter from "gray-matter";
import yaml from "js-yaml";
import {PostContent} from '../models/posts'

//Finding directory named "posts" from the current working directory of Node.
const postDirectory = path.join(process.cwd(), "posts");

export const getSortedPosts = () => {
  //Reads all the files in the post directory
  const fileNames = fs.readdirSync(postDirectory);

  const allPostsData = fileNames.map((filename) => {
    const slug = filename.replace(".mdx", "");

    const fullPath = path.join(postDirectory, filename);
    //Extracts contents of the MDX file
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents, {
      engines: {
        yaml: (s) => yaml.safeLoad(s, { schema: yaml.JSON_SCHEMA }) as object,
      },
    });

    const frontmatter = {
      ...data,
    } as {
      date: string;
      title: string;
      tags: string[];
      slug: string;
    };

    return {
      slug,
      ...frontmatter,
    };
  });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
};

//Get Slugs
export const getAllPostSlugs = () => {
  const fileNames = fs.readdirSync(postDirectory);

  return fileNames.map((filename) => {
    return {
      params: {
        slug: filename.replace(".mdx", "")
      }
    };
  });
};

//Get Post based on Slug
export const getPostdata = async (slug) => {
  const fullPath = path.join(postDirectory, `${slug}.mdx`);
  const postContent = fs.readFileSync(fullPath, "utf8");

  return postContent;
};

export function countPosts(tag?: string): number {
  return getSortedPosts()
  .filter(
    (it) => !tag || (it.tags && it.tags.includes(tag))
  )
  .length;
}

export function listPostContent(
  page: number,
  limit: number,
  tag?: string
): PostContent[] {
  return getSortedPosts()
    .filter((it) => !tag || (it.tags && it.tags.includes(tag)))
    .slice((page - 1) * limit, page * limit);
}