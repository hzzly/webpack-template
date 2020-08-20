import { h } from 'preact';
import Text from '@/components/Text';

import styles from './index.scss';

const Home = () => {
  return (
    <div className={styles.home}>
      <Text />
    </div>
  );
};

export default Home;