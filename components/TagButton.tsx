import Link from "next/link";
import { TagContent } from "../models/tags";

import styles from '../styles/components/tag-button.module.css';

type Props = {
  tag: TagContent;
};
export default function TagButton({ tag }: Props) {
  return (
    <>
      <Link href={"/blog/tags/[[...slug]]"} as={`/blog/tags/${tag.slug}`}>
        <a className={styles.tag}>{tag.name}</a>
      </Link>
    </>
  );
}
