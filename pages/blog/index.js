import Link from "next/link";
import { getSortedPosts } from "../../lib/posts";

const BlogIndex = ({ allPostsData }) => {
  return (
    <>
      <div>
        <h1>My Blog</h1>
          {allPostsData.map(({ slug, date, title, excerpt }) => (
            <div variant="containers.postCard" sx={{ my: "0.5rem" }} key={slug}>
              <li
                sx={{
                  display: "flex",
                  flexDirection: ["column", "row"],
                  my: "1rem",
                }}
              >
                <div>
                  <Link key={slug} href="/blog/[slug]" as={`/blog/${slug}`}>
                    <a>
                      <h2
                        sx={{
                          fontSize: "calc(1.6rem + 0.2vw)",
                          fontWeight: "500",
                        }}
                      >
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