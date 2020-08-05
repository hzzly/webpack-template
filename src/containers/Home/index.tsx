import { FunctionalComponent, h } from 'preact';
import Text from '@/components/Text';

import * as styles from './index.scss';

const Home: FunctionalComponent = () => {
  return (
    <div className={styles.home}>
      <Text />
    </div>
  );
};

export default Home;
