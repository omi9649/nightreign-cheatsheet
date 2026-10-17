const SHORT_LABELS = {
    "Standard": "STD", "Slash": "SLA", "Strike": "STR", "Pierce": "PIE",
    "Magic": "MAG", "Fire": "FIRE", "Lightning": "LGT", "Holy": "HOLY",
    "Poison": "PSN", "Scarlet Rot": "ROT", "Bleed": "BLD",
    "Frostbite": "FRO", "Madness": "MAD", "Sleep": "SLP"
};

function negationClasses(value) {
    if (value < 0) return { text: "text-sky-300", box: "bg-sky-500/10 border-sky-500/30" };
    if (value > 0) return { text: "text-rose-300", box: "bg-rose-500/10 border-rose-500/25" };
    return { text: "text-gray-500", box: "bg-black/20 border-gray-700/40" };
}

function statusClasses(value) {
    if (value === "X") return { text: "text-gray-600", box: "bg-black/30 border-gray-800" };
    if (value <= 154) return { text: "text-emerald-300", box: "bg-emerald-500/10 border-emerald-500/30" };
    if (value <= 252) return { text: "text-lime-300", box: "bg-lime-500/10 border-lime-500/20" };
    if (value <= 542) return { text: "text-amber-300/80", box: "bg-amber-500/5 border-amber-500/20" };
    return { text: "text-gray-500", box: "bg-black/20 border-gray-700/40" };
}

function fmtNegation(v) {
    if (v > 0) return "+" + v;
    return String(v);
}

function buildGrid(dataObj, cols, isStatus) {
    const grid = document.createElement('div');
    grid.className = `grid grid-cols-${cols} gap-1`;
    for (const [key, value] of Object.entries(dataObj)) {
        const c = isStatus ? statusClasses(value) : negationClasses(value);
        const cell = document.createElement('div');
        cell.className = `rounded border ${c.box} px-1 py-1 flex flex-col items-center justify-center leading-none`;
        cell.title = `${key}: ${value}`;
        cell.innerHTML = `
            <span class="text-[8px] font-semibold text-gray-500 tracking-wider">${SHORT_LABELS[key] || key}</span>
            <span class="text-[11px] font-bold ${c.text} mt-0.5">${isStatus ? value : fmtNegation(value)}</span>
        `;
        grid.appendChild(cell);
    }
    return grid;
}

function sectionTitle(text) {
    const t = document.createElement('div');
    t.className = "text-[9px] font-bold text-gray-600 uppercase tracking-[0.15em] mb-1 mt-2 first:mt-0";
    t.textContent = text;
    return t;
}

function createWeaknessColumn(nightlordName) {
    const col = document.createElement('div');
    col.className = "w-full md:w-64 lg:w-72 shrink-0 bg-[#1a1d24] border-b md:border-b-0 md:border-r border-gray-800 flex flex-col";

    const header = document.createElement('div');
    header.className = "p-3 text-center text-[11px] font-bold text-amber-300/80 uppercase tracking-widest border-b border-gray-800 bg-[#181a20]";
    header.textContent = "Damage Negation";
    col.appendChild(header);

    const body = document.createElement('div');
    body.className = "p-3 flex flex-col gap-1 flex-1";

    const variants = nightlordDamageData[nightlordName];

    if (!variants) {
        body.innerHTML = `<div class="text-gray-600 text-xs italic flex items-center justify-center h-full">No data</div>`;
        col.appendChild(body);
        return col;
    }

    variants.forEach((v, idx) => {
        if (v.label) {
            const lab = document.createElement('div');
            lab.className = `text-[10px] font-bold text-gray-300 uppercase tracking-wider bg-black/30 border border-gray-700/60 rounded px-2 py-1 text-center ${idx > 0 ? 'mt-3' : ''}`;
            lab.textContent = v.label;
            body.appendChild(lab);
        }
        body.appendChild(sectionTitle("Physical"));
        body.appendChild(buildGrid(v.phys, 4, false));
        body.appendChild(sectionTitle("Elemental"));
        body.appendChild(buildGrid(v.elem, 4, false));
        body.appendChild(sectionTitle("Status Buildup"));
        body.appendChild(buildGrid(v.status, 3, true));
    });

    col.appendChild(body);
    return col;
}

