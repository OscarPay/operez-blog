import React from "react";
import { PostContent } from '../models/posts';
import PostItem from './PostItem';
import TagLink from './TagLink';
import Pagination from './Pagination';
import { TagContent } from "../models/tags";

import styles from '../styles/components/post-list.module.css';

type Props = {
  posts: PostContent[];
  tags: TagContent[];
  pagination: {
    current: number;
    pages: number;
  };
};
export default function PostList({ posts, tags, pagination }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.posts}>
        <ul className={styles["post-list"]}>
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
            href: (page) => (page === 1 ? "/blog" : "/blog/page/[page]"),
            as: (page) => (page === 1 ? null : "/blog/page/" + page),
          }}
        />
      </div>
      <ul className={styles["categories"]}>
        {tags.map((it, i) => (
          <li key={i}>
            <TagLink tag={it} />
          </li>
        ))}
      </ul>
    </div>
  );
}
