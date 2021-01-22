import Text from '@/components/Text';
import Toast from '@/components/Toast';

class Home {
  constructor() {
    this.text = new Text({});
    document.getElementById('app').insertAdjacentHTML('beforeend', this.render());
    document.getElementById('btn').addEventListener('click', () => {
      Toast('你好~');
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
