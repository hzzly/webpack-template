import './index.scss';

class Toast {
  constructor({ content, style }) {
    this.content = content;
    this.style = style;
  }

  render() {
    return `
      <div class="u-toast" style=${this.style || ''}>
        ${this.content}
      </div>
    `;
  }
}

export default Toast;
