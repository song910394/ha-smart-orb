const ORB_STYLE = `
  :host {
    --bg-top: #0b1020;
    --bg-mid: #151c30;
    --bg-bot: #070b15;
    --text-main: rgba(241, 245, 249, 0.94);
    --text-muted: rgba(148, 163, 184, 0.76);
    --cyan: #67e8f9;
    --cyan-soft: rgba(103, 232, 249, 0.25);
    --card-bg: rgba(12, 19, 36, 0.78);
    --card-border: rgba(165, 216, 255, 0.24);
    display: block;
    width: 100%;
    min-width: 0;
    container-type: inline-size;
  }

  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  ha-card {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100dvh - var(--header-height, 56px));
    min-height: 620px;
    overflow: hidden;
    border: none;
    border-radius: 0;
    box-shadow: none;
    background: radial-gradient(circle at 50% 45%, var(--bg-mid) 0%, var(--bg-top) 55%, var(--bg-bot) 100%);
    color: var(--text-main);
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Noto Sans TC", sans-serif;
    user-select: none;
  }

  .stage {
    position: relative;
    flex: 1 1 auto;
    width: 100%;
    height: 100%;
    min-height: 620px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
  }

  #sphere-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
    cursor: grab;
    touch-action: none;
  }
  #sphere-canvas:active {
    cursor: grabbing;
  }

  /* Top Minimalist DAKboard Clock */
  .clock-header {
    position: relative;
    z-index: 10;
    margin-top: clamp(22px, 5.2vh, 64px);
    text-align: center;
    pointer-events: none;
    transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease;
  }

  .stage.assist-active .clock-header {
    transform: translateY(-6px);
  }

  .clock-time {
    font-size: clamp(3rem, 8.2cqi, 5.4rem);
    font-weight: 200;
    letter-spacing: 0.04em;
    line-height: 1.05;
    color: rgba(248, 250, 252, 0.93);
    text-shadow: 0 0 28px rgba(103, 232, 249, 0.16);
    font-variant-numeric: tabular-nums;
  }

  .clock-date {
    margin-top: 8px;
    font-size: clamp(0.9rem, 2.1cqi, 1.2rem);
    font-weight: 300;
    letter-spacing: 0.08em;
    color: var(--text-muted);
  }

  /* Horizontal Wake Light Beam */
  .wake-beam {
    position: absolute;
    left: 50%;
    bottom: clamp(215px, 32vh, 325px);
    width: 0%;
    height: 2px;
    transform: translateX(-50%);
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(103, 232, 249, 0.88) 25%,
      #ffffff 50%,
      rgba(103, 232, 249, 0.88) 75%,
      transparent 100%
    );
    box-shadow: 0 0 18px 3px rgba(103, 232, 249, 0.78);
    opacity: 0;
    pointer-events: none;
    z-index: 18;
  }

  .wake-beam.firing {
    animation: beamSweep 0.95s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes beamSweep {
    0%   { width: 0%; opacity: 0; }
    25%  { width: min(88%, 540px); opacity: 1; }
    70%  { width: min(94%, 600px); opacity: 0.85; }
    100% { width: min(100%, 640px); opacity: 0; }
  }

  /* Bottom Dynamic Assist Overlay */
  .assist-wrapper {
    position: relative;
    z-index: 20;
    width: min(90cqi, 460px);
    margin-bottom: clamp(46px, 6.2vh, 66px);
    pointer-events: none;
  }

  .assist-card {
    background: var(--card-bg);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border: 1px solid var(--card-border);
    border-radius: 20px;
    padding: 18px 22px 20px;
    box-shadow:
      0 20px 50px rgba(0, 0, 0, 0.58),
      inset 0 1px 0 rgba(255, 255, 255, 0.14),
      0 0 32px rgba(103, 232, 249, 0.09);
    opacity: 0;
    transform: translateY(34px) scale(0.97);
    transition:
      opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1),
      transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
    pointer-events: none;
  }

  .assist-card.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
  }

  .assist-source {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 6px;
  }

  .assist-source-left {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--cyan);
  }

  .assist-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--cyan);
    box-shadow: 0 0 10px var(--cyan);
    animation: pulseDot 1.6s infinite ease-in-out;
  }

  .assist-close {
    background: transparent;
    border: none;
    color: rgba(148, 163, 184, 0.7);
    font-size: 0.85rem;
    line-height: 1;
    padding: 4px 6px;
    border-radius: 6px;
    cursor: pointer;
    transition: color 0.2s, background 0.2s;
  }
  .assist-close:hover {
    color: #f8fafc;
    background: rgba(255, 255, 255, 0.08);
  }

  @keyframes pulseDot {
    0%, 100% { opacity: 0.5; transform: scale(0.9); }
    50% { opacity: 1; transform: scale(1.25); }
  }

  .assist-transcript {
    font-size: 1.02rem;
    font-weight: 400;
    color: rgba(241, 245, 249, 0.94);
    min-height: 1.45em;
    margin-bottom: 14px;
    letter-spacing: 0.01em;
  }

  .assist-body {
    border-top: 1px solid rgba(148, 163, 184, 0.15);
    padding-top: 15px;
  }

  /* Template 1: Light Control */
  .light-widget {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 4px 0 2px;
  }

  .bulb-wrap {
    position: relative;
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
  }

  .bulb-halo {
    position: absolute;
    inset: -10px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(254, 240, 138, 0.48) 0%, rgba(250, 204, 21, 0.14) 45%, transparent 72%);
    opacity: 0;
    transform: scale(0.6);
    transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .light-widget.is-on .bulb-halo {
    opacity: 1;
    transform: scale(1.15);
  }

  .bulb-svg {
    width: 46px;
    height: 46px;
    position: relative;
    z-index: 2;
    transition: filter 0.7s ease;
  }

  .bulb-glass {
    fill: rgba(254, 240, 138, 0);
    stroke: rgba(148, 163, 184, 0.65);
    stroke-width: 1.6;
    transition: fill 0.7s ease, stroke 0.7s ease;
  }

  .light-widget.is-on .bulb-glass {
    fill: rgba(254, 249, 195, 0.94);
    stroke: #fef08a;
  }

  .light-widget.is-on .bulb-svg {
    filter: drop-shadow(0 0 12px rgba(254, 240, 138, 0.78));
  }

  .light-title {
    font-size: 1.06rem;
    font-weight: 500;
    color: var(--text-main);
  }

  .light-sub {
    margin-top: 4px;
    font-size: 0.85rem;
    color: var(--text-muted);
    letter-spacing: 0.04em;
  }

  .light-widget.is-on .light-sub {
    color: #fde68a;
  }

  /* Template 2: Weather Forecast */
  .weather-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 14px;
  }

  .weather-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .weather-icon-lg {
    width: 52px;
    height: 52px;
    flex-shrink: 0;
    filter: drop-shadow(0 0 12px rgba(103, 232, 249, 0.35));
  }

  .weather-cond {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    color: var(--cyan);
    text-transform: uppercase;
  }

  .weather-temp {
    font-size: 2.25rem;
    font-weight: 200;
    line-height: 1.06;
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
  }

  .weather-stats {
    text-align: right;
    font-size: 0.78rem;
    line-height: 1.55;
    color: var(--text-muted);
    font-variant-numeric: tabular-nums;
  }

  .weather-forecast {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    padding-top: 12px;
    border-top: 1px solid rgba(148, 163, 184, 0.14);
  }

  .fc-day {
    text-align: center;
    padding: 6px 4px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.035);
  }

  .fc-name {
    font-size: 0.7rem;
    color: var(--text-muted);
    margin-bottom: 3px;
  }

  .fc-ico {
    font-size: 1.05rem;
    margin-bottom: 2px;
  }

  .fc-val {
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--text-main);
    font-variant-numeric: tabular-nums;
  }

  /* Template 3: General Assist */
  .general-widget {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 4px 0;
  }

  .general-badge {
    width: 38px;
    height: 38px;
    border-radius: 12px;
    background: rgba(103, 232, 249, 0.12);
    border: 1px solid rgba(103, 232, 249, 0.32);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--cyan);
    font-size: 1rem;
  }

  .general-text {
    font-size: 0.94rem;
    line-height: 1.52;
    color: rgba(226, 232, 240, 0.92);
  }

  /* Live Voice Listening Waveform & Quick Input */
  .listen-widget {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 4px 0 2px;
  }

  .voice-bars {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    height: 30px;
  }

  .voice-bar {
    width: 4px;
    height: 10px;
    border-radius: 999px;
    background: var(--cyan);
    box-shadow: 0 0 10px rgba(103, 232, 249, 0.75);
    animation: voiceWave 0.95s ease-in-out infinite;
  }
  .voice-bar:nth-child(2) { animation-delay: 0.12s; }
  .voice-bar:nth-child(3) { animation-delay: 0.24s; }
  .voice-bar:nth-child(4) { animation-delay: 0.36s; }
  .voice-bar:nth-child(5) { animation-delay: 0.18s; }

  @keyframes voiceWave {
    0%, 100% { height: 8px; opacity: 0.55; }
    50% { height: 28px; opacity: 1; }
  }

  .listen-hint {
    font-size: 0.82rem;
    color: var(--text-muted);
    text-align: center;
  }

  .assist-input-form {
    display: flex;
    gap: 8px;
    width: 100%;
    margin-top: 2px;
  }

  .assist-input-form input {
    flex: 1 1 auto;
    min-width: 0;
    padding: 8px 12px;
    border-radius: 10px;
    border: 1px solid rgba(148, 163, 184, 0.28);
    background: rgba(15, 23, 42, 0.78);
    color: var(--text-main);
    font: inherit;
    font-size: 0.88rem;
  }
  .assist-input-form input:focus {
    outline: 1px solid var(--cyan);
    border-color: var(--cyan);
  }

  .assist-input-form button {
    padding: 8px 14px;
    border-radius: 10px;
    border: 1px solid rgba(103, 232, 249, 0.45);
    background: rgba(103, 232, 249, 0.18);
    color: #ffffff;
    font: inherit;
    font-size: 0.82rem;
    cursor: pointer;
    white-space: nowrap;
  }
  .assist-input-form button:hover {
    background: rgba(103, 232, 249, 0.32);
  }

  .dock-btn.mic-btn {
    border-color: rgba(103, 232, 249, 0.42);
    color: #cffafe;
  }
  .dock-btn.mic-btn.listening {
    background: rgba(103, 232, 249, 0.28);
    border-color: var(--cyan);
    color: #ffffff;
    box-shadow: 0 0 14px rgba(103, 232, 249, 0.5);
  }

  /* Subtle Corner Status & Controls */
  .status-pill {
    position: absolute;
    left: 16px;
    bottom: 14px;
    z-index: 30;
    font-size: 0.68rem;
    letter-spacing: 0.08em;
    color: rgba(148, 163, 184, 0.56);
    display: flex;
    align-items: center;
    gap: 6px;
    pointer-events: none;
  }

  .status-led {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #38bdf8;
  }

  .status-led.live {
    background: #4ade80;
    box-shadow: 0 0 8px #4ade80;
  }

  .control-dock {
    position: absolute;
    right: 14px;
    bottom: 12px;
    z-index: 35;
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px 8px;
    border-radius: 999px;
    background: rgba(10, 16, 30, 0.55);
    border: 1px solid rgba(148, 163, 184, 0.18);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    opacity: 0.34;
    transition: opacity 0.25s ease;
  }

  .control-dock:hover,
  .control-dock:focus-within {
    opacity: 0.98;
  }

  .dock-btn {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #e2e8f0;
    font: inherit;
    font-size: 0.72rem;
    padding: 5px 9px;
    border-radius: 999px;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.2s, border-color 0.2s, color 0.2s;
  }

  .dock-btn:hover {
    background: rgba(103, 232, 249, 0.18);
    border-color: rgba(103, 232, 249, 0.45);
    color: #ffffff;
  }

  .dock-btn[aria-expanded="true"] {
    background: rgba(103, 232, 249, 0.22);
    border-color: rgba(103, 232, 249, 0.55);
    color: #ffffff;
  }

  .dock-btn:focus-visible,
  .device-row:focus-visible,
  .drawer-btn:focus-visible {
    outline: 2px solid var(--cyan);
    outline-offset: 1px;
  }

  /* Glassmorphic Slide-Over Device Drawer (hidden by default so standby stays pure) */
  .device-drawer {
    position: absolute;
    top: 16px;
    right: 16px;
    bottom: 58px;
    width: min(340px, calc(100% - 32px));
    z-index: 40;
    display: flex;
    flex-direction: column;
    background: rgba(10, 17, 32, 0.88);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(165, 216, 255, 0.22);
    border-radius: 18px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.62);
    overflow: hidden;
    transform: translateX(0);
    transition: opacity 0.25s ease, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .device-drawer[hidden] {
    display: none;
  }

  .drawer-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 14px 16px 10px;
    border-bottom: 1px solid rgba(148, 163, 184, 0.14);
  }

  .drawer-title {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-main);
  }

  .drawer-count {
    margin-left: 6px;
    font-size: 0.74rem;
    font-weight: 400;
    color: var(--text-muted);
  }

  .drawer-actions {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .drawer-btn {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #cbd5e1;
    font: inherit;
    font-size: 0.72rem;
    padding: 4px 8px;
    border-radius: 8px;
    cursor: pointer;
  }
  .drawer-btn:hover {
    background: rgba(103, 232, 249, 0.18);
    color: #ffffff;
  }

  .drawer-search {
    padding: 10px 14px 8px;
  }

  .drawer-search input {
    width: 100%;
    padding: 8px 11px;
    border-radius: 10px;
    border: 1px solid rgba(148, 163, 184, 0.24);
    background: rgba(15, 23, 42, 0.75);
    color: var(--text-main);
    font: inherit;
    font-size: 0.88rem;
  }
  .drawer-search input::placeholder {
    color: var(--text-muted);
  }
  .drawer-search input:focus {
    outline: 1px solid var(--cyan);
    border-color: var(--cyan);
  }

  .drawer-list {
    flex: 1 1 auto;
    overflow-y: auto;
    list-style: none;
    margin: 0;
    padding: 0 10px 12px;
    scrollbar-color: rgba(148, 163, 184, 0.35) transparent;
  }

  .drawer-list li + li {
    border-top: 1px solid rgba(148, 163, 184, 0.1);
  }

  .device-row {
    display: grid;
    grid-template-columns: 10px minmax(0, 1fr) minmax(0, max-content);
    gap: 9px;
    align-items: center;
    width: 100%;
    min-height: 40px;
    padding: 7px 8px;
    background: transparent;
    border: none;
    border-radius: 8px;
    color: inherit;
    text-align: left;
    font: inherit;
    font-size: 0.84rem;
    cursor: pointer;
  }

  .device-row:hover {
    background: rgba(103, 232, 249, 0.1);
  }

  .device-row[aria-pressed="true"] {
    background: rgba(103, 232, 249, 0.16);
    box-shadow: inset 2px 0 var(--cyan);
  }

  .dev-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #64748b;
  }
  .device-row[data-status="active"] .dev-dot {
    background: #fde68a;
    box-shadow: 0 0 8px rgba(253, 230, 138, 0.8);
  }
  .device-row[data-status="reading"] .dev-dot {
    background: var(--cyan);
    box-shadow: 0 0 8px rgba(103, 232, 249, 0.7);
  }
  .device-row[data-status="attention"] .dev-dot {
    background: #fca5a5;
  }

  .dev-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .dev-val {
    color: var(--text-muted);
    font-size: 0.8rem;
    font-variant-numeric: tabular-nums;
  }
  .device-row[data-status="active"] .dev-val,
  .device-row[data-status="reading"] .dev-val {
    color: var(--text-main);
  }
  .device-row[data-status="attention"] .dev-val {
    color: #fecaca;
  }

  .no-results {
    padding: 12px 16px;
    font-size: 0.84rem;
    color: var(--text-muted);
  }

  @container (max-width: 560px) {
    .clock-header { margin-top: clamp(18px, 4.2vh, 38px); }
    .clock-time { font-size: clamp(2.8rem, 13cqi, 4.2rem); }
    .clock-date { font-size: clamp(0.84rem, 3.6cqi, 1.04rem); }
    .assist-wrapper { width: min(92cqi, 420px); margin-bottom: 54px; }
    .assist-card { padding: 15px 16px 17px; }
    .status-pill { display: none; }
    .control-dock { right: 50%; transform: translateX(50%); bottom: 10px; opacity: 0.55; }
  }
`;

