import Text from '@/components/Text';
import Toast from '@/components/Toast';

class Home {
  text: Text;

  constructor() {
    this.text = new Text({});
    document.getElementById('app').insertAdjacentHTML('beforeend', this.render());
    document.getElementById('btn').addEventListener('click', () => {
      Toast('你好呀~');
    });
  }

  render() {
    return `
      <div>
        ${this.text.render()}
        <button id="btn">Toast</button>
      </div>
    `;
  }
}

(() => {
  // eslint-disable-next-line no-new
  new Home();
})();
