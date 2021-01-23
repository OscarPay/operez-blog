import { format, formatISO } from "date-fns";

import styles from '../styles/components/date.module.css';

type Props = {
  date: Date;
};
export default function Date({ date }: Props) {

  return (
    <time dateTime={formatISO(date)}>
      <span className={styles.date}>{format(date, "LLLL d, yyyy")}</span>
    </time>
  );
}
