/**
 * data.js — dane rozkładu jazdy, oddzielone od logiki interfejsu.
 *
 * Jak działa null: każda komórka w tablicy `times` to albo "HH:MM",
 * albo null. null oznacza dwie rzeczy z oryginalnego PDF-u, których
 * pasażer i tak nie odróżni: (a) kurs w ogóle nie obsługuje tego
 * przystanku (w PDF: "-"), (b) przystanek jest oficjalnie "pominięty
 * w obsłudze" dla tego kursu — czyli przekreślony w PDF zgodnie
 * z legendą na str. 14 (autobus tamtędy przejeżdża, ale nie
 * zatrzymuje się dla pasażerów). W obu przypadkach: nie da się stąd
 * odjechać tym kursem.
 *
 * hasSchedule: false → linia jest już na liście (Etap 2), ale jej
 * godziny nie zostały jeszcze wpisane (Etap 4). Interfejs pokazuje
 * to jawnie zamiast zmyślać godziny.
 */

window.APP_DATA = {
  meta: {
    source: "Rozkład_Jazdy.pdf (Śrem)",
    validFrom: "2026-07-30",
    preparedAt: "2026-09-16",
    note:
      "Etap 4/6: wszystkie 18 linii wpisane i zweryfikowane z PDF-u źródłowego, łącznie z przystankami pominiętymi w obsłudze.",
  },

  lines: [
    // ---------------------------------------------------------------
    // LINIA 1 — w pełni zweryfikowana, wraz z przystankami pominiętymi
    // w obsłudze (patrz legenda PDF, str. 14).
    // ---------------------------------------------------------------
    {
      id: "1",
      name: "Linia 1",
      hasSchedule: true,
      directions: [
        {
          id: "1-a",
          label: "Farna → Piłsudskiego",
          stops: [
            { name: "Farna" },
            { name: "Stary Rynek" },
            { name: "Piłsudskiego" },
            { name: "Kilińskiego I" },
            { name: "Sikorskiego" },
            { name: "Al. Solidarności I" },
            { name: "Al. Solidarności II" },
            { name: "Kilińskiego III" },
            { name: "Chłapowskiego I" },
            { name: "Chłapowskiego II" },
            { name: "Staszica I" },
            { name: "Gostyńska I" },
            { name: "Mickiewicza III" },
            { name: "Mickiewicza II" },
            { name: "Mickiewicza I" },
            { name: "Piłsudskiego" },
          ],
          schedules: {
            workday: {
              trips: [
                { times: [null, null, null, "05:37", "05:38", "05:39", "05:41", "05:44", "05:46", "05:48", "05:50", "05:52", "05:54", "05:55", "05:57", "05:59"] },
                { times: [null, null, null, "07:47", "07:48", "07:49", "07:51", "07:54", "07:56", "07:58", "08:00", "08:02", "08:04", "08:05", "08:07", "08:09"] },
                { times: [null, null, null, "08:17", "08:18", "08:19", "08:21", "08:24", "08:26", "08:28", "08:30", "08:32", "08:34", "08:35", "08:37", "08:39"] },
                { times: [null, null, null, "10:27", "10:28", "10:29", "10:31", "10:34", "10:36", "10:38", "10:40", "10:42", "10:44", "10:45", "10:47", "10:49"] },
                { times: [null, null, null, "12:42", "12:43", "12:44", "12:46", "12:49", "12:51", "12:53", "12:55", "12:57", "12:59", "13:00", "13:02", null] },
                { times: [null, null, null, "15:33", "15:34", "15:35", "15:37", "15:41", "15:43", "15:45", "15:47", "15:49", "15:51", "15:52", "15:54", "15:56"] },
                { times: [null, null, null, "17:27", "17:28", "17:29", "17:31", "17:34", "17:36", "17:38", "17:40", "17:42", "17:44", "17:45", "17:47", null] },
                { times: [null, null, null, "20:07", "20:08", "20:09", "20:11", "20:14", "20:16", "20:18", "20:20", "20:22", "20:24", "20:25", "20:26", "20:28"] },
              ],
            },
            saturday: {
              trips: [
                { times: [null, null, null, "08:07", "08:08", "08:09", "08:11", "08:14", "08:16", "08:18", "08:20", "08:22", "08:24", "08:25", "08:27", null] },
                { times: [null, null, null, "11:42", "11:43", "11:44", "11:46", "11:49", "11:51", "11:53", "11:55", "11:57", "11:59", "12:00", "12:02", null] },
              ],
            },
          },
        },
      ],
    },

    // ---------------------------------------------------------------
    // LINIA 2 — w pełni zweryfikowana.
    // ---------------------------------------------------------------
    {
      id: "2",
      name: "Linia 2",
      hasSchedule: true,
      directions: [
        {
          id: "2-a",
          label: "Piłsudskiego → Farna",
          stops: [
            { name: "Piłsudskiego" },
            { name: "Mickiewicza I" },
            { name: "Mickiewicza II" },
            { name: "Mickiewicza III" },
            { name: "Gostyńska I" },
            { name: "Staszica II nż." },
            { name: "Staszica I" },
            { name: "Chłapowskiego II" },
            { name: "Grota Roweckiego" },
            { name: "Chłapowskiego I" },
            { name: "Kilińskiego III" },
            { name: "Grunwaldzka" },
            { name: "Wojska Polskiego" },
            { name: "Kilińskiego II" },
            { name: "Kilińskiego I" },
            { name: "Piłsudskiego" },
            { name: "Farna" },
          ],
          schedules: {
            workday: {
              trips: [
                { times: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null] },
                { times: [null, "09:27", "09:28", "09:30", "09:32", "09:34", "09:35", "09:37", "09:38", "09:42", "09:44", "09:46", "09:49", "09:50", "09:51", "09:54", null] },
                { times: [null, "13:37", "13:38", "13:40", "13:42", "13:44", "13:45", "13:47", "13:49", "13:53", "13:55", "13:57", "14:00", "14:01", "14:02", "14:05", "14:08"] },
                { times: [null, "16:57", "16:58", "17:00", "17:02", "17:04", "17:05", "17:07", null, "17:08", "17:10", "17:12", "17:15", "17:16", "17:17", "17:20", null] },
              ],
            },
            saturday: {
              trips: [
                { times: [null, "09:27", "09:28", "09:30", "09:32", "09:34", "09:35", "09:37", null, "09:38", "09:40", "09:42", "09:45", "09:46", "09:47", null, null] },
                { times: [null, "12:32", "12:33", "12:35", "12:37", "12:39", "12:40", "12:42", null, "12:43", "12:45", "12:47", "12:50", "12:51", "12:52", null, null] },
              ],
            },
          },
        },
      ],
    },

    // ---------------------------------------------------------------
    // LINIE 3–18 — na liście, dane do uzupełnienia w Etapie 4.
    // ---------------------------------------------------------------
    {
      id: "3",
      name: "Linia 3",
      hasSchedule: true,
      directions: [
        {
          id: "3-a",
          label: "Piłsudskiego, przez Dobczyn",
          stops: [
            { name: "Piłsudskiego" }, { name: "Mickiewicza I" }, { name: "Mickiewicza II" }, { name: "Mickiewicza III" },
            { name: "Gostyńska I" }, { name: "Gostyńska II" }, { name: "Rolna" }, { name: "Sosnowiec" }, { name: "Łęg" },
            { name: "Bystrzek" }, { name: "Olsza I" }, { name: "Olsza II" }, { name: "Chrząstowo I nż." },
            { name: "Chrząstowo II nż." }, { name: "Chrząstowo III nż." }, { name: "Dobczyn I nż." }, { name: "Dobczyn" },
            { name: "Chrząstowo III nż." }, { name: "Chrząstowo II nż." }, { name: "Chrząstowo I nż." }, { name: "Pysząca I" },
            { name: "Pysząca II" }, { name: "Borgowo" }, { name: "Grzymysław I" }, { name: "Grzymysław II" },
            { name: "Grzymysław III" }, { name: "Staszica I" }, { name: "Gostyńska I" }, { name: "Mickiewicza III" },
            { name: "Mickiewicza II" }, { name: "Mickiewicza I" }, { name: "Piłsudskiego" },
          ],
          schedules: {
            workday: {
              trips: [
                { times: [null, "06:37", "06:38", "06:40", "06:42", "06:43", "06:45", "06:48", "06:51", "06:53", "06:56", "06:59", "07:01", "07:03", "07:05", "07:08", "07:12", "07:16", "07:18", "07:20", "07:25", "07:26", "07:29", "07:33", "07:36", "07:38", "07:41", "07:43", "07:45", "07:46", "07:47", null] },
                { times: [null, "12:07", "12:08", "12:10", "12:12", "12:13", "12:15", "12:18", "12:21", "12:23", "12:26", "12:28", "12:30", "12:32", "12:34", "12:37", "12:40", "12:44", "12:46", "12:48", "12:53", "12:54", "12:57", "13:01", "13:04", "13:06", "13:09", "13:11", "13:13", "13:15", "13:16", null] },
              ],
            },
          },
        },
      ],
    },
    {
      id: "4",
      name: "Linia 4",
      hasSchedule: true,
      directions: [
        {
          id: "4-a",
          label: "Stary Rynek → Piłsudskiego, przez Dobczyn",
          stops: [
            { name: "Stary Rynek" }, { name: "Piłsudskiego" }, { name: "Mickiewicza I" }, { name: "Mickiewicza II" },
            { name: "Mickiewicza III" }, { name: "Gostyńska I" }, { name: "Staszica I" }, { name: "Grzymysław III" },
            { name: "Grzymysław II" }, { name: "Grzymysław I" }, { name: "Borgowo" }, { name: "Pysząca II" },
            { name: "Pysząca I" }, { name: "Pysząca III" }, { name: "Sosnowiec" }, { name: "Łęg" }, { name: "Bystrzek" },
            { name: "Olsza I" }, { name: "Olsza II" }, { name: "Chrząstowo I nż." }, { name: "Chrząstowo II nż." },
            { name: "Chrząstowo III nż." }, { name: "Dobczyn I nż." }, { name: "Dobczyn" }, { name: "Chrząstowo III nż." },
            { name: "Chrząstowo II nż." }, { name: "Chrząstowo I nż." }, { name: "Rolna" }, { name: "Grzymysław nż." },
            { name: "Gostyńska I" }, { name: "Mickiewicza III" }, { name: "Mickiewicza II" }, { name: "Mickiewicza I" },
            { name: "Stary Rynek" }, { name: "Piłsudskiego" },
          ],
          schedules: {
            workday: {
              trips: [
                { times: [null, null, "07:37", "07:38", "07:40", "07:42", "07:45", "07:48", "07:50", "07:53", "07:57", "08:00", "08:02", "08:03", "08:05", "08:09", "08:11", "08:13", "08:14", "08:15", "08:16", "08:17", null, null, null, null, null, "08:29", "08:30", "08:31", "08:33", "08:34", "08:35", "08:38", null] },
                { times: [null, null, "15:32", "15:33", "15:35", "15:37", "15:40", "15:43", "15:45", "15:48", "15:52", "15:54", "15:56", "15:57", "15:59", "16:03", "16:05", "16:07", "16:08", "16:10", "16:12", "16:14", "16:18", "16:20", "16:24", "16:25", "16:27", "16:34", "16:36", "16:38", "16:40", "16:42", "16:43", null, null] },
              ],
            },
          },
        },
      ],
    },
    {
      id: "5",
      name: "Linia 5",
      hasSchedule: true,
      directions: [
        {
          id: "5-a",
          label: "Piłsudskiego, przez Wirginowo i Dalewo",
          stops: [
            { name: "Piłsudskiego" }, { name: "Kilińskiego I" }, { name: "Wojska Polskiego" }, { name: "Grunwaldzka" },
            { name: "Kilińskiego III" }, { name: "Nochowo III nż." }, { name: "Nochówko II" }, { name: "Nochówko I" },
            { name: "Pełczyn" }, { name: "Wirginowo III" }, { name: "Wirginowo II" }, { name: "Wirginowo I" },
            { name: "Bodzyniewo" }, { name: "Bodzyniewo nż." }, { name: "Kadzewo" }, { name: "Mórka" }, { name: "Mórka nż." },
            { name: "Jeleńczewo nż." }, { name: "Dalewo III nż." }, { name: "Dalewo" }, { name: "Dalewo II" },
            { name: "Dalewo I" }, { name: "Wyrzeka" }, { name: "Nochowo II" }, { name: "Nochowo III nż." },
            { name: "Kilińskiego III" }, { name: "Kilińskiego II" }, { name: "Kilińskiego I" }, { name: "Piłsudskiego" },
          ],
          schedules: {
            workday: {
              trips: [
                { times: [null, "06:17", "06:21", "06:25", "06:27", "06:29", "06:32", "06:33", "06:35", "06:39", "06:41", "06:43", "06:45", "06:46", "06:49", "06:54", "06:56", "06:57", "06:58", "06:59", "07:00", "07:02", "07:05", "07:10", "07:12", "07:19", "07:21", "07:23", "07:26"] },
                { times: [null, "11:47", "11:51", "11:55", "11:57", "11:59", "12:02", "12:03", "12:05", "12:09", "12:11", "12:13", "12:15", "12:16", "12:19", "12:24", "12:26", "12:27", "12:28", "12:29", "12:30", "12:32", "12:35", "12:40", "12:42", "12:44", "12:46", "12:47", null] },
              ],
            },
          },
        },
        {
          id: "5-b",
          label: "Piłsudskiego, przez Dalewo i Wirginowo",
          stops: [
            { name: "Piłsudskiego" }, { name: "Kilińskiego I" }, { name: "Wojska Polskiego" }, { name: "Grunwaldzka" },
            { name: "Kilińskiego III" }, { name: "Nochowo III nż." }, { name: "Nochowo II" }, { name: "Wyrzeka" },
            { name: "Dalewo I" }, { name: "Dalewo" }, { name: "Dalewo III nż." }, { name: "Jeleńczewo nż." },
            { name: "Mórka nż." }, { name: "Mórka" }, { name: "Kadzewo" }, { name: "Bodzyniewo nż." }, { name: "Bodzyniewo" },
            { name: "Wirginowo I" }, { name: "Wirginowo II" }, { name: "Wirginowo III" }, { name: "Pełczyn" },
            { name: "Nochówko I" }, { name: "Nochówko II" }, { name: "Nochowo III nż." }, { name: "Kilińskiego III" },
            { name: "Kilińskiego II" }, { name: "Kilińskiego I" }, { name: "Piłsudskiego" },
          ],
          schedules: {
            workday: {
              trips: [
                { times: [null, "08:02", "08:06", "08:10", "08:12", "08:14", "08:16", "08:21", "08:24", "08:27", "08:28", "08:29", "08:30", "08:32", "08:37", "08:40", "08:41", "08:43", "08:45", "08:47", "08:51", "08:53", "08:54", "08:57", "08:59", "09:01", "09:04", "09:07"] },
                { times: [null, "14:32", "14:36", "14:40", "14:43", "14:45", "14:47", "14:52", "14:55", "14:58", "14:59", "15:00", "15:01", "15:03", "15:07", "15:10", "15:11", "15:13", "15:15", "15:17", "15:21", "15:23", "15:24", "15:27", "15:29", "15:32", "15:35", null] },
                { times: [null, "17:12", "17:16", "17:20", "17:22", "17:24", "17:26", "17:31", "17:34", "17:37", "17:38", "17:39", "17:40", "17:42", "17:47", "17:50", "17:51", "17:53", "17:55", "17:57", "18:01", "18:03", "18:04", "18:07", "18:09", "18:13", "18:15", null] },
              ],
            },
          },
        },
      ],
    },
    {
      id: "6",
      name: "Linia 6",
      hasSchedule: true,
      directions: [
        {
          id: "6-a",
          label: "Piłsudskiego, przez Zbrudzewo i Mechlin",
          stops: [
            { name: "Piłsudskiego" }, { name: "Zbrudzewo" }, { name: "Niesłabin ul. Osiedlowa nż." }, { name: "Niesłabin" },
            { name: "Orkowo" }, { name: "Czmoniec ul. Goździkowa" }, { name: "Czmoń ul. Strażacka" }, { name: "Kaleje" },
            { name: "Luciny II nż." }, { name: "Luciny I" }, { name: "Dąbrowa I" }, { name: "Dąbrowa" }, { name: "Mechlin" },
            { name: "Mechlin ul. Śremska nż." }, { name: "Mechlin I nż." }, { name: "Piłsudskiego" }, { name: "Kilińskiego I" },
            { name: "Sikorskiego" }, { name: "Al. Solidarności I" }, { name: "Al. Solidarności II" }, { name: "Kilińskiego III" },
            { name: "Chłapowskiego I" }, { name: "Chłapowskiego II" }, { name: "Staszica I" }, { name: "Gostyńska I" },
            { name: "Mickiewicza III" }, { name: "Mickiewicza II" }, { name: "Mickiewicza I" }, { name: "Piłsudskiego" },
          ],
          schedules: {
            workday: {
              trips: [
                { times: ["06:20", "06:26", "06:34", "06:36", "06:42", "06:47", "06:49", "06:53", "06:57", "06:59", "07:03", "07:04", "07:08", "07:10", "07:12", null, "07:17", "07:18", "07:19", "07:21", "07:24", "07:26", "07:28", "07:30", "07:32", "07:34", "07:35", "07:37", null] },
              ],
            },
          },
        },
        {
          id: "6-b",
          label: "Farna → Piłsudskiego, przez Mechlin i Zbrudzewo",
          stops: [
            { name: "Farna" }, { name: "Piłsudskiego" }, { name: "Mechlin I nż." }, { name: "Mechlin nż." },
            { name: "Mechlin ul. Śremska nż." }, { name: "Mechlin" }, { name: "Dąbrowa" }, { name: "Dąbrowa I" },
            { name: "Luciny I" }, { name: "Luciny II nż." }, { name: "Kaleje" }, { name: "Czmoń ul. Strażacka" },
            { name: "Czmoniec ul. Goździkowa" }, { name: "Orkowo I" }, { name: "Niesłabin" }, { name: "Niesłabin ul. Osiedlowa nż." },
            { name: "Zbrudzewo" }, { name: "Piłsudskiego" }, { name: "Kilińskiego I" }, { name: "Sikorskiego" },
            { name: "Al. Solidarności I" }, { name: "Al. Solidarności II" }, { name: "Kilińskiego III" }, { name: "Chłapowskiego I" },
            { name: "Chłapowskiego II" }, { name: "Staszica I" }, { name: "Gostyńska I" }, { name: "Mickiewicza III" },
            { name: "Mickiewicza II" }, { name: "Mickiewicza I" }, { name: "Piłsudskiego" },
          ],
          schedules: {
            workday: {
              trips: [
                { times: ["10:55", "11:00", "11:03", "11:04", "11:05", "11:07", "11:11", "11:12", "11:16", "11:17", "11:21", "11:25", "11:29", "11:33", "11:35", "11:37", "11:43", null, "11:52", "11:53", "11:54", "11:56", "11:59", "12:01", "12:03", "12:05", "12:07", "12:09", "12:10", "12:11", "12:13"] },
                { times: [null, "16:15", "16:18", "16:19", "16:20", "16:22", "16:26", "16:27", "16:31", "16:32", "16:36", "16:40", "16:44", "16:48", "16:50", "16:52", "16:58", null, "17:08", "17:09", "17:10", "17:12", "17:16", "17:18", "17:20", "17:22", "17:24", "17:26", "17:27", "17:28", null] },
                { times: [null, "18:10", "18:13", "18:14", "18:15", "18:17", "18:21", "18:22", "18:26", "18:27", "18:31", "18:35", "18:39", "18:43", "18:45", "18:47", "18:53", null, "19:02", "19:03", "19:04", "19:06", "19:09", "19:11", "19:13", "19:15", "19:17", "19:19", "19:20", "19:21", "19:23"] },
              ],
            },
          },
        },
      ],
    },
    {
      id: "7",
      name: "Linia 7",
      hasSchedule: true,
      directions: [
        {
          id: "7-a",
          label: "Stary Rynek, przez Malczewskiego (kurs okrężny)",
          stops: [
            { name: "Stary Rynek" }, { name: "Piłsudskiego" }, { name: "Mickiewicza I" }, { name: "Mickiewicza II" },
            { name: "Mickiewicza III" }, { name: "Gostyńska I" }, { name: "Staszica II nż." }, { name: "Staszica I" },
            { name: "Chłapowskiego II" }, { name: "Chłapowskiego I" }, { name: "Kilińskiego III" }, { name: "Kilińskiego II" },
            { name: "Kilińskiego I" }, { name: "Sikorskiego" }, { name: "Al. Solidarności I" }, { name: "Chełmońskiego nż." },
            { name: "Chełmońskiego I nż." }, { name: "Malczewskiego I" }, { name: "Malczewskiego II" },
            { name: "Malczewskiego II" }, { name: "Malczewskiego I" }, { name: "Chełmońskiego nż." }, { name: "Al. Solidarności I" },
            { name: "Sikorskiego" }, { name: "Kilińskiego II" }, { name: "Kilińskiego III" }, { name: "Chłapowskiego I" },
            { name: "Chłapowskiego II" }, { name: "Staszica I" }, { name: "Gostyńska I" }, { name: "Mickiewicza III" },
            { name: "Mickiewicza II" }, { name: "Mickiewicza I" }, { name: "Piłsudskiego" },
          ],
          schedules: {
            workday: {
              trips: [
                { times: [null, null, "08:02", "08:03", "08:05", "08:07", "08:09", "08:10", "08:12", "08:14", "08:16", "08:18", "08:19", "08:21", "08:23", "08:24", "08:25", "08:26", "08:27", "09:00", "09:01", "09:03", "09:05", "09:07", "09:09", "09:11", "09:13", "09:15", "09:17", "09:19", "09:21", "09:22", "09:23", "09:24"] },
                { times: [null, null, "10:02", "10:03", "10:05", "10:07", "10:09", "10:10", "10:12", "10:14", "10:16", "10:18", "10:19", "10:21", "10:23", "10:24", "10:25", "10:26", "10:27", "11:20", "11:21", "11:22", "11:23", "11:25", "11:28", "11:30", "11:32", "11:34", "11:36", "11:38", "11:40", "11:41", "11:42", "11:44"] },
                { times: [null, null, "15:19", "15:20", "15:22", "15:24", "15:26", "15:27", "15:29", "15:31", "15:33", "15:35", "15:36", "15:38", "15:40", "15:41", "15:42", "15:43", "15:44", "16:22", "16:23", "16:24", "16:25", "16:27", "16:30", "16:32", "16:34", "16:36", "16:38", "16:40", "16:42", "16:43", "16:44", null] },
                { times: [null, null, "17:02", "17:03", "17:05", "17:07", "17:09", "17:10", "17:12", "17:14", "17:16", "17:18", "17:19", "17:21", "17:23", "17:24", "17:25", "17:26", "17:27", "18:00", "18:01", "18:02", "18:03", "18:05", "18:08", "18:10", "18:12", "18:14", "18:16", "18:18", "18:20", "18:21", "18:22", null], note: "Kurs sezonowy: 1 maja – 31 października" },
              ],
            },
            saturday: {
              trips: [
                { times: [null, null, "10:12", "10:13", "10:15", "10:17", "10:19", "10:20", "10:22", "10:24", "10:26", "10:28", "10:29", "10:31", "10:33", "10:34", "10:35", "10:36", "10:37", "11:10", "11:11", "11:12", "11:13", "11:15", "11:18", "11:20", "11:22", "11:24", "11:26", "11:28", "11:30", "11:31", "11:32", null] },
                { times: [null, null, "15:12", "15:13", "15:15", "15:17", "15:19", "15:20", "15:22", "15:24", "15:26", "15:28", "15:29", "15:31", "15:33", "15:34", "15:35", "15:36", "15:37", "16:10", "16:11", "16:12", "16:13", "16:15", "16:18", "16:20", "16:22", "16:24", "16:26", "16:28", "16:30", "16:31", "16:32", "16:34"] },
              ],
            },
          },
        },
      ],
    },
    {
      id: "8",
      name: "Linia 8",
      hasSchedule: true,
      directions: [
        {
          id: "8-a",
          label: "Śrem Piłsudskiego, przez Psarskie i Jaszkowo (kurs okrężny)",
          stops: [
            { name: "Śrem Piłsudskiego" }, { name: "Śrem Mickiewicza I" }, { name: "Śrem Mickiewicza II" }, { name: "Śrem Mickiewicza III" },
            { name: "Śrem Gostyńska I" }, { name: "Śrem Staszica II nż." }, { name: "Śrem Staszica I" }, { name: "Śrem Chłapowskiego II" },
            { name: "Śrem Chłapowskiego I" }, { name: "Śrem Kilińskiego III" }, { name: "Śrem Al. Solidarności II" }, { name: "Śrem Al. Solidarności I" },
            { name: "Śrem Sikorskiego nż." }, { name: "Psarskie I" }, { name: "Psarskie III" }, { name: "Psarskie Al.Platanowa nż." },
            { name: "Psarskie IV DPS" }, { name: "Góra" }, { name: "Góra Huby nż." }, { name: "Jaszkowo" },
            { name: "Jaszkowo" }, { name: "Góra Huby nż." }, { name: "Góra" }, { name: "Psarskie V nż." },
            { name: "Psarskie IV DPS" }, { name: "Psarskie Al.Platanowa nż." }, { name: "Psarskie III" }, { name: "Psarskie I" },
            { name: "Śrem Al. Solidarności I" }, { name: "Śrem Al. Solidarności II" }, { name: "Śrem Kilińskiego III" }, { name: "Śrem Chłapowskiego I" },
            { name: "Śrem Chłapowskiego II" }, { name: "Śrem Staszica I" }, { name: "Śrem Gostyńska I" }, { name: "Śrem Mickiewicza III" },
            { name: "Śrem Mickiewicza II" }, { name: "Śrem Mickiewicza I" }, { name: "Śrem Piłsudskiego" },
          ],
          schedules: {
            workday: {
              trips: [
                { times: [null, "05:08", "05:09", "05:10", "05:11", "05:12", "05:13", "05:15", "05:17", "05:19", "05:21", "05:22", "05:24", "05:26", "05:28", "05:29", "05:31", "05:35", "05:38", "05:40", "05:50", "05:53", "05:56", "05:57", "06:00", "06:02", "06:04", "06:07", "06:08", "06:09", "06:12", "06:14", "06:16", "06:18", "06:20", "06:22", "06:23", "06:24", null] },
                { times: [null, "06:27", "06:28", "06:30", "06:31", "06:32", "06:33", "06:35", "06:37", "06:39", "06:41", "06:42", "06:44", "06:46", "06:48", "06:49", "06:51", "06:55", "06:56", "06:57", "07:08", "07:09", "07:10", "07:11", "07:14", "07:15", "07:17", "07:20", "07:23", "07:24", "07:27", "07:29", "07:31", "07:33", "07:35", "07:37", "07:38", "07:39", null] },
                { times: [null, "13:42", "13:43", "13:45", "13:47", "13:49", "13:50", "13:52", "13:54", "13:56", "13:58", "13:59", "14:01", "14:03", "14:05", "14:06", "14:08", "14:12", "14:15", "14:17", "14:40", "14:43", "14:46", "14:47", "14:50", "14:51", "14:53", "14:56", "14:59", "15:01", "15:05", "15:08", "15:10", "15:13", "15:16", "15:18", "15:19", "15:20", null] },
                { times: [null, "15:02", "15:03", "15:05", "15:07", "15:08", "15:11", "15:13", "15:15", "15:18", "15:20", "15:21", "15:23", "15:25", "15:27", "15:28", "15:30", "15:34", "15:37", "15:39", "15:51", "15:54", "15:57", "15:58", "16:01", "16:02", "16:04", "16:07", "16:10", "16:12", "16:17", "16:20", "16:22", "16:24", "16:26", "16:28", "16:29", "16:30", null] },
                { times: [null, "16:42", "16:43", "16:45", "16:47", "16:49", "16:50", "16:52", "16:54", "16:56", "16:58", "16:59", "17:01", "17:03", "17:05", "17:06", "17:08", "17:12", "17:15", "17:17", "17:29", "17:32", "17:35", "17:36", "17:39", "17:40", "17:42", "17:45", "17:48", "17:49", "17:52", "17:54", "17:56", "17:58", "18:00", "18:02", "18:03", "18:04", null] },
                { times: [null, "18:22", "18:23", "18:25", "18:27", "18:29", "18:30", "18:32", "18:34", "18:36", "18:38", "18:39", "18:41", "18:43", "18:45", "18:46", "18:48", "18:52", "18:55", "18:57", "19:09", "19:12", "19:15", "19:16", "19:19", "19:20", "19:22", "19:25", "19:28", "19:29", "19:32", "19:34", "19:36", "19:38", "19:40", "19:42", "19:43", "19:44", null] },
              ],
            },
          },
        },
      ],
    },
    {
      id: "9",
      name: "Linia 9",
      hasSchedule: true,
      directions: [
        {
          id: "9-a",
          label: "Farna → Stary Rynek, przez Niesłabin",
          stops: [
            { name: "Farna" }, { name: "Piłsudskiego" }, { name: "Zbrudzewo" }, { name: "Niesłabin ul. Osiedlowa nż." },
            { name: "Niesłabin" }, { name: "Orkowo" }, { name: "Niesłabin" }, { name: "Niesłabin ul. Osiedlowa nż." },
            { name: "Zbrudzewo" }, { name: "Piłsudskiego" }, { name: "Mickiewicza I" }, { name: "Mickiewicza II" },
            { name: "Mickiewicza III" }, { name: "Gostyńska I" }, { name: "Staszica II nż." }, { name: "Staszica I" },
            { name: "Chłapowskiego II" }, { name: "Chłapowskiego I" }, { name: "Kilińskiego III" }, { name: "Grunwaldzka" },
            { name: "Wojska Polskiego" }, { name: "Kilińskiego II" }, { name: "Kilińskiego I" }, { name: "Stary Rynek" },
          ],
          schedules: {
            workday: {
              trips: [
                { times: ["09:00", "09:05", "09:10", "09:15", "09:17", "09:23", "09:27", "09:28", "09:33", null, "09:42", "09:43", "09:45", "09:47", "09:49", "09:50", "09:51", "09:52", "09:54", "09:58", "10:02", "10:04", "10:05", null] },
                { times: [null, "16:30", "16:35", "16:40", "16:42", "16:48", "16:52", "16:53", "16:58", null, "17:07", "17:08", "17:10", "17:12", "17:14", "17:15", "17:17", "17:19", "17:21", "17:25", "17:29", "17:31", "17:32", null] },
              ],
            },
          },
        },
      ],
    },
    {
      id: "10",
      name: "Linia 10",
      hasSchedule: true,
      directions: [
        {
          id: "10-a",
          label: "Piłsudskiego → Farna, przez Błociszewo",
          stops: [
            { name: "Piłsudskiego" }, { name: "Kilińskiego I" }, { name: "Sikorskiego" }, { name: "Al. Solidarności I" },
            { name: "Chełmońskiego nż." }, { name: "Chełmońskiego I nż." }, { name: "Nochowo ul. Podgaje nż." }, { name: "Gaj nż." },
            { name: "Gaj I nż." }, { name: "Gaj II nż." }, { name: "Błociszewo I" }, { name: "Błociszewo II" },
            { name: "Krzyżanowo" }, { name: "Pucołowo" }, { name: "Manieczki" }, { name: "Szymanowo" },
            { name: "Psarskie IV" }, { name: "Psarskie III" }, { name: "Psarskie I" }, { name: "Sikorskiego" },
            { name: "Piłsudskiego" }, { name: "Farna" },
          ],
          schedules: {
            workday: {
              trips: [
                { times: [null, "08:57", "08:58", "08:59", "09:00", "09:01", "09:03", "09:06", "09:08", "09:09", "09:13", "09:14", "09:19", "09:22", "09:24", "09:28", "09:30", "09:32", "09:33", "09:35", "09:38", "09:43"] },
                { times: [null, "18:02", "18:03", "18:04", "18:05", "18:06", "18:08", "18:11", "18:13", "18:14", "18:18", "18:19", "18:24", "18:27", "18:29", "18:33", "18:35", "18:37", "18:38", "18:40", null, null] },
              ],
            },
          },
        },
        {
          id: "10-b",
          label: "Farna → Piłsudskiego, przez Psarskie",
          stops: [
            { name: "Farna" }, { name: "Piłsudskiego" }, { name: "Kilińskiego I" }, { name: "Sikorskiego" },
            { name: "Sikorskiego nż." }, { name: "Psarskie I" }, { name: "Psarskie III" }, { name: "Psarskie IV" },
            { name: "Szymanowo" }, { name: "Manieczki" }, { name: "Pucołowo" }, { name: "Krzyżanowo" },
            { name: "Błociszewo II" }, { name: "Błociszewo I" }, { name: "Gaj I" }, { name: "Gaj nż." },
            { name: "Nochowo ul. Podgaje nż." }, { name: "Chełmońskiego nż." }, { name: "Al. Solidarności I" }, { name: "Sikorskiego" },
            { name: "Piłsudskiego" },
          ],
          schedules: {
            workday: {
              trips: [
                { times: [null, null, "06:42", "06:43", "06:44", "06:45", "06:47", "06:49", "06:51", "06:55", "06:57", "07:01", "07:07", "07:08", "07:13", "07:15", "07:19", "07:20", "07:21", "07:22", null] },
                { times: ["14:25", null, "14:34", "14:35", "14:36", "14:37", "14:39", "14:41", "14:43", "14:47", "14:49", "14:53", "14:59", "15:00", "15:05", "15:07", "15:11", "15:12", "15:13", "15:14", null] },
              ],
            },
          },
        },
      ],
    },
    {
      id: "11",
      name: "Linia 11",
      hasSchedule: true,
      directions: [
        {
          id: "11-a",
          label: "Piłsudskiego, przez Międzychód (rano)",
          stops: [
            { name: "Piłsudskiego" }, { name: "Mickiewicza I" }, { name: "Mickiewicza II" }, { name: "Mickiewicza III" },
            { name: "Staszica I" }, { name: "Grunwaldzka" }, { name: "Kilińskiego III" }, { name: "Nochowo III nż." },
            { name: "Nochówko II" }, { name: "Nochówko I" }, { name: "Pełczyn" }, { name: "Gawrony" },
            { name: "Międzychód IV nż." }, { name: "Międzychód III nż." }, { name: "Międzychód II" }, { name: "Międzychód I nż." },
            { name: "Pinka" }, { name: "Masłowo II" }, { name: "Masłowo I" }, { name: "Nowieczek II" },
            { name: "Nowieczek I" }, { name: "Rusocin II" }, { name: "Feliksowo" }, { name: "Rusocin I" },
            { name: "Wieszczyczyn" }, { name: "Drzonek II" }, { name: "Drzonek I" }, { name: "Ostrowo II" },
            { name: "Ostrowo I" }, { name: "Borgowo" }, { name: "Grzymysław nż." }, { name: "Gostyńska I" },
            { name: "Mickiewicza III" }, { name: "Mickiewicza II" }, { name: "Mickiewicza I" }, { name: "Piłsudskiego" },
          ],
          schedules: {
            workday: {
              trips: [
                { times: [null, "05:52", "05:53", "05:54", "05:58", "06:00", "06:02", "06:04", "06:05", "06:07", "06:10", "06:11", "06:12", "06:13", "06:14", "06:17", "06:21", "06:23", "06:25", "06:26", "06:30", "06:33", "06:36", "06:39", "06:42", "06:44", "06:45", "06:46", "06:48", "06:52", "06:53", "06:55", "06:57", "06:58", "06:59", null] },
              ],
            },
          },
        },
        {
          id: "11-b",
          label: "Piłsudskiego, przez Grzymysław (popołudnie)",
          stops: [
            { name: "Piłsudskiego" }, { name: "Mickiewicza I" }, { name: "Mickiewicza II" }, { name: "Mickiewicza III" },
            { name: "Gostyńska I" }, { name: "Staszica I" }, { name: "Grzymysław III" }, { name: "Grzymysław II" },
            { name: "Grzymysław I" }, { name: "Borgowo" }, { name: "Ostrowo I" }, { name: "Ostrowo II" },
            { name: "Drzonek I" }, { name: "Drzonek II" }, { name: "Wieszczyczyn" }, { name: "Rusocin I" },
            { name: "Feliksowo" }, { name: "Rusocin II" }, { name: "Nowieczek I" }, { name: "Nowieczek II" },
            { name: "Masłowo I" }, { name: "Masłowo II" }, { name: "Pinka" }, { name: "Międzychód I nż." },
            { name: "Międzychód II" }, { name: "Międzychód III nż." }, { name: "Międzychód IV nż." }, { name: "Gawrony" },
            { name: "Pełczyn" }, { name: "Nochówko I" }, { name: "Nochówko II" }, { name: "Nochowo III nż." },
            { name: "Kilińskiego III" }, { name: "Kilińskiego II" }, { name: "Kilińskiego I" }, { name: "Piłsudskiego" },
          ],
          schedules: {
            workday: {
              trips: [
                { times: [null, "15:41", "15:42", "15:43", "15:45", "15:47", "15:50", "15:52", "15:55", "15:59", "16:03", "16:05", "16:07", "16:09", "16:12", "16:15", "16:17", "16:19", "16:22", "16:24", "16:26", "16:29", "16:31", "16:32", "16:33", "16:34", "16:35", "16:36", "16:39", "16:41", "16:42", "16:45", "16:47", "16:49", "16:50", null] },
              ],
            },
          },
        },
      ],
    },
    {
      id: "12",
      name: "Linia 12",
      hasSchedule: true,
      directions: [
        {
          id: "12-a",
          label: "Piłsudskiego, przez Psarskie (kurs poranny)",
          stops: [
            { name: "Piłsudskiego" }, { name: "Kilińskiego I" }, { name: "Sikorskiego" }, { name: "Sikorskiego nż." },
            { name: "Psarskie I" }, { name: "Psarskie III" }, { name: "Psarskie Al. Platanowa nż." }, { name: "Psarskie IV DPS" },
            { name: "Psarskie Al. Platanowa nż." }, { name: "Psarskie III" }, { name: "Psarskie I" }, { name: "Al. Solidarności I" },
            { name: "Al. Solidarności II" }, { name: "Wojska Polskiego" }, { name: "Mickiewicza III" }, { name: "Mickiewicza II" },
            { name: "Mickiewicza I" }, { name: "Piłsudskiego" },
          ],
          schedules: {
            workday: {
              trips: [
                { times: [null, "07:16", "07:17", "07:18", "07:19", "07:21", "07:22", "07:23", "07:24", "07:25", "07:27", "07:30", "07:32", "07:36", "07:39", "07:41", "07:42", null] },
              ],
            },
            saturday: {
              trips: [
                { times: [null, "08:42", "08:43", "08:44", "08:45", "08:47", "08:48", "08:49", "08:50", "08:51", "08:53", "08:56", "08:59", "09:03", "09:06", "09:08", "09:09", null] },
              ],
            },
          },
        },
        {
          id: "12-b",
          label: "Piłsudskiego, przez Psarskie (kursy dzienne)",
          stops: [
            { name: "Piłsudskiego" }, { name: "Kilińskiego I" }, { name: "Wojska Polskiego" }, { name: "Grunwaldzka" },
            { name: "Al. Solidarności II" }, { name: "Al. Solidarności I" }, { name: "Sikorskiego nż." }, { name: "Psarskie I" },
            { name: "Psarskie III" }, { name: "Psarskie Al. Platanowa nż." }, { name: "Psarskie IV DPS" }, { name: "Psarskie Al. Platanowa nż." },
            { name: "Psarskie III" }, { name: "Psarskie I" }, { name: "Al. Solidarności I" }, { name: "Al. Solidarności II" },
            { name: "Grunwaldzka" }, { name: "Staszica I" }, { name: "Gostyńska I" }, { name: "Mickiewicza III" },
            { name: "Mickiewicza II" }, { name: "Mickiewicza I" }, { name: "Piłsudskiego" },
          ],
          schedules: {
            workday: {
              trips: [
                { times: [null, "10:02", "10:06", "10:10", "10:12", "10:13", "10:15", "10:17", "10:19", "10:20", "10:21", "10:22", "10:23", "10:25", "10:28", "10:29", "10:31", "10:33", "10:34", "10:36", "10:37", "10:38", null] },
                { times: [null, "10:52", "10:56", "11:00", "11:02", "11:03", "11:05", "11:07", "11:09", "11:10", "11:11", "11:12", "11:13", "11:15", "11:18", "11:19", "11:21", "11:23", "11:24", "11:26", "11:27", "11:28", "11:29"] },
                { times: [null, "13:33", "13:37", "13:41", "13:44", "13:45", "13:47", "13:49", "13:51", "13:52", "13:53", "13:54", "13:55", "13:57", "14:00", "14:01", "14:03", "14:05", "14:06", "14:08", "14:09", "14:10", null] },
              ],
            },
          },
        },
        {
          id: "12-c",
          label: "Piłsudskiego, przez Psarskie (trasa sobotnia, krótsza)",
          stops: [
            { name: "Piłsudskiego" }, { name: "Kilińskiego I" }, { name: "Wojska Polskiego" }, { name: "Grunwaldzka" },
            { name: "Al. Solidarności II" }, { name: "Al. Solidarności I" }, { name: "Sikorskiego nż." }, { name: "Psarskie I" },
            { name: "Psarskie III" }, { name: "Psarskie Al. Platanowa nż." }, { name: "Psarskie IV DPS" }, { name: "Psarskie Al. Platanowa nż." },
            { name: "Psarskie III" }, { name: "Psarskie I" }, { name: "Al. Solidarności I" }, { name: "Al. Solidarności II" },
            { name: "Kilińskiego II" }, { name: "Kilińskiego I" }, { name: "Piłsudskiego" },
          ],
          schedules: {
            saturday: {
              trips: [
                { times: [null, "13:02", "13:06", "13:10", "13:13", "13:15", "13:16", "13:18", "13:20", "13:22", "13:23", "13:24", "13:25", "13:26", "13:29", "13:31", "13:32", "13:35", "13:36"] },
              ],
            },
          },
        },
      ],
    },
    {
      id: "13",
      name: "Linia 13",
      hasSchedule: true,
      directions: [
        {
          id: "13-a",
          label: "Piłsudskiego → Kilińskiego III, przez Mechlin",
          stops: [
            { name: "Piłsudskiego" }, { name: "Mickiewicza I" }, { name: "Mickiewicza II" }, { name: "Mickiewicza III" },
            { name: "Gostyńska I" }, { name: "Staszica II nż." }, { name: "Staszica I" }, { name: "Chłapowskiego II" },
            { name: "Chłapowskiego I" }, { name: "Kilińskiego III" }, { name: "Al. Solidarności II" }, { name: "Al. Solidarności I" },
            { name: "Sikorskiego" }, { name: "Piłsudskiego" }, { name: "Mechlin I nż" }, { name: "Zbrudzewo ul. Średzka" },
            { name: "Zbrudzewo ul. Średzka I" }, { name: "Mechlin Leopol" }, { name: "Zbrudzewo ul. Średzka nż." }, { name: "Mechlin I nż." },
            { name: "Zbrudzewo ul. Średzka II" }, { name: "Piłsudskiego" }, { name: "Kilińskiego I" }, { name: "Kilińskiego II" },
            { name: "Kilińskiego III" },
          ],
          schedules: {
            workday: {
              trips: [
                { times: [null, "05:16", "05:17", "05:18", "05:19", "05:20", "05:21", "05:23", "05:24", "05:26", "05:28", "05:29", "05:30", "05:34", "05:38", "05:42", "05:47", "05:51", "05:53", "05:55", null, null, "06:03", "06:05", "06:07"] },
                { times: [null, "13:07", "13:08", "13:10", "13:12", "13:14", "13:15", "13:17", "13:19", "13:21", "13:23", "13:25", "13:26", "13:30", "13:34", "13:38", "13:43", "13:47", "13:49", "13:51", null, null, "13:59", "14:02", "14:04"] },
              ],
            },
          },
        },
        {
          id: "13-b",
          label: "Kilińskiego III → Piłsudskiego, przez Mechlin",
          stops: [
            { name: "Kilińskiego III" }, { name: "Kilińskiego II" }, { name: "Kilińskiego I" }, { name: "Stary Rynek" },
            { name: "Piłsudskiego" }, { name: "Mechlin I nż." }, { name: "Zbrudzewo ul. Średzka I" }, { name: "Mechlin Leopol" },
            { name: "Zbrudzewo ul. Średzka" }, { name: "Mechlin I nż" }, { name: "Zbrudzewo ul. Średzka II" }, { name: "Piłsudskiego" },
            { name: "Kilińskiego I" }, { name: "Sikorskiego" }, { name: "Al. Solidarności I" }, { name: "Al. Solidarności II" },
            { name: "Kilińskiego III" }, { name: "Chłapowskiego I" }, { name: "Chłapowskiego II" }, { name: "Staszica I" },
            { name: "Gostyńska I" }, { name: "Mickiewicza III" }, { name: "Mickiewicza II" }, { name: "Mickiewicza I" },
            { name: "Stary Rynek" }, { name: "Piłsudskiego" },
          ],
          schedules: {
            workday: {
              trips: [
                { times: ["13:55", "13:57", "13:59", null, "14:06", "14:10", "14:16", "14:20", "14:24", "14:25", null, null, "14:35", "14:37", "14:39", "14:41", "14:44", "14:46", "14:47", "14:50", "14:52", "14:54", "14:55", "14:56", "14:59", null] },
                { times: ["21:43", "21:45", "21:47", "21:50", "21:55", "21:59", "22:05", "22:09", "22:13", "22:14", null, null, "22:19", "22:21", "22:23", "22:24", "22:25", "22:27", "22:28", "22:29", "22:30", "22:31", "22:32", "22:33", null, "22:34"] },
              ],
            },
          },
        },
      ],
    },
    {
      id: "14",
      name: "Linia 14",
      hasSchedule: true,
      directions: [
        {
          id: "14-a",
          label: "Piłsudskiego, przez Wiosenną i Pysząca (rano)",
          stops: [
            { name: "Piłsudskiego" }, { name: "Kilińskiego I" }, { name: "Sikorskiego" }, { name: "Al. Solidarności I" },
            { name: "Al. Solidarności II" }, { name: "Kilińskiego III" }, { name: "Chłapowskiego I" }, { name: "Chłapowskiego II" },
            { name: "Staszica I" }, { name: "Gostyńska II nż." }, { name: "Wiosenna I nż." }, { name: "Wiosenna II" },
            { name: "Rolna" }, { name: "Pysząca nż." }, { name: "Pysząca I" }, { name: "Pysząca II nż." },
            { name: "Borgowo" }, { name: "Grzymysław nż." }, { name: "Staszica II nż." }, { name: "Staszica I" },
            { name: "Chłapowskiego II" }, { name: "Chłapowskiego I" }, { name: "Kilińskiego III" }, { name: "Grunwaldzka" },
            { name: "Wojska Polskiego" }, { name: "Kilińskiego II" }, { name: "Kilińskiego I" }, { name: "Piłsudskiego" },
          ],
          schedules: {
            workday: {
              trips: [
                { times: [null, "05:22", "05:23", "05:24", "05:26", "05:28", "05:31", "05:33", "05:35", "05:37", "05:40", "05:42", "05:44", "05:46", "05:48", "05:49", "05:52", "05:55", "05:58", "05:59", "06:01", "06:03", "06:05", "06:07", "06:10", "06:12", "06:13", null] },
              ],
            },
          },
        },
        {
          id: "14-b",
          label: "Farna / Stary Rynek → Piłsudskiego, przez Grzymysław (popołudnie)",
          stops: [
            { name: "Farna" }, { name: "Stary Rynek" }, { name: "Piłsudskiego" }, { name: "Kilińskiego I" },
            { name: "Sikorskiego" }, { name: "Al. Solidarności I" }, { name: "Al. Solidarności II" }, { name: "Kilińskiego III" },
            { name: "Chłapowskiego I" }, { name: "Chłapowskiego II" }, { name: "Staszica I" }, { name: "Gostyńska II nż." },
            { name: "Grzymysław nż." }, { name: "Borgowo" }, { name: "Pysząca II nż." }, { name: "Pysząca I" },
            { name: "Pysząca nż." }, { name: "Wiosenna I nż." }, { name: "Wiosenna II" }, { name: "Rolna" },
            { name: "Grzymysław nż." }, { name: "Staszica II nż." }, { name: "Staszica I" }, { name: "Chłapowskiego II" },
            { name: "Chłapowskiego I" }, { name: "Kilińskiego III" }, { name: "Grunwaldzka" }, { name: "Wojska Polskiego" },
            { name: "Kilińskiego II" }, { name: "Al. Solidarności II" }, { name: "Al. Solidarności I" }, { name: "Sikorskiego" },
            { name: "Piłsudskiego" },
          ],
          schedules: {
            workday: {
              trips: [
                { times: [null, null, null, "13:42", "13:43", "13:44", "13:46", "13:48", "13:51", "13:53", "13:55", "13:57", "14:01", "14:04", "14:06", "14:07", "14:09", "14:11", "14:13", "14:14", "14:17", "14:22", "14:23", "14:25", "14:27", "14:29", "14:31", "14:34", "14:36", "14:38", "14:40", "14:42", null] },
                { times: [null, null, null, "14:42", "14:43", "14:44", "14:46", "14:48", "14:51", "14:53", "14:55", "14:57", "15:01", "15:04", "15:06", "15:07", "15:09", "15:11", "15:13", "15:15", "15:16", "15:21", "15:22", "15:24", "15:26", "15:28", "15:30", "15:33", "15:35", "15:37", "15:39", "15:41", "15:46"] },
              ],
            },
          },
        },
      ],
    },
    {
      id: "15",
      name: "Linia 15",
      hasSchedule: true,
      directions: [
        {
          id: "15-a",
          label: "Farna → Piłsudskiego, przez Nochowo (kurs okrężny)",
          stops: [
            { name: "Farna" }, { name: "Piłsudskiego" }, { name: "Kilińskiego I" }, { name: "Sikorskiego" },
            { name: "Al. Solidarności I" }, { name: "Al. Solidarności II" }, { name: "Grunwaldzka" }, { name: "Chłapowskiego II" },
            { name: "Chłapowskiego I" }, { name: "Nochowo III nż." }, { name: "Nochowo II" }, { name: "Nochowo ul. Jesienna" },
            { name: "Nochowo ul. Jesienna" }, { name: "Nochowo II" }, { name: "Nochowo III nż." }, { name: "Chłapowskiego II" },
            { name: "Chłapowskiego I" }, { name: "Kilińskiego III" }, { name: "Grunwaldzka" }, { name: "Wojska Polskiego" },
            { name: "Kilińskiego II" }, { name: "Al. Solidarności II" }, { name: "Al. Solidarności I" }, { name: "Sikorskiego" },
            { name: "Piłsudskiego" },
          ],
          schedules: {
            workday: {
              trips: [
                { times: [null, null, "05:16", "05:17", "05:18", "05:20", "05:25", "05:28", "05:30", "05:34", "05:37", "05:40", "06:05", "06:07", "06:09", "06:13", "06:15", "06:17", "06:19", "06:22", "06:24", "06:27", "06:29", "06:30", null] },
                { times: [null, null, "13:19", "13:20", "13:21", "13:23", "13:28", "13:31", "13:33", "13:35", "13:38", "13:41", "14:05", "14:08", "14:10", "14:14", "14:16", "14:18", "14:20", "14:23", "14:25", "14:28", "14:30", "14:32", null] },
                { times: [null, null, "21:16", "21:17", "21:18", "21:20", "21:25", "21:28", "21:30", "21:35", "21:38", "21:41", "22:05", "22:08", "22:10", "22:14", "22:16", "22:18", "22:20", "22:23", "22:25", "22:28", "22:30", "22:32", "22:37"] },
              ],
            },
          },
        },
      ],
    },
    {
      id: "16",
      name: "Linia 16",
      hasSchedule: true,
      directions: [
        {
          id: "16-a",
          label: "Piłsudskiego, przez Krzywiń (kurs okrężny)",
          stops: [
            { name: "Piłsudskiego" }, { name: "Kilińskiego I" }, { name: "Kilińskiego II" }, { name: "Kilińskiego III" },
            { name: "Nochowo III nż." }, { name: "Nochowo II" }, { name: "Wyrzeka" }, { name: "Dalewo I" },
            { name: "Dalewo II" }, { name: "Łuszkowo nż." }, { name: "Jerka Rondo" }, { name: "Jerka os.Brzozowiec nż." },
            { name: "Krzywiń Kościańska nż." }, { name: "Krzywiń Rynek" }, { name: "Krzywiń Kościańska nż." }, { name: "Jerka os.Brzozowiec nż." },
            { name: "Jerka Rondo" }, { name: "Łuszkowo nż." }, { name: "Dalewo II" }, { name: "Dalewo I" },
            { name: "Wyrzeka" }, { name: "Nochowo II" }, { name: "Nochowo III nż." }, { name: "Kilińskiego III" },
            { name: "Grunwaldzka" }, { name: "Wojska Polskiego" }, { name: "Kilińskiego II" }, { name: "Kilińskiego I" },
            { name: "Piłsudskiego" },
          ],
          schedules: {
            workday: {
              trips: [
                { times: [null, "05:52", "05:54", "05:56", "05:58", "06:00", "06:05", "06:08", "06:10", "06:14", "06:19", "06:22", "06:26", "06:27", "06:30", "06:34", "06:37", "06:41", "06:45", "06:47", "06:50", "06:55", "06:57", "06:59", "07:02", "07:05", "07:07", "07:09", "07:12"] },
                { times: [null, "09:27", "09:29", "09:31", "09:33", "09:35", "09:40", "09:43", "09:45", "09:49", "09:54", "09:57", "10:01", "10:02", "10:05", "10:09", "10:12", "10:16", "10:20", "10:22", "10:25", "10:30", "10:32", "10:34", "10:36", "10:39", "10:41", "10:42", "10:45"] },
                { times: [null, "15:37", "15:39", "15:41", "15:43", "15:45", "15:50", "15:53", "15:55", "15:59", "16:04", "16:07", "16:11", "16:12", "16:15", "16:19", "16:22", "16:26", "16:30", "16:32", "16:35", "16:40", "16:42", "16:44", "16:46", "16:49", "16:51", "16:52", null] },
                { times: [null, "18:57", "18:59", "19:01", "19:03", "19:05", "19:10", "19:13", "19:15", "19:19", "19:24", "19:27", "19:31", "19:32", "19:35", "19:39", "19:42", "19:46", "19:50", "19:52", "19:55", "20:00", "20:02", "20:04", "20:06", "20:09", "20:11", "20:12", "20:15"] },
              ],
            },
          },
        },
      ],
    },
    {
      id: "17",
      name: "Linia 17",
      hasSchedule: true,
      directions: [
        {
          id: "17-a",
          label: "Piłsudskiego → Farna, przez Zaniemyśl (kurs okrężny)",
          stops: [
            { name: "Piłsudskiego" }, { name: "Kilińskiego I" }, { name: "Sikorskiego" }, { name: "Al. Solidarności I" },
            { name: "Al. Solidarności II" }, { name: "Kilińskiego III" }, { name: "Chłapowskiego I" }, { name: "Chłapowskiego II" },
            { name: "Staszica I" }, { name: "Gostyńska I" }, { name: "Mickiewicza III" }, { name: "Mickiewicza II" },
            { name: "Mickiewicza I" }, { name: "Piłsudskiego" }, { name: "Mechlin I nż." }, { name: "Luciny Skrzyż." },
            { name: "Polesie" }, { name: "Zaniemyśl Rynek" }, { name: "Zaniemyśl Szkoła" }, { name: "Zaniemyśl Szkoła" },
            { name: "Zaniemyśl Rynek" }, { name: "Polesie" }, { name: "Luciny Skrzyż." }, { name: "Zbrudzewo ul. Średzka nż." },
            { name: "Mechlin I nż." }, { name: "Piłsudskiego" }, { name: "Mickiewicza I" }, { name: "Mickiewicza II" },
            { name: "Mickiewicza III" }, { name: "Gostyńska I" }, { name: "Staszica II nż." }, { name: "Staszica I" },
            { name: "Chłapowskiego II" }, { name: "Chłapowskiego I" }, { name: "Kilińskiego III" }, { name: "Al. Solidarności II" },
            { name: "Al. Solidarności I" }, { name: "Sikorskiego" }, { name: "Piłsudskiego" }, { name: "Farna" },
          ],
          schedules: {
            workday: {
              trips: [
                { times: [null, "06:07", "06:08", "06:09", "06:11", "06:13", "06:15", "06:17", "06:19", "06:21", "06:22", "06:23", "06:24", "06:27", "06:30", "06:35", "06:38", "06:40", "06:42", "06:55", "06:57", "07:00", "07:03", "07:08", "07:09", null, "07:16", "07:17", "07:18", "07:20", "07:22", "07:23", "07:25", "07:27", "07:29", "07:31", "07:32", "07:34", "07:38", "07:43"] },
                { times: [null, "09:37", "09:38", "09:39", "09:41", "09:44", "09:46", "09:48", "09:50", "09:52", "09:53", "09:54", "09:55", "09:58", "10:01", "10:06", "10:09", "10:12", "10:15", "10:28", "10:30", "10:34", "10:38", "10:43", "10:44", null, "10:51", "10:52", "10:54", "10:56", "10:58", "10:59", "11:01", "11:03", "11:05", "11:07", "11:08", "11:10", "11:15", null] },
                { times: [null, "16:02", "16:03", "16:04", "16:06", "16:09", "16:13", "16:15", "16:17", "16:19", "16:20", "16:21", "16:22", "16:25", "16:28", "16:33", "16:37", "16:40", "16:42", "16:53", "16:55", "16:59", "17:03", "17:08", "17:09", null, "17:16", "17:17", "17:19", "17:22", "17:24", "17:25", "17:27", "17:29", "17:32", "17:36", "17:37", "17:39", null, null] },
                { times: [null, "18:17", "18:18", "18:19", "18:21", "18:23", "18:25", "18:27", "18:29", "18:31", "18:32", "18:33", "18:34", "18:37", "18:40", "18:45", "18:48", "18:50", "18:52", "18:57", "19:00", "19:04", "19:08", "19:13", "19:14", null, "19:21", "19:22", "19:24", "19:26", "19:28", "19:29", "19:30", "19:32", "19:34", "19:36", "19:37", "19:39", null, null] },
              ],
            },
          },
        },
      ],
    },
    {
      id: "18",
      name: "Linia 18",
      hasSchedule: true,
      directions: [
        {
          id: "18-a",
          label: "Zbrudzewo, przez Piłsudskiego (kurs okrężny)",
          stops: [
            { name: "Zbrudzewo ul. Brylantowa II" }, { name: "Zbrudzewo ul. Brylantowa I" }, { name: "Zbrudzewo ul. Ametystowa nż." }, { name: "Mechlin I nż." },
            { name: "Piłsudskiego" }, { name: "Kilińskiego I" }, { name: "Kilińskiego II" }, { name: "Grunwaldzka" },
            { name: "Staszica I" }, { name: "Gostyńska I" }, { name: "Mickiewicza III" }, { name: "Mickiewicza II" },
            { name: "Mickiewicza I" }, { name: "Piłsudskiego" }, { name: "Mechlin I nż." }, { name: "Zbrudzewo ul. Ametystowa nż." },
            { name: "Zbrudzewo ul. Brylantowa I" }, { name: "Zbrudzewo ul. Brylantowa II" }, { name: "Zbrudzewo ul. Brylantowa II" }, { name: "Zbrudzewo ul. Brylantowa I" },
            { name: "Zbrudzewo ul. Ametystowa nż." }, { name: "Mechlin I nż." }, { name: "Piłsudskiego" }, { name: "Kilińskiego I" },
            { name: "Kilińskiego II" }, { name: "Grunwaldzka" }, { name: "Staszica I" },
          ],
          schedules: {
            workday: {
              trips: [
                { times: ["07:25", "07:27", "07:30", "07:34", null, "07:41", "07:43", "07:45", "07:47", "07:48", "07:50", "07:51", "07:52", "07:55", "07:58", "08:00", "08:02", "08:03", "08:20", "08:22", "08:25", "08:29", null, "08:36", "08:38", "08:40", "08:42"] },
                { times: [null, null, null, null, null, null, null, null, "15:45", "15:46", "15:48", "15:49", "15:50", "15:53", "15:56", "15:58", "16:00", "16:01", "16:03", "16:05", "16:08", "16:12", null, "16:19", "16:21", "16:23", "16:25"] },
                { times: [null, null, null, null, null, null, null, null, "17:20", "17:21", "17:23", "17:24", "17:25", "17:28", "17:31", "17:33", "17:35", "17:36", "17:40", "17:42", "17:45", "17:49", null, "17:56", "17:58", "18:00", "18:02"] },
              ],
            },
          },
        },
      ],
    },
  ],
};
