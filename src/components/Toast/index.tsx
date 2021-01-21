/*
 * @Author: hzzly
 * @Date: 2020-09-14 14:05:56
 * @LastEditors: hzzly
 * @LastEditTime: 2021-01-21 12:09:42
 * @Copyright: hzzly(hjingren@aliyun.com)
 * @Description: description
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Toast from './Toast';
import { IConfig } from './typed';

const toastArr: any[] = [];

export default function toast(config: string | IConfig): void {
  if (!config) return;
  const div = document.createElement('div');
  document.body.appendChild(div);
  let currentConfig: IConfig = { content: '' };
  if (typeof config === 'string') {
    currentConfig = { content: config };
  } else {
    currentConfig = { ...config };
  }

  function destroy(): void {
    if (div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  function renderFun({ duration = 2, ...props }: IConfig): void {
    if (toastArr.length > 0) {
      const dom = toastArr[0];
      if (dom.parentNode) {
        dom.parentNode.removeChild(dom);
      }
      toastArr.splice(0, 1);
    }
    setTimeout(() => {
      toastArr.push(div);
      ReactDOM.render(
        <Toast
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
        />,
        div
      );
    });

    setTimeout(() => destroy(), duration * 1000);
  }

  renderFun(currentConfig);
}
