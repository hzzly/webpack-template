import './index.scss';

class Text {
  constructor({ txt = 'pc/js' }) {
    this.txt = txt;
  }

  render() {
    return `
      <div class="u-text">${this.txt}</div>
    `;
  }
}

export default Text;
