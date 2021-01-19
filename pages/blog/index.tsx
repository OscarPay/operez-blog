import Link from "next/link";
import { getSortedPosts } from "../../lib/posts";

const BlogIndex = ({ allPostsData }) => {
  return (
    <>
      <div>
        <h1>My Blog</h1>
          {allPostsData.map(({ slug, date, title, excerpt }) => (
            <div key={slug}>
              <li>
                <div>
                  <Link key={slug} href="/blog/[slug]" as={`/blog/${slug}`}>
                    <a>
                      <h2>
                        {title}
                      </h2>
                    </a>
                  </Link>

                  <div>{excerpt}</div>

                  <div>{date}</div>
                </div>
              </li>
            </div>
          ))}
      </div>
    </>
  );
};
export default BlogIndex;

export async function getStaticProps() {
  const allPostsData = getSortedPosts();
  return {
    props: {
      allPostsData,
    },
  };
}