const AFFINITY_SVG = {
    magic:     "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='%23a5b4fc' d='M12 1.5l2.1 6.4 6.7.1-5.4 4 2 6.4-5.4-3.9-5.4 3.9 2-6.4-5.4-4 6.7-.1z'/></svg>",
    fire:      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='%23fb923c' d='M12 2c1.2 4.2-3 5.2-3 9a3 3 0 006 0c0-1.4-.6-2.3-.6-2.3S17.2 11 17.2 14A5.2 5.2 0 016.8 14C6.8 8 12 6.4 12 2z'/></svg>",
    lightning: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='%23fde047' d='M13.4 1.8L3.9 14.6h5.9L8.4 22.2 20.1 9.1h-6.4z'/></svg>",
    holy:      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='%23fef08a' d='M12 1.6l1.7 5.3 5.1-2.4-2.4 5.1 5.3 1.7-5.3 1.7 2.4 5.1-5.1-2.4L12 22.4l-1.7-5.3-5.1 2.4 2.4-5.1L2.3 12.7 7.6 11 5.2 5.9l5.1 2.4z'/></svg>"
};

Object.assign(AFFINITY_SVG, {
    standard:  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='%23cbd5e1' d='M11 1.5h2V15h-2z'/><path fill='%23cbd5e1' d='M6.5 15h11v2.2h-11z'/><path fill='%23cbd5e1' d='M11 17.5h2v5h-2z'/></svg>",
    slash:     "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='%23cbd5e1' d='M20.5 2.2L22 4.4 6.2 22l-3.4-1.2z'/></svg>",
    strike:    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='%23cbd5e1' d='M5 3.5h14v6.2H5z'/><path fill='%23cbd5e1' d='M11 9.7h2v12.8h-2z'/></svg>",
    pierce:    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='%23cbd5e1' d='M12 1l4.4 8.6H7.6z'/><path fill='%23cbd5e1' d='M11 9.6h2v13h-2z'/></svg>",
    poison:    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='%2384cc16' d='M12 1.8c4.2 6.4 6.3 8.7 6.3 11.6a6.3 6.3 0 11-12.6 0C5.7 10.5 7.8 8.2 12 1.8z'/></svg>",
    rot:        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><g fill='%23e11d48'><circle cx='12' cy='4.6' r='3.2'/><circle cx='19.4' cy='9.9' r='3.2'/><circle cx='16.6' cy='18.6' r='3.2'/><circle cx='7.4' cy='18.6' r='3.2'/><circle cx='4.6' cy='9.9' r='3.2'/></g><circle cx='12' cy='12.4' r='2.6' fill='%23451021'/></svg>",
    bleed:     "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='%23ef4444' d='M12 1.5l5.6 10.2a5.9 5.9 0 11-11.2 0z'/></svg>",
    frost:     "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><g stroke='%2367e8f9' stroke-width='2.2' stroke-linecap='round'><path d='M12 2v20'/><path d='M3.4 7l17.2 10'/><path d='M3.4 17L20.6 7'/></g></svg>",
    madness:   "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='%23fb923c' d='M12 4.8c5.2 0 9.2 4.7 9.2 7.2s-4 7.2-9.2 7.2-9.2-4.7-9.2-7.2S6.8 4.8 12 4.8z'/><circle cx='12' cy='12' r='2.8' fill='%23161a20'/></svg>",
    sleep:     "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='%23a5b4fc' d='M15.4 2.6a9.4 9.4 0 100 18.8 7.4 7.4 0 010-18.8z'/></svg>"
});

function affinityUrls(type) {
    const urls = [`img/icons/${type}.png`];
    if (AFFINITY_SVG[type]) urls.push(AFFINITY_SVG[type]);
    return urls;
}

function affinityChain(img, type) {
    const urls = affinityUrls(type);
    let i = 0;
    img.onerror = () => {
        i += 1;
        if (i < urls.length) img.src = urls[i];
        else img.onerror = null;
    };
    img.src = urls[0];
}

