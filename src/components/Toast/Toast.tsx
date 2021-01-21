import * as React from 'react';
import { IConfig } from './typed';

import './index.scss';

const Toast: React.FC<IConfig> = (props) => {
  const { content, style } = props;

  return (
    <div className="toast" style={style || {}}>
      {content}
    </div>
  );
};

export default Toast;
