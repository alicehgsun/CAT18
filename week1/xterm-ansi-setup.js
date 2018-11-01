let term = new xterm.Terminal({
  fontFamily: "Courier",
  fontSize: 14
});
term.open(document.getElementById('terminal'));
term.fit();
window.addEventListener('resize', function() {
  term.fit();
});