function resolveRarityBackgrounds() {
    ['purple', 'blue', 'grey'].forEach(rarity => {
        const url = new URL(`img/rarity/${rarity}.png`, document.baseURI).href;
        const probe = new Image();
        probe.onload = () => {   // sin textura: se queda el degradado
            document.documentElement.style.setProperty('--bg-' + rarity, `url("${url}")`);
            document.body.classList.add('bg-ready');
        };
        probe.src = url;
    });
}

function wireAffinityIcons(root) {
    root.querySelectorAll('img[data-aff]').forEach(img => {
        if (img.dataset.wired) return;
        img.dataset.wired = "1";
        affinityChain(img, img.getAttribute('data-aff'));
    });
}

function resistColor(v) {
    if (v >= 70) return "text-orange-300 bg-orange-600/20 border-orange-500/40";
    if (v >= 65) return "text-amber-300 bg-amber-500/15 border-amber-500/35";
    if (v >= 60) return "text-fuchsia-300 bg-fuchsia-600/20 border-fuchsia-500/40";
    if (v >= 55) return "text-sky-300 bg-sky-600/20 border-sky-500/40";
    if (v >= 50) return "text-gray-200 bg-white/10 border-white/20";
    return "text-gray-500 bg-black/40 border-gray-700/50";
}

let shieldSort = { key: "id", dir: "asc" };

const RARITY_INDEX = { purple: 0, blue: 1, grey: 2 };

function guardMarkup(sh, mainCls, subCls) {
    const tierClass = ["text-fuchsia-300", "text-sky-300", "text-gray-400"];
    const offset = RARITY_INDEX[sh.rarity] - (sh.guardTiers.length - 1);
    return sh.guardTiers.map((t, i) => {
        const cls = tierClass[offset + i];
        const size = i === 0 ? mainCls : subCls;
        return `<span class="${size} ${cls}">${t}</span>`;
    }).join('<span class="text-gray-700 mx-0.5">/</span>');
}

function attachShieldImage(el, sh) {
    const img = el.querySelector('img');
    img.onerror = () => { img.onerror = null; img.style.visibility = 'hidden'; };
    img.src = `img/shields/${String(sh.id).padStart(2, '0')}.png`;
}

function searchKey(sh) {
    return `${sh.name} ${sh.rarity} ${sh.ailment || ''} ${sh.magic} ${sh.fire} ${sh.lightning} ${sh.holy} ${sh.guardTiers.join(' ')}`.toLowerCase();
}

function buildShieldCard(sh) {
    const card = document.createElement('div');
    card.className = "shield-card shield-item";
    card.setAttribute('data-search', searchKey(sh));

    const chip = (type, v) => {
        const c = resistColor(v);
        return `<div class="chip ${c}" title="${type}"><img class="aff-ico" data-aff="${type}" alt="${type}"><span class="chip-val">${v}</span></div>`;
    };

    card.innerHTML = `
        <a href="${sh.url}" target="_blank" rel="noopener" class="shield-img-box rar-${sh.rarity}" title="${sh.name} - base ${sh.rarity}">
            <img alt="${sh.name}" loading="lazy">
            ${sh.ailment ? `<span class="shield-ail">${sh.ailment}</span>` : ''}
        </a>
        <div class="shield-card-name">${sh.name}</div>
        <div class="chip-grid">
            ${chip('magic', sh.magic)}${chip('fire', sh.fire)}${chip('lightning', sh.lightning)}${chip('holy', sh.holy)}
        </div>
        <div class="card-guard">
            <span class="text-[8px] uppercase tracking-widest text-gray-600 mr-1">Guard</span>
            ${guardMarkup(sh, 'text-[15px] font-bold', 'text-[11px] font-semibold')}
        </div>
    `;

    attachShieldImage(card, sh);
    wireAffinityIcons(card);
    return card;
}

