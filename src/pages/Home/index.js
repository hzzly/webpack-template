import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styles from './index.scss';
import { add } from '@/store/actions/counter';

@connect(({ counter }) => ({
  num: counter.num,
}))
export default class index extends PureComponent {
  handAdd = () => {
    const { dispatch } = this.props;
    dispatch(add());
  };

  render() {
    const { num } = this.props;
    return (
      <div className={styles.homeBox}>
        <div>{num}</div>
        <div className={styles.button} onClick={this.handAdd}>
          加
        </div>
      </div>
    );
  }
}
