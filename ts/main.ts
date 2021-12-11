//! Aplication config
/// IP adress of OpenSong computer
var IP_COMP = '192.168.8.113:8080'

interface ButtonConfig {
    selector: string,
    action: any
}

const BUTTONS: Array<ButtonConfig> = [
    {
        /// Butt - Welcome
        selector: '#butt-welcome',
        action: () => {
            IP_COMP = $('#ip-address').val() as string
            updateList()
            $('#welcome').fadeOut('fast')
        }
    },
    {
        selector: '#slides-con',
        action: () => {
            updateList();
            updateStatus()
        }
    },
    {
        /// Butt - Extendent panel
        selector: '#butt-ext',
        action: () => { $('#ext-panel').toggle() }
    },
    {
        /// Butt - next
        selector: '#butt-next',
        action: () => {
            $.post("http://" + IP_COMP + "/presentation/slide/next", () => { changeSlide(1) })
        }
    },
    {
        /// Butt - previous
        selector: '#butt-prev',
        action: () => {
            $.post("http://" + IP_COMP + "/presentation/slide/previous", () => { changeSlide(-1) })
        }
    },
    {
        /// Butt - normal mode
        selector: '.butt-normal',
        action: () => {
            $.post("http://" + IP_COMP + "/presentation/screen/normal", () => updateStatus())
        }
    },
    {
        /// Butt - freez mode
        selector: '.butt-freeze',
        action: () => {
            $.post("http://" + IP_COMP + "/presentation/screen/freeze", () => updateStatus())
        }
    },
    {
        /// Butt - black mode
        selector: '.butt-black',
        action: () => {
            $.post("http://" + IP_COMP + "/presentation/screen/black", () => updateStatus())
        }
    },
    {
        /// Butt - white mode
        selector: '.butt-white',
        action: () => {
            $.post("http://" + IP_COMP + "/presentation/screen/white", () => updateStatus())
        }
    },
    {
        /// Butt - background mode
        selector: '.butt-background',
        action: () => {
            $.post("http://" + IP_COMP + "/presentation/screen/hide", () => updateStatus())
        }
    },
    {
        /// Butt - logo mode
        selector: '.butt-logo',
        action: () => {
            $.post("http://" + IP_COMP + "/presentation/screen/logo", () => updateStatus())
        }
    }
]

$(document).ready(function () {
    $('#ip-address').val(IP_COMP)

    for (const button of BUTTONS)
        $(button.selector).click(button.action)

    updateList()
})

function displayError(err = 1) {
    $('#error' + err).show();
    $('#welcome').fadeIn(1000)
}

function updateStatus(onSuccess = () => { }) {
    $.get(
        `http://${IP_COMP}/presentation/status`,
        (data, status, xhr) => {
            if (status == "success") {
                setStatusView(xhr)
                onSuccess()
            }
            else {
                console.error(data, status, xhr)
                displayError()
            }
        }
    ).fail(() => { displayError(2) })
}

function setStatusView(xhr: JQuery.jqXHR<any>): void {
    const $xml = $($.parseXML(xhr.responseText))
    const itemNumber = $xml.find('slide').attr('itemnumber')
    const mode = $xml.find('screen').attr('mode')

    $('.current').removeClass('current')
    $('#slides-con').find("#slide" + itemNumber).addClass('current')
    $('#mode').text(getStatusDescription(mode))
}

function getStatusDescription(mode: string): string {
    switch (mode) {
        case 'N': return ""
        case 'F': return "Zamrożony ekran"
        case 'L': return "Wyświetla logo"
        case 'H': return "Tylko tło"
        case 'B': return "Czarny ekran"
        case 'W': return "Biały ekran"
    }
    return "Nie znany tryb"
}

function changeSlide(slideMove: number) {
    const currentSlideId: number = Number($('.current').find('i').text())
    const $moved = $(`#slide${currentSlideId + slideMove}`)
    $moved.addClass('moved')
    return updateStatus(() => { $moved.removeClass('moved') })
}

function updateList() {
    $.get(
        `http://${IP_COMP}/presentation/slide/list`,
        (data, status, xhr) => {
            if (status == "success") {
                setSlidesListView(xhr)
                updateStatus()
            }
            else {
                console.error(data, status, xhr)
                displayError()
            }
        }
    ).fail(function () { displayError(3) })
}

function setSlidesListView(xhr: JQuery.jqXHR<any>) {
    const $xml = $($.parseXML(xhr.responseText))
    const $listCon = $('#slides-con')
    $listCon.empty()

    $xml.find('response').children().each(function () {
        let $row = createListItem(this)
        $listCon.append($row)
    })

    function createListItem(item: HTMLElement): JQuery<HTMLElement> {
        const identifier = $(item).attr('identifier')
        const name = $(item).attr('name')
        const type = $(item).attr('type')

        let $row = $('<li></li>')
        $row.attr("id", `slide${identifier}`)
        $row.addClass(type)
        $row.append(`<i>${identifier}</i>`)
        $row.append(`<b>${name}</b>`)
        $row.append(`<a>${type}</a>`)
        return $row
    }
}
