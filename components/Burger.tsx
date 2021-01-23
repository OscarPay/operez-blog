import styles from '../styles/components/burguer.module.css';

type Props = {
  active: boolean;
  onClick: () => void;
};
export default function Burger({ active, onClick }: Props) {
  return (
    <div className={`${styles.container} ` + (active ? `${styles.active}`: '')} onClick={onClick}>
      <div className={`${styles.meat} ${styles['meat-1']}`} />
      <div className={`${styles.meat} ${styles['meat-2']}`} />
      <div className={`${styles.meat} ${styles['meat-3']}`} />
    </div>
  );
}
