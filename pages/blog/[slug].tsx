import { getAllPostSlugs, getPostdata } from "../../lib/posts";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import matter from "gray-matter";
import yaml from "js-yaml";
import { parseISO } from "date-fns";
import { getTag } from '../../lib/tags';
import { getAuthor } from '../../lib/authors';
import MyButton from "../../components/MyButton";
import TagButton from '../../components/TagButton';
import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import TwitterCardMeta from "../../components/meta/TwitterCardMeta";
import OpenGraphMeta from "../../components/meta/OpenGraphMeta";
import JsonLdMeta from "../../components/meta/JsonLdMeta";
import Date from "../../components/Date";
import Author from "../../components/Author";
import { SocialList } from "../../components/SocialList";
import Copyright from "../../components/Copyright";
import styles from "../../styles/content.module.css";
import InstagramEmbed from "react-instagram-embed";
import { TwitterTweetEmbed } from "react-twitter-embed";
import YouTube from "react-youtube";

const components = { MyButton, InstagramEmbed, TwitterTweetEmbed, YouTube };

export default function Posts({ source, frontMatter }) {

  const {slug, title, tags, date, author} = frontMatter;

  const content = hydrate(source, { components });
  const keywords = tags.map((it) => getTag(it).name);
  const authorName = getAuthor(author).name;
  const description = 'Next.js blog template for Netlify'

  return (
    <Layout>
      <BasicMeta
          url={`/posts/${slug}`}
          title={title}
          keywords={keywords}
          description={description}
        />
        <TwitterCardMeta
          url={`/posts/${slug}`}
          title={title}
          description={description}
        />
        <OpenGraphMeta
          url={`/posts/${slug}`}
          title={title}
          description={description}
        />
        <JsonLdMeta
          url={`/posts/${slug}`}
          title={title}
          keywords={keywords}
          date={parseISO(date)}
          author={authorName}
          description={description}
        />
      <div className={"container"}>
        <article>
          <header>
            <h1>{title}</h1>
            <div className={"metadata"}>
                <div>
                  <Date date={parseISO(date)} />
                </div>
                <div>
                  <Author author={getAuthor(author)} />
                </div>
              </div>
          </header>
          <div className={styles.content}>{content}</div>
          <ul className={"tag-list"}>
              {tags.map((it, i) => (
                <li key={i}>
                  <TagButton tag={getTag(it)} />
                </li>
              ))}
            </ul>
        </article>
        <footer>
            <div className={"social-list"}>
              <SocialList />
            </div>
            <Copyright />
          </footer>
      </div>
      <style jsx>
       {`
         .container {
          display: block;
          max-width: 36rem;
          width: 100%;
          margin: 0 auto;
          padding: 0 1.5rem;
          box-sizing: border-box;
        }
        .metadata div {
          display: inline-block;
          margin-right: 0.5rem;
        }
        article {
          flex: 1 0 auto;
        }
        h1 {
          margin: 0 0 0.5rem;
          font-size: 2.25rem;
        }
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
        .social-list {
          margin-top: 3rem;
          text-align: center;
        }

        @media (min-width: 769px) {
          .container {
            display: flex;
            flex-direction: column;
          }
        }
         `}
      </style>
    </Layout>
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