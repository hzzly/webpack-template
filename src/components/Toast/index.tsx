import { h, render } from 'preact';
import Toast from './Toast';
import { IConfig } from './typed';

const toastArr = [];

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
      render(
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
