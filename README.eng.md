# Open Song JavaScript Controller
Web app allows you to remote control a presentation of the [OpenSong](http://www.opensong.org/) software in the local network.\
[**Polska wersja dokumentacji README.md**](README.md)

## Author
> **Górka Mateusz**\
> [kzswieb.eu](http://kzswieb.eu)

**Give me feedback if you use that app! ;)**

## Contents
- [Open Song JavaScript Controller](#open-song-javascript-controller)
  - [Author](#author)
  - [Contents](#contents)
  - [Features](#features)
  - [Start-Up](#start-up)
  - [Configuration](#configuration)
  - [Content](#content)
  - [Specification](#specification)
  - [Exceptions](#exceptions)

## Features
- Welcome panel with the ip address of OpenSong instance configuration;
- Displaying a list of slides;
- The presentation navigation: next, previous slide buttons;
- The use modes: black screen, white screen, freeze screen, hide and logo mode;
- Showing a current mode in OpenSong;

## Start-Up
- You can run application just in the browser;
- It's worth it to set static ip address on your router for computer with the Open Song.
- Ways to run the application:

    1. Download the code and open locally in your browser;
    2. Open the app form the www server, for example here:
        [OpenSongController Online](https://goorkamateusz.github.io/OpenSongController/index.eng.html)

- Before start you have to turn on an API in the OpenSong:

    Settings > Program Settings > System > `Automation API`:
    - [x] Select checkbox,
    - [x] Rewritr or set cutom network port;

- IP address you can check in command window, by command `ipconfig` (Windows) or `ifconfig` (Linux);

## Configuration
It's worth to configure a default IP address of your computer.
To do that you have to change declaration of variable `IP_COMP` on the beginning of `js/main.js` file (if you use your own instance of OpenSong)

    var IP_COMP = '192.168.1.104:8082'

## Content
- `index.html` - Polish version of the app;
- `index.eng.html` - English version of the app;

____
## Specification
- Web app in JS, HTML, CSS
- API of Open Song software;
- jQuery library;
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

In all of errors:
check a IP address and port, the Open Song settings, the firewall permission.


Copyright (c) 2020 Górka Mateusz