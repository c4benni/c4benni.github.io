export default function eventKey(e) {
  let key = "";
  const spaceBar = /^space$/i.test(e.code) || e.keyCode === 32;
  const enterKey = /^enter$/i.test(e.code) || e.keyCode === 13;
  const esc = /^escape$/i.test(e.code) || e.keyCode === 27;
  const tab = /^tab$/i.test(e.code) || e.keyCode === 9;
  const arrowUp = /^arrowup$/i.test(e.code) || e.keyCode === 38;
  const arrowRight = /^arrowright$/i.test(e.code) || e.keyCode === 39;
  const arrowDown = /^arrowdown$/i.test(e.code) || e.keyCode === 40;
  const arrowLeft = /^arrowleft$/i.test(e.code) || e.keyCode === 37;
  const slash = /^slash/i.test(e.code) || e.key == "/" || e.keyCode == 191;
  const backspace =
    /^backspace/i.test(e.code) || e.keyCode == 8 || /^backspace/i.test(e.key);
  const Delete =
    /^delete/i.test(e.code) || e.keyCode == 46 || /^delete/i.test(e.key);

  if (backspace) {
    key = "backkey";
    return key;
  }

  if (Delete) {
    key = "delete";
    return key;
  }

  if (arrowUp) {
    key = "arrow_up";
    return key;
  }
  if (arrowLeft) {
    key = "arrow_left";
    return key;
  }
  if (arrowDown) {
    key = "arrow_down";
    return key;
  }
  if (arrowRight) {
    key = "arrow_right";
    return key;
  }
  if (spaceBar) {
    key = "space";
    return key;
  }
  if (enterKey) {
    key = "enter";
    return key;
  }
  if (esc) {
    key = "esc";
    return key;
  }
  if (tab) {
    key = "tab";
    return key;
  }
  if (slash) {
    key = "slash";
    return key;
  }
  return key;
}
