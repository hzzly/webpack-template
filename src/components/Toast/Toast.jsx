import React from 'react';

import styles from './index.scss';

const Toast = (props) => {
  const { content, style } = props;

  return (
    <div className={styles.toast} style={style || {}}>
      {content}
    </div>
  );
};

export default Toast;
