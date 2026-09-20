/**
 * time.js — pomocnicze funkcje dat i godzin.
 * Bez zależności zewnętrznych, wszystko liczone na Date() urządzenia.
 */

const TimeUtils = (() => {
  /** "17:20" -> 1040 (minuty od północy). Zwraca null dla złego formatu. */
  function toMinutes(hhmm) {
    if (!hhmm) return null;
    const m = /^(\d{1,2}):(\d{2})$/.exec(hhmm.trim());
    if (!m) return null;
    const h = parseInt(m[1], 10);
    const min = parseInt(m[2], 10);
    if (Number.isNaN(h) || Number.isNaN(min)) return null;
    return h * 60 + min;
  }

  function nowMinutes(date = new Date()) {
    return date.getHours() * 60 + date.getMinutes();
  }

  /**
   * Typ dnia wg realnego kalendarza urządzenia.
   * Ten rozkład nie zawiera niedziel ani świąt — zwracamy 'unavailable',
   * żeby interfejs mógł to jawnie powiedzieć zamiast zgadywać.
   */
  function dayTypeForDate(date = new Date()) {
    const day = date.getDay(); // 0 = niedziela, 6 = sobota
    if (day === 0) return "unavailable";
    if (day === 6) return "saturday";
    return "workday";
  }

  const DAY_TYPE_LABEL = {
    workday: "Dzień roboczy",
    saturday: "Sobota",
    unavailable: "Brak danych na ten dzień",
  };

  /** Format "za 6 min" / "za 1 godz 5 min" / "jutro" dla różnicy w minutach. */
  function formatCountdown(diffMinutes) {
    if (diffMinutes <= 0) return "odjeżdża";
    if (diffMinutes < 60) return `za ${diffMinutes} min`;
    const h = Math.floor(diffMinutes / 60);
    const m = diffMinutes % 60;
    if (m === 0) return `za ${h} godz`;
    return `za ${h} godz ${m} min`;
  }

  function formatHM(totalMinutes) {
    const h = Math.floor(totalMinutes / 60) % 24;
    const m = totalMinutes % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  }

  return {
    toMinutes,
    nowMinutes,
    dayTypeForDate,
    DAY_TYPE_LABEL,
    formatCountdown,
    formatHM,
  };
})();
