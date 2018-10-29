export default class Palette {
  colors = {}

  color(level) {
    const color = this.colors[level] || this.colors['500'];
    return color.color;
  }
}
