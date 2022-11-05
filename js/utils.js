function randomIntBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColour(colours) {
  return colours[Math.floor(Math.random() * colours.length)]
}