function buildShieldRow(sh) {
    const tr = document.createElement('tr');
    tr.className = "shield-row shield-item hover:bg-[#272c37] transition-colors";
    tr.setAttribute('data-search', searchKey(sh));

    const cell = (v) => `<td class="text-center"><span class="res-chip inline-flex items-center justify-center rounded border font-bold ${resistColor(v)}">${v}</span></td>`;

    const ailment = sh.ailment
        ? `<span class="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-red-900/30 border border-red-800/50 text-red-300/90 align-middle">${sh.ailment}</span>`
        : '';

    tr.innerHTML = `
        <td class="w-14">
            <div class="shield-icon rar-${sh.rarity} rar-sm mx-auto rounded overflow-hidden flex items-center justify-center" title="base ${sh.rarity}">
                <img alt="${sh.name}" class="w-full h-full object-contain" loading="lazy">
            </div>
        </td>
        <td class="whitespace-nowrap">
            <a href="${sh.url}" target="_blank" rel="noopener" class="shield-name font-medium text-gray-200 hover:text-amber-300 hover:underline decoration-dotted underline-offset-2 transition-colors">${sh.name}</a>${ailment}
        </td>
        ${cell(sh.magic)}${cell(sh.fire)}${cell(sh.lightning)}${cell(sh.holy)}
        <td class="text-center whitespace-nowrap">${guardMarkup(sh, 'gb-main font-bold', 'gb-sub font-semibold')}</td>
    `;

    attachShieldImage(tr, sh);
    return tr;
}

let shieldViewMode = 'grid';

function renderShieldChart() {
    const grid = document.getElementById('shield-grid');
    const tbodyA = document.getElementById('shield-tbody-a');
    const tbodyB = document.getElementById('shield-tbody-b');
    grid.innerHTML = '';
    tbodyA.innerHTML = '';
    tbodyB.innerHTML = '';

    const sorted = [...shieldData].sort((a, b) => {
        const get = (o) => shieldSort.key === 'guard' ? o.guardTiers[0] : o[shieldSort.key];
        const va = get(a), vb = get(b);
        if (typeof va === 'string') return shieldSort.dir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
        return shieldSort.dir === 'asc' ? va - vb : vb - va;
    });

    if (shieldViewMode === 'grid') {
        sorted.forEach(sh => grid.appendChild(buildShieldCard(sh)));
    } else {
        // Dos tablas en paralelo para que las 26 filas quepan sin scroll
        const half = Math.ceil(sorted.length / 2);
        sorted.forEach((sh, i) => (i < half ? tbodyA : tbodyB).appendChild(buildShieldRow(sh)));
    }

    document.querySelectorAll('[data-sort-key]').forEach(el => {
        const active = el.getAttribute('data-sort-key') === shieldSort.key;
        el.classList.toggle('text-white', active);
        el.classList.toggle('border-gray-600', active && el.classList.contains('sort-btn'));
        const arrow = el.querySelector('.sort-arrow');
        if (arrow) arrow.textContent = active ? (shieldSort.dir === 'asc' ? ' \u25b2' : ' \u25bc') : '';
    });
}

function setupShieldViewToggle() {
    document.querySelectorAll('[data-view]').forEach(btn => {
        btn.addEventListener('click', () => {
            shieldViewMode = btn.getAttribute('data-view');
            document.querySelectorAll('[data-view]').forEach(b => {
                const on = b === btn;
                b.classList.toggle('bg-[#2a2f3a]', on);
                b.classList.toggle('text-white', on);
                b.classList.toggle('text-gray-500', !on);
                b.classList.toggle('border-gray-700', on);
            });
            document.getElementById('shield-grid').classList.toggle('hidden', shieldViewMode !== 'grid');
            document.getElementById('shield-list').classList.toggle('hidden', shieldViewMode !== 'list');
            renderShieldChart();
            applySearch();
        });
    });
}

function setupShieldSorting() {
    document.querySelectorAll('[data-sort-key]').forEach(th => {
        th.addEventListener('click', () => {
            const key = th.getAttribute('data-sort-key');
            if (shieldSort.key === key) {
                shieldSort.dir = shieldSort.dir === 'asc' ? 'desc' : 'asc';
            } else {
                shieldSort.key = key;
                shieldSort.dir = (key === 'id' || key === 'name') ? 'asc' : 'desc';
            }
            renderShieldChart();
            applySearch();
        });
    });
}

