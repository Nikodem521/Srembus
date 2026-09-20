/**
 * storage.js — trwałe preferencje użytkownika w localStorage.
 * Każdy odczyt/zapis jest opakowany w try/catch: Safari w trybie
 * prywatnym potrafi rzucić wyjątek przy zapisie, a wtedy aplikacja
 * ma dalej działać, tylko bez zapamiętywania.
 */

const Storage = (() => {
  const KEYS = {
    favorites: "srem-bus:favorites",
    recents: "srem-bus:recents",
    theme: "srem-bus:theme",
  };

  const MAX_RECENTS = 8;

  function safeGet(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function safeSet(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  }

  // ---- Ulubione przystanki (lista nazw) ----
  function getFavorites() {
    return safeGet(KEYS.favorites, []);
  }

  function isFavorite(stopName) {
    return getFavorites().includes(stopName);
  }

  function toggleFavorite(stopName) {
    const favs = getFavorites();
    const idx = favs.indexOf(stopName);
    if (idx === -1) {
      favs.unshift(stopName);
    } else {
      favs.splice(idx, 1);
    }
    safeSet(KEYS.favorites, favs);
    return favs.includes(stopName);
  }

  // ---- Ostatnio używane przystanki ----
  function getRecents() {
    return safeGet(KEYS.recents, []);
  }

  function pushRecent(stopName) {
    let recents = getRecents().filter((n) => n !== stopName);
    recents.unshift(stopName);
    recents = recents.slice(0, MAX_RECENTS);
    safeSet(KEYS.recents, recents);
  }

  // ---- Motyw: 'system' | 'light' | 'dark' ----
  function getTheme() {
    return safeGet(KEYS.theme, "system");
  }

  function setTheme(theme) {
    safeSet(KEYS.theme, theme);
  }

  return {
    getFavorites,
    isFavorite,
    toggleFavorite,
    getRecents,
    pushRecent,
    getTheme,
    setTheme,
  };
})();
