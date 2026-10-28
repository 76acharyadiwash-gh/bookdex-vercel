(function () {
  if (document.querySelector('.gh-fab-wrap')) return;

  const GITHUB_USERNAME = '76acharyadiwash-gh';
  const PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;
  const REPO_URL = `${PROFILE_URL}/bookdex-vercel`;

  const style = document.createElement('style');
  style.textContent = `
    .gh-fab-wrap {
      position: fixed;
      bottom: 18px;
      right: 18px;
      z-index: 2147483647;
      font-family: 'Segoe UI', system-ui, -apple-system, Roboto, sans-serif;
      pointer-events: none;
    }

    .gh-fab {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(17, 22, 25, 0.78);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,0.18);
      box-shadow: 0 10px 24px rgba(0,0,0,0.38), 0 0 0 1px rgba(200,169,107,0.2);
      cursor: pointer;
      position: relative;
      animation: gh-pulse 3.2s ease-out infinite;
      transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
      pointer-events: auto;
    }

    .gh-fab:hover {
      background: rgba(24, 31, 34, 0.9);
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 12px 30px rgba(0,0,0,0.46), 0 0 0 1px rgba(200,169,107,0.28);
    }

    .gh-fab svg {
      width: 26px;
      height: 26px;
      fill: #F7F4ED;
      transition: transform 0.5s ease, fill 0.2s ease;
    }

    .gh-fab:hover svg {
      transform: rotate(360deg) scale(1.12);
      fill: #D7B777;
    }

    @keyframes gh-pulse {
      0% {
        box-shadow: 0 0 0 0 rgba(215,183,119,0.5), 0 10px 24px rgba(0,0,0,0.38), 0 0 0 1px rgba(200,169,107,0.2);
      }
      60% {
        box-shadow: 0 0 0 12px rgba(215,183,119,0), 0 10px 24px rgba(0,0,0,0.38), 0 0 0 1px rgba(200,169,107,0.2);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(215,183,119,0), 0 10px 24px rgba(0,0,0,0.38), 0 0 0 1px rgba(200,169,107,0.2);
      }
    }

    .gh-fab-wrap.open .gh-fab { animation-play-state: paused; }

    .gh-popover {
      position: absolute;
      right: 0;
      bottom: 68px;
      width: min(240px, calc(100vw - 28px));
      background: rgba(17, 22, 25, 0.9);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      color: #F7F4ED;
      border: 1px solid rgba(255,255,255,0.14);
      border-radius: 14px;
      padding: 14px 16px;
      box-shadow: 0 18px 40px rgba(0,0,0,0.38);
      opacity: 0;
      transform: translateY(10px) scale(0.96);
      pointer-events: none;
      transition: opacity 0.18s ease, transform 0.18s ease;
      white-space: normal;
    }

    .gh-fab-wrap.open .gh-popover {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }

    .gh-popover .gh-title {
      font-size: 0.68rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #DDE9D0;
      margin-bottom: 2px;
      font-weight: 700;
    }

    .gh-popover .gh-user {
      font-weight: 800;
      font-size: 0.95rem;
      margin-bottom: 10px;
      color: #F7F4ED;
      letter-spacing: 0.01em;
    }

    .gh-popover a {
      display: block;
      font-size: 0.82rem;
      color: #D7B777;
      text-decoration: none;
      padding: 7px 0;
      border-top: 1px solid rgba(255,255,255,0.12);
      font-weight: 600;
    }

    .gh-popover a:first-of-type {
      border-top: none;
    }

    .gh-popover a:hover {
      color: #F7F4ED;
    }

    @media (max-width: 640px) {
      .gh-fab-wrap {
        bottom: 14px;
        right: 14px;
      }

      .gh-fab {
        width: 54px;
        height: 54px;
      }

      .gh-popover {
        bottom: 64px;
      }
    }
  `;

  document.head.appendChild(style);

  const wrap = document.createElement('div');
  wrap.className = 'gh-fab-wrap';

  wrap.innerHTML = `
    <div class="gh-popover">
      <div class="gh-title">Made by</div>
      <div class="gh-user">@${GITHUB_USERNAME}</div>
      <a href="${PROFILE_URL}" target="_blank" rel="noopener">View GitHub profile →</a>
      <a href="${REPO_URL}" target="_blank" rel="noopener">View this project →</a>
    </div>

    <div class="gh-fab" role="button" aria-label="View on GitHub" title="View on GitHub">
      <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.5 7.5 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
      </svg>
    </div>
  `;

  document.body.appendChild(wrap);

  wrap.querySelector('.gh-fab').addEventListener('click', (e) => {
    e.stopPropagation();
    wrap.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!wrap.contains(e.target)) {
      wrap.classList.remove('open');
    }
  });
})();
