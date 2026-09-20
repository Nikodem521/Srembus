/**
 * app.js — routing, budowanie indeksu przystanków i renderowanie ekranów.
 * Bez frameworka: stan trzymany w zwykłych obiektach, DOM aktualizowany
 * przez przypisanie innerHTML + delegacja zdarzeń.
 */

(() => {
  "use strict";

  const DATA = window.APP_DATA;
  const view = document.getElementById("view");
  const tabs = document.querySelectorAll(".tabbar button");

  // ---------------------------------------------------------------------
  // Wyszukiwanie odporne na polskie znaki (Pilsudskiego -> Piłsudskiego)
  // ---------------------------------------------------------------------
  const FOLD_MAP = {
    ą: "a", ć: "c", ę: "e", ł: "l", ń: "n", ó: "o", ś: "s", ź: "z", ż: "z",
  };
  function fold(str) {
    return str
      .toLowerCase()
      .replace(/[ąćęłńóśźż]/g, (ch) => FOLD_MAP[ch] || ch);
  }

  // ---------------------------------------------------------------------
  // Indeks przystanków zbudowany z danych: nazwa -> lista miejsc obsługi
  // (linia, kierunek, typ dnia, pozycja w trasie). Budowany raz przy starcie.
  // ---------------------------------------------------------------------
  function buildStopIndex(data) {
    const index = new Map(); // nazwa -> [{ lineId, lineName, dirLabel, dayType, stopIdx, onRequest, trips }]
    for (const line of data.lines) {
      if (!line.hasSchedule) continue;
      for (const dir of line.directions) {
        for (const dayType of Object.keys(dir.schedules)) {
          const schedule = dir.schedules[dayType];
          dir.stops.forEach((stop, stopIdx) => {
            const times = schedule.trips
              .map((t) => t.times[stopIdx])
              .filter((t) => t !== null && t !== undefined);
            if (times.length === 0) return; // przystanek pominięty w obsłudze dla każdego kursu
            const entry = {
              lineId: line.id,
              lineName: line.name,
              dirLabel: dir.label,
              dayType,
              stopIdx,
              onRequest: /nż\.?$/i.test(stop.name),
              trips: schedule.trips,
            };
            if (!index.has(stop.name)) index.set(stop.name, []);
            index.get(stop.name).push(entry);
          });
        }
      }
    }
    return index;
  }

  const STOP_INDEX = buildStopIndex(DATA);
  const ALL_STOP_NAMES = Array.from(STOP_INDEX.keys()).sort((a, b) =>
    a.localeCompare(b, "pl")
  );

  function lineById(id) {
    return DATA.lines.find((l) => l.id === id);
  }

  // ---------------------------------------------------------------------
  // Najbliższy odjazd dla danego wpisu (line+dir+dayType+stopIdx)
  // ---------------------------------------------------------------------
  function nextDepartureFor(entry, nowMin) {
    let best = null;
    entry.trips.forEach((trip) => {
      const raw = trip.times[entry.stopIdx];
      const mins = TimeUtils.toMinutes(raw);
      if (mins === null) return;
      if (mins >= nowMin && (best === null || mins < best.mins)) {
        best = { mins, raw };
      }
    });
    return best; // null jeśli żaden kurs już dziś nie obsługuje przystanku
  }

  // ---------------------------------------------------------------------
  // Router
  // ---------------------------------------------------------------------
  function currentRoute() {
    const hash = location.hash || "#/";
    const parts = hash.replace(/^#\//, "").split("/").filter(Boolean);
    return { name: parts[0] || "home", param: parts[1] ? decodeURIComponent(parts[1]) : null };
  }

  function navigate(hash) {
    location.hash = hash;
  }

  function render() {
    const route = currentRoute();
    updateTabbar(route.name);
    if (route.name === "home") return renderHome();
    if (route.name === "stop") return renderStop(route.param);
    if (route.name === "line") return renderLine(route.param);
    if (route.name === "lines") return renderLines();
    if (route.name === "settings") return renderSettings();
    return renderHome();
  }

  function updateTabbar(routeName) {
    const map = { home: "home", lines: "lines", settings: "settings" };
    tabs.forEach((btn) => {
      btn.classList.toggle("is-active", map[routeName] === btn.dataset.tab);
    });
  }

  window.addEventListener("hashchange", render);

  // ---------------------------------------------------------------------
  // Wspólne fragmenty UI
  // ---------------------------------------------------------------------
  function iconHeart(filled) {
    return filled
      ? `<svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M12 21s-7.5-4.6-10-9.1C.4 8.6 2 5 5.6 5c2 0 3.4 1 4.4 2.4C11 6 12.4 5 14.4 5 18 5 19.6 8.6 22 11.9 19.5 16.4 12 21 12 21z"/></svg>`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="22" height="22"><path d="M12 21s-7.5-4.6-10-9.1C.4 8.6 2 5 5.6 5c2 0 3.4 1 4.4 2.4C11 6 12.4 5 14.4 5 18 5 19.6 8.6 22 11.9 19.5 16.4 12 21 12 21z"/></svg>`;
  }
  const iconBack = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><path d="M15 5l-7 7 7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const iconSearch = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="18" height="18"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3" stroke-linecap="round"/></svg>`;
  const iconChevron = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const iconSwap = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="20" height="20"><path d="M7 4v13M7 17l-3-3M7 17l3-3M17 20V7M17 7l-3 3M17 7l3 3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  function header(title, { back = false, fav = null } = {}) {
    return `
      <header class="topbar">
        ${back ? `<button class="icon-btn" data-action="back" aria-label="Wstecz">${iconBack}</button>` : `<span class="topbar-spacer"></span>`}
        <h1>${title}</h1>
        ${
          fav !== null
            ? `<button class="icon-btn fav-btn ${fav ? "is-fav" : ""}" data-action="toggle-fav" aria-label="Ulubiony przystanek">${iconHeart(fav)}</button>`
            : `<span class="topbar-spacer"></span>`
        }
      </header>`;
  }

  function dayTypeSwitcher(active, available) {
    const options = [
      { key: "workday", label: "Dni robocze" },
      { key: "saturday", label: "Sobota" },
    ].filter((o) => available.includes(o.key));
    if (options.length < 2) return "";
    return `
      <div class="segmented" role="tablist" aria-label="Wybór dnia">
        ${options
          .map(
            (o) => `
          <button role="tab" class="${o.key === active ? "is-active" : ""}"
                  data-action="set-daytype" data-daytype="${o.key}"
                  aria-selected="${o.key === active}">${o.label}</button>`
          )
          .join("")}
      </div>`;
  }

  function emptyState(title, body, cta) {
    return `
      <div class="empty-state">
        <p class="empty-title">${title}</p>
        <p class="empty-body">${body}</p>
        ${cta || ""}
      </div>`;
  }

  // ---------------------------------------------------------------------
  // Ekran: Start
  // ---------------------------------------------------------------------
  let homeQuery = "";
  let homeToQuery = "";
  let homeConnDayType = null;

  function renderHome() {
    const favs = Storage.getFavorites();
    const recents = Storage.getRecents().filter((n) => !favs.includes(n));

    view.innerHTML = `
      <header class="topbar topbar--brand">
        <h1>Śremskie autobusy</h1>
      </header>
      <div class="search-wrap">
        <span class="search-icon">${iconSearch}</span>
        <input id="from-search" type="search" inputmode="search" autocomplete="off"
               placeholder="Skąd jedziesz?" value="${escapeAttr(homeQuery)}"
               aria-label="Skąd jedziesz">
      </div>
      <div class="search-wrap search-wrap--to">
        <span class="search-icon">${iconSearch}</span>
        <input id="to-search" type="search" inputmode="search" autocomplete="off"
               placeholder="Dokąd jedziesz? (opcjonalnie)" value="${escapeAttr(homeToQuery)}"
               aria-label="Dokąd jedziesz">
      </div>
      <div id="home-results">${renderHomeResults(favs, recents)}</div>
    `;

    document.getElementById("from-search").addEventListener("input", (e) => {
      homeQuery = e.target.value;
      refreshHomeResults();
    });
    document.getElementById("to-search").addEventListener("input", (e) => {
      homeToQuery = e.target.value;
      refreshHomeResults();
    });
    // Nie chwytamy fokusu automatycznie — na iOS wywołałoby to klawiaturę
    // natychmiast po wejściu, co bywa irytujące przy szybkim zerknięciu na ulubione.
  }

  function refreshHomeResults() {
    const favs = Storage.getFavorites();
    const recents = Storage.getRecents().filter((n) => !favs.includes(n));
    document.getElementById("home-results").innerHTML = renderHomeResults(favs, recents);
  }

  function renderHomeResults(favs, recents) {
    // Dopóki pole "Dokąd" jest puste, wszystko działa dokładnie jak wcześniej:
    // wyszukiwanie jednego przystanku, dotknięcie od razu pokazuje jego rozkład.
    if (homeToQuery.trim() === "") {
      return homeQuery ? renderSearchResults(homeQuery) : renderBrowseSections(favs, recents);
    }
    // Od momentu, gdy w polu "Dokąd" pojawi się choć jeden znak, oba pola
    // służą do wybrania pary przystanków — dotknięcie podpowiedzi tylko
    // wypełnia pole, aż oba będą dokładnymi nazwami przystanków.
    const fromExact = ALL_STOP_NAMES.includes(homeQuery);
    if (!fromExact) {
      return renderPickList(homeQuery, "from", "Wybierz przystanek początkowy");
    }
    const toExact = ALL_STOP_NAMES.includes(homeToQuery);
    if (!toExact) {
      return renderPickList(homeToQuery, "to", "Wybierz przystanek docelowy");
    }
    if (homeQuery === homeToQuery) {
      return emptyState("To ten sam przystanek", "Wybierz dwa różne przystanki, żeby zobaczyć połączenia.");
    }
    return renderConnections(homeQuery, homeToQuery);
  }

  function renderPickList(query, field, title) {
    const q = fold(query.trim());
    const matches = ALL_STOP_NAMES.filter((name) => fold(name).includes(q));
    if (matches.length === 0) {
      return emptyState(`Nie znaleziono „${escapeHtml(query)}”`, "Sprawdź pisownię przystanku.");
    }
    return section(title, matches.map((n) => selectRow(n, field)).join(""));
  }

  function selectRow(name, field) {
    return `
      <button class="list-row" data-action="select-stop" data-field="${field}" data-name="${escapeAttr(name)}">
        <span class="list-row-main">${escapeHtml(name)}</span>
      </button>`;
  }

  // ---------------------------------------------------------------------
  // Połączenia bezpośrednie Skąd → Dokąd (bez przesiadek — tyle da się
  // wyliczyć wprost z rozkładów poszczególnych linii).
  // ---------------------------------------------------------------------
  function findDirectConnections(fromName, toName) {
    const results = [];
    for (const line of DATA.lines) {
      if (!line.hasSchedule) continue;
      for (const dir of line.directions) {
        const fromIdxs = [];
        const toIdxs = [];
        dir.stops.forEach((s, i) => {
          if (s.name === fromName) fromIdxs.push(i);
          if (s.name === toName) toIdxs.push(i);
        });
        if (!fromIdxs.length || !toIdxs.length) continue;
        for (const dayType of Object.keys(dir.schedules)) {
          dir.schedules[dayType].trips.forEach((trip) => {
            for (const fi of fromIdxs) {
              const depTime = trip.times[fi];
              if (depTime === null) continue;
              const ti = toIdxs.find((idx) => idx > fi && trip.times[idx] !== null);
              if (ti !== undefined) {
                results.push({
                  lineId: line.id, lineName: line.name, dirLabel: dir.label, dayType,
                  dep: depTime, arr: trip.times[ti],
                });
              }
              break; // wsiadamy przy pierwszej dostępnej okazji tego kursu
            }
          });
        }
      }
    }
    return results;
  }

  function renderConnections(fromName, toName) {
    const today = TimeUtils.dayTypeForDate();
    const conns = findDirectConnections(fromName, toName);
    const availableDayTypes = Array.from(new Set(conns.map((c) => c.dayType)));
    if (!homeConnDayType || !availableDayTypes.includes(homeConnDayType)) {
      homeConnDayType = availableDayTypes.includes(today) ? today : availableDayTypes[0];
    }
    const dayConns = conns.filter((c) => c.dayType === homeConnDayType);
    const nowMin = TimeUtils.nowMinutes();
    const isToday = homeConnDayType === today;

    const withTimes = dayConns
      .map((c) => ({ c, mins: TimeUtils.toMinutes(c.dep) }))
      .sort((a, b) => a.mins - b.mins);
    const heroItem = isToday ? withTimes.find((x) => x.mins >= nowMin) : null;

    return `
      <div class="conn-header">
        <span>${escapeHtml(fromName)}</span>
        <span class="conn-arrow">→</span>
        <span>${escapeHtml(toName)}</span>
        <button class="icon-btn" data-action="swap-stops" aria-label="Zamień kierunek">${iconSwap}</button>
      </div>
      ${today === "unavailable" ? unavailableBanner() : ""}
      ${dayTypeSwitcher(homeConnDayType, availableDayTypes.length ? availableDayTypes : ["workday"])}
      ${
        conns.length === 0
          ? emptyState(
              "Brak bezpośredniego połączenia",
              "Żadna linia w tym rozkładzie nie jedzie wprost między tymi przystankami — może być potrzebna przesiadka. Sprawdź oba przystanki osobno."
            )
          : withTimes.length === 0
          ? emptyState("Brak kolejnych kursów dziś", "Wybierz inny dzień powyżej albo sprawdź przystanki osobno.")
          : `
        ${heroItem ? connHero(heroItem.c, heroItem.mins) : ""}
        <div class="section">
          <h2 class="section-title">Wszystkie połączenia</h2>
          <div class="list">
            ${withTimes.map(({ c, mins }) => connRow(c, mins, isToday, nowMin)).join("")}
          </div>
        </div>`
      }
    `;
  }

  function connHero(c, mins) {
    const diff = mins - TimeUtils.nowMinutes();
    return `
      <button class="hero-card" data-action="go" data-href="#/line/${c.lineId}">
        <span class="hero-label">Najbliższe połączenie</span>
        <div class="hero-row">
          <span class="hero-line">${escapeHtml(c.lineName)}</span>
          <span class="hero-time">${c.dep} → ${c.arr}</span>
        </div>
        <div class="hero-row">
          <span class="hero-dir">${escapeHtml(c.dirLabel)}</span>
          <span class="hero-countdown">${TimeUtils.formatCountdown(diff)}</span>
        </div>
      </button>`;
  }

  function connRow(c, mins, isToday, nowMin) {
    const isPast = isToday && mins < nowMin;
    return `
      <button class="list-row list-row--stack ${isPast ? "is-muted" : ""}" data-action="go" data-href="#/line/${c.lineId}">
        <div class="list-row-top">
          <span class="list-row-main">${escapeHtml(c.lineName)}</span>
          <span class="conn-times">${c.dep} → ${c.arr}</span>
        </div>
        <div class="list-row-sub">${escapeHtml(c.dirLabel)}</div>
      </button>`;
  }

  function renderBrowseSections(favs, recents) {
    const favSection = favs.length
      ? section("Ulubione przystanki", favs.map(stopRow).join(""))
      : "";
    const recentSection = recents.length
      ? section("Ostatnio wyszukiwane", recents.map(stopRow).join(""))
      : "";
    const nothingYet = !favs.length && !recents.length;

    return `
      ${favSection}
      ${recentSection}
      ${
        nothingYet
          ? emptyState(
              "Zacznij od wyszukania przystanku",
              "Np. „Farna” albo „Piłsudskiego”. Ulubione i ostatnio sprawdzane przystanki pojawią się tutaj."
            )
          : ""
      }
      <div class="section">
        <button class="list-row list-row--link" data-action="go" data-href="#/lines">
          <span>Wszystkie linie</span>
          <span class="chev">${iconChevron}</span>
        </button>
      </div>
    `;
  }

  function renderSearchResults(query) {
    const q = fold(query.trim());
    const matches = ALL_STOP_NAMES.filter((name) => fold(name).includes(q));
    if (matches.length === 0) {
      return emptyState(
        `Nie znaleziono „${escapeHtml(query)}”`,
        "Sprawdź pisownię albo przejrzyj rozkład po liniach.",
        `<button class="btn-secondary" data-action="go" data-href="#/lines">Wszystkie linie</button>`
      );
    }
    return section(`Przystanki (${matches.length})`, matches.map(stopRow).join(""));
  }

  function section(title, innerHtml) {
    return `
      <div class="section">
        <h2 class="section-title">${title}</h2>
        <div class="list">${innerHtml}</div>
      </div>`;
  }

  function stopRow(name) {
    const isFav = Storage.isFavorite(name);
    return `
      <button class="list-row" data-action="go" data-href="#/stop/${encodeURIComponent(name)}">
        <span class="list-row-main">${escapeHtml(name)}</span>
        ${isFav ? `<span class="row-heart">${iconHeart(true)}</span>` : ""}
      </button>`;
  }

  // ---------------------------------------------------------------------
  // Ekran: Przystanek
  // ---------------------------------------------------------------------
  let stopDayType = null;

  function renderStop(name) {
    const entries = STOP_INDEX.get(name);
    if (!entries) {
      view.innerHTML =
        header("Przystanek", { back: true }) +
        emptyState("Nie znamy tego przystanku", "Wróć do wyszukiwania i spróbuj ponownie.");
      return;
    }
    Storage.pushRecent(name);

    const today = TimeUtils.dayTypeForDate();
    const availableDayTypes = Array.from(new Set(entries.map((e) => e.dayType)));
    if (!stopDayType || !availableDayTypes.includes(stopDayType)) {
      stopDayType = availableDayTypes.includes(today) ? today : availableDayTypes[0];
    }

    const dayEntries = entries.filter((e) => e.dayType === stopDayType);
    const nowMin = TimeUtils.nowMinutes();
    const isToday = stopDayType === today;

    const withNext = dayEntries
      .map((e) => ({ e, next: isToday ? nextDepartureFor(e, nowMin) : nextDepartureFor(e, -1) }))
      .sort((a, b) => {
        if (a.next && b.next) return a.next.mins - b.next.mins;
        if (a.next) return -1;
        if (b.next) return 1;
        return a.e.lineName.localeCompare(b.e.lineName, "pl", { numeric: true });
      });

    const heroEntry = isToday ? withNext.find((x) => x.next) : null;

    view.innerHTML = `
      ${header(escapeHtml(name), { back: true, fav: Storage.isFavorite(name) })}
      ${today === "unavailable" ? unavailableBanner() : ""}
      ${dayTypeSwitcher(stopDayType, availableDayTypes)}
      ${
        heroEntry
          ? heroCard(heroEntry.e, heroEntry.next)
          : isToday
          ? emptyState("Brak kolejnych odjazdów dziś", "Sprawdź jutrzejszy typ dnia albo inny przystanek.")
          : ""
      }
      <div class="section">
        <h2 class="section-title">Linie z tego przystanku</h2>
        <div class="list">
          ${withNext
            .map(({ e, next }) => lineFromStopRow(e, next, isToday))
            .join("")}
        </div>
      </div>
    `;
  }

  function unavailableBanner() {
    return `<div class="banner">Ten rozkład nie zawiera kursów na niedziele ani święta.</div>`;
  }

  function heroCard(entry, next) {
    const diff = next.mins - TimeUtils.nowMinutes();
    return `
      <button class="hero-card" data-action="go" data-href="#/line/${entry.lineId}">
        <span class="hero-label">Najbliższy odjazd</span>
        <div class="hero-row">
          <span class="hero-line">${escapeHtml(entry.lineName)}</span>
          <span class="hero-time">${next.raw}</span>
        </div>
        <div class="hero-row">
          <span class="hero-dir">${escapeHtml(entry.dirLabel)}</span>
          <span class="hero-countdown">${TimeUtils.formatCountdown(diff)}</span>
        </div>
      </button>`;
  }

  function lineFromStopRow(entry, next, isToday) {
    const times = entry.trips
      .map((t) => t.times[entry.stopIdx])
      .filter((t) => t !== null);
    const nowMin = TimeUtils.nowMinutes();
    const chips = times
      .map((t) => {
        const mins = TimeUtils.toMinutes(t);
        const isPast = isToday && mins < nowMin;
        const isNext = isToday && next && t === next.raw;
        return `<span class="chip ${isPast ? "chip--past" : ""} ${isNext ? "chip--next" : ""}">${t}</span>`;
      })
      .join("");
    return `
      <button class="list-row list-row--stack" data-action="go" data-href="#/line/${entry.lineId}">
        <div class="list-row-top">
          <span class="list-row-main">${escapeHtml(entry.lineName)}</span>
          ${entry.onRequest ? `<span class="tag">na żądanie</span>` : ""}
        </div>
        <div class="list-row-sub">${escapeHtml(entry.dirLabel)}</div>
        <div class="chip-row">${chips}</div>
      </button>`;
  }

  // ---------------------------------------------------------------------
  // Ekran: Linia
  // ---------------------------------------------------------------------
  let lineDayType = null;
  let lineDirIdx = 0;

  function renderLine(id) {
    const line = lineById(id);
    if (!line) {
      view.innerHTML = header("Linia", { back: true }) + emptyState("Nie znaleziono linii", "");
      return;
    }
    if (!line.hasSchedule) {
      view.innerHTML =
        header(line.name, { back: true }) +
        emptyState(
          "Rozkład w przygotowaniu",
          "Dane tej linii zostaną uzupełnione w kolejnym etapie prac, na podstawie tego samego źródłowego PDF-u."
        );
      return;
    }

    if (lineDirIdx >= line.directions.length) lineDirIdx = 0;
    const dir = line.directions[lineDirIdx];
    const today = TimeUtils.dayTypeForDate();
    const availableDayTypes = Object.keys(dir.schedules);
    if (!lineDayType || !availableDayTypes.includes(lineDayType)) {
      lineDayType = availableDayTypes.includes(today) ? today : availableDayTypes[0];
    }
    const isToday = lineDayType === today;
    const schedule = dir.schedules[lineDayType];
    const nowMin = TimeUtils.nowMinutes();

    // najbliższy kurs (kolumna) dla podświetlenia całej kolumny
    let nextTripIdx = -1;
    if (isToday) {
      let bestStart = Infinity;
      schedule.trips.forEach((trip, i) => {
        const firstReal = trip.times.find((t) => t !== null);
        const mins = TimeUtils.toMinutes(firstReal);
        // kolumnę uznajemy za "nadchodzącą", jeśli którykolwiek jej przystanek jest jeszcze przed nami
        const anyUpcoming = trip.times.some((t) => {
          const m = TimeUtils.toMinutes(t);
          return m !== null && m >= nowMin;
        });
        if (anyUpcoming && mins !== null && mins < bestStart) {
          bestStart = mins;
          nextTripIdx = i;
        }
      });
    }

    const dirSwitcher =
      line.directions.length > 1
        ? `<div class="segmented" role="tablist" aria-label="Kierunek">
            ${line.directions
              .map(
                (d, i) => `
              <button role="tab" class="${i === lineDirIdx ? "is-active" : ""}"
                      data-action="set-dir" data-dir="${i}" aria-selected="${i === lineDirIdx}">
                ${escapeHtml(d.label)}
              </button>`
              )
              .join("")}
          </div>`
        : `<p class="route-label">${escapeHtml(dir.label)}</p>`;

    view.innerHTML = `
      ${header(line.name, { back: true })}
      ${today === "unavailable" ? unavailableBanner() : ""}
      ${dirSwitcher}
      ${dayTypeSwitcher(lineDayType, availableDayTypes)}
      <div class="table-scroll">
        <table class="timetable">
          <thead>
            <tr><th class="stopcol">Przystanek</th>
              ${schedule.trips.map((_, i) => `<th class="${i === nextTripIdx ? "is-next" : ""}">${i + 1}${schedule.trips[i].note ? "*" : ""}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${dir.stops
              .map((stop, stopIdx) => {
                const onReq = /nż\.?$/i.test(stop.name);
                return `
                <tr>
                  <th class="stopcol" scope="row">
                    <button class="stop-link" data-action="go" data-href="#/stop/${encodeURIComponent(stop.name)}">
                      ${escapeHtml(stop.name)}${onReq ? ` <span class="tag tag--sm">nż.</span>` : ""}
                    </button>
                  </th>
                  ${schedule.trips
                    .map((trip, tripIdx) => {
                      const t = trip.times[stopIdx];
                      const mins = TimeUtils.toMinutes(t);
                      const isPast = isToday && mins !== null && mins < nowMin;
                      const cls = [
                        tripIdx === nextTripIdx ? "is-next" : "",
                        isPast ? "is-past" : "",
                        t === null ? "is-empty" : "",
                      ]
                        .filter(Boolean)
                        .join(" ");
                      return `<td class="${cls}">${t || "–"}</td>`;
                    })
                    .join("")}
                </tr>`;
              })
              .join("")}
          </tbody>
        </table>
      </div>
      <p class="footnote">„–” oznacza kurs, który nie obsługuje danego przystanku (w tym przystanki oficjalnie pominięte w obsłudze zgodnie z rozkładem źródłowym).</p>
      ${schedule.trips.some((t) => t.note) ? `<p class="footnote">${schedule.trips.map((t, i) => (t.note ? `* kurs ${i + 1}: ${escapeHtml(t.note)}` : "")).filter(Boolean).join("<br>")}</p>` : ""}
    `;
  }

  // ---------------------------------------------------------------------
  // Ekran: Wszystkie linie
  // ---------------------------------------------------------------------
  function renderLines() {
    view.innerHTML = `
      ${header("Wszystkie linie")}
      <div class="section">
        <div class="list">
          ${DATA.lines
            .map(
              (line) => `
            <button class="list-row" data-action="go" data-href="#/line/${line.id}">
              <span class="list-row-main">${escapeHtml(line.name)}</span>
              ${
                line.hasSchedule
                  ? `<span class="chev">${iconChevron}</span>`
                  : `<span class="tag">wkrótce</span>`
              }
            </button>`
            )
            .join("")}
        </div>
      </div>
    `;
  }

  // ---------------------------------------------------------------------
  // Ekran: Ustawienia
  // ---------------------------------------------------------------------
  function renderSettings() {
    const theme = Storage.getTheme();
    view.innerHTML = `
      ${header("Ustawienia")}
      <div class="section">
        <h2 class="section-title">Wygląd</h2>
        <div class="segmented segmented--full" role="tablist" aria-label="Motyw">
          ${[
            { key: "system", label: "System" },
            { key: "light", label: "Jasny" },
            { key: "dark", label: "Ciemny" },
          ]
            .map(
              (o) => `
            <button role="tab" class="${o.key === theme ? "is-active" : ""}"
                    data-action="set-theme" data-theme="${o.key}" aria-selected="${o.key === theme}">
              ${o.label}
            </button>`
            )
            .join("")}
        </div>
      </div>
      <div class="section">
        <h2 class="section-title">O rozkładzie</h2>
        <div class="info-card">
          <div class="info-row"><span>Źródło danych</span><span>${escapeHtml(DATA.meta.source)}</span></div>
          <div class="info-row"><span>Rozkład ważny od</span><span>${formatDate(DATA.meta.validFrom)}</span></div>
          <div class="info-row"><span>Dane przygotowano</span><span>${formatDate(DATA.meta.preparedAt)}</span></div>
        </div>
        <p class="footnote">${escapeHtml(DATA.meta.note)}</p>
      </div>
      <div class="section">
        <button class="btn-secondary btn-full" data-action="clear-data">Wyczyść ulubione i historię</button>
      </div>
    `;
  }

  function formatDate(iso) {
    const [y, m, d] = iso.split("-");
    return `${d}.${m}.${y}`;
  }

  // ---------------------------------------------------------------------
  // Motyw
  // ---------------------------------------------------------------------
  function applyTheme() {
    const theme = Storage.getTheme();
    if (theme === "system") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }

  // ---------------------------------------------------------------------
  // Delegacja zdarzeń
  // ---------------------------------------------------------------------
  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-action]");
    if (!el) return;
    const action = el.dataset.action;

    if (action === "go") navigate(el.dataset.href);
    else if (action === "back") {
      if (history.length > 1) history.back();
      else navigate("#/");
    } else if (action === "toggle-fav") {
      const name = currentRoute().param;
      const nowFav = Storage.toggleFavorite(name);
      el.classList.toggle("is-fav", nowFav);
      el.innerHTML = iconHeart(nowFav);
    } else if (action === "set-daytype") {
      const route = currentRoute();
      if (route.name === "stop") stopDayType = el.dataset.daytype;
      else if (route.name === "home") homeConnDayType = el.dataset.daytype;
      else lineDayType = el.dataset.daytype;
      render();
    } else if (action === "select-stop") {
      if (el.dataset.field === "from") homeQuery = el.dataset.name;
      else homeToQuery = el.dataset.name;
      render();
    } else if (action === "swap-stops") {
      const tmp = homeQuery;
      homeQuery = homeToQuery;
      homeToQuery = tmp;
      render();
    } else if (action === "set-dir") {
      lineDirIdx = parseInt(el.dataset.dir, 10);
      render();
    } else if (action === "set-theme") {
      Storage.setTheme(el.dataset.theme);
      applyTheme();
      render();
    } else if (action === "clear-data") {
      if (confirm("Usunąć ulubione przystanki i historię wyszukiwania?")) {
        localStorage.clear();
        render();
      }
    }
  });

  tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = { home: "#/", lines: "#/lines", settings: "#/settings" }[btn.dataset.tab];
      navigate(target);
    });
  });

  // ---------------------------------------------------------------------
  // Utils
  // ---------------------------------------------------------------------
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }
  function escapeAttr(str) {
    return escapeHtml(str);
  }

  // ---------------------------------------------------------------------
  // Start
  // ---------------------------------------------------------------------
  applyTheme();
  if (!location.hash) location.hash = "#/";
  render();
  // Odświeżaj "najbliższy odjazd" co 30 sekund, żeby liczniki nie stały w miejscu.
  setInterval(render, 30000);

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {
        /* offline po pierwszym otwarciu wciąż zadziała dzięki cache przeglądarki */
      });
    });
  }
})();
