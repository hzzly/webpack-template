import { h } from 'preact';

import './index.scss';

const Toast = (props) => {
  const { content, style } = props;

  return (
    <div className="u-toast" style={style || {}}>
      {content}
    </div>
  );
};

export default Toast;