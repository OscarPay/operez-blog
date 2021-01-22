import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import { SocialList } from "../components/SocialList";

import styles from '../styles/pages/home.module.css';

export default function Home() {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />
        <div className={styles.container}>
          <div>
            <h1>
              Hi, We're Next.js & Netlify<span className={styles.fancy}>.</span>
            </h1>
            <span className={styles.handle}>@nextjs-netlify-blog</span>
            <h2>A blog template with Next.js and Netlify.</h2>
            <SocialList />
          </div>
        </div>
    </Layout>
  );
}
