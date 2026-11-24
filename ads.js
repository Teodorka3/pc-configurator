/*
 * Рекламный слой конфигуратора.
 * Сейчас включён Adsterra: коды блоков вставлены статически в index.html.
 * Динамические слоты в ленте скрываются, чтобы не дублировать рекламу.
 * Доступные режимы: 'adsterra' | 'yandex' | 'demo' | 'adsense' | 'custom'.
 */
(function () {
  'use strict';

  const CONFIG = {
    mode: 'adsterra',
    adsterra: {
      header: { key: '97564551c7f6041b767137fb4d5a5125', width: 728, height: 90 },
      sidebar: { key: 'decd2bd36276950022ef50d9d8582986', width: 300, height: 250 },
      footerMini: { key: '987b86fdf7f0c07c8962a876198e30e8', width: 320, height: 50 },
      native: { key: 'bfeefa9aee8f6670a3e5705bb8bf9305', container: 'container-bfeefa9aee8f6670a3e5705bb8bf9305' }
    },
    yandexPageId: '20496693',
    adsenseClient: 'ca-pub-XXXXXXXXXXXXXXXX',
    slots: {
      header: '0000000000',
      sidebar: '0000000000',
      feed: '0000000000',
      footer: '0000000000'
    },
    customHtml: {},          // { header: '<a href="...">...</a>', ... }
    rotationMs: 9000,
    demos: [
      { title: 'Скидка 15% на первый заказ', text: 'Промокод PCBUILD — примени в корзине', cta: 'Забрать', tone: 'green' },
      { title: 'Собери ПК мечты', text: 'Более 300 комплектующих в одном конфигураторе', cta: 'Собрать', tone: 'violet' },
      { title: 'Бесплатная сборка', text: 'При покупке всех комплектующих в одном магазине', cta: 'Узнать', tone: 'orange' },
      { title: 'Гарантия 3 года', text: 'На все компоненты из нашего каталога', cta: 'Подробнее', tone: 'blue' },
      { title: 'Доставка за 1 день', text: 'По Москве и области — бесплатно от 5000 ₽', cta: 'Заказать', tone: 'pink' }
    ]
  };

  window.PC_AD_CONFIG = CONFIG;

  function demoBanner(slotName) {
    const list = CONFIG.demos;
    const idx = Math.floor(Math.random() * list.length);
    const a = list[idx];
    const el = document.createElement('div');
    el.className = 'ad-banner ad-' + a.tone;
    el.innerHTML =
      '<span class="ad-label">Реклама</span>' +
      '<div class="ad-copy"><strong>' + a.title + '</strong><span>' + a.text + '</span></div>' +
      '<span class="ad-cta">' + a.cta + ' →</span>';
    return el;
  }

  function adsenseSlot(name) {
    const ins = document.createElement('ins');
    ins.className = 'adsbygoogle';
    ins.style.display = 'block';
    ins.setAttribute('data-ad-client', CONFIG.adsenseClient);
    ins.setAttribute('data-ad-slot', CONFIG.slots[name] || CONFIG.slots.header);
    ins.setAttribute('data-ad-format', 'auto');
    ins.setAttribute('data-full-width-responsive', 'true');
    return ins;
  }

  function pushAdsbyGoogle() {
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) { /* noop */ }
  }

  function render(host) {
    if (CONFIG.mode === 'adsterra') {
      // Статические блоки уже встроены в HTML — не трогаем их.
      if (host.hasAttribute('data-ad-static')) return;
      host.hidden = true;
      return;
    }

    const name = host.getAttribute('data-ad-slot') || 'header';
    host.innerHTML = '';

    if (CONFIG.mode === 'yandex') {
      // Яндекс AutoPlacement вставляет блоки сам, наши заглушки скрываем.
      host.hidden = true;
      return;
    }
    host.hidden = false;

    if (CONFIG.mode === 'adsense') {
      host.appendChild(adsenseSlot(name));
      pushAdsbyGoogle();
      return;
    }

    if (CONFIG.mode === 'custom' && CONFIG.customHtml[name]) {
      host.innerHTML = '<span class="ad-label">Реклама</span>' + CONFIG.customHtml[name];
      return;
    }

    host.appendChild(demoBanner(name));
  }

  function loadAdsenseScript() {
    if (CONFIG.mode !== 'adsense') return;
    if (document.getElementById('adsense-lib')) return;
    const s = document.createElement('script');
    s.id = 'adsense-lib';
    s.async = true;
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + encodeURIComponent(CONFIG.adsenseClient);
    s.crossOrigin = 'anonymous';
    document.head.appendChild(s);
  }

  let timerStarted = false;
  const AdManager = {
    renderAll() {
      document.querySelectorAll('[data-ad-slot]').forEach(render);
    },
    init() {
      loadAdsenseScript();
      this.renderAll();
      if (CONFIG.mode === 'demo' && !timerStarted) {
        timerStarted = true;
        setInterval(() => this.renderAll(), CONFIG.rotationMs);
      }
    }
  };

  window.AdManager = AdManager;
})();
