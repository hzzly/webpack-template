import './index.scss';

class Text {
  txt: string;

  constructor({ txt = 'pc/ts' }) {
    this.txt = txt;
  }

  render() {
    return `
      <div class="u-text">${this.txt}</div>
    `;
  }
}

export default Text;
