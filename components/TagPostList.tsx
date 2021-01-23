import React from "react";
import Link from "next/link";
import { PostContent } from "../models/posts";
import { TagContent } from "../models/tags";
import PostItem from "./PostItem";
import Pagination from "./Pagination";

import styles from "../styles/components/tag-post-list.module.css";

type Props = {
  posts: PostContent[];
  tag: TagContent;
  pagination: {
    current: number;
    pages: number;
  };
};
export default function TagPostList({ posts, tag, pagination }: Props) {
  return (
    <div className={styles["tag-post-list"]}>
      <h1>
        <Link href="/blog">All posts</Link>/ <span>{tag.name}</span>
      </h1>
      <ul>
        {posts.map((it, i) => (
          <li key={i}>
            <PostItem post={it} />
          </li>
        ))}
      </ul>
      <Pagination
        current={pagination.current}
        pages={pagination.pages}
        link={{
          href: () => "/blog/tags/[[...slug]]",
          as: (page) =>
            page === 1
              ? "/blog/tags/" + tag.slug
              : `/blog/tags/${tag.slug}/${page}`,
        }}
      />
    </div>
  );
}
