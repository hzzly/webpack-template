import { h } from 'preact';
import { IConfig } from './typed';

import * as styles from './index.scss';

const Toast = (props: IConfig) => {
  const { content, style } = props;

  return (
    <div className={styles.toast} style={style || {}}>
      {content}
    </div>
  );
};

export default Toast;
