// Mobile menu
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', String(open));
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

// Reveal on scroll
const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((el) => observer.observe(el));
} else {
  revealItems.forEach((el) => el.classList.add('is-visible'));
}

// Price calculator
const calc = document.getElementById('calc');

if (calc) {
  const PLATFORMS = {
    direct: { name: 'Яндекс Директ', currency: 'rub', setup: 8000 },
    tg: { name: 'Telegram Ads', currency: 'rub', setup: 6000 },
    fb: { name: 'Facebook Ads', currency: 'usd', setup: 90 },
  };
  // Monthly management fee by ad budget; null = negotiable
  const TIERS = {
    rub: [[100000, 10000], [200000, 15000], [400000, 30000], [700000, 45000]],
    usd: [[1000, 120], [2000, 180], [4000, 350], [7000, 500]],
  };
  const AUDIT_PRICE = 3000;

  const money = (value, currency) => (currency === 'usd'
    ? `$${value.toLocaleString('ru-RU')}`
    : `${value.toLocaleString('ru-RU')} ₽`);

  const budgetLabel = (value, max, currency) => (value >= max
    ? `от ${money(max - (currency === 'usd' ? 100 : 10000), currency)}`
    : money(value, currency));

  const manageFee = (budget, currency) => {
    const tier = TIERS[currency].find(([limit]) => budget <= limit);
    return tier ? tier[1] : null;
  };

  const linesEl = calc.querySelector('.calc__lines');
  const totalEl = calc.querySelector('.calc__total-value');
  const monthlyEl = calc.querySelector('.calc__monthly');
  const ctaEl = calc.querySelector('.calc__cta');
  const auditEl = calc.querySelector('[name="audit"]');

  const sumText = (sums, negotiable) => {
    const parts = [];
    if (sums.rub) parts.push(money(sums.rub, 'rub'));
    if (sums.usd) parts.push(money(sums.usd, 'usd'));
    if (!parts.length) return negotiable ? 'договорная' : '0 ₽';
    return parts.join(' + ') + (negotiable ? ' + договорная часть' : '');
  };

  const update = () => {
    const selected = [...calc.querySelectorAll('[name="platform"]:checked')].map((el) => el.value);
    const service = calc.querySelector('[name="service"]:checked').value;
    const withSetup = service !== 'manage';
    const withManage = service !== 'setup';

    calc.querySelector('[data-show="direct"]').hidden = !selected.includes('direct');
    if (!selected.includes('direct')) auditEl.checked = false;
    calc.querySelector('.calc__budgets').hidden = !withManage || !selected.length;

    const lines = [];
    const first = { rub: 0, usd: 0 };
    const monthly = { rub: 0, usd: 0 };
    let negotiable = false;
    const summary = [];

    calc.querySelectorAll('.calc__range').forEach((range) => {
      const input = range.querySelector('input');
      const id = range.dataset.platform;
      const { currency } = PLATFORMS[id];
      range.hidden = !selected.includes(id);
      range.querySelector('output').textContent = budgetLabel(Number(input.value), Number(input.max), currency);
    });

    selected.forEach((id) => {
      const platform = PLATFORMS[id];
      const { currency } = platform;
      const input = calc.querySelector(`.calc__range[data-platform="${id}"] input`);
      const budget = Number(input.value);
      const budgetText = budgetLabel(budget, Number(input.max), currency);
      const parts = [];

      if (withSetup) {
        lines.push([`${platform.name}: настройка`, money(platform.setup, currency)]);
        first[currency] += platform.setup;
        parts.push('настройка');
      }
      if (withManage) {
        const fee = manageFee(budget, currency);
        if (fee === null) {
          negotiable = true;
          lines.push([`${platform.name}: ведение (бюджет ${budgetText})`, 'договорная']);
        } else {
          lines.push([`${platform.name}: ведение (бюджет ${budgetText})`, `${money(fee, currency)} / мес`]);
          first[currency] += fee;
          monthly[currency] += fee;
        }
        parts.push(`ведение, бюджет ${budgetText}/мес`);
      }
      summary.push(`${platform.name} — ${parts.join(' + ')}`);
    });

    if (auditEl.checked) {
      lines.push(['Аудит текущих кампаний Директа', money(AUDIT_PRICE, 'rub')]);
      first.rub += AUDIT_PRICE;
      summary.push('аудит Директа');
    }

    linesEl.innerHTML = '';
    if (!selected.length) {
      const li = document.createElement('li');
      li.className = 'calc__empty';
      li.textContent = 'Выберите хотя бы одну площадку';
      linesEl.append(li);
    }
    lines.forEach(([label, value]) => {
      const li = document.createElement('li');
      const span = document.createElement('span');
      const b = document.createElement('b');
      span.textContent = label;
      b.textContent = value;
      li.append(span, b);
      linesEl.append(li);
    });

    const totalText = sumText(first, negotiable);
    totalEl.textContent = totalText;

    const monthlyText = sumText(monthly, negotiable);
    monthlyEl.innerHTML = '';
    if (withManage && selected.length) {
      monthlyEl.append('Дальше — ');
      const b = document.createElement('b');
      b.textContent = monthlyText;
      monthlyEl.append(b, ' в месяц за ведение');
    }

    const message = selected.length
      ? `Здравствуйте! Мой расчёт с сайта: ${summary.join('; ')}. Первый месяц: ${totalText}.`
      : 'Здравствуйте! Хочу обсудить рекламу.';
    ctaEl.href = `https://t.me/andrusha_pv?text=${encodeURIComponent(message)}`;
  };

  calc.addEventListener('input', update);
  calc.addEventListener('change', update);
  update();
}

// Current year
document.getElementById('year').textContent = new Date().getFullYear();
