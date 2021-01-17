import Head from "next/head";
import { getAllPostSlugs, getPostdata } from "../../lib/posts";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import matter from "gray-matter";
import MyButton from "../../components/MyButton";

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
        </div>
      </div>
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
  const { data, content } = matter(postContent);

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