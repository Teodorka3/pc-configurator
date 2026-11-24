/*
 * Генератор изображений для каталога.
 * Картинки строятся локально как SVG-данные: у каждой позиции свой «рисунок»
 * с учётом бренда, типа, объёма, количества вентиляторов и т.д.
 * Никаких внешних загрузок — сайт работает офлайн.
 */
(function () {
  'use strict';

  const cache = new Map();
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;'
  }[c]));
  const short = (s, n) => (s.length > n ? s.slice(0, n - 1) + '…' : s);

  function hash(str) {
    let h = 7;
    for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 100000;
    return h;
  }

  function palette(brand) {
    const h = hash(brand) % 360;
    return {
      main: `hsl(${h} 72% 50%)`,
      dark: `hsl(${h} 62% 25%)`,
      light: `hsl(${h} 85% 70%)`,
      glow: `hsla(${h}, 85%, 60%, .28)`
    };
  }

  function fan(cx, cy, r, p) {
    let blades = '';
    for (let i = 0; i < 7; i++) {
      const a = (i * 360 / 7) * Math.PI / 180;
      const x1 = cx + Math.cos(a) * 5;
      const y1 = cy + Math.sin(a) * 5;
      const x2 = cx + Math.cos(a + 0.55) * (r - 5);
      const y2 = cy + Math.sin(a + 0.55) * (r - 5);
      blades += `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} Q${x2.toFixed(1)} ${y2.toFixed(1)} ${(cx + Math.cos(a + 1.05) * (r - 8)).toFixed(1)} ${(cy + Math.sin(a + 1.05) * (r - 8)).toFixed(1)}" stroke="${p.light}" stroke-width="3" fill="none" opacity=".75"/>`;
    }
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#0c1219" stroke="${p.main}" stroke-width="2"/>` +
      blades + `<circle cx="${cx}" cy="${cy}" r="5" fill="${p.main}"/>`;
  }

  function cpu(i, p) {
    const dots = [];
    for (let k = 0; k < Math.min(i.cores || 4, 12); k++) {
      const x = 108 + (k % 6) * 17;
      const y = k < 6 ? 36 : 138;
      dots.push(`<circle cx="${x}" cy="${y}" r="2.5" fill="#d9b96a"/>`);
    }
    return `
      <rect x="96" y="29" width="108" height="108" rx="7" fill="#202a35" stroke="#7d6a3d" stroke-width="3"/>
      <rect x="105" y="38" width="90" height="90" rx="5" fill="${p.dark}" stroke="${p.main}" stroke-width="2"/>
      <rect x="119" y="52" width="62" height="62" rx="4" fill="${p.main}" opacity=".9"/>
      <text x="150" y="82" text-anchor="middle" font-size="12" font-weight="700" fill="#08110c">${esc(short(i.brand, 9))}</text>
      <text x="150" y="100" text-anchor="middle" font-size="11" font-weight="700" fill="#08110c">${i.cores}C/${i.threads}T</text>
      ${dots.join('')}`;
  }

  function gpu(i, p) {
    const n = (i.vram || 8) >= 16 ? 3 : 2;
    const xs = n === 3 ? [78, 145, 212] : [100, 190];
    return `
      <rect x="24" y="52" width="252" height="66" rx="6" fill="#18212c" stroke="#34465a" stroke-width="2"/>
      <rect x="24" y="52" width="252" height="7" rx="3" fill="${p.main}"/>
      ${xs.map((x) => fan(x, 86, 27, p)).join('')}
      <rect x="272" y="47" width="10" height="76" rx="2" fill="#9aa6b3"/>
      <rect x="38" y="112" width="150" height="5" rx="2" fill="${p.dark}"/>
      <text x="150" y="143" text-anchor="middle" font-size="13" font-weight="700" fill="#e8eef6">${esc(short(i.name.replace(i.brand + ' ', ''), 30))}</text>`;
  }

  function motherboard(i, p) {
    const ramSlots = i.ramType === 'DDR5' ? 4 : 4;
    let slots = '';
    for (let s = 0; s < ramSlots; s++) {
      slots += `<rect x="${152 + s * 13}" y="42" width="7" height="44" rx="2" fill="${s % 2 ? p.main : '#4a5d6e'}" opacity=".9"/>`;
    }
    return `
      <rect x="52" y="24" width="196" height="126" rx="6" fill="#14261e" stroke="#2f5a43" stroke-width="2"/>
      <rect x="52" y="24" width="196" height="8" rx="3" fill="${p.dark}"/>
      <rect x="74" y="42" width="58" height="58" rx="3" fill="#b9c3cb" stroke="#7b8792" stroke-width="2"/>
      <rect x="82" y="50" width="42" height="42" rx="2" fill="#4b5560"/>
      <rect x="103" y="62" width="18" height="18" fill="${p.main}"/>
      ${slots}
      <rect x="76" y="110" width="118" height="7" rx="2" fill="${p.main}"/>
      <rect x="206" y="106" width="26" height="20" rx="2" fill="#2b3540" stroke="${p.light}" stroke-width="1"/>
      <text x="150" y="166" text-anchor="middle" font-size="13" font-weight="700" fill="#e8eef6">${esc(short(i.chipset + ' · ' + i.socket + ' · ' + i.ramType, 36))}</text>`;
  }

  function ram(i, p) {
    const two = (i.modules || 1) > 1;
    const stick = (x, front) => `
      <g transform="translate(${x},0)">
        <rect x="0" y="26" width="74" height="104" rx="4" fill="${front ? p.dark : '#22303d'}" stroke="${front ? p.main : '#40505f'}" stroke-width="2"/>
        <rect x="5" y="32" width="64" height="10" rx="2" fill="${front ? p.main : '#526579'}"/>
        <rect x="5" y="48" width="64" height="10" rx="2" fill="${front ? p.light : '#3d4b59'}" opacity=".7"/>
        <rect x="5" y="64" width="64" height="10" rx="2" fill="${front ? p.main : '#526579'}" opacity=".8"/>
        <rect x="8" y="118" width="58" height="6" fill="#d9b96a"/>
        <rect x="20" y="124" width="10" height="4" fill="#0e141b"/>
        <rect x="46" y="124" width="10" height="4" fill="#0e141b"/>
      </g>`;
    return (two ? stick(88, false) + stick(128, true) : stick(113, true)) +
      `<text x="150" y="166" text-anchor="middle" font-size="13" font-weight="700" fill="#e8eef6">${esc(i.capacity)} ГБ · ${i.speed} МГц</text>`;
  }

  function storage(i, p) {
    let body = '';
    if (i.storageType === 'HDD') {
      body = `
        <rect x="48" y="42" width="204" height="90" rx="9" fill="#2c3541" stroke="#465363" stroke-width="2"/>
        <rect x="58" y="52" width="120" height="70" rx="4" fill="#1a222c" stroke="${p.main}" stroke-width="2"/>
        <circle cx="118" cy="87" r="26" fill="#0d131a" stroke="${p.light}" stroke-width="2"/>
        <circle cx="118" cy="87" r="7" fill="${p.main}"/>
        <rect x="190" y="60" width="50" height="26" rx="3" fill="${p.dark}"/>`;
    } else if (i.storageType === 'SATA SSD') {
      body = `
        <rect x="44" y="52" width="212" height="70" rx="6" fill="#202b36" stroke="${p.main}" stroke-width="2"/>
        <rect x="54" y="62" width="76" height="50" rx="3" fill="#141d26"/>
        <rect x="140" y="62" width="46" height="50" rx="3" fill="#141d26"/>
        <rect x="196" y="62" width="50" height="50" rx="3" fill="${p.dark}"/>
        <text x="221" y="91" text-anchor="middle" font-size="12" font-weight="700" fill="#e8eef6">SSD</text>`;
    } else {
      body = `
        <rect x="28" y="70" width="244" height="40" rx="4" fill="#14302a" stroke="#2f6b58" stroke-width="2"/>
        <rect x="28" y="70" width="244" height="6" rx="3" fill="${p.main}"/>
        <rect x="45" y="82" width="46" height="20" rx="2" fill="#0e1c1a"/>
        <rect x="100" y="82" width="46" height="20" rx="2" fill="#0e1c1a"/>
        <rect x="155" y="82" width="46" height="20" rx="2" fill="#0e1c1a"/>
        <rect x="250" y="80" width="16" height="22" fill="#d9b96a"/>`;
    }
    return body + `<text x="150" y="166" text-anchor="middle" font-size="13" font-weight="700" fill="#e8eef6">${esc(short(i.name, 36))}</text>`;
  }

  function cooler(i, p) {
    if (String(i.coolerType).includes('жидкость')) {
      return `
        <rect x="38" y="30" width="224" height="62" rx="5" fill="#1e2833" stroke="${p.main}" stroke-width="2"/>
        ${[80, 150, 220].map((x) => fan(x, 61, 23, p)).join('')}
        <path d="M90 92 Q70 130 128 134" stroke="${p.main}" stroke-width="6" fill="none" opacity=".85"/>
        <path d="M210 92 Q230 130 172 134" stroke="${p.main}" stroke-width="6" fill="none" opacity=".85"/>
        <circle cx="150" cy="138" r="25" fill="#1a232d" stroke="${p.light}" stroke-width="2"/>
        <circle cx="150" cy="138" r="12" fill="${p.main}" opacity=".8"/>`;
    }
    return `
      <rect x="96" y="24" width="108" height="112" rx="5" fill="#1d2731" stroke="${p.main}" stroke-width="2"/>
      ${[38, 50, 62, 74, 86, 98, 110, 122].map((y) => `<rect x="102" y="${y}" width="96" height="3" fill="${p.light}" opacity=".18"/>`).join('')}
      ${fan(150, 80, 40, p)}
      <rect x="130" y="136" width="40" height="8" rx="2" fill="#4b5866"/>
      <text x="150" y="166" text-anchor="middle" font-size="12" font-weight="700" fill="#e8eef6">${esc(short(i.name, 34))}</text>`;
  }

  function psu(i, p) {
    return `
      <rect x="48" y="38" width="204" height="100" rx="8" fill="#202a34" stroke="#3e4b59" stroke-width="2"/>
      <rect x="48" y="38" width="204" height="8" rx="3" fill="${p.dark}"/>
      <circle cx="103" cy="90" r="36" fill="#111820" stroke="${p.main}" stroke-width="2"/>
      ${[0, 45, 90, 135].map((a) => `<line x1="103" y1="90" x2="${(103 + Math.cos(a * Math.PI / 180) * 33).toFixed(1)}" y2="${(90 + Math.sin(a * Math.PI / 180) * 33).toFixed(1)}" stroke="${p.light}" stroke-width="2" opacity=".7"/>`).join('')}
      <circle cx="103" cy="90" r="7" fill="${p.main}"/>
      <rect x="156" y="62" width="80" height="56" rx="4" fill="${p.dark}" stroke="${p.light}" stroke-width="1"/>
      <text x="196" y="86" text-anchor="middle" font-size="20" font-weight="800" fill="#fff">${i.wattage}</text>
      <text x="196" y="104" text-anchor="middle" font-size="10" fill="${p.light}">${esc(i.efficiency)}</text>
      <text x="150" y="166" text-anchor="middle" font-size="13" font-weight="700" fill="#e8eef6">${esc(short(i.brand, 34))}</text>`;
  }

  function pcCase(i, p) {
    return `
      <rect x="82" y="18" width="136" height="142" rx="7" fill="#1b242e" stroke="#3a4755" stroke-width="2"/>
      <rect x="82" y="18" width="24" height="142" rx="5" fill="${p.dark}"/>
      ${[48, 88, 128].map((y) => fan(94, y, 8, p)).join('')}
      <rect x="114" y="30" width="94" height="118" rx="4" fill="rgba(120,170,210,.10)" stroke="${p.main}" stroke-width="2"/>
      ${[58, 100, 138].map((y) => fan(161, y, 15, p)).join('')}
      <rect x="118" y="150" width="86" height="4" rx="2" fill="${p.main}"/>
      <text x="150" y="174" text-anchor="middle" font-size="12" font-weight="700" fill="#e8eef6">${esc(short(i.name, 34))}</text>`;
  }

  const DRAW = {
    cpu, gpu, motherboard, ram, storage, cooler, psu, case: pcCase
  };

  function productImage(item) {
    if (cache.has(item.id)) return cache.get(item.id);
    const p = palette(item.brand || item.name);
    const art = (DRAW[item.category] || cpu)(item, p);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 180" width="300" height="180">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#111b25"/><stop offset="1" stop-color="#0a1017"/>
        </linearGradient>
        <radialGradient id="glow"><stop offset="0" stop-color="${p.glow}"/><stop offset="1" stop-color="rgba(0,0,0,0)"/></radialGradient>
      </defs>
      <rect width="300" height="180" fill="url(#bg)"/>
      <ellipse cx="150" cy="90" rx="145" ry="80" fill="url(#glow)"/>
      <path d="M0 150 H300" stroke="#22303d" stroke-width="1" opacity=".7"/>
      ${art}
    </svg>`;
    const url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    cache.set(item.id, url);
    return url;
  }

  window.productImage = productImage;
})();