// ---- Great Hollow crystal finder ----
const GH_ICON = 'img/crystal.png';
const GH_ICON_FALLBACK = "data:image/svg+xml," + encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><path d='M16 2 24 12 20 30H12L8 12Z' fill='#7c8fd6' stroke='#e0e7ff' stroke-width='1.5'/><path d='M16 2v28M8 12h16' stroke='#e0e7ff' stroke-width='.8' opacity='.7'/></svg>");
const ghState = { found: new Set(), selected: null };

function ghIcon(cls) {
    const img = document.createElement('img');
    img.className = cls || '';
    img.alt = 'crystal';
    img.src = GH_ICON;
    img.onerror = () => { img.onerror = null; img.src = GH_ICON_FALLBACK; };
    return img;
}

function ghCandidates() {
    return GH_CONFIGS.filter(c => [...ghState.found].every(i => ghSpots[i].cfg.includes(c)));
}

function renderHollow() {
    const map = document.getElementById('gh-map');
    ghSpots.forEach((sp, i) => {
        const b = document.createElement('button');
        b.className = 'gh-spot';
        b.style.left = sp.x + '%';
        b.style.top = sp.y + '%';
        b.dataset.idx = i;
        b.title = 'Configs ' + sp.cfg.join(' / ') + ' - click to mark found';
        b.appendChild(ghIcon('gh-ico'));
        const pips = document.createElement('span');
        pips.className = 'gh-pips';
        pips.innerHTML = sp.cfg.map(c => `<i class="pip cfg-${c}" data-cfg="${c}">${c}</i>`).join('');
        b.appendChild(pips);
        b.addEventListener('click', () => {
            ghState.found.has(i) ? ghState.found.delete(i) : ghState.found.add(i);
            updateHollow();
        });
        map.appendChild(b);
    });

    const cards = document.getElementById('gh-cards');
    GH_CONFIGS.forEach((c, n) => {
        const spots = ghSpots.map((sp, i) => ({ ...sp, i })).filter(sp => sp.cfg.includes(c));
        const card = document.createElement('div');
        card.className = `gh-card nightlord-card cfg-${c}`;
        card.dataset.cfg = c;
        card.innerHTML = `
            <div class="gh-card-head">
                <i class="pip pip-lg cfg-${c}">${c}</i>
                <span class="text-sm font-bold uppercase tracking-widest text-gray-200">Config ${c}</span>
                <span class="text-[11px] text-gray-500">${spots.length} crystals &middot; key ${n + 1}</span>
                <span class="gh-status"></span>
            </div>
            <div class="gh-card-mini"><div class="gh-mapbox"></div></div>`;
        const mini = card.querySelector('.gh-mapbox');
        spots.forEach(sp => {
            const d = document.createElement('div');
            d.className = 'gh-mini-spot';
            d.dataset.idx = sp.i;
            d.style.left = sp.x + '%';
            d.style.top = sp.y + '%';
            d.appendChild(ghIcon());
            mini.appendChild(d);
        });
        card.addEventListener('click', () => ghSelect(c));
        cards.appendChild(card);
    });

    document.getElementById('gh-reset').addEventListener('click', ghReset);
    document.addEventListener('keydown', e => {
        if (document.getElementById('view-hollow').classList.contains('hidden')) return;
        if (e.target.tagName === 'INPUT') return;
        if (e.key === 'Escape') ghReset();
        const n = parseInt(e.key, 10);
        if (n >= 1 && n <= GH_CONFIGS.length) ghSelect(GH_CONFIGS[n - 1]);
    });
    updateHollow();
}

function ghSelect(c) {
    ghState.selected = ghState.selected === c ? null : c;
    updateHollow();
}

function ghReset() {
    ghState.found.clear();
    ghState.selected = null;
    updateHollow();
}

