import styles from './styles.module.scss';

function Loader() {
  return (
    <div className={styles.layout}>
      <div className={styles.customLoader}></div>
    </div>
  );
}

export default Loader;