const ORB_TEMPLATE = document.createElement('template');
ORB_TEMPLATE.innerHTML = `
  <style>${ORB_STYLE}</style>
  <ha-card>
    <div class="stage" id="stage">
      <header class="clock-header" id="clock-header">
        <div class="clock-time" id="clock-time">--:--</div>
        <div class="clock-date" id="clock-date"></div>
      </header>

      <canvas id="sphere-canvas" role="img" aria-label="3D Plexus 智慧家庭即時狀態球體"></canvas>

      <div class="wake-beam" id="wake-beam"></div>

      <section class="assist-wrapper" aria-live="polite">
        <div class="assist-card" id="assist-card">
          <div class="assist-source">
            <span class="assist-source-left">
              <span class="assist-dot"></span>
              <span id="assist-source-label">AI / LIVING ROOM</span>
            </span>
            <button type="button" class="assist-close" id="assist-close" aria-label="關閉語音卡片">✕</button>
          </div>
          <div class="assist-transcript" id="assist-transcript"></div>
          <div class="assist-body" id="assist-body"></div>
        </div>
      </section>

      <div class="status-pill">
        <span class="status-led" id="status-led"></span>
        <span id="status-text">DEMO MODE · Keys 1 / 2 / 3</span>
      </div>

      <div class="control-dock" id="control-dock">
        <button type="button" class="dock-btn mic-btn" id="mic-btn" data-action="mic" aria-pressed="false">🎤 語音</button>
        <button type="button" class="dock-btn" data-action="light">1 開燈</button>
        <button type="button" class="dock-btn" data-action="weather">2 天氣</button>
        <button type="button" class="dock-btn" data-action="general">3 狀態</button>
        <button type="button" class="dock-btn" data-action="idle">待機</button>
        <button type="button" class="dock-btn" id="drawer-toggle" aria-expanded="false" aria-controls="device-drawer">設備</button>
      </div>

      <aside class="device-drawer" id="device-drawer" aria-label="全屋設備狀態" hidden>
        <div class="drawer-head">
          <div class="drawer-title">設備狀態<span class="drawer-count" id="drawer-count"></span></div>
          <div class="drawer-actions">
            <button type="button" class="drawer-btn" id="motion-toggle" aria-pressed="false">暫停</button>
            <button type="button" class="drawer-btn" id="drawer-close" aria-label="關閉清單">收起</button>
          </div>
        </div>
        <div class="drawer-search">
          <input type="search" id="drawer-search" aria-label="搜尋設備" placeholder="搜尋設備名稱..." />
        </div>
        <p class="no-results" id="no-results" hidden>找不到符合的設備</p>
        <ul class="drawer-list" id="drawer-list"></ul>
      </aside>
    </div>
  </ha-card>
`;

const ROLE_NAMES = new Set(['light', 'sensor', 'display', 'audio', 'presence', 'battery', 'device', 'climate', 'weather', 'person']);
const ENTITY_ID_RE = /^[a-z0-9_]+\.[a-z0-9_]+$/;

const STATE_LABELS = {
  on: ['開啟', 'active'],
  off: ['關閉', 'inactive'],
  idle: ['待機', 'inactive'],
  standby: ['待機', 'inactive'],
  playing: ['播放中', 'active'],
  paused: ['已暫停', 'inactive'],
  buffering: ['載入中', 'active'],
  cleaning: ['清掃中', 'active'],
  docked: ['已充電', 'inactive'],
  returning: ['返回中', 'active'],
  open: ['開啟', 'active'],
  closed: ['關閉', 'inactive'],
  locked: ['已上鎖', 'inactive'],
  unlocked: ['已解鎖', 'active'],
  streaming: ['串流中', 'active'],
  recording: ['錄影中', 'active'],
  home: ['在家', 'active'],
  not_home: ['外出', 'inactive'],
  heat: ['暖氣', 'active'],
  cool: ['冷氣', 'active'],
  fan_only: ['送風', 'active'],
  auto: ['自動', 'active'],
  dry: ['除濕', 'active'],
  triggered: ['已觸發', 'attention'],
};

