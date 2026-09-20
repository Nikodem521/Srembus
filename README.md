# Śremskie autobusy — PWA (Etap 4/6 ukończony)

Rozkład jazdy autobusów w Śremie jako aplikacja webowa, zaprojektowana pod
iPhone/Safari, do zainstalowania na ekranie głównym (PWA).

## Jak uruchomić lokalnie

PWA (manifest + service worker) wymaga serwera HTTP — samo otwarcie
`index.html` z dysku (`file://`) w niektórych przeglądarkach nie uruchomi
service workera. Najprościej:

```bash
cd srem-bus
python3 -m http.server 8080
```

Potem otwórz `http://localhost:8080` na komputerze, albo (żeby przetestować
na iPhonie w tej samej sieci Wi-Fi) `http://ADRES-IP-KOMPUTERA:8080` w Safari
na telefonie — adres IP komputera sprawdzisz np. przez `ifconfig` / `ipconfig`.

Jeśli masz zainstalowany Node.js, zadziała też:
```bash
npx serve srem-bus
```

## Dodanie do ekranu głównego na iPhonie

1. Otwórz adres aplikacji w **Safari** (musi być Safari, nie inna przeglądarka).
2. Stuknij ikonę udostępniania (kwadrat ze strzałką w górę).
3. Wybierz **„Dodaj do ekranu początkowego”**.

Od tej pory aplikacja otwiera się bez paska adresu, jak natywna aplikacja.

## Status danych

**Wszystkie 18 linii wpisane i zweryfikowane** względem `Rozkład_Jazdy.pdf`, łącznie z:
- przystankami oficjalnie „pominiętymi w obsłudze” (przekreślone w oryginale — patrz Etap 1),
- przystankami na żądanie („nż.”),
- kursem sezonowym w Linii 7 (1 maja – 31 października), oznaczonym gwiazdką w tabeli,
- wariantami sobotnimi tam, gdzie faktycznie występują w PDF-ie (linie 1, 2, 7, 12).

Każda linia i kierunek przeszły automatyczną weryfikację: liczba godzin w każdym
kursie zgadza się z liczbą przystanków, a godziny rosną monotonicznie wzdłuż
trasy — to złapało już jeden błąd transkrypcji przy pierwszym wpisywaniu danych.

Ten rozkład **nie zawiera niedziel ani świąt** — PDF źródłowy ich nie
definiuje, więc aplikacja jawnie to komunikuje zamiast zgadywać.

## Co dalej (Etap 6 — opcjonalny)

Wygląd i UX są już dopracowane pod iOS (patrz Etapy 2–3). Jeśli po realnym
użytkowaniu na telefonie coś wymaga poprawki — konkretne miejsce w interfejsie,
literówka w nazwie przystanku, dodatkowa funkcja — to naturalny moment, żeby
to zgłosić.

## Struktura projektu

```
index.html          — szkielet aplikacji (ekrany renderowane w JS)
manifest.json        — manifest PWA
sw.js                — service worker (cache powłoki aplikacji offline)
css/styles.css        — cały wygląd (jasny/ciemny motyw, layout)
js/data.js           — DANE rozkładu — jedyny plik do podmiany przy aktualizacji
js/time.js           — obliczenia godzin/najbliższych odjazdów
js/storage.js        — ulubione, historia, motyw (localStorage)
js/app.js            — routing i renderowanie ekranów
icons/               — ikony aplikacji (wygenerowane, motyw autobusu)
```

## Znane ograniczenia Safari/iOS (uczciwie, bez obiecywania więcej)

- Offline działa dzięki cache serwis-workera, ale iOS może wyczyścić ten
  cache po ok. 7 dniach bez odwiedzin strony — to wygoda, nie gwarancja.
- Brak prawdziwego API — wszystkie dane są statyczne, wpisane w `js/data.js`,
  zgodnie z briefem (bez udawania danych na żywo).
