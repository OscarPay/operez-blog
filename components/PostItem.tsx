import { PostContent } from '../models/posts';
import Date from './Date';
import Link from "next/link";
import { parseISO } from "date-fns";

import styles from '../styles/components/post-item.module.css';

type Props = {
  post: PostContent;
};
export default function PostItem({ post }: Props) {
  return (
    <Link href="/blog/[slug]" as={`/blog/${post.slug}`}>
      <a className={styles['post-item']}>
        <Date date={parseISO(post.date)} />
        <h2>{post.title}</h2>
      </a>
    </Link>
  );
}