const WEATHER_CONDITIONS = {
  sunny: { label: 'SUNNY', zh: '晴朗', emoji: '☀️' },
  'clear-night': { label: 'CLEAR NIGHT', zh: '晴夜', emoji: '🌙' },
  partlycloudy: { label: 'PARTLY CLOUDY', zh: '多雲時晴', emoji: '⛅' },
  cloudy: { label: 'CLOUDY', zh: '陰天', emoji: '☁️' },
  rainy: { label: 'RAINY', zh: '有雨', emoji: '🌧️' },
  pouring: { label: 'POURING', zh: '豪雨', emoji: '🌧️' },
  lightning: { label: 'STORMS', zh: '雷雨', emoji: '⛈️' },
  'lightning-rainy': { label: 'STORMS', zh: '雷陣雨', emoji: '⛈️' },
  fog: { label: 'FOG', zh: '起霧', emoji: '🌫️' },
  windy: { label: 'WINDY', zh: '強風', emoji: '🌬️' },
  snowy: { label: 'SNOWY', zh: '降雪', emoji: '❄️' },
};

const PIN_SLOTS = [
  { lat:  0.56, lon:  0.25 },
  { lat:  0.14, lon:  1.42 },
  { lat: -0.44, lon:  2.35 },
  { lat:  0.42, lon: -2.45 },
  { lat: -0.18, lon: -1.35 },
  { lat: -0.58, lon: -0.32 },
  { lat:  0.12, lon: -0.55 },
];

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function seededRandom(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function readEntityDisplay(hass, entry) {
  const st = hass?.states?.[entry.entity];
  if (!st) return ['待接入', 'attention'];
  if (st.state === 'unavailable') return ['無法連線', 'attention'];
  if (!st.state || st.state === 'unknown') return ['待確認', 'attention'];

  const domain = entry.entity.split('.')[0];
  const val = st.state;
  const attrs = st.attributes || {};

  if (domain === 'weather') {
    const info = WEATHER_CONDITIONS[val] || { zh: val };
    const t = attrs.temperature != null ? `${attrs.temperature}°` : '';
    return [t ? `${info.zh} ${t}` : info.zh, 'reading'];
  }
  if (domain === 'climate') {
    const cur = attrs.current_temperature;
    const mode = STATE_LABELS[val]?.[0] || val;
    if (cur != null) return [`${mode} ${cur}°C`, val === 'off' ? 'inactive' : 'reading'];
    return [mode, val === 'off' ? 'inactive' : 'active'];
  }
  if (domain === 'humidifier') {
    const hum = attrs.current_humidity ?? attrs.humidity;
    if (val === 'on' && hum != null) return [`運轉 ${hum}%`, 'active'];
    return STATE_LABELS[val] || [val, 'inactive'];
  }
  if (entry.role === 'presence') {
    if (val === 'on') return ['有人', 'active'];
    if (val === 'off') return ['未偵測', 'inactive'];
  }
  if (entry.role === 'sensor' || entry.role === 'battery' || domain === 'sensor') {
    const unit = attrs.unit_of_measurement || '';
    const num = Number(val);
    const formattedVal = Number.isFinite(num) && Math.abs(num) < 1000 && val.includes('.')
      ? (unit === '%' ? String(Math.round(num)) : num.toFixed(1).replace(/\.0$/, ''))
      : val;
    return [unit ? `${formattedVal}${unit === '%' || unit === '°C' || unit === '°F' ? '' : ' '}${unit}` : formattedVal, 'reading'];
  }
  if (Object.hasOwn(STATE_LABELS, val)) return STATE_LABELS[val];
  const formatted = hass?.formatEntityState?.(st);
  return [formatted && formatted !== val ? formatted : val, 'inactive'];
}

function weatherSvg(condition = 'lightning-rainy') {
  const key = String(condition).toLowerCase();
  if (key.includes('sun') || key === 'clear') {
    return `
      <svg class="weather-icon-lg" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="13" fill="rgba(253,230,138,0.28)" stroke="#fde68a" stroke-width="2.4"/>
        <path d="M32 8V14M32 50V56M8 32H14M50 32H56M15 15L19.5 19.5M44.5 44.5L49 49M49 15L44.5 19.5M19.5 44.5L15 49" stroke="#fde68a" stroke-width="2.4" stroke-linecap="round"/>
      </svg>`;
  }
  if (key.includes('partly')) {
    return `
      <svg class="weather-icon-lg" viewBox="0 0 64 64" fill="none">
        <circle cx="24" cy="23" r="9" fill="rgba(253,230,138,0.3)" stroke="#fde68a" stroke-width="2"/>
        <path d="M22 46H47C52 46 56 42 56 37C56 32.4 52.5 28.6 48 28.1C46.4 22.4 41.2 18.2 35 18.2C27.5 18.2 21.5 24.2 21.5 31.6C21.5 32 21.5 32.3 21.6 32.7C17.5 33.5 14.5 37 14.5 41.2C14.5 43.8 18 46 22 46Z" fill="rgba(148,197,255,0.24)" stroke="#bae6fd" stroke-width="2.2"/>
      </svg>`;
  }
  if (key.includes('rain') && !key.includes('lightning') && !key.includes('storm')) {
    return `
      <svg class="weather-icon-lg" viewBox="0 0 64 64" fill="none">
        <path d="M18 39H46C51.5 39 56 34.5 56 29C56 23.8 52 19.6 46.9 19.1C45.1 12.7 39.2 8 32.2 8C23.8 8 17 14.8 17 23.2C17 23.6 17 24 17.1 24.4C12.5 25.3 9 29.3 9 34.1C9 36.8 13 39 18 39Z" fill="rgba(148,197,255,0.22)" stroke="#bae6fd" stroke-width="2.2"/>
        <path d="M24 45L21 53M33 45L30 55M42 45L39 53" stroke="#67e8f9" stroke-width="2.4" stroke-linecap="round"/>
      </svg>`;
  }
  if (key.includes('cloud') || key.includes('fog')) {
    return `
      <svg class="weather-icon-lg" viewBox="0 0 64 64" fill="none">
        <path d="M18 44H46C51.5 44 56 39.5 56 34C56 28.8 52 24.6 46.9 24.1C45.1 17.7 39.2 13 32.2 13C23.8 13 17 19.8 17 28.2C17 28.6 17 29 17.1 29.4C12.5 30.3 9 34.3 9 39.1C9 41.8 13 44 18 44Z" fill="rgba(148,197,255,0.22)" stroke="#bae6fd" stroke-width="2.2"/>
      </svg>`;
  }
  return `
    <svg class="weather-icon-lg" viewBox="0 0 64 64" fill="none">
      <path d="M18 40H46C51.5 40 56 35.5 56 30C56 24.8 52 20.6 46.9 20.1C45.1 13.7 39.2 9 32.2 9C23.8 9 17 15.8 17 24.2C17 24.6 17 25 17.1 25.4C12.5 26.3 9 30.3 9 35.1C9 37.8 13 40 18 40Z" fill="rgba(148,197,255,0.22)" stroke="#bae6fd" stroke-width="2.2"/>
      <path d="M33 36L26 48H33L30 58L41 44H34L37 36H33Z" fill="#67e8f9"/>
    </svg>`;
}

class HaSmartOrb extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).append(ORB_TEMPLATE.content.cloneNode(true));

    this.stageEl = this.shadowRoot.getElementById('stage');
    this.canvas = this.shadowRoot.getElementById('sphere-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.clockTimeEl = this.shadowRoot.getElementById('clock-time');
    this.clockDateEl = this.shadowRoot.getElementById('clock-date');
    this.wakeBeamEl = this.shadowRoot.getElementById('wake-beam');
    this.assistCardEl = this.shadowRoot.getElementById('assist-card');
    this.assistSourceEl = this.shadowRoot.getElementById('assist-source-label');
    this.assistTranscriptEl = this.shadowRoot.getElementById('assist-transcript');
    this.assistBodyEl = this.shadowRoot.getElementById('assist-body');
    this.statusLedEl = this.shadowRoot.getElementById('status-led');
    this.statusTextEl = this.shadowRoot.getElementById('status-text');

    this.drawerEl = this.shadowRoot.getElementById('device-drawer');
    this.drawerToggleEl = this.shadowRoot.getElementById('drawer-toggle');
    this.drawerCloseEl = this.shadowRoot.getElementById('drawer-close');
    this.drawerCountEl = this.shadowRoot.getElementById('drawer-count');
    this.drawerSearchEl = this.shadowRoot.getElementById('drawer-search');
    this.drawerListEl = this.shadowRoot.getElementById('drawer-list');
    this.noResultsEl = this.shadowRoot.getElementById('no-results');
    this.motionToggleEl = this.shadowRoot.getElementById('motion-toggle');
    this.micBtnEl = this.shadowRoot.getElementById('mic-btn');
    this.isListening = false;
    this.recognition = null;
    this.lastAssistEventAt = 0;

    this.width = 0;
    this.height = 0;
    this.dpr = 1;
    this.sphereRadius = 180;
    this.targetCenterYOffset = 0;
    this.currentCenterYOffset = 0;
    this.targetSphereScale = 1.0;
    this.currentSphereScale = 1.0;

    this.rotY = 0.4;
    this.rotX = 0.18;
    this.velY = 0;
    this.velX = 0;
    this.isDragging = false;
    this.lastPointerX = 0;
    this.lastPointerY = 0;
    this.lastInteractTime = 0;
    this.manualPause = false;
    this.visible = true;

    this.nodes = [];
    this.edges = [];
    this.pulses = [];
    this.comets = [];
    this.bgStars = [];
    this.lastPulseTime = 0;

    this.entries = [];
    this.rows = [];
    this.orbPins = [];
    this.selectedEntity = null;
    this.highlightPinId = null;
    this.highlightUntil = 0;
    this.demoLightDelta = 0;

    this.assistEventName = 'assist_dashboard_event';
    this.overlayTimeoutMs = 6800;
    this.weatherEntityId = null;
    this.dateLocale = 'en-US';
    this.hideTimer = null;
    this.typeTimer = null;
    this.clockTimer = null;
    this.animFrameId = null;
    this.unsubAssist = null;
    this.subscribedConn = null;

    this._initGeometry();
    this._bindEvents();
  }

  _initGeometry() {
    const rand = seededRandom(20261127);
    this.nodes.length = 0;
    this.edges.length = 0;
    this.comets.length = 0;
    this.bgStars.length = 0;

    const N = 86;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i += 1) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = goldenAngle * i;

      const jitterR = 0.90 + rand() * 0.16;
      const jx = (rand() - 0.5) * 0.14;
      const jy = (rand() - 0.5) * 0.14;
      const jz = (rand() - 0.5) * 0.14;

      const x = Math.cos(theta) * r + jx;
      const yy = y + jy;
      const z = Math.sin(theta) * r + jz;
      const len = Math.hypot(x, yy, z) || 1;
      this.nodes.push({
        x: (x / len) * jitterR,
        y: (yy / len) * jitterR,
        z: (z / len) * jitterR,
        size: 1.5 + rand() * 1.4,
      });
    }

    const maxD = 0.62;
    for (let i = 0; i < this.nodes.length; i += 1) {
      let connections = 0;
      for (let j = i + 1; j < this.nodes.length; j += 1) {
        const d = Math.hypot(
          this.nodes[i].x - this.nodes[j].x,
          this.nodes[i].y - this.nodes[j].y,
          this.nodes[i].z - this.nodes[j].z,
        );
        if (d < maxD && connections < 6) {
          this.edges.push({ a: i, b: j, dist: d });
          connections += 1;
        }
      }
    }

    const orbitConfigs = [
      { radius: 1.18, tiltX:  0.65, tiltZ:  0.35, speed:  0.0110, angle: 0.4, tailLen: 0.72 },
      { radius: 1.24, tiltX: -0.82, tiltZ:  0.90, speed: -0.0085, angle: 2.3, tailLen: 0.65 },
      { radius: 1.20, tiltX:  1.15, tiltZ: -0.55, speed:  0.0095, angle: 4.1, tailLen: 0.58 },
      { radius: 1.28, tiltX: -0.32, tiltZ: -1.10, speed:  0.0072, angle: 5.2, tailLen: 0.60 },
    ];
    orbitConfigs.forEach((c) => this.comets.push(c));

    for (let i = 0; i < 48; i += 1) {
      this.bgStars.push({
        x: rand(),
        y: rand(),
        r: 0.5 + rand() * 1.15,
        a: 0.08 + rand() * 0.24,
      });
    }
  }

  _bindEvents() {
    this.canvas.addEventListener('pointerdown', (e) => {
      this.isDragging = true;
      this.lastPointerX = e.clientX;
      this.lastPointerY = e.clientY;
      this.lastInteractTime = performance.now();
      try { this.canvas.setPointerCapture(e.pointerId); } catch {}
    });

    this.canvas.addEventListener('pointermove', (e) => {
      if (!this.isDragging) return;
      const dx = e.clientX - this.lastPointerX;
      const dy = e.clientY - this.lastPointerY;
      this.lastPointerX = e.clientX;
      this.lastPointerY = e.clientY;
      this.velY = dx * 0.0055;
      this.velX = dy * 0.0055;
      this.rotY += this.velY;
      this.rotX = Math.max(-1.2, Math.min(1.2, this.rotX + this.velX));
      this.lastInteractTime = performance.now();
    });

    const endDrag = () => { this.isDragging = false; };
    this.canvas.addEventListener('pointerup', endDrag);
    this.canvas.addEventListener('pointercancel', endDrag);

    this.shadowRoot.getElementById('control-dock').addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      const action = btn.dataset.action;
      if (action === 'mic') this.startVoiceAssist();
      else if (action === 'light') this.triggerDemoLight();
      else if (action === 'weather') this.triggerDemoWeather();
      else if (action === 'general') this.triggerDemoGeneral();
      else if (action === 'idle') this.hideAssistCard();
    });

    this.shadowRoot.getElementById('assist-close').addEventListener('click', () => {
      this.hideAssistCard();
    });

    this.drawerToggleEl.addEventListener('click', () => this._setDrawerOpen(this.drawerEl.hidden));
    this.drawerCloseEl.addEventListener('click', () => this._setDrawerOpen(false));
    this.drawerSearchEl.addEventListener('input', () => this._applyDrawerFilter());

    this.motionToggleEl.addEventListener('click', () => {
      this.manualPause = !this.manualPause;
      this.motionToggleEl.setAttribute('aria-pressed', String(this.manualPause));
      this.motionToggleEl.textContent = this.manualPause ? '恢復' : '暫停';
    });

    this._onKeyDown = (e) => {
      const path = e.composedPath?.() || [];
      if (path.some((el) => el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable))) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === '1') this.triggerDemoLight();
      else if (e.key === '2') this.triggerDemoWeather();
      else if (e.key === '3') this.triggerDemoGeneral();
      else if (e.key === 'v' || e.key === 'V') this.startVoiceAssist();
      else if (e.key === 'Escape' || e.key === '0') {
        this.hideAssistCard();
        this._setDrawerOpen(false);
      }
    };

    this._onVisibilityChange = () => {
      if (document.hidden) this._stopLoop();
      else this._startLoop();
    };
  }

  _setDrawerOpen(open) {
    this.drawerEl.hidden = !open;
    this.drawerToggleEl.setAttribute('aria-expanded', String(open));
  }

  setConfig(config) {
    if (!config || (config.entities && !Array.isArray(config.entities))) {
      throw new Error('設定格式無效：entities 必須是陣列。');
    }
    this.config = config;
    this.assistEventName = config.assist_event || 'assist_dashboard_event';
    this.overlayTimeoutMs = Number(config.overlay_timeout_ms) || 6800;
    this.weatherEntityId = config.weather_entity || null;
    this.dateLocale = config.date_locale || 'en-US';

    const seen = new Set();
    const rawEntities = Array.isArray(config.entities) ? config.entities : [];
    this.entries = rawEntities.reduce((acc, entry) => {
      if (typeof entry?.entity !== 'string' || !ENTITY_ID_RE.test(entry.entity) || seen.has(entry.entity)) {
        return acc;
      }
      seen.add(entry.entity);
      const role = ROLE_NAMES.has(entry.role) ? entry.role : 'device';
      acc.push({ entity: entry.entity, name: entry.name || '', role });
      return acc;
    }, []);

    this.rows = this.entries.map((entry) => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'device-row';
      btn.innerHTML = '<span class="dev-dot" aria-hidden="true"></span><span class="dev-name"></span><span class="dev-val"></span>';
      btn.addEventListener('click', () => {
        this.selectedEntity = entry.entity;
        this._pinSelectedEntity(entry);
        this._updateDrawerRows();
      });
      li.append(btn);
      return {
        entry,
        li,
        btn,
        nameEl: btn.children[1],
        valEl: btn.children[2],
      };
    });

    this.drawerListEl.replaceChildren(...this.rows.map((r) => r.li));
    this.drawerToggleEl.textContent = this.rows.length ? `設備 (${this.rows.length})` : '設備';
    this._rebuildOrbPins();
    this._updateClock();
    this._refreshStates();
  }

  set hass(hass) {
    const prev = this._hass;
    this._hass = hass;

    if (hass) {
      this.statusLedEl.classList.add('live');
      this.statusTextEl.textContent = 'HA LIVE CONNECTED';
      this._ensureAssistSubscription(hass);
    }

    if (!prev) {
      this._rebuildOrbPins();
      this._refreshStates();
      return;
    }

    // Detect state changes on tracked entities to emit energy pulses & highlight
    let changed = prev.language !== hass?.language;
    const prevStates = prev.states || {};
    const nextStates = hass?.states || {};
    for (const entry of this.entries) {
      if (prevStates[entry.entity] !== nextStates[entry.entity]) {
        changed = true;
        if (prevStates[entry.entity] && nextStates[entry.entity] &&
            prevStates[entry.entity].state !== nextStates[entry.entity].state) {
          this.spawnPulse(2);
          const matchingPin = this.orbPins.find((p) => p.entity === entry.entity || (p.kind === 'lights_summary' && entry.role === 'light'));
          if (matchingPin) {
            this.highlightPinId = matchingPin.id;
            this.highlightUntil = performance.now() + 2600;
          }
        }
      }
    }
    const wId = this._resolveWeatherEntity();
    if (wId && prevStates[wId] !== nextStates[wId]) changed = true;

    if (changed) this._refreshStates();
  }

  getCardSize() { return 10; }
  getGridOptions() { return { columns: 12, min_columns: 6, rows: 'auto' }; }

  connectedCallback() {
    this._updateClock();
    this.clockTimer = setInterval(() => this._updateClock(), 10000);
    window.addEventListener('keydown', this._onKeyDown);
    document.addEventListener('visibilitychange', this._onVisibilityChange);

    this.resizeObserver = new ResizeObserver(() => this._resizeCanvas());
    this.resizeObserver.observe(this.stageEl);

    this.visibilityObserver = new IntersectionObserver(([entry]) => {
      this.visible = Boolean(entry?.isIntersecting);
      if (this.visible && !document.hidden) this._startLoop();
      else this._stopLoop();
    });
    this.visibilityObserver.observe(this);

    this._resizeCanvas();
    this._startLoop();
  }

  disconnectedCallback() {
    clearInterval(this.clockTimer);
    clearTimeout(this.hideTimer);
    clearInterval(this.typeTimer);
    window.removeEventListener('keydown', this._onKeyDown);
    document.removeEventListener('visibilitychange', this._onVisibilityChange);
    this.resizeObserver?.disconnect();
    this.visibilityObserver?.disconnect();
    this._stopSpeechRecognition();
    this._stopLoop();
    if (typeof this.unsubAssist === 'function') {
      try { this.unsubAssist(); } catch {}
      this.unsubAssist = null;
      this.subscribedConn = null;
    }
  }

  async _ensureAssistSubscription(hass) {
    const conn = hass?.connection;
    if (!conn || typeof conn.subscribeEvents !== 'function') return;
    if (this.subscribedConn === conn) return;
    this.subscribedConn = conn;
    try {
      this.unsubAssist = await conn.subscribeEvents((ev) => {
        this.lastAssistEventAt = performance.now();
        this.showAssistCard(ev?.data || {});
      }, this.assistEventName);
    } catch {
      // Non-fatal if subscribeEvents is restricted
    }
  }

  _updateClock() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    this.clockTimeEl.textContent = `${hh}:${mm}`;

    if (this.dateLocale === 'zh-TW') {
      const weekday = now.toLocaleDateString('zh-TW', { weekday: 'long' });
      this.clockDateEl.textContent = `${now.getMonth() + 1}月${now.getDate()}日 ${weekday}`;
    } else {
      const weekday = now.toLocaleDateString('en-US', { weekday: 'long' });
      const day = now.getDate();
      const month = now.toLocaleDateString('en-US', { month: 'long' });
      this.clockDateEl.textContent = `${weekday} ${day} ${month}`;
    }
  }

  _resolveWeatherEntity() {
    if (this.weatherEntityId && this._hass?.states?.[this.weatherEntityId]) return this.weatherEntityId;
    const states = this._hass?.states;
    if (!states) return null;
    if (states['weather.forecast_jia']) return 'weather.forecast_jia';
    return Object.keys(states).find((id) => id.startsWith('weather.')) || null;
  }

  _rebuildOrbPins() {
    // Allow explicit orb_pins override in YAML config
    if (Array.isArray(this.config?.orb_pins) && this.config.orb_pins.length) {
      this.orbPins = this.config.orb_pins.map((p, idx) => {
        const slot = PIN_SLOTS[idx % PIN_SLOTS.length];
        return {
          id: p.entity || `pin_${idx}`,
          entity: p.entity || null,
          kind: p.kind || 'entity',
          label: p.label || p.name || p.entity,
          value: p.value || '',
          color: p.color || '#67e8f9',
          lat: p.lat ?? slot.lat,
          lon: p.lon ?? slot.lon,
          role: p.role || 'device',
        };
      });
      return;
    }

    const pins = [];
    const usedEntities = new Set();
    const addPin = (pin) => {
      if (pins.length >= PIN_SLOTS.length) return;
      const slot = PIN_SLOTS[pins.length];
      pins.push({ ...pin, lat: slot.lat, lon: slot.lon });
      if (pin.entity) usedEntities.add(pin.entity);
    };

    // 1. Lights summary pin (auto-counts all light-role entities in config)
    const lightEntries = this.entries.filter((e) => e.role === 'light' || e.entity.startsWith('light.'));
    if (lightEntries.length) {
      addPin({
        id: '__lights_summary__',
        kind: 'lights_summary',
        entity: lightEntries[0].entity,
        label: '燈光',
        value: '0 開啟',
        color: '#fde68a',
        role: 'light',
      });
    }

    // 2. Priority real-home categories from entries + HA states
    const pickFirst = (predicate) => this.entries.find((e) => !usedEntities.has(e.entity) && predicate(e));

    const tempEntry = pickFirst((e) => e.entity.includes('temperature') || e.name.includes('溫度'));
    if (tempEntry) {
      addPin({
        id: tempEntry.entity,
        kind: 'entity',
        entity: tempEntry.entity,
        label: tempEntry.name.replace(/^1F\s*/i, '') || '餐廳溫度',
        value: '',
        color: '#67e8f9',
        role: tempEntry.role,
      });
    }

    const humEntry = pickFirst((e) => e.entity.includes('humidity') || e.name.includes('濕度'));
    if (humEntry) {
      addPin({
        id: humEntry.entity,
        kind: 'entity',
        entity: humEntry.entity,
        label: humEntry.name.replace(/^1F\s*/i, '') || '餐廳濕度',
        value: '',
        color: '#7dd3fc',
        role: humEntry.role,
      });
    }

    const climateEntry = pickFirst((e) => e.entity.startsWith('climate.'));
    if (climateEntry) {
      addPin({
        id: climateEntry.entity,
        kind: 'entity',
        entity: climateEntry.entity,
        label: climateEntry.name.includes('Dyson') || climateEntry.entity.includes('dyson') ? 'Dyson' : (climateEntry.name || '空調'),
        value: '',
        color: '#67e8f9',
        role: 'climate',
      });
    }

    const weatherId = this._resolveWeatherEntity();
    if (weatherId) {
      addPin({
        id: weatherId,
        kind: 'entity',
        entity: weatherId,
        label: '天氣',
        value: '',
        color: '#93c5fd',
        role: 'weather',
      });
    }

    const tvEntry = pickFirst((e) => e.role === 'display' || e.entity.includes('dian_shi'));
    if (tvEntry) {
      addPin({
        id: tvEntry.entity,
        kind: 'entity',
        entity: tvEntry.entity,
        label: tvEntry.name.replace(/^Philips\s*/i, '') || '客廳電視',
        value: '',
        color: '#cbd5e1',
        role: 'display',
      });
    }

    const humAppliance = pickFirst((e) => e.entity.startsWith('humidifier.'));
    if (humAppliance) {
      addPin({
        id: humAppliance.entity,
        kind: 'entity',
        entity: humAppliance.entity,
        label: humAppliance.name || (humAppliance.entity.includes('xiao_qing') ? '小清除濕' : '除濕機'),
        value: '',
        color: '#a5f3fc',
        role: 'device',
      });
    }

    // Fill remaining up to 6 pins from remaining entries if needed
    for (const entry of this.entries) {
      if (pins.length >= 6) break;
      if (usedEntities.has(entry.entity)) continue;
      if (entry.role === 'light') continue;
      addPin({
        id: entry.entity,
        kind: 'entity',
        entity: entry.entity,
        label: entry.name || entry.entity,
        value: '',
        color: '#93c5fd',
        role: entry.role,
      });
    }

    // Fallback demo pins when no entities configured
    if (!pins.length) {
      [
        { id: 'demo.solar', label: 'Solar', value: '2.0 kW', color: '#7dd3fc' },
        { id: 'demo.powerwall', label: 'Powerwall', value: '21%', color: '#93c5fd' },
        { id: 'demo.cooling', label: 'Cooling', value: '22.6°', color: '#67e8f9' },
        { id: '__lights_summary__', kind: 'lights_summary', label: 'Lights', value: '3 on', color: '#fde68a' },
        { id: 'demo.tv', label: 'Living Room TV', value: '', color: '#cbd5e1' },
        { id: 'demo.home', label: 'Home', value: '', color: '#a5f3fc' },
      ].forEach((p) => addPin(p));
    }

    this.orbPins = pins;
  }

  _pinSelectedEntity(entry) {
    const existing = this.orbPins.find((p) => p.entity === entry.entity);
    if (existing) {
      this.highlightPinId = existing.id;
      this.highlightUntil = performance.now() + 5000;
      this._rotateToPin(existing);
      return;
    }
    // Replace the last slot temporarily with the selected device so it orbits visibly
    const slot = PIN_SLOTS[Math.min(this.orbPins.length - 1, PIN_SLOTS.length - 1)] || { lat: 0.1, lon: 0.4 };
    const st = this._hass?.states?.[entry.entity];
    const [val] = readEntityDisplay(this._hass, entry);
    const dynamicPin = {
      id: entry.entity,
      kind: 'entity',
      entity: entry.entity,
      label: entry.name || st?.attributes?.friendly_name || entry.entity,
      value: val,
      color: '#67e8f9',
      role: entry.role,
      lat: slot.lat,
      lon: slot.lon,
    };
    if (this.orbPins.length < PIN_SLOTS.length) this.orbPins.push(dynamicPin);
    else this.orbPins[this.orbPins.length - 1] = dynamicPin;
    this.highlightPinId = dynamicPin.id;
    this.highlightUntil = performance.now() + 5000;
    this.spawnPulse(3);
    this._rotateToPin(dynamicPin);
  }

  _rotateToPin(pin) {
    // Smoothly nudge rotY to bring pin toward front (+z)
    this.rotY = Math.PI * 0.5 - pin.lon;
    this.rotX = Math.max(-0.6, Math.min(0.6, pin.lat * 0.5));
    this.lastInteractTime = performance.now();
  }

  _refreshStates() {
    this._updateDrawerRows();
    this._updatePinValues();
  }

  _updatePinValues() {
    const lightEntries = this.entries.filter((e) => e.role === 'light' || e.entity.startsWith('light.'));
    const realLightsOn = lightEntries.filter((e) => this._hass?.states?.[e.entity]?.state === 'on').length;

    for (const pin of this.orbPins) {
      if (pin.kind === 'lights_summary') {
        const count = Math.max(0, (this._hass ? realLightsOn : 3) + this.demoLightDelta);
        pin.value = count > 0 ? `${count} 開啟` : '全關';
        pin.color = count > 0 ? '#fde68a' : '#94a3b8';
      } else if (pin.entity && this._hass) {
        const entry = this.entries.find((e) => e.entity === pin.entity) || { entity: pin.entity, role: pin.role || 'device' };
        const st = this._hass.states?.[pin.entity];
        if (!pin.label && st?.attributes?.friendly_name) pin.label = st.attributes.friendly_name;
        const [val, status] = readEntityDisplay(this._hass, entry);
        pin.value = val;
        if (status === 'attention') pin.color = '#fca5a5';
        else if (status === 'active') pin.color = pin.role === 'light' ? '#fde68a' : '#67e8f9';
        else if (status === 'reading') pin.color = pin.role === 'weather' ? '#93c5fd' : '#7dd3fc';
        else pin.color = '#94a3b8';
      }
    }
  }

  _updateDrawerRows() {
    for (const row of this.rows) {
      const { entry, btn, nameEl, valEl } = row;
      const st = this._hass?.states?.[entry.entity];
      const label = entry.name || st?.attributes?.friendly_name || entry.entity;
      const [reading, status] = readEntityDisplay(this._hass, entry);
      if (nameEl.textContent !== label) nameEl.textContent = label;
      if (valEl.textContent !== reading) valEl.textContent = reading;
      btn.dataset.status = status;
      btn.setAttribute('aria-pressed', String(entry.entity === this.selectedEntity));
    }
    this._applyDrawerFilter();
  }

  _applyDrawerFilter() {
    const q = this.drawerSearchEl.value.trim().toLocaleLowerCase();
    let visibleCount = 0;
    for (const row of this.rows) {
      const match = !q || row.nameEl.textContent.toLocaleLowerCase().includes(q) ||
        row.entry.entity.toLocaleLowerCase().includes(q);
      row.li.hidden = !match;
      if (match) visibleCount += 1;
    }
    this.noResultsEl.hidden = visibleCount > 0 || !q;
    this.drawerCountEl.textContent = q ? `${visibleCount} / ${this.rows.length}` : `${this.rows.length} 項`;
  }

  /* ============================================================
   * 3D Projection & Render Loop
   * ============================================================ */
  _rotatePoint(x, y, z, rx, ry) {
    const cosY = Math.cos(ry);
    const sinY = Math.sin(ry);
    const x1 = x * cosY - z * sinY;
    const z1 = x * sinY + z * cosY;

    const cosX = Math.cos(rx);
    const sinX = Math.sin(rx);
    const y2 = y * cosX - z1 * sinX;
    const z2 = y * sinX + z1 * cosX;
    return { x: x1, y: y2, z: z2 };
  }

  _project(p, cx, cy, R) {
    const fov = 3.2;
    const scale = fov / (fov - p.z);
    return {
      sx: cx + p.x * R * scale,
      sy: cy + p.y * R * scale,
      z: p.z,
      scale,
    };
  }

  spawnPulse(count = 1) {
    if (!this.edges.length) return;
    for (let k = 0; k < count; k += 1) {
      const edge = this.edges[Math.floor(Math.random() * this.edges.length)];
      this.pulses.push({
        edge,
        t: 0,
        speed: 0.022 + Math.random() * 0.024,
        reverse: Math.random() > 0.5,
      });
    }
  }

  _resizeCanvas() {
    const rect = this.stageEl.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = rect.width;
    this.height = rect.height;
    this.canvas.width = Math.max(1, Math.floor(this.width * this.dpr));
    this.canvas.height = Math.max(1, Math.floor(this.height * this.dpr));
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.sphereRadius = Math.min(this.width * 0.34, this.height * 0.25, 225);
  }

  _startLoop() {
    if (this.animFrameId !== null) return;
    this.animFrameId = requestAnimationFrame(this._render);
  }

  _stopLoop() {
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  _render = (now) => {
    const ctx = this.ctx;
    const { width, height } = this;
    if (!ctx || !width || !height) {
      this.animFrameId = requestAnimationFrame(this._render);
      return;
    }

    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    this.currentCenterYOffset += (this.targetCenterYOffset - this.currentCenterYOffset) * 0.075;
    this.currentSphereScale += (this.targetSphereScale - this.currentSphereScale) * 0.075;

    const cx = width * 0.5;
    const cy = height * 0.54 + this.currentCenterYOffset;
    const R = this.sphereRadius * this.currentSphereScale;

    if (!this.isDragging) {
      this.velY *= 0.94;
      this.velX *= 0.94;
      this.rotY += this.velY;
      this.rotX = Math.max(-1.2, Math.min(1.2, this.rotX + this.velX));
      if (!this.manualPause && now - this.lastInteractTime > 1600) {
        this.rotY += 0.0022;
        this.rotX += (Math.sin(now * 0.00035) * 0.22 - this.rotX) * 0.008;
      }
    }

    // 0. Subtle stardust
    for (const s of this.bgStars) {
      ctx.fillStyle = `rgba(186, 230, 253, ${s.a})`;
      ctx.beginPath();
      ctx.arc(s.x * width, s.y * height, s.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // 1. Core cyan-blue radial soft glow
    const coreGrad = ctx.createRadialGradient(cx, cy, R * 0.05, cx, cy, R * 1.18);
    coreGrad.addColorStop(0, 'rgba(72, 169, 214, 0.24)');
    coreGrad.addColorStop(0.45, 'rgba(30, 64, 115, 0.12)');
    coreGrad.addColorStop(1, 'rgba(7, 11, 21, 0)');
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, R * 1.18, 0, Math.PI * 2);
    ctx.fill();

    // Project mesh vertices
    const projectedNodes = this.nodes.map((n) => {
      const rp = this._rotatePoint(n.x, n.y, n.z, this.rotX, this.rotY);
      return { ...this._project(rp, cx, cy, R), rawSize: n.size };
    });

    // 2. Plexus edges with Z-depth attenuation
    for (const edge of this.edges) {
      const p1 = projectedNodes[edge.a];
      const p2 = projectedNodes[edge.b];
      const avgZ = (p1.z + p2.z) * 0.5;
      const depthNorm = Math.max(0, Math.min(1, (avgZ + 1.05) / 2.1));
      const alpha = 0.06 + depthNorm * 0.44;
      ctx.strokeStyle = `rgba(203, 224, 248, ${alpha.toFixed(3)})`;
      ctx.lineWidth = 0.45 + depthNorm * 0.95;
      ctx.beginPath();
      ctx.moveTo(p1.sx, p1.sy);
      ctx.lineTo(p2.sx, p2.sy);
      ctx.stroke();
    }

    // 3. Cyan data pulses traveling along edges
    if (!this.manualPause && now - this.lastPulseTime > 1250) {
      this.spawnPulse(1);
      this.lastPulseTime = now;
    }

    for (let i = this.pulses.length - 1; i >= 0; i -= 1) {
      const p = this.pulses[i];
      p.t += p.speed;
      if (p.t >= 1) {
        this.pulses.splice(i, 1);
        continue;
      }
      const a = projectedNodes[p.reverse ? p.edge.b : p.edge.a];
      const b = projectedNodes[p.reverse ? p.edge.a : p.edge.b];
      const headT = p.t;
      const tailT = Math.max(0, p.t - 0.38);

      const hx = a.sx + (b.sx - a.sx) * headT;
      const hy = a.sy + (b.sy - a.sy) * headT;
      const tx = a.sx + (b.sx - a.sx) * tailT;
      const ty = a.sy + (b.sy - a.sy) * tailT;

      const fade = Math.sin(p.t * Math.PI);
      const grad = ctx.createLinearGradient(tx, ty, hx, hy);
      grad.addColorStop(0, 'rgba(103, 232, 249, 0)');
      grad.addColorStop(1, `rgba(125, 245, 255, ${(fade * 0.95).toFixed(3)})`);

      ctx.save();
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2.2;
      ctx.shadowColor = '#67e8f9';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(hx, hy);
      ctx.stroke();
      ctx.restore();
    }

    // 4. Glowing sphere vertices
    for (const pn of projectedNodes) {
      const depthNorm = Math.max(0, Math.min(1, (pn.z + 1.05) / 2.1));
      const alpha = 0.16 + depthNorm * 0.84;
      const radius = pn.rawSize * (0.55 + depthNorm * 0.65);

      ctx.save();
      if (depthNorm > 0.72) {
        ctx.shadowColor = 'rgba(186, 230, 253, 0.85)';
        ctx.shadowBlur = 7;
      }
      ctx.fillStyle = `rgba(241, 248, 255, ${alpha.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(pn.sx, pn.sy, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 5. 4 Tilted 3D Orbiting Comets
    for (const c of this.comets) {
      if (!this.manualPause) c.angle += c.speed;
      const segs = 22;
      const dir = c.speed >= 0 ? -1 : 1;
      const pts = [];

      for (let s = 0; s <= segs; s += 1) {
        const a = c.angle + dir * (s / segs) * c.tailLen;
        const ox = Math.cos(a) * c.radius;
        const oz = Math.sin(a) * c.radius;

        const cX = Math.cos(c.tiltX);
        const sX = Math.sin(c.tiltX);
        const y1 = -oz * sX;
        const z1 = oz * cX;

        const cZ = Math.cos(c.tiltZ);
        const sZ = Math.sin(c.tiltZ);
        const x2 = ox * cZ - y1 * sZ;
        const y2 = ox * sZ + y1 * cZ;

        const rp = this._rotatePoint(x2, y2, z1, this.rotX * 0.5, this.rotY * 0.45);
        pts.push(this._project(rp, cx, cy, R));
      }

      for (let s = 0; s < segs; s += 1) {
        const frac = 1 - s / segs;
        const depthNorm = Math.max(0.2, Math.min(1, (pts[s].z + 1.3) / 2.6));
        const alpha = frac * frac * 0.72 * depthNorm;
        ctx.strokeStyle = `rgba(148, 233, 255, ${alpha.toFixed(3)})`;
        ctx.lineWidth = 0.7 + frac * 1.6;
        ctx.beginPath();
        ctx.moveTo(pts[s].sx, pts[s].sy);
        ctx.lineTo(pts[s + 1].sx, pts[s + 1].sy);
        ctx.stroke();
      }

      const head = pts[0];
      const headAlpha = Math.max(0.3, Math.min(1, (head.z + 1.3) / 2.4));
      ctx.save();
      ctx.shadowColor = '#67e8f9';
      ctx.shadowBlur = 12;
      ctx.fillStyle = `rgba(224, 248, 255, ${headAlpha.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(head.sx, head.sy, 2.8 * head.scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 6. 3D-Orbiting Home Assistant Entity Pins (Dot + Crisp Text)
    const labelDrawList = this.orbPins.map((pin) => {
      const cosLat = Math.cos(pin.lat);
      const ex = cosLat * Math.cos(pin.lon) * 1.12;
      const ey = Math.sin(pin.lat) * 1.12;
      const ez = cosLat * Math.sin(pin.lon) * 1.12;
      const rp = this._rotatePoint(ex, ey, ez, this.rotX, this.rotY);
      const proj = this._project(rp, cx, cy, R);
      return { pin, proj };
    }).sort((a, b) => a.proj.z - b.proj.z);

    const placedBoxes = [];
    for (const { pin, proj } of labelDrawList) {
      const depthNorm = Math.max(0, Math.min(1, (proj.z + 1.1) / 2.2));
      const isHighlighted = (pin.id === this.highlightPinId && now < this.highlightUntil);
      const alpha = isHighlighted ? 1 : (0.20 + depthNorm * 0.80);
      const fontSize = Math.round((11.5 + depthNorm * 2.5) * (isHighlighted ? 1.12 : 1));
      const text = pin.value ? `${pin.label} · ${pin.value}` : pin.label;

      ctx.save();
      ctx.globalAlpha = alpha;

      // Measure text to keep label safely inside narrow mobile viewports
      ctx.font = `${isHighlighted ? 600 : 400} ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans TC", sans-serif`;
      const textWidth = ctx.measureText(text).width;
      const alignLeft = (proj.sx + 10 + textWidth > width - 12);
      const dotX = Math.max(12, Math.min(width - 12, proj.sx));
      let dotY = Math.max(118, Math.min(height - 52, proj.sy));

      // Gentle collision nudge against already-placed labels
      const bx1 = alignLeft ? dotX - 10 - textWidth : dotX - 4;
      const bx2 = alignLeft ? dotX + 4 : dotX + 10 + textWidth;
      for (const box of placedBoxes) {
        if (bx1 < box.x2 && bx2 > box.x1 && Math.abs(dotY - box.y) < 19) {
          dotY = dotY >= box.y ? box.y + 19 : box.y - 19;
        }
      }
      placedBoxes.push({ x1: bx1, x2: bx2, y: dotY });

      // Glowing dot
      ctx.shadowColor = pin.color || '#67e8f9';
      ctx.shadowBlur = isHighlighted ? 18 : 9;
      ctx.fillStyle = isHighlighted ? '#ffffff' : (pin.color || '#67e8f9');
      ctx.beginPath();
      ctx.arc(dotX, dotY, isHighlighted ? 4.4 : 2.9, 0, Math.PI * 2);
      ctx.fill();

      if (isHighlighted) {
        ctx.strokeStyle = 'rgba(103, 232, 249, 0.75)';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 9.5, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Label text
      ctx.shadowColor = 'rgba(7, 11, 21, 0.94)';
      ctx.shadowBlur = 7;
      ctx.fillStyle = isHighlighted ? '#ffffff' : 'rgba(241, 245, 249, 0.95)';
      ctx.textBaseline = 'middle';
      ctx.textAlign = alignLeft ? 'right' : 'left';
      ctx.fillText(text, alignLeft ? dotX - 9 : dotX + 9, dotY);
      ctx.restore();
    }

    this.animFrameId = requestAnimationFrame(this._render);
  };

  /* ============================================================
   * Assist Wake Animation & Bottom Glassmorphic Card
   * ============================================================ */
  _fireWakeBeam() {
    this.wakeBeamEl.classList.remove('firing');
    void this.wakeBeamEl.offsetWidth;
    this.wakeBeamEl.classList.add('firing');
  }

  _typewriter(el, text, speed = 24) {
    clearInterval(this.typeTimer);
    el.textContent = '';
    if (!text) return;
    let idx = 0;
    this.typeTimer = setInterval(() => {
      idx += 1;
      el.textContent = text.slice(0, idx);
      if (idx >= text.length) clearInterval(this.typeTimer);
    }, speed);
  }

  showAssistCard({ source = 'AI / LIVING ROOM', transcript = '', type = 'general', payload = {}, highlight_entity = null } = {}) {
    clearTimeout(this.hideTimer);
    this._fireWakeBeam();
    this.spawnPulse(6);

    if (highlight_entity) {
      const targetPin = this.orbPins.find((p) => p.entity === highlight_entity || p.id === highlight_entity);
      if (targetPin) {
        this.highlightPinId = targetPin.id;
        this.highlightUntil = performance.now() + 5000;
      }
    }

    // Shift sphere slightly upward to make room for overlay card
    this.targetCenterYOffset = -Math.min(this.height * 0.11, 92);
    this.targetSphereScale = 0.89;
    this.stageEl.classList.add('assist-active');

    this.assistSourceEl.textContent = source;
    this._typewriter(this.assistTranscriptEl, transcript ? `"${transcript}"` : '');

    if (type === 'light') {
      const isOn = payload.state !== 'off';
      const hasBrightness = payload.brightness != null && payload.brightness !== '';
      const name = escapeHtml(payload.name || '1F 廚房主燈');
      const finalSub = isOn ? (hasBrightness ? `On · ${escapeHtml(payload.brightness)}%` : 'On · 已開啟') : 'Off · 已關閉';

      this.assistBodyEl.innerHTML = `
        <div class="light-widget" id="live-light-widget">
          <div class="bulb-wrap">
            <div class="bulb-halo"></div>
            <svg class="bulb-svg" viewBox="0 0 48 48" fill="none">
              <path class="bulb-glass" d="M24 6C15.7 6 10 12.2 10 19.6C10 24.4 12.5 28.2 15.8 31.1C17.1 32.3 18 33.8 18 35.6V37H30V35.6C30 33.8 30.9 32.3 32.2 31.1C35.5 28.2 38 24.4 38 19.6C38 12.2 32.3 6 24 6Z"/>
              <path d="M19 40.5H29M21 44H27" stroke="rgba(148,163,184,0.75)" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="light-title">${name}</div>
          <div class="light-sub" id="live-light-sub">${isOn ? 'Turning on...' : 'Turning off...'}</div>
        </div>
      `;

      setTimeout(() => {
        const w = this.shadowRoot.getElementById('live-light-widget');
        const sub = this.shadowRoot.getElementById('live-light-sub');
        if (w && isOn) w.classList.add('is-on');
        if (sub) sub.textContent = finalSub;
      }, 400);
    } else if (type === 'weather') {
      const w = payload || {};
      const daysHtml = (w.forecast || []).slice(0, 4).map((d) => `
        <div class="fc-day">
          <div class="fc-name">${escapeHtml(d.day)}</div>
          <div class="fc-ico">${escapeHtml(d.icon)}</div>
          <div class="fc-val">${escapeHtml(d.temp)}</div>
        </div>
      `).join('');

      this.assistBodyEl.innerHTML = `
        <div class="weather-main">
          <div class="weather-left">
            ${weatherSvg(w.conditionKey || w.condition || 'storms')}
            <div>
              <div class="weather-cond">${escapeHtml(w.condition || 'STORMS')}</div>
              <div class="weather-temp">${escapeHtml(w.temp || '21°')}</div>
            </div>
          </div>
          <div class="weather-stats">
            <div>H: ${escapeHtml(w.high || '24°')} · L: ${escapeHtml(w.low || '17°')}</div>
            <div>${escapeHtml(w.rainLabel || 'Rain')}: ${escapeHtml(w.rain || '80%')}</div>
            <div>Wind: ${escapeHtml(w.wind || '18 km/h')}</div>
          </div>
        </div>
        <div class="weather-forecast">${daysHtml}</div>
      `;
    } else {
      this.assistBodyEl.innerHTML = `
        <div class="general-widget">
          <div class="general-badge">✦</div>
          <div class="general-text">${escapeHtml(payload.message || '已完成指令。')}</div>
        </div>
      `;
    }

    this.assistCardEl.classList.add('visible');
    this.hideTimer = setTimeout(() => this.hideAssistCard(), this.overlayTimeoutMs);
  }

  hideAssistCard() {
    clearTimeout(this.hideTimer);
    this._stopSpeechRecognition();
    try { window.speechSynthesis?.cancel(); } catch {}
    this.assistCardEl.classList.remove('visible');
    this.stageEl.classList.remove('assist-active');
    this.targetCenterYOffset = 0;
    this.targetSphereScale = 1.0;
    if (this.demoLightDelta !== 0) {
      this.demoLightDelta = 0;
      this._updatePinValues();
    }
  }

  /* ============================================================
   * Built-in Live HA Assist Voice & Command Input
   * ============================================================ */
  _stopSpeechRecognition() {
    this.isListening = false;
    if (this.micBtnEl) {
      this.micBtnEl.classList.remove('listening');
      this.micBtnEl.setAttribute('aria-pressed', 'false');
    }
    if (this.recognition) {
      try { this.recognition.onresult = null; this.recognition.onerror = null; this.recognition.onend = null; this.recognition.stop(); } catch {}
      this.recognition = null;
    }
  }

  startVoiceAssist() {
    if (this.isListening) {
      this._stopSpeechRecognition();
      return;
    }
    clearTimeout(this.hideTimer);
    this._fireWakeBeam();
    this.spawnPulse(6);

    this.targetCenterYOffset = -Math.min(this.height * 0.11, 92);
    this.targetSphereScale = 0.89;
    this.stageEl.classList.add('assist-active');

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    const hasSpeech = Boolean(SpeechRec);

    this.assistSourceEl.textContent = hasSpeech ? 'AI / LISTENING...' : 'AI / ASSIST INPUT';
    clearInterval(this.typeTimer);
    this.assistTranscriptEl.textContent = hasSpeech ? '請說出指令，例如「今天天氣如何」或「打開廚房主燈」...' : '請輸入語音指令並按送出';

    this.assistBodyEl.innerHTML = `
      <div class="listen-widget">
        ${hasSpeech ? '<div class="voice-bars" id="voice-bars"><span class="voice-bar"></span><span class="voice-bar"></span><span class="voice-bar"></span><span class="voice-bar"></span><span class="voice-bar"></span></div>' : ''}
        <div class="listen-hint" id="listen-hint">${hasSpeech ? '正在聆聽語音，也可直接輸入指令送出' : '此瀏覽器不支援內建語音辨識，請直接輸入指令'}</div>
        <form class="assist-input-form" id="assist-input-form">
          <input type="text" id="assist-text-input" placeholder="例如：今天天氣如何 / 餐廳環境如何 / 打開廚房主燈" autocomplete="off" />
          <button type="submit">送出</button>
        </form>
      </div>
    `;

    this.assistCardEl.classList.add('visible');

    const form = this.shadowRoot.getElementById('assist-input-form');
    const input = this.shadowRoot.getElementById('assist-text-input');
    form?.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const q = input?.value?.trim();
      if (!q) return;
      this._stopSpeechRecognition();
      this.sendAssistCommand(q, false);
    });

    if (!hasSpeech) {
      input?.focus();
      return;
    }

    try {
      const rec = new SpeechRec();
      rec.lang = this._hass?.language?.startsWith('en') ? 'en-US' : 'zh-TW';
      rec.interimResults = true;
      rec.maxAlternatives = 1;
      rec.continuous = false;

      let finalTranscript = '';
      this.recognition = rec;
      this.isListening = true;
      this.micBtnEl?.classList.add('listening');
      this.micBtnEl?.setAttribute('aria-pressed', 'true');

      rec.onresult = (event) => {
        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; i += 1) {
          const piece = event.results[i][0]?.transcript || '';
          if (event.results[i].isFinal) finalTranscript += piece;
          else interim += piece;
        }
        const preview = (finalTranscript || interim).trim();
        if (preview) this.assistTranscriptEl.textContent = `"${preview}"`;
      };

      rec.onerror = (event) => {
        this._stopSpeechRecognition();
        const hint = this.shadowRoot.getElementById('listen-hint');
        const bars = this.shadowRoot.getElementById('voice-bars');
        if (bars) bars.style.display = 'none';
        if (hint) {
          hint.textContent = event.error === 'not-allowed'
            ? '麥克風權限未開啟，請改用下方文字輸入或允許麥克風權限'
            : `語音辨識未取得聲音（${event.error}），可直接輸入指令`;
        }
        input?.focus();
      };

      rec.onend = () => {
        const spoken = finalTranscript.trim();
        this._stopSpeechRecognition();
        if (spoken) {
          this.sendAssistCommand(spoken, true);
        }
      };

      rec.start();
    } catch {
      this._stopSpeechRecognition();
      input?.focus();
    }
  }

  async sendAssistCommand(text, speakReply = false) {
    const cleanText = String(text || '').trim();
    if (!cleanText) return;
    clearTimeout(this.hideTimer);

    const startedAt = performance.now();
    this.assistSourceEl.textContent = 'AI / PROCESSING...';
    this.assistTranscriptEl.textContent = `"${cleanText}"`;
    this.assistBodyEl.innerHTML = `
      <div class="general-widget">
        <div class="general-badge">✦</div>
        <div class="general-text">正在透過 Home Assistant Assist 處理指令...</div>
      </div>
    `;
    this.assistCardEl.classList.add('visible');
    this.spawnPulse(4);

    if (typeof this._hass?.callWS !== 'function') {
      this.showAssistCard({
        source: 'AI / DEMO',
        transcript: cleanText,
        type: 'general',
        payload: { message: '目前為本機 Demo 模式，連上 Home Assistant 後即可即時控制家中設備。' },
      });
      return;
    }

    try {
      const result = await this._hass.callWS({
        type: 'conversation/process',
        text: cleanText,
        language: this._hass.language || 'zh-Hant',
      });

      const speech = result?.response?.speech?.plain?.speech || '已完成指令。';
      const successList = result?.response?.data?.success || [];

      if (speakReply && speech && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
          const utter = new SpeechSynthesisUtterance(speech);
          utter.lang = 'zh-TW';
          window.speechSynthesis.speak(utter);
        } catch {}
      }

      // If an HA Automation already pushed a specialized assist_dashboard_event during this call, keep it!
      if (this.lastAssistEventAt >= startedAt) {
        return;
      }

      // Auto-select specialized visual card from Assist response
      const lightTarget = successList.find((item) => {
        const id = String(item?.id || '');
        return id.startsWith('light.') || (id.startsWith('switch.') && /light|燈|kai_guan/i.test(`${id} ${item?.name || ''}`));
      });

      if (lightTarget) {
        const st = this._hass.states?.[lightTarget.id];
        const isOff = st ? st.state === 'off' : /關|off/i.test(cleanText);
        const bri = st?.attributes?.brightness != null ? Math.round((st.attributes.brightness / 255) * 100) : null;
        this.showAssistCard({
          source: 'AI / ASSIST',
          transcript: cleanText,
          type: 'light',
          highlight_entity: lightTarget.id,
          payload: {
            name: lightTarget.name || st?.attributes?.friendly_name || lightTarget.id,
            state: isOff ? 'off' : 'on',
            brightness: bri,
          },
        });
        return;
      }

      if (/天氣|氣象|預報|weather/i.test(cleanText)) {
        await this.triggerDemoWeather(cleanText);
        return;
      }

      this.showAssistCard({
        source: 'AI / ASSIST',
        transcript: cleanText,
        type: 'general',
        payload: { message: speech },
      });
    } catch (err) {
      this.showAssistCard({
        source: 'AI / ASSIST',
        transcript: cleanText,
        type: 'general',
        payload: { message: `無法完成語音指令：${err?.message || '請確認 HA Assist 設定'}` },
      });
    }
  }

  /* ============================================================
   * Demo Triggers (Pure visual preview — never actuates real HA switches)
   * ============================================================ */
  triggerDemoLight() {
    this.demoLightDelta = this.demoLightDelta === 0 ? 1 : 0;
    const turningOn = this.demoLightDelta === 1;
    const lightsPin = this.orbPins.find((p) => p.kind === 'lights_summary');
    if (lightsPin) {
      this.highlightPinId = lightsPin.id;
      this.highlightUntil = performance.now() + 4500;
    }
    setTimeout(() => this._updatePinValues(), 520);

    const firstLight = this.entries.find((e) => e.role === 'light');
    const lightName = firstLight?.name || 'Kitchen lights';

    this.showAssistCard({
      source: 'AI / LIVING ROOM',
      transcript: turningOn ? 'Turn on the kitchen lights.' : 'Turn off the kitchen lights.',
      type: 'light',
      payload: {
        name: lightName,
        state: turningOn ? 'on' : 'off',
        brightness: 93,
      },
    });
  }

  async triggerDemoWeather(customTranscript = null) {
    const weatherId = this._resolveWeatherEntity();
    const st = weatherId ? this._hass?.states?.[weatherId] : null;
    if (weatherId) {
      this.highlightPinId = weatherId;
      this.highlightUntil = performance.now() + 4500;
    }

    let payload = {
      conditionKey: 'lightning-rainy',
      condition: 'STORMS',
      temp: '21°',
      high: '24°',
      low: '17°',
      rainLabel: 'Rain',
      rain: '85%',
      wind: '19 km/h',
      forecast: [
        { day: 'Sat', icon: '⛈️', temp: '21°' },
        { day: 'Sun', icon: '🌦️', temp: '22°' },
        { day: 'Mon', icon: '⛅', temp: '24°' },
        { day: 'Tue', icon: '☀️', temp: '26°' },
      ],
    };

    if (st && st.state && st.state !== 'unavailable' && st.state !== 'unknown') {
      const attrs = st.attributes || {};
      const condInfo = WEATHER_CONDITIONS[st.state] || { label: st.state.toUpperCase(), emoji: '⛅' };
      const tempNum = attrs.temperature != null ? Math.round(Number(attrs.temperature)) : 23;
      const windSpeed = attrs.wind_speed != null ? `${Math.round(Number(attrs.wind_speed))} ${attrs.wind_speed_unit || 'km/h'}` : '18 km/h';

      payload = {
        conditionKey: st.state,
        condition: condInfo.label,
        temp: `${tempNum}°`,
        high: `${tempNum + 2}°`,
        low: `${tempNum - 4}°`,
        rainLabel: 'Humidity',
        rain: attrs.humidity != null ? `${attrs.humidity}%` : '70%',
        wind: windSpeed,
        forecast: [
          { day: '明天', icon: condInfo.emoji, temp: `${tempNum}°` },
          { day: '後天', icon: '⛅', temp: `${tempNum + 1}°` },
          { day: '第3天', icon: '🌦️', temp: `${tempNum - 1}°` },
          { day: '第4天', icon: '☀️', temp: `${tempNum + 2}°` },
        ],
      };

      // Try modern HA weather.get_forecasts service (read-only) for real 4-day data
      if (typeof this._hass?.callWS === 'function') {
        try {
          const resp = await this._hass.callWS({
            type: 'call_service',
            domain: 'weather',
            service: 'get_forecasts',
            service_data: { type: 'daily' },
            target: { entity_id: weatherId },
            return_response: true,
          });
          const list = resp?.response?.[weatherId]?.forecast;
          if (Array.isArray(list) && list.length) {
            if (list[0].temperature != null) payload.high = `${Math.round(list[0].temperature)}°`;
            if (list[0].templow != null) payload.low = `${Math.round(list[0].templow)}°`;
            if (list[0].precipitation_probability != null) {
              payload.rainLabel = 'Rain';
              payload.rain = `${list[0].precipitation_probability}%`;
            }
            payload.forecast = list.slice(0, 4).map((item) => {
              const dt = new Date(item.datetime);
              const dayName = Number.isNaN(dt.getTime())
                ? '—'
                : dt.toLocaleDateString('en-US', { weekday: 'short' });
              const ci = WEATHER_CONDITIONS[item.condition] || { emoji: '⛅' };
              const hi = item.temperature != null ? `${Math.round(item.temperature)}°` : '—';
              return { day: dayName, icon: ci.emoji, temp: hi };
            });
          }
        } catch {
          // Graceful fallback to live current state + synthetic forecast
        }
      }
    }

    this.showAssistCard({
      source: 'AI / LIVING ROOM',
      transcript: customTranscript || "What's the weather like today?",
      type: 'weather',
      payload,
    });
  }

  triggerDemoGeneral() {
    const climatePin = this.orbPins.find((p) => p.role === 'climate' || p.entity?.startsWith('climate.'));
    if (climatePin) {
      this.highlightPinId = climatePin.id;
      this.highlightUntil = performance.now() + 4500;
    }
    const tempPin = this.orbPins.find((p) => p.entity?.includes('temperature'));
    const tempText = tempPin?.value ? `目前餐廳溫度 ${tempPin.value}，` : '';
    this.showAssistCard({
      source: 'AI / LIVING ROOM',
      transcript: '客廳和餐廳現在的環境狀態如何？',
      type: 'general',
      payload: {
        message: `${tempText}Dyson 空氣清淨風扇與除濕系統皆已就緒，可隨時透過 Home Assistant Assist 語音控制。`,
      },
    });
  }
}

if (!customElements.get('ha-smart-orb')) {
  customElements.define('ha-smart-orb', HaSmartOrb);
}
