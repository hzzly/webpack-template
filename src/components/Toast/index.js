import Toast from './Toast';

const toastArr = [];

export default function toast(config) {
  if (!config) return;
  const div = document.createElement('div');
  document.body.appendChild(div);
  let currentConfig = { content: '' };
  if (typeof config === 'string') {
    currentConfig = { content: config };
  } else {
    currentConfig = { ...config };
  }

  function destroy() {
    if (div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  function render({ duration = 2, ...props }) {
    if (toastArr.length > 0) {
      const dom = toastArr[0];
      if (dom.parentNode) {
        dom.parentNode.removeChild(dom);
      }
      toastArr.splice(0, 1);
    }
    setTimeout(() => {
      toastArr.push(div);
      div.insertAdjacentHTML('beforeend', new Toast(props).render());
    });

    setTimeout(() => destroy(), duration * 1000);
  }

  render(currentConfig);
}
