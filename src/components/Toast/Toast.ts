import './index.scss';

class Toast {
  content: any;

  style: any;

  constructor(config: { [x: string]: any; content?: any; style?: any }) {
    const { content, style } = config;
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