function updateHollow() {
    const cands = ghCandidates();
    // A manual pick wins; otherwise lock in automatically once the
    // found crystals narrow things down to a single config.
    const active = ghState.selected || (ghState.found.size && cands.length === 1 ? cands[0] : null);

    document.querySelectorAll('#gh-map .gh-spot').forEach(el => {
        const i = +el.dataset.idx, sp = ghSpots[i];
        const found = ghState.found.has(i);
        const inPlay = active ? sp.cfg.includes(active) : sp.cfg.some(c => cands.includes(c));
        el.classList.toggle('found', found);
        el.classList.toggle('dim', !found && !inPlay);
        el.classList.toggle('hot', !!active && sp.cfg.includes(active));
        el.className = el.className.replace(/\bcfg-[A-Z]\b/g, '').trim();
        if (active) el.classList.add('cfg-' + active);
        el.querySelectorAll('.pip').forEach(p => {
            const c = p.dataset.cfg;
            p.classList.toggle('off', active ? c !== active : !cands.includes(c));
        });
    });

    document.querySelectorAll('#gh-cards .gh-card').forEach(card => {
        const c = card.dataset.cfg;
        const out = !cands.includes(c);
        card.classList.toggle('sel', active === c);
        card.classList.toggle('out', out && active !== c);
        card.classList.toggle('match', !out && ghState.found.size > 0 && cands.length === 1);
        const remaining = ghSpots.filter((sp, i) => sp.cfg.includes(c) && !ghState.found.has(i)).length;
        card.querySelector('.gh-status').textContent = out ? 'ruled out'
            : (ghState.found.size && cands.length === 1) ? `match · ${remaining} left`
            : ghState.found.size ? 'possible' : '';
        card.querySelectorAll('.gh-mini-spot').forEach(d => d.classList.toggle('found', ghState.found.has(+d.dataset.idx)));
    });

    const n = ghState.found.size;
    document.getElementById('gh-found-count').textContent = `${n} found`;
}

function setupTabs() {
    document.querySelectorAll('[data-tab]').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');
            document.querySelectorAll('[data-tab]').forEach(b => {
                const on = b === btn;
                b.classList.toggle('bg-[#2a2f3a]', on);
                b.classList.toggle('text-white', on);
                b.classList.toggle('text-gray-500', !on);
            });
            document.getElementById('view-nightlords').classList.toggle('hidden', target !== 'nightlords');
            document.getElementById('view-finder').classList.toggle('hidden', target !== 'finder');
            document.getElementById('view-shields').classList.toggle('hidden', target !== 'shields');
            document.getElementById('view-hollow').classList.toggle('hidden', target !== 'hollow');
            document.getElementById('nl-legend').classList.toggle('hidden', target !== 'nightlords');
            const input = document.getElementById('searchInput');
            input.classList.toggle('hidden', target === 'finder' || target === 'hollow');
            input.placeholder = target === 'shields'
                ? 'Search a shield or value...'
                : 'Search a Nightlord, boss, weakness...';
        });
    });
}

function getElementColor(type) {
    const t = type.toLowerCase();
    if (t.includes('fire')) return 'text-orange-400';
    if (t.includes('holy')) return 'text-amber-100';        // dorado palido
    if (t.includes('lightning')) return 'text-yellow-200';  // amarillo pastel
    if (t.includes('magic')) return 'text-blue-400';
    if (t.includes('sleep')) return 'text-sky-300';         // azul suave
    if (t.includes('poison') || t.includes('venom')) return 'text-green-400';
    if (t.includes('rot')) return 'text-rose-400';
    if (t.includes('madness')) return 'text-orange-300';
    if (t.includes('blood') || t.includes('bleed') || t.includes('dark')) return 'text-red-500';
    if (t.includes('frost')) return 'text-cyan-300';
    return 'text-gray-300'; // Physical o default
}

const COLUMN_ICONS = {
    Standard: 'standard', Slash: 'slash', Strike: 'strike', Pierce: 'pierce',
    Magic: 'magic', Fire: 'fire', Lightning: 'lightning', Holy: 'holy',
    Poison: 'poison', 'Scarlet Rot': 'rot', Bleed: 'bleed',
    Frostbite: 'frost', Madness: 'madness', Sleep: 'sleep'
};

const VARIANT_SHORT = {
    "Gnoster (Moth)": "Moth",
    "Faurtis (Scorpion)": "Scorp",
    "Phase 1": "P1",
    "Phase 2": "P2"
};

