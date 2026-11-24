/* Каталог компонентов. Генерируется локально, без внешних API. */
(function () {
  'use strict';

  const cpuBase = [
    ['Intel Core i3-12100F', 'Intel', 'LGA1700', 4, 8, 3300, 58, 8900],
    ['Intel Core i3-13100F', 'Intel', 'LGA1700', 4, 8, 3400, 58, 10900],
    ['Intel Core i5-12400F', 'Intel', 'LGA1700', 6, 12, 2500, 65, 14900],
    ['Intel Core i5-13400F', 'Intel', 'LGA1700', 10, 16, 2500, 65, 18900],
    ['Intel Core i5-13600K', 'Intel', 'LGA1700', 14, 20, 3500, 125, 28900],
    ['Intel Core i7-13700K', 'Intel', 'LGA1700', 16, 24, 3400, 125, 38900],
    ['Intel Core i9-13900K', 'Intel', 'LGA1700', 24, 32, 3000, 125, 56900],
    ['Intel Core Ultra 5 245K', 'Intel', 'LGA1851', 14, 14, 4200, 125, 26900],
    ['Intel Core Ultra 7 265K', 'Intel', 'LGA1851', 20, 20, 3900, 125, 39900],
    ['Intel Core Ultra 9 285K', 'Intel', 'LGA1851', 24, 24, 3700, 125, 59900],
    ['AMD Ryzen 3 5300X', 'AMD', 'AM4', 4, 8, 3900, 65, 7900],
    ['AMD Ryzen 5 5600', 'AMD', 'AM4', 6, 12, 3500, 65, 11900],
    ['AMD Ryzen 5 5700X3D', 'AMD', 'AM4', 8, 16, 3000, 105, 22900],
    ['AMD Ryzen 7 5700X', 'AMD', 'AM4', 8, 16, 3400, 65, 16900],
    ['AMD Ryzen 7 5800X3D', 'AMD', 'AM4', 8, 16, 3400, 105, 27900],
    ['AMD Ryzen 9 5900X', 'AMD', 'AM4', 12, 24, 3700, 105, 31900],
    ['AMD Ryzen 9 5950X', 'AMD', 'AM4', 16, 32, 3400, 105, 44900],
    ['AMD Ryzen 5 7600', 'AMD', 'AM5', 6, 12, 3800, 65, 19900],
    ['AMD Ryzen 5 7600X', 'AMD', 'AM5', 6, 12, 4700, 105, 21900],
    ['AMD Ryzen 5 9600X', 'AMD', 'AM5', 6, 12, 3900, 65, 25900],
    ['AMD Ryzen 7 7700X', 'AMD', 'AM5', 8, 16, 4500, 105, 30900],
    ['AMD Ryzen 7 7800X3D', 'AMD', 'AM5', 8, 16, 4200, 120, 37900],
    ['AMD Ryzen 7 9700X', 'AMD', 'AM5', 8, 16, 3800, 65, 33900],
    ['AMD Ryzen 7 9800X3D', 'AMD', 'AM5', 8, 16, 4700, 120, 48900],
    ['AMD Ryzen 9 7900X', 'AMD', 'AM5', 12, 24, 4700, 170, 45900],
    ['AMD Ryzen 9 7950X', 'AMD', 'AM5', 16, 32, 4500, 170, 59900],
    ['AMD Ryzen 9 9950X', 'AMD', 'AM5', 16, 32, 4300, 170, 74900]
  ];

  const gpuBase = [
    ['GeForce RTX 4060', 'NVIDIA', 8, 115, 245, 31900],
    ['GeForce RTX 4060 Ti', 'NVIDIA', 8, 160, 245, 41900],
    ['GeForce RTX 4070', 'NVIDIA', 12, 200, 267, 59900],
    ['GeForce RTX 4070 SUPER', 'NVIDIA', 12, 220, 267, 69900],
    ['GeForce RTX 4070 Ti SUPER', 'NVIDIA', 16, 285, 304, 89900],
    ['GeForce RTX 4080 SUPER', 'NVIDIA', 16, 320, 310, 119900],
    ['GeForce RTX 4090', 'NVIDIA', 24, 450, 336, 189900],
    ['GeForce RTX 3060', 'NVIDIA', 12, 170, 242, 29900],
    ['GeForce RTX 3060 Ti', 'NVIDIA', 8, 200, 242, 36900],
    ['GeForce RTX 3070', 'NVIDIA', 8, 220, 242, 44900],
    ['GeForce RTX 3080', 'NVIDIA', 10, 320, 285, 69900],
    ['GeForce RTX 3090', 'NVIDIA', 24, 350, 305, 109900],
    ['GeForce RTX 5060', 'NVIDIA', 8, 145, 240, 34900],
    ['GeForce RTX 5060 Ti', 'NVIDIA', 16, 180, 250, 45900],
    ['GeForce RTX 5070', 'NVIDIA', 12, 250, 280, 69900],
    ['GeForce RTX 5070 Ti', 'NVIDIA', 16, 300, 300, 94900],
    ['GeForce RTX 5080', 'NVIDIA', 16, 360, 330, 129900],
    ['GeForce RTX 5090', 'NVIDIA', 32, 575, 340, 239900],
    ['Radeon RX 6600', 'AMD', 8, 132, 190, 22900],
    ['Radeon RX 6700 XT', 'AMD', 12, 230, 240, 34900],
    ['Radeon RX 7600', 'AMD', 8, 165, 204, 27900],
    ['Radeon RX 7700 XT', 'AMD', 12, 245, 280, 46900],
    ['Radeon RX 7800 XT', 'AMD', 16, 263, 267, 56900],
    ['Radeon RX 7900 GRE', 'AMD', 16, 260, 287, 64900],
    ['Radeon RX 7900 XT', 'AMD', 20, 315, 287, 79900],
    ['Radeon RX 7900 XTX', 'AMD', 24, 355, 287, 99900],
    ['Radeon RX 9070', 'AMD', 16, 220, 270, 59900],
    ['Radeon RX 9070 XT', 'AMD', 16, 304, 287, 74900],
    ['Arc A750', 'Intel', 8, 225, 270, 25900],
    ['Arc A770', 'Intel', 16, 225, 270, 31900],
    ['Arc B580', 'Intel', 12, 190, 272, 29900]
  ];

  const gpuBrands = {
    NVIDIA: [['ASUS', 1.06], ['MSI', 1.03], ['Gigabyte', 1.02], ['Palit', 0.97], ['Zotac', 0.98], ['Gainward', 0.95]],
    AMD: [['Sapphire', 1.05], ['PowerColor', 1.0], ['ASUS', 1.04], ['Gigabyte', 1.02], ['XFX', 0.96]],
    Intel: [['ASRock', 1.0], ['Maxsun', 0.94], ['Sparkle', 0.97]]
  };

  const mbBase = [
    ['LGA1700', 'B760', 'DDR4', 'ATX', 12900],
    ['LGA1700', 'B760', 'DDR5', 'ATX', 14900],
    ['LGA1700', 'Z790', 'DDR5', 'ATX', 22900],
    ['LGA1700', 'H610', 'DDR4', 'mATX', 7900],
    ['LGA1700', 'B760', 'DDR5', 'mATX', 12900],
    ['LGA1700', 'Z790', 'DDR5', 'mATX', 18900],
    ['LGA1700', 'Z790', 'DDR5', 'ITX', 24900],
    ['LGA1851', 'Z890', 'DDR5', 'ATX', 27900],
    ['LGA1851', 'B860', 'DDR5', 'ATX', 18900],
    ['LGA1851', 'Z890', 'DDR5', 'ITX', 31900],
    ['AM4', 'B550', 'DDR4', 'ATX', 10900],
    ['AM4', 'X570', 'DDR4', 'ATX', 15900],
    ['AM4', 'B450', 'DDR4', 'mATX', 7900],
    ['AM4', 'B550', 'DDR4', 'mATX', 9900],
    ['AM4', 'B550', 'DDR4', 'ITX', 14900],
    ['AM5', 'A620', 'DDR5', 'mATX', 9900],
    ['AM5', 'B650', 'DDR5', 'ATX', 14900],
    ['AM5', 'B650', 'DDR5', 'mATX', 12900],
    ['AM5', 'X670', 'DDR5', 'ATX', 21900],
    ['AM5', 'X870', 'DDR5', 'ATX', 26900],
    ['AM5', 'B650', 'DDR5', 'ITX', 19900],
    ['AM5', 'X870', 'DDR5', 'ITX', 32900]
  ];
  const mbBrands = ['ASUS', 'MSI', 'Gigabyte', 'ASRock', 'Biostar'];

  const ramBrands = ['Corsair', 'Kingston', 'G.Skill', 'Crucial', 'Patriot', 'TeamGroup', 'Kingbank'];
  const ramVariants = [
    ['DDR4', 8, 2666, 1], ['DDR4', 16, 3200, 1], ['DDR4', 16, 3600, 2],
    ['DDR4', 32, 3200, 2], ['DDR4', 32, 3600, 2], ['DDR4', 64, 3200, 2],
    ['DDR5', 16, 4800, 1], ['DDR5', 32, 5600, 2], ['DDR5', 32, 6000, 2],
    ['DDR5', 32, 6400, 2], ['DDR5', 64, 6000, 2], ['DDR5', 96, 6000, 2]
  ];

  const storageBase = [
    ['Samsung 980', 'NVMe SSD', 500, 3200, 4900],
    ['Samsung 990 PRO', 'NVMe SSD', 1000, 6900, 11900],
    ['Samsung 990 PRO', 'NVMe SSD', 2000, 6900, 18900],
    ['WD Black SN770', 'NVMe SSD', 1000, 5150, 7900],
    ['WD Black SN850X', 'NVMe SSD', 1000, 7300, 10900],
    ['WD Black SN850X', 'NVMe SSD', 2000, 7300, 16900],
    ['Crucial P3 Plus', 'NVMe SSD', 1000, 5000, 6900],
    ['Crucial P5 Plus', 'NVMe SSD', 2000, 6600, 13900],
    ['Kingston KC3000', 'NVMe SSD', 1024, 7000, 10900],
    ['Corsair MP600 PRO', 'NVMe SSD', 2000, 7000, 16900],
    ['MSI Spatium M480', 'NVMe SSD', 1000, 7000, 8900],
    ['Samsung 870 EVO', 'SATA SSD', 1000, 560, 7900],
    ['Crucial MX500', 'SATA SSD', 2000, 560, 11900],
    ['Kingston A400', 'SATA SSD', 480, 500, 3900],
    ['Seagate BarraCuda', 'HDD', 1000, 190, 3900],
    ['Western Digital Blue', 'HDD', 2000, 190, 5900],
    ['Toshiba P300', 'HDD', 4000, 190, 9900],
    ['Seagate IronWolf', 'HDD', 8000, 210, 18900]
  ];

  const psuBrands = ['Corsair', 'Seasonic', 'be quiet!', 'Cooler Master', 'MSI', 'Gigabyte', 'Thermaltake', 'XPG'];
  const psuWatts = [450, 550, 650, 750, 850, 1000, 1200, 1600];

  const caseBase = [
    ['NZXT H5 Flow', 'ATX,mATX,ITX', 365, 1],
    ['NZXT H7 Flow', 'ATX,mATX,ITX', 400, 1],
    ['Corsair 4000D Airflow', 'ATX,mATX,ITX', 360, 1],
    ['Corsair 5000D', 'ATX,mATX,ITX', 420, 1],
    ['Lian Li O11 Dynamic', 'ATX,mATX,ITX', 420, 1],
    ['Lian Li Lancool 216', 'ATX,mATX,ITX', 392, 1],
    ['Fractal Design North', 'ATX,mATX,ITX', 355, 1],
    ['Fractal Design Meshify 2', 'ATX,mATX,ITX', 460, 1],
    ['Phanteks XT Pro', 'ATX,mATX,ITX', 405, 0],
    ['Montech AIR 100', 'mATX,ITX', 335, 0],
    ['Montech XR', 'ATX,mATX,ITX', 400, 0],
    ['DeepCool CG580', 'ATX,mATX,ITX', 410, 0],
    ['Cooler Master NR200P', 'ITX', 330, 0],
    ['ASUS TUF Gaming GT302', 'ATX,mATX,ITX', 407, 1],
    ['Gigabyte C301 Glass', 'ATX,mATX,ITX', 400, 0]
  ];

  const coolerBase = [
    ['Noctua NH-D15', 'воздух', ['LGA1700', 'LGA1851', 'AM4', 'AM5'], 220, 11900],
    ['Noctua NH-U12S', 'воздух', ['LGA1700', 'LGA1851', 'AM4', 'AM5'], 180, 7900],
    ['DeepCool AK620', 'воздух', ['LGA1700', 'LGA1851', 'AM4', 'AM5'], 220, 5900],
    ['DeepCool AG400', 'воздух', ['LGA1700', 'AM4', 'AM5'], 150, 2590],
    ['Thermalright Peerless Assassin 120', 'воздух', ['LGA1700', 'LGA1851', 'AM4', 'AM5'], 245, 3990],
    ['Thermalright Assassin King 120', 'воздух', ['LGA1700', 'AM4', 'AM5'], 170, 2190],
    ['be quiet! Pure Rock 2', 'воздух', ['LGA1700', 'AM4', 'AM5'], 150, 4290],
    ['Corsair iCUE H100i', 'жидкость 240', ['LGA1700', 'LGA1851', 'AM4', 'AM5'], 250, 12900],
    ['Corsair iCUE H150i', 'жидкость 360', ['LGA1700', 'LGA1851', 'AM4', 'AM5'], 300, 18900],
    ['NZXT Kraken 240', 'жидкость 240', ['LGA1700', 'LGA1851', 'AM4', 'AM5'], 250, 14900],
    ['NZXT Kraken 360', 'жидкость 360', ['LGA1700', 'LGA1851', 'AM4', 'AM5'], 320, 21900],
    ['Lian Li Galahad II 360', 'жидкость 360', ['LGA1700', 'LGA1851', 'AM4', 'AM5'], 320, 19900],
    ['MSI MAG Coreliquid 240R', 'жидкость 240', ['LGA1700', 'AM4', 'AM5'], 220, 8900],
    ['DeepCool LE520', 'жидкость 240', ['LGA1700', 'LGA1851', 'AM4', 'AM5'], 240, 6990]
  ];

  const items = [];
  let seq = 1;
  const add = (o) => { o.id = o.category + '-' + (seq++); items.push(o); };

  cpuBase.forEach((c) => add({
    category: 'cpu', brand: c[1], name: c[0], socket: c[2], cores: c[3], threads: c[4],
    freq: c[5], tdp: c[6], price: c[7], badge: c[6] >= 120 ? 'hot' : ''
  }));

  gpuBase.forEach((g) => {
    gpuBrands[g[1]].forEach((b, i) => add({
      category: 'gpu', brand: b[0], name: b[0] + ' ' + g[0] + (i === 0 ? ' OC' : ''),
      chipset: g[1], vram: g[2], tdp: g[3], length: g[4], price: Math.round(g[5] * b[1] / 100) * 100,
      badge: g[3] >= 300 ? 'hot' : ''
    }));
  });

  mbBase.forEach((m, idx) => {
    mbBrands.forEach((b, i) => add({
      category: 'motherboard', brand: b, name: b + ' ' + m[1] + '-' + m[0].replace('LGA', '') + (i ? ' DDR' + m[2].slice(3) : ''),
      socket: m[0], chipset: m[1], ramType: m[2], formFactor: m[3],
      price: Math.round((m[4] + i * 700) / 100) * 100, badge: idx > 15 ? 'new' : ''
    }));
  });

  ramBrands.forEach((b, bi) => ramVariants.forEach((r, ri) => add({
    category: 'ram', brand: b, name: b + ' ' + r[0] + ' ' + r[1] + 'GB ' + r[2] + 'MHz (' + r[3] + 'шт)',
    ramType: r[0], capacity: r[1], speed: r[2], modules: r[3],
    price: Math.round((r[1] * (r[0] === 'DDR5' ? 420 : 300) + r[2] * 2 + bi * 150 + ri * 90) / 100) * 100,
    badge: ri > 6 ? 'new' : ''
  })));

  storageBase.forEach((s, i) => add({
    category: 'storage', brand: s[0].split(' ')[0], name: s[0] + ' ' + s[2] + 'GB',
    storageType: s[1], capacity: s[2], speed: s[3], price: s[4] + i * 50,
    badge: s[1] === 'NVMe SSD' ? 'hot' : ''
  }));

  psuBrands.forEach((b, bi) => psuWatts.forEach((w, wi) => add({
    category: 'psu', brand: b, name: b + ' ' + w + 'W ' + (wi > 3 ? 'Gold' : 'Bronze'),
    wattage: w, efficiency: wi > 3 ? '80+ Gold' : '80+ Bronze',
    price: Math.round((w * (1.35 + bi * 0.04) + wi * 200) / 100) * 100,
    badge: wi > 4 ? 'new' : ''
  })));

  caseBase.forEach((c, i) => add({
    category: 'case', brand: c[0].split(' ')[0], name: c[0], formFactors: c[1].split(','),
    maxGpuLength: c[2], price: 5900 + i * 850 + c[3] * 1500, badge: i % 5 === 0 ? 'new' : ''
  }));

  coolerBase.forEach((c, i) => add({
    category: 'cooler', brand: c[0].split(' ')[0], name: c[0], coolerType: c[1], sockets: c[2],
    tdpRating: c[3], price: c[4], badge: i > 7 ? 'hot' : ''
  }));

  const CATEGORIES = [
    { key: 'cpu', label: 'Процессоры', icon: '🧠' },
    { key: 'motherboard', label: 'Материнские платы', icon: '🔌' },
    { key: 'gpu', label: 'Видеокарты', icon: '🎮' },
    { key: 'ram', label: 'Оперативная память', icon: '💾' },
    { key: 'storage', label: 'Накопители', icon: '🗄️' },
    { key: 'cooler', label: 'Охлаждение', icon: '❄️' },
    { key: 'psu', label: 'Блоки питания', icon: '⚡' },
    { key: 'case', label: 'Корпуса', icon: '🖥️' }
  ];

  window.PC_DATA = { items, categories: CATEGORIES };
})();
