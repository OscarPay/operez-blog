import Link from "next/link";
import { useRouter } from "next/router";
import Burger from "./Burger";
import { useState } from "react";

import styles from '../styles/components/navigation.module.css';

export default function Navigation() {
  const router = useRouter();
  const [active, setActive] = useState(false);
  return (
    <>
      <Burger active={active} onClick={() => setActive(!active)} />
      <div className={`${styles.navigation} ` + (active ? `${styles.active}` : '')}>
        <ul>
          <li>
            <Link href="/">
              <a className={router.pathname === "/" ? styles.active : null}>about</a>
            </Link>
          </li>
          <li>
            <Link href="/blog">
              <a
                className={
                  router.pathname.startsWith("/blog") ? styles.active : null
                }
              >
                blog
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