function attachNightlordImage(img, name) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    img.onerror = () => {
        img.onerror = null;
        img.src = "data:image/svg+xml," + encodeURIComponent(
            `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><rect width='120' height='120' fill='#2a2e37'/>` +
            `<text x='60' y='72' font-family='sans-serif' font-size='36' fill='#8892b0' text-anchor='middle'>${name.substring(0, 2).toUpperCase()}</text></svg>`);
    };
    img.src = `img/nightlords/${slug}.png`;
}

function weakestElement(variants) {
    const totals = {};
    variants.forEach(v => Object.entries(v.elem).forEach(([k, val]) => { totals[k] = (totals[k] || 0) + val; }));
    let best = null;
    Object.entries(totals).forEach(([k, val]) => {
        if (val < 0 && (best === null || val < totals[best])) best = k;
    });
    return best;
}

function nlCell(key, value, isStatus, mark) {
    const c = isStatus ? statusClasses(value) : negationClasses(value);
    const text = isStatus ? value : fmtNegation(value);
    return `<span class="nl-cell${mark ? ' weakest' : ''} ${c.box} ${c.text}" title="${key}: ${value}">${text}</span>`;
}

function affIcon(key, cls) {
    const aff = COLUMN_ICONS[key];
    return aff ? `<img class="${cls}" data-aff="${aff}" alt="${key}">` : '';
}

function encounterList(title, bosses, dotClass) {
    const items = bosses.length
        ? bosses.map(b => `<div class="nl-enc"><span class="nl-enc-dot ${dotClass}"></span><span>${b}</span></div>`).join('')
        : '<div class="nl-enc text-gray-600 italic">None</div>';
    return `<div class="min-w-0"><div class="nl-enc-h">${title}</div>${items}</div>`;
}

function negationTable(variants, field, isStatus, weakestKey) {
    const keys = Object.keys(variants[0][field]);
    const multi = variants.length > 1;
    const head = keys.map(k => `<th title="${k}">${affIcon(k, 'aff-ico-xs')}</th>`).join('');
    const rows = variants.map(v => {
        const cells = keys.map(k => `<td>${nlCell(k, v[field][k], isStatus, weakestKey && k === weakestKey)}</td>`).join('');
        const lab = multi ? `<td class="rowlab">${VARIANT_SHORT[v.label] || v.label || ''}</td>` : '';
        return `<tr>${lab}${cells}</tr>`;
    }).join('');
    return `<table class="nl-tbl"><thead><tr>${multi ? '<th></th>' : ''}${head}</tr></thead><tbody>${rows}</tbody></table>`;
}

const NAME_LOWER = new Set(['in', 'the', 'of', 'and', 'a']);
function prettyName(name) {
    return name.toLowerCase().split(' ').map((w, i) => {
        if (i > 0 && NAME_LOWER.has(w)) return w;
        return w.charAt(0).toUpperCase() + w.slice(1);
    }).join(' ');
}

function miniChip(label, type) {
    const key = COLUMN_ICONS[type] || null;
    const icon = key
        ? `<img class="aff-ico-xs" data-aff="${key}" alt="${type}">`
        : `<span class="w-2 h-2 rounded-full ${getElementColor(type).replace('text-', 'bg-')}"></span>`;
    return `<span class="nlc-chip"><span class="k">${label}</span>${icon}<span class="${getElementColor(type)}">${type}</span></span>`;
}

function buildNightlordCard(name) {
    const stats = nightlordStats[name] || { weakness: 'Unknown', damage: 'Unknown' };
    const variants = nightlordDamageData[name];
    const nights = scheduleData[name] || { 'Night 1': [], 'Night 2': [] };

    const card = document.createElement('div');
    const encCount = (nights['Night 1'] || []).length + (nights['Night 2'] || []).length;
    card.className = 'nlc nl-item' + (encCount >= 14 ? ' nlc-dense' : '');
    card.setAttribute('data-nl', name);
    card.setAttribute('data-search',
        `${name} ${(nights['Night 1'] || []).join(' ')} ${(nights['Night 2'] || []).join(' ')} ${stats.weakness} ${stats.damage}`.toLowerCase());

    const weakest = variants ? weakestElement(variants) : null;
    const stat = variants
        ? `${negationTable(variants, 'phys', false, null)}
           ${negationTable(variants, 'elem', false, weakest)}
           ${negationTable(variants, 'status', true, null)}`
        : '<div class="text-gray-600 text-[10px] italic py-2">No damage data</div>';

    card.innerHTML = `
        <div class="nlc-head">
            <img class="nlc-por" alt="${name}" loading="lazy">
            <div class="min-w-0">
                <div class="nlc-name">${prettyName(name)}</div>
                <div class="nlc-chips">${miniChip('Weak', stats.weakness)}${miniChip('Deals', stats.damage)}</div>
            </div>
        </div>
        <div class="nlc-stats">${stat}</div>
        <div class="nlc-enc">
            ${encounterList('Night 1', nights['Night 1'] || [], 'bg-indigo-400')}
            ${encounterList('Night 2', nights['Night 2'] || [], 'bg-rose-400')}
        </div>
    `;

    attachNightlordImage(card.querySelector('.nlc-por'), name);
    wireAffinityIcons(card);
    return card;
}

