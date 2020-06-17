# OpenSongController V0.0.0
> Web app allows you to remote controle presentation of [OpenSong](http://www.opensong.org/) in local network.\
> [**Polska wersja dokumentacji README.md**](README.md)

## Author
>   **Górka Mateusz**\
>   [kzswieb.eu](kzswieb.eu)\
>   maatiug@gmail.com

**Give me feedback if you use that app! ;)**

## Contents
- [Author](#Author)
- [Features](#Features)
- [Configuration](#Configuration)
- [Start-Up](#Start-Up)
- [Content](#Content)
- [Specification](#Specification)
- [Exceptions](#Exceptions)

## Features
- Welcome panel with ip address configuration;
- Display a list of slides;
- Presentation navigation: next, previous slide
- Use modes: black screen, white screen, freeze screen, hide and logo;
- Show a current mode;

## Start-Up
- You can run application just in browser;
- It's worth it to set static ip address on your router.
- Ways to run application:

    1. Download a code and open local in browser
    2. Open app form a server www, ex.
        [kzswieb.eu/_app/controller](kzswieb.eu/_app/controller)

- Befor start you have tou turn on an API in OpenSong:

    Settings > Program Settings > System > `Automation API`:
    - [x] Select checkbox,
    - [x] Rewritr or set cutom network port;

- IP address you can check in command window, by command `ipconfig` (Windows) or `ifconfig` (Linux);

## Configuratio
It's worth to configure a default IP address of computer.
To do that you have to change declaration of variable `IP_COMP` on the begining of `js/main.js` file.

    var IP_COMP = '192.168.1.104:8082'

## Content
- `index.html` - Polish version of app
- `index.eng.html` - English version of app

____
## Specification
> Web app in JS, HTML, CSS
- App use a **API** of Open Song;
- App use a jQuery library;
- Tests in browsers:
    - No found errors:
        - android: chrome, firefox
        - windows10: chrome, firefox
    - Not working:
        - windows10: internet explorer

## Exceptions
- `ERROR (1)` - Respond error - Status of respond other than `success`
- `ERROR (2)` - Communication error - error of GET
- `ERROR (3)` - Communication error - error of POST