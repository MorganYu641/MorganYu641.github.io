// Print the résumé PDF with the browser's own print dialog.
// Loads the PDF in a hidden iframe and prints that; if the browser blocks it, opens the PDF in a new tab instead.
document.getElementById('printResume')?.addEventListener('click', () => {
  const url = document.getElementById('resumeLink').href;
  document.querySelector('.print-frame')?.remove();

  const frame = document.createElement('iframe');
  frame.className = 'print-frame';
  frame.setAttribute('aria-hidden', 'true');
  frame.style.cssText = 'position:fixed;right:0;bottom:0;width:1px;height:1px;border:0;opacity:0;pointer-events:none';
  frame.onload = () => {
    try {
      frame.contentWindow.focus();
      frame.contentWindow.print();
    } catch {
      window.open(url, '_blank', 'noopener');
    }
  };
  frame.src = url;
  document.body.append(frame);
});

// Clock dial: turn it so the visitor's local time sits under the fixed "now" hand.
// The hand points at 225deg (clockwise from 12). The dial angle is counted from the page
// load onward rather than re-read from the clock, so it never jumps when 12:00 wraps around.
(() => {
  const clock = document.querySelector('.clock');
  if (!clock) return;

  const NOW_HAND = 225;      // degrees, must match .hand.now in contactme.css
  const DEG_PER_SEC = 1 / 120; // one lap of a 12-hour dial = 43,200 s = 360deg
  const start = Date.now();
  const d = new Date();
  const secsInto12h = ((d.getHours() % 12) * 60 + d.getMinutes()) * 60 + d.getSeconds() + d.getMilliseconds() / 1000;

  const update = () => {
    const secs = secsInto12h + (Date.now() - start) / 1000;
    clock.style.setProperty('--dial', `${NOW_HAND - secs * DEG_PER_SEC}deg`);
  };

  update();
  setInterval(update, 1000);
})();
