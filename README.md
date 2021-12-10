# Open Song JavaScript Controller
Aplikacja webowa pozalająca na sterowanie prezentacją programu [OpenSong](http://www.opensong.org/) w sieci lokalnej.

Web app allows you to remote control presentation of [OpenSong](http://www.opensong.org/) in local network.\
**[English version of README (here)](README.eng.md)**

## Autor
> **Górka Mateusz**\
> [kzswieb.eu](http://kzswieb.eu)

**Daj mi znać jeśli używasz tej aplikacji! ;)**

## Spis treści
- [Open Song JavaScript Controller](#open-song-javascript-controller)
  - [Autor](#autor)
  - [Spis treści](#spis-treści)
  - [Funkcjonalności](#funkcjonalności)
  - [Uruchomienie](#uruchomienie)
  - [Konfiguracja](#konfiguracja)
  - [Zawartość](#zawartość)
  - [Specyfikacja](#specyfikacja)
  - [Wyjątki](#wyjątki)
  - [TODO](#todo)
  - [IDEA](#idea)

## Funkcjonalności
- Panel powitania z możliwością konfiguracji adresu ip;
- Wyświetlanie listy slajdów;
- Nawigacja w prezentacji: następny, poprzedni slajd;
- Włączenie trybów: Czarny ekran, biały ekran, zamrożony ekran, wyświetl tlo, wyświetl logo;
- Wyświetla tryb w jakim znajduje się program;

## Uruchomienie
- Aplikację możesz otworzyć niemal w każdej przeglądarce;
- Warto w routerze ustawić adres komputera do prezentacji na statyczny;
- Sposoby uruchomienia aplikacji:

    1. Pobierz kod i otwórz lokalnie na urządzeniu;
    2. Otwórz aplikację z serwerze www, np.
        [kzswieb.eu/_app/controller](http://app.kzswieb.eu/controller)

- Przed uruchomieniem należy włączyć API w OpenSong'u:

    Ustawienia > Ustawienia Programu >  System > `Automation API`
    - [x] Znaczyć "Włącz serwer zdalnej kontroli",
    - [x] Spisać, lub ustawić własny port sieciowy;

- Adres IP komputera sprawdzisz w wierszu poleceń: poleceniem `ipconfig` (Windows) lub `ifconfig` (Linux);

## Konfiguracja
Warto skonfigurować domyślny adres IP komputera,
żeby to zrobić należy zmienić deklaracje zmiennej `IP_COMP` na początku pliku `js/main.js`.

    var IP_COMP = '192.168.1.104:8082'

## Zawartość
- `index.html` - Polska wersja aplikacji
- `index.eng.html` - Wersja aplikacji po angielsku

____
## Specyfikacja
- Aplikacja webowa w JS, HTML, CSS
- Wykorzystuje **API** programu Open Song.
- Wykorzystuje bibliotekę jQuery.
- Testy w przeglądarkach:
    - Nie zauważono problemów:
        - android: chrome, firefox
        - windows10: chrome, firefox
    - Nie działa na:
        - windows10: internet explorer

## Wyjątki
- `ERROR (1)` - Błąd zapytania - Status odpowiedzi inny niż `success`
- `ERROR (2)` - Błąd komunikacji - błąd GET
- `ERROR (3)` - Błąd komunikacji - błąd POST

W przypadku każdego z błędów należy sprawdzić:
ustawienia OpenSonga, poprawność IP i portu, uprawnienia firewall'a dla OpenSonga,

___
## TODO
- [ ] Uruchamianie zestawu
- [ ] Wyświetlanie podglądu
- [ ] Zapisywanie IP w cookie lub local storage

## IDEA
- [ ] wbudowany komunikat
- [ ] własne komunikaty

__
Copyright (c) 2020 Górka Mateusz
