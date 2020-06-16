# OpenSongController V0.0.0
>  Aplikacja webowa pozalająca na sterowanie prezentacją programu [OpenSong](http://www.opensong.org/) w sieci lokalnej.

## Autor
>   **Górka Mateusz**\
>   kzswieb.eu

## Spis treści

[OpenSongController](#OpenSongController)
- [Autor](#Autor)
- [Konfiguracja](Konfiguracja)
- [Wykorzystanie](#Wykorzystanie)
- [Zawartość](#Zawartość)
- [Funkcjonalności](#Funkcjonalności)
- [Wyjątki](#Wyjątki)

## Konfiguracja
**Obowiązkowo trzeba skonfigurować adres IP komputera na którym jest uruchomiony program Open Song, oraz port wykorzystywane przez Open Song!**

Na poczatku pliku `config.js`, należy odpowiednio nadpisać zmienną `IP_COMP`.
np.

    const IP_COMP = 'http://192.168.1.104:8082'

## Wykrzystanie
Aplikację można otworzyć niemal w każdej przeglądarce sieciowej, nie wymaga komunikacji z serwerem.

Polecamy trzy sposoby wykorzystania:
- Zapisanie aplikacji na urządzeniu i otwieranie go lokalnie w przeglądarce;
- Uruchomienie wirtualnego serwera na komputerze w sieci lokalnej;
- Umieszczenie aplikacji na serwerze zdalnym służącym jedynie jako magazyn kodu;

____
## Specyfikacja
> Aplikacja webowa oparta na JS, HTML, CSS
- Aplikacja wykorzystuje API programu Open Song.
- Wykorzystuje bibliotekę jQuery.

## Zawartość
(...)

## Funkcjonalności
- nawigacja prezentacją, nastepny, poprzedni
- wyświetanie listy slajdów
- czarny ekran, biały ekran, zamrożony ekran
- przyciski wyswietl tlo, wyswietl logo

## Wyjątki
(...)

## TODO
etap 1:
- [ ] wbudowany komunikat
- [ ] własne komunikaty
- wyswietlanie trybu w jakim sie znajduje

etap 2:
- [ ] Uruchamienie zestawu
- [ ] wyswietlanie podglądu

- [ ] Po polsku i po angielsku