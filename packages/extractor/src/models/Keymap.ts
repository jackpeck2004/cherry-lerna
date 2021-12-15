export default class Keymap {
  keymap: string[];
  score = 0;

  constructor(keymap: string[]) {
    this.keymap = keymap;
  }
}
