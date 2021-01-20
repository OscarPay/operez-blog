import Link from "next/link";
import { TagContent } from '../models/tags';

type Props = {
  tag: any;
};
export default function Tag({ tag }: Props) {
  return (
    <Link href={"/posts/tags/[[...slug]]"} as={`/posts/tags/${tag.slug}`}>
      <a>{"#" + tag.name}</a>
    </Link>
  );
}
