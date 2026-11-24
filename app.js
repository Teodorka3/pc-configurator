(function () {
  'use strict';

  const { items, categories } = window.PC_DATA;
  const byId = new Map(items.map((i) => [i.id, i]));
  const label = Object.fromEntries(categories.map((c) => [c.key, c.label]));
  const STORAGE_KEY = 'pcbuilder_build_v1';

  const state = { category: 'all', search: '', brand: '', sort: 'popular', maxPrice: 0 };
  let build = {};

  const $ = (sel) => document.querySelector(sel);
  const money = (n) => Math.round(n).toLocaleString('ru-RU') + ' ₽';

  const STORES = [
    { name: 'DNS', short: 'DNS', url: (q) => 'https://www.dns-shop.ru/search/?q=' + encodeURIComponent(q) },
    { name: 'Ситилинк', short: 'C', url: (q) => 'https://www.citilink.ru/search/?text=' + encodeURIComponent(q) },
    { name: 'М.Видео', short: 'М', url: (q) => 'https://www.mvideo.ru/products/search?queryText=' + encodeURIComponent(q) },
    { name: 'Яндекс Маркет', short: 'Я', url: (q) => 'https://market.yandex.ru/search?text=' + encodeURIComponent(q) },
    { name: 'Эльдорадо', short: 'Э', url: (q) => 'https://www.eldorado.ru/search/?q=' + encodeURIComponent(q) }
  ];

  function openBuy(id) {
    const item = byId.get(id);
    if (!item) return;
    $('#buyTitle').textContent = item.name;
    $('#buyPrice').textContent = money(item.price) + ' · ориентировочная цена в каталоге';
    $('#storeList').innerHTML = STORES.map((s) =>
      `<a class="store-item" href="${s.url(item.name)}" target="_blank" rel="noopener noreferrer">
        <span class="store-logo">${s.short}</span>
        <span class="store-name">${s.name}</span>
        <span class="store-sub">поиск товара →</span>
      </a>`).join('');
    $('#buyModal').hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeBuy() {
    $('#buyModal').hidden = true;
    document.body.style.overflow = '';
  }

  function specs(i) {
    switch (i.category) {
      case 'cpu': return `${i.socket} · ${i.cores}/${i.threads} ядер · ${i.freq} МГц · TDP ${i.tdp} Вт`;
      case 'gpu': return `${i.vram} ГБ · TDP ${i.tdp} Вт · длина ${i.length} мм`;
      case 'motherboard': return `${i.socket} · ${i.chipset} · ${i.ramType} · ${i.formFactor}`;
      case 'ram': return `${i.ramType} · ${i.capacity} ГБ · ${i.speed} МГц · ${i.modules} шт`;
      case 'storage': return `${i.storageType} · ${i.capacity} ГБ · ${i.speed} МБ/с`;
      case 'cooler': return `${i.coolerType} · до ${i.tdpRating} Вт · ${i.sockets.join('/')}`;
      case 'psu': return `${i.wattage} Вт · ${i.efficiency}`;
      case 'case': return `${i.formFactors.join('/')} · видеокарта до ${i.maxGpuLength} мм`;
      default: return '';
    }
  }

  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove('show'), 2600);
  }

  function categoryItems(key) {
    return key === 'all' ? items : items.filter((i) => i.category === key);
  }

  function renderCategories() {
    const nav = $('#categoryNav');
    const all = `<button class="cat-btn ${state.category === 'all' ? 'active' : ''}" data-cat="all">🏆 <span>Всё сразу</span><span class="cnt">${items.length}</span></button>`;
    nav.innerHTML = all + categories.map((c) => {
      const n = items.filter((i) => i.category === c.key).length;
      return `<button class="cat-btn ${state.category === c.key ? 'active' : ''}" data-cat="${c.key}">${c.icon} <span>${c.label}</span><span class="cnt">${n}</span></button>`;
    }).join('');
    nav.querySelectorAll('.cat-btn').forEach((b) => b.addEventListener('click', () => {
      state.category = b.dataset.cat;
      state.brand = '';
      renderCategories();
      renderBrands();
      renderCatalog();
    }));
  }

  function renderBrands() {
    const sel = $('#brandFilter');
    const brands = [...new Set(categoryItems(state.category).map((i) => i.brand))].sort();
    sel.innerHTML = '<option value="">Все</option>' + brands.map((b) => `<option value="${b}">${b}</option>`).join('');
    sel.value = state.brand;
  }

  function filtered() {
    const q = state.search.trim().toLowerCase();
    let list = categoryItems(state.category).filter((i) => {
      if (state.brand && i.brand !== state.brand) return false;
      if (state.maxPrice && i.price > state.maxPrice) return false;
      if (q && !(i.name + ' ' + i.brand + ' ' + specs(i)).toLowerCase().includes(q)) return false;
      return true;
    });
    if (state.sort === 'cheap') list.sort((a, b) => a.price - b.price);
    if (state.sort === 'expensive') list.sort((a, b) => b.price - a.price);
    if (state.sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
    return list;
  }

  function cardHtml(i) {
    const chosen = build[i.category] === i.id;
    return `<div class="card ${chosen ? 'selected' : ''}" data-id="${i.id}">
      ${i.badge ? `<span class="badge ${i.badge}">${i.badge === 'hot' ? 'хит' : 'новинка'}</span>` : ''}
      <div class="card-img"><img src="${window.productImage(i)}" alt="${i.name}" loading="lazy"></div>
      <div class="card-brand">${label[i.category]} · ${i.brand}</div>
      <div class="card-name">${i.name}</div>
      <div class="card-specs">${specs(i)}</div>
      <div class="card-foot">
        <span class="price">${money(i.price)}</span>
        <div class="card-actions">
          <button class="btn tiny buy" data-buy="${i.id}" title="Купить в магазинах">🛒 Купить</button>
          <button class="btn tiny ${chosen ? 'primary' : ''}">${chosen ? 'В сборке ✓' : 'В сборку +'}</button>
        </div>
      </div>
    </div>`;
  }

  function renderCatalog() {
    const list = filtered();
    const host = $('#catalog');
    let html = '';
    list.forEach((i, idx) => {
      html += cardHtml(i);
      if ((idx + 1) % 8 === 0 && idx + 1 < list.length) {
        html += '<div class="mini-ad" data-ad-slot="feed">Реклама · загрузка...</div>';
      }
    });
    host.innerHTML = html;
    $('#emptyState').hidden = list.length > 0;
    $('#itemCount').textContent = items.length;

    host.querySelectorAll('.card').forEach((card) => {
      card.addEventListener('click', (e) => {
        const buyBtn = e.target.closest('[data-buy]');
        if (buyBtn) {
          e.stopPropagation();
          openBuy(buyBtn.dataset.buy);
          return;
        }
        const id = card.dataset.id;
        const item = byId.get(id);
        if (build[item.category] === id) delete build[item.category];
        else build[item.category] = id;
        renderCatalog();
        renderBuild();
      });
    });

    if (window.AdManager) window.AdManager.renderAll();
  }

  function buildRow(cat) {
    const item = byId.get(build[cat]);
    if (!item) return `<div class="build-row empty-row"><span class="b-cat">${label[cat]}</span><span class="b-name">не выбрано</span></div>`;
    return `<div class="build-row">
      <span class="b-cat">${label[cat]}</span>
      <span class="b-name" title="${item.name}">${item.name}</span>
      <span class="b-price">${money(item.price)}</span>
      <button class="remove" data-cat="${cat}" title="Убрать">×</button>
      <button class="remove buy-mini" data-buy="${item.id}" title="Где купить">🛒</button>
    </div>`;
  }

  function compatibility() {
    const out = [];
    const cpu = byId.get(build.cpu);
    const mb = byId.get(build.motherboard);
    const ram = byId.get(build.ram);
    const gpu = byId.get(build.gpu);
    const cooler = byId.get(build.cooler);
    const psu = byId.get(build.psu);
    const box = byId.get(build.case);

    if (!cpu || !mb) out.push(['', 'Выбери процессор и материнскую плату — проверим сокет.']);
    if (cpu && mb && cpu.socket !== mb.socket) out.push(['err', `Сокет не совпадает: CPU ${cpu.socket}, плата ${mb.socket}.`]);
    if (ram && mb && ram.ramType !== mb.ramType) out.push(['err', `Память ${ram.ramType} не подходит к плате с ${mb.ramType}.`]);
    if (cooler && cpu && !cooler.sockets.includes(cpu.socket)) out.push(['err', `Кулер не поддерживает сокет ${cpu.socket}.`]);
    if (cooler && cpu && cooler.tdpRating < cpu.tdp) out.push(['warn', `Кулер слабоват: ${cooler.tdpRating} Вт при CPU ${cpu.tdp} Вт.`]);
    if (box && mb && !box.formFactors.includes(mb.formFactor)) out.push(['err', `Корпус не поддерживает форм-фактор ${mb.formFactor}.`]);
    if (box && gpu && gpu.length > box.maxGpuLength) out.push(['err', `Видеокарта ${gpu.length} мм не влезет в корпус (${box.maxGpuLength} мм).`]);

    const power = (cpu ? cpu.tdp : 0) + (gpu ? gpu.tdp : 0) + 70;
    const recommended = Math.ceil((power * 1.4) / 50) * 50;
    if (psu && psu.wattage < recommended) out.push(['err', `БП слаб: ${psu.wattage} Вт, рекомендуется ${recommended} Вт.`]);
    else if (psu) out.push(['ok', `Блок питания подходит (${psu.wattage} Вт).`]);
    if (!psu) out.push(['', `Рекомендуемый БП: от ${recommended} Вт.`]);
    if (!out.some((o) => o[0] === 'err')) out.push(['ok', 'Конфликтов не найдено.']);
    return { out, power, recommended };
  }

  function renderBuild() {
    const keys = categories.map((c) => c.key);
    $('#buildList').innerHTML = keys.map(buildRow).join('');
    const total = Object.values(build).reduce((s, id) => s + (byId.get(id)?.price || 0), 0);
    $('#buildTotal').textContent = money(total);

    const { out, power, recommended } = compatibility();
    $('#powerValue').textContent = `${power} Вт / рекоменд. ${recommended} Вт`;
    const psu = byId.get(build.psu);
    $('#powerBar').style.width = Math.min(100, psu ? (power / psu.wattage) * 100 : (power / 10)) + '%';
    $('#compatBox').innerHTML = out.map((o) => `<div class="compat-item ${o[0]}">${o[1]}</div>`).join('');

    $('#buildList').querySelectorAll('.remove').forEach((b) => b.addEventListener('click', (e) => {
      e.stopPropagation();
      if (b.dataset.buy) { openBuy(b.dataset.buy); return; }
      delete build[b.dataset.cat];
      renderBuild();
      renderCatalog();
    }));
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(build));
    toast('Сборка сохранена в этом браузере');
  }
  function load() {
    try {
      build = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {};
      renderBuild();
      renderCatalog();
      toast('Сборка загружена');
    } catch (e) { toast('Не удалось загрузить сборку'); }
  }

  function bind() {
    $('#search').addEventListener('input', (e) => { state.search = e.target.value; renderCatalog(); });
    $('#brandFilter').addEventListener('change', (e) => { state.brand = e.target.value; renderCatalog(); });
    $('#sortFilter').addEventListener('change', (e) => { state.sort = e.target.value; renderCatalog(); });
    $('#applyFilters').addEventListener('click', () => {
      const v = Number($('#priceFilter').value);
      state.maxPrice = v > 0 ? v : 0;
      renderCatalog();
    });
    $('#resetBtn').addEventListener('click', () => { build = {}; renderBuild(); renderCatalog(); toast('Сборка очищена'); });
    $('#saveBtn').addEventListener('click', save);
    $('#loadBtn').addEventListener('click', load);
    $('#hideBuild').addEventListener('click', () => $('#buildPanel').classList.add('collapsed'));
    $('#homeLink').addEventListener('click', (e) => {
      e.preventDefault();
      state.category = 'all'; state.search = ''; state.brand = ''; state.maxPrice = 0;
      $('#search').value = ''; $('#priceFilter').value = '';
      renderCategories(); renderBrands(); renderCatalog();
    });
    $('#finishBtn').addEventListener('click', () => {
      const { out } = compatibility();
      const errs = out.filter((o) => o[0] === 'err').length;
      toast(errs ? `Найдено проблем: ${errs}. Исправь их в панели сборки.` : 'Сборка совместима — можно собирать!');
    });
    document.querySelectorAll('[data-buy-close]').forEach((b) => b.addEventListener('click', closeBuy));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeBuy(); });
    const adBtn = $('#adModeBtn');
    adBtn.textContent = (window.PC_AD_CONFIG?.mode || 'demo').toUpperCase();
    adBtn.addEventListener('click', () => toast('Настройки рекламы — в файле ads.js'));
  }

  renderCategories();
  renderBrands();
  renderCatalog();
  renderBuild();
  bind();
  if (window.AdManager) window.AdManager.init();
})();
