# Open Song JavaScript Controller
Aplikacja webowa pozwalająca na sterowanie prezentacją programu [OpenSong](http://www.opensong.org/) w sieci lokalnej.

A web app allows you to remote control presentation of [OpenSong](http://www.opensong.org/) program in the local network.
<!-- **[English version of README (here)](README.eng.md)** -->

## Autor
> [Górka Mateusz](https://goorkamateusz.github.io)\
> [kzswieb.eu](http://kzswieb.eu)

**Daj mi znać jeśli używasz tej aplikacji! ;)**

## Spis treści
- [Open Song JavaScript Controller](#open-song-javascript-controller)
  - [Autor](#autor)
  - [Spis treści](#spis-treści)
  - [Funkcjonalności](#funkcjonalności)
  - [Uruchomienie](#uruchomienie)
  - [Zawartość](#zawartość)
  - [Specyfikacja](#specyfikacja)
  - [To Do](#to-do)

## Funkcjonalności
- Wyświetlanie listy slajdów;
- Nawigacja w prezentacji: następny, poprzedni slajd;
- Przełączanie trybów prezentacji: czarny ekran, biały ekran, zamrożony ekran, wyświetl tlo, wyświetl logo;
- Wyświetla tryb w jakim znajduje się program;
- Zapisuje w przeglądarce ostatnio konfigurowany adres IP;

## Uruchomienie
- Otwórz aplikację udostępnioną na stronie [OpenSongController](https://goorkamateusz.github.io/OpenSongController);
- Przed uruchomieniem należy włączyć API w OpenSong'u:

    `Ustawienia > Ustawienia programu... > System > Automation API`
    - [x] Znaczyć "Włącz serwer zdalnej kontroli",
    - [x] Przepisać lub ustawić własny port sieciowy;

- Adres IP komputera sprawdzisz w wierszu poleceń: poleceniem `ipconfig` (Windows) lub `ifconfig` (Linux);
- Warto w routerze ustawić adres komputera do prezentacji na statyczny;
- Sprawdź czy firewall nie blokuje ruchu sieciowego dla aplikacji;

## Zawartość
- `index.html` - Polska wersja aplikacji
<!-- - `index.eng.html` - Wersja aplikacji po angielsku -->

____
## Specyfikacja
- Aplikacja webowa w TypeScript, HTML, CSS
- Wykorzystuje **API** programu Open Song.
- Wykorzystuje bibliotekę jQuery.
- Testy w przeglądarkach:
    - Nie zauważono problemów:
        - android: chrome, firefox
        - windows10: chrome, firefox
    - Nie działa na:
        - windows10: internet explorer

___
## To Do
- [ ] Uruchamianie zestawu
- [ ] Wyświetlanie podglądu
- [ ] wbudowany komunikat
- [ ] własne komunikaty

___
Copyright (c) 2020 Górka Mateusz
