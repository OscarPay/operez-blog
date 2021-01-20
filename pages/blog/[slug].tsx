import Head from "next/head";
import { getAllPostSlugs, getPostdata } from "../../lib/posts";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import matter from "gray-matter";
import yaml from "js-yaml";
import { getTag } from '../../lib/tags';
import MyButton from "../../components/MyButton";
import TagButton from '../../components/TagButton';

const components = { MyButton };

export default function Posts({ source, frontMatter }) {
  const content = hydrate(source, { components });

  return (
    <>
      <Head>
        <title>{frontMatter.title}</title>
      </Head>
      <div>
        <div>
          <h1>{frontMatter.title}</h1>
          <div>
            {frontMatter.author}
              {" / "}
            <span>{frontMatter.date}</span>
          </div>
          <hr/>
          <div>
            {content}
          </div>
          <ul className={"tag-list"}>
              {frontMatter.tags.map((it, i) => (
                <li key={i}>
                  <TagButton tag={getTag(it)} />
                </li>
              ))}
            </ul>
        </div>
      </div>
      <style jsx>
       {
         `
         .tag-list {
          list-style: none;
          text-align: right;
          margin: 1.75rem 0 0 0;
          padding: 0;
        }
        .tag-list li {
          display: inline-block;
          margin-left: 0.5rem;
        }
         `
       }
      </style>
    </>
  );
}
export async function getStaticPaths() {
  const paths = getAllPostSlugs();
  return {
    paths,
    fallback: false
  };
}
export async function getStaticProps({ params }) {
  const postContent = await getPostdata(params.slug);
  const { data, content } = matter(postContent, {
    engines: {
      yaml: (s) => yaml.safeLoad(s, { schema: yaml.JSON_SCHEMA }) as object,
    },
  });

  const mdxSource = await renderToString(content, {
    components,
    scope: data
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data
    }
  };
}