function renderCheatSheet() {
    const wrap = document.getElementById('nl-cards');
    wrap.innerHTML = '';
    Object.keys(scheduleData).forEach(name => wrap.appendChild(buildNightlordCard(name)));
}

function applySearch() {
    const term = document.getElementById('searchInput').value.toLowerCase().trim();

    let visibleCount = 0;
    document.querySelectorAll('.nl-item').forEach(el => {
        const data = el.getAttribute('data-search');
        const show = term === '' || data.includes(term);
        el.style.display = show ? '' : 'none';
        if (show) visibleCount++;
    });
    // Only stretch cards to fill the screen height when there's a full
    // grid of rows; a single row of filtered results should keep its
    // natural height instead of blowing up to fill the leftover space.
    document.getElementById('nl-cards').classList.toggle('nl-cards-compact', visibleCount <= 5);

    document.querySelectorAll('.shield-item').forEach(el => {
        const data = el.getAttribute('data-search');
        el.style.display = (term === '' || data.includes(term)) ? '' : 'none';
    });
}

function setupSearch() {
    document.getElementById('searchInput').addEventListener('input', applySearch);
}

function setupNightlordFinder() {
    const night1Select = document.getElementById('finder-night1');
    const night2Select = document.getElementById('finder-night2');
    const results = document.getElementById('finder-results');

    const night1Bosses = new Set();
    const night2Bosses = new Set();
    Object.values(scheduleData).forEach(nights => {
        nights['Night 1'].forEach(boss => night1Bosses.add(boss));
        nights['Night 2'].forEach(boss => night2Bosses.add(boss));
    });

    const populate = (select, bosses) => {
        [...bosses].sort((a, b) => a.localeCompare(b)).forEach(boss => {
            const option = document.createElement('option');
            option.value = boss;
            option.textContent = boss;
            select.appendChild(option);
        });
    };
    populate(night1Select, night1Bosses);
    populate(night2Select, night2Bosses);

    const renderResults = () => {
        const night1Boss = night1Select.value;
        const night2Boss = night2Select.value;
        results.innerHTML = '';
        const hasSelection = night1Boss !== '' || night2Boss !== '';
        results.classList.toggle('hidden', !hasSelection);
        if (!hasSelection) return;

        Object.entries(scheduleData).forEach(([name, nights]) => {
            if (night1Boss && !nights['Night 1'].includes(night1Boss)) return;
            if (night2Boss && !nights['Night 2'].includes(night2Boss)) return;
            results.appendChild(buildNightlordCard(name));
        });
        if (results.childElementCount === 0) {
            const emptyState = document.createElement('p');
            emptyState.className = 'nl-finder-empty';
            emptyState.textContent = 'No Nightlords match the selected bosses.';
            results.appendChild(emptyState);
        }
    };

    night1Select.addEventListener('change', renderResults);
    night2Select.addEventListener('change', renderResults);
    document.getElementById('finder-clear').addEventListener('click', () => {
        night1Select.value = '';
        night2Select.value = '';
        renderResults();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderCheatSheet();
    renderShieldChart();
    setupShieldSorting();
    setupShieldViewToggle();
    wireAffinityIcons(document);
    resolveRarityBackgrounds();
    renderHollow();
    setupTabs();
    setupSearch();
    setupNightlordFinder();
});
