import type { GetStaticProps } from "next";
import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import OpenGraphMeta from "../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../components/meta/TwitterCardMeta";
import PostList from '../../components/PostList';
import config from "../../lib/config";
import { getSortedPosts, countPosts } from "../../lib/posts";
import { listTags } from "../../lib/tags";
import {TagContent} from '../../models/tags';

type Props = {
  posts: [];
  tags: TagContent[];
  pagination: {
    current: number;
    pages: number;
  };
};

const BlogIndex = ({ allPostsData, tags, pagination }) => {
  const url = "/posts";
  const title = "All posts";
  return (
    <Layout>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <PostList posts={allPostsData} tags={tags} pagination={pagination} />
    </Layout>
  );
};
export default BlogIndex;

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPosts();
  const tags = listTags();

  const pagination = {
    current: 1,
    pages: Math.ceil(countPosts() / config.posts_per_page),
  };

  return {
    props: {
      allPostsData,
      tags,
      pagination
    },
  };
}