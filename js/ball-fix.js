(() => {
  const BOX_ART = `
    <div class="ball-on-box-art" aria-label="A ball is on a box">
      <svg viewBox="0 0 320 250" role="img" aria-label="A ball is on a box" xmlns="http://www.w3.org/2000/svg">
        <rect x="70" y="118" width="180" height="92" rx="18" fill="#f7d6b5" stroke="#b87952" stroke-width="6"/>
        <path d="M70 140h180" stroke="#b87952" stroke-width="6"/>
        <path d="M110 118v92M210 118v92" stroke="#d69a70" stroke-width="4" opacity=".65"/>
        <circle cx="160" cy="78" r="48" fill="#f5c9d8" stroke="#8b6fb8" stroke-width="6"/>
        <path d="M125 63c18-20 47-27 70-10" fill="none" stroke="#8b6fb8" stroke-width="6" stroke-linecap="round"/>
        <path d="M127 92c20 17 43 22 67 10" fill="none" stroke="#8b6fb8" stroke-width="6" stroke-linecap="round"/>
        <ellipse cx="160" cy="211" rx="105" ry="12" fill="#8b6fb8" opacity=".15"/>
      </svg>
    </div>`;

  function fixBallQuestion() {
    const root = document.getElementById('lessonContent');
    if (!root) return;

    const text = root.textContent || '';
    if (!text.includes('Where is the ball?')) return;

    root.querySelectorAll('.emoji-image').forEach(el => {
      if ((el.textContent || '').includes('⚽') && (el.textContent || '').includes('📦')) {
        el.innerHTML = BOX_ART;
      }
    });

    const buttons = Array.from(root.querySelectorAll('button'));
    const answerTexts = [
      "It’s on the box.",
      "It’s in the box.",
      "It’s under the box."
    ];

    const candidates = buttons.filter(btn => {
      const t = (btn.textContent || '').trim();
      return /^It[’']s\s+(in|on|under)\s+(the\s+)?(box|Monday)\.?$/i.test(t) || t === "It’s a box.";
    });

    candidates.slice(0, 3).forEach((btn, i) => {
      btn.textContent = answerTexts[i];
    });

    const tip = Array.from(root.querySelectorAll('*')).find(el =>
      (el.textContent || '').trim() === 'in the box = в коробке'
    );
    if (tip) tip.textContent = 'on the box = на коробке';
  }

  const run = () => setTimeout(fixBallQuestion, 0);
  document.addEventListener('DOMContentLoaded', run);

  const root = document.getElementById('lessonContent');
  if (root) new MutationObserver(run).observe(root, {childList:true, subtree:true});
  else window.addEventListener('load', () => {
    const lesson = document.getElementById('lessonContent');
    if (lesson) new MutationObserver(run).observe(lesson, {childList:true, subtree:true});
    run();
  });
})();
