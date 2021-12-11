/// Default IP address of OpenSong computer
const DEFAULT_IP_ADDRESS = '192.168.1.100:8080'

class APIProvider {
    static IP_ADDRESS_KEY = "ip_address"

    _ip_address: string

    public get ip_address() {
        return this._ip_address
    }

    public set ip_address(address: string) {
        this._ip_address = address
        localStorage.setItem(APIProvider.IP_ADDRESS_KEY, address)
    }

    public constructor() {
        this._ip_address = localStorage.getItem(APIProvider.IP_ADDRESS_KEY) || DEFAULT_IP_ADDRESS
    }

    public get(endpoint: string, onSuccess: any): JQuery.jqXHR<any> {
        return $.get(this.get_url(endpoint), this.success_control(onSuccess))
    }

    public post(endpoint: string, onSuccess: any): JQuery.jqXHR<any> {
        return $.post(this.get_url(endpoint), this.success_control(onSuccess))
    }

    private get_url(endpoint: string): string {
        return `http://${this.ip_address}/${endpoint}`
    }

    private success_control(onSuccess: any) {
        return (data: any, status: string, xhr: JQuery.jqXHR<any>): void => {
            if (status == "success") {
                onSuccess(data, status, xhr)
            }
            else {
                console.error(data, status, xhr)
                displayError()
            }
        }
    }
}

interface ButtonConfig {
    selector: string,
    action: any
}

const Api = new APIProvider()

const BUTTONS_CONFIGURATION: Array<ButtonConfig> = [
    {
        /// Butt - Welcome
        selector: '#butt-welcome',
        action: () => {
            Api.ip_address = $('#ip-address').val() as string
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
        action: () => Api.post("presentation/slide/next", () => { changeSlide(1) })
    },
    {
        /// Butt - previous
        selector: '#butt-prev',
        action: () => Api.post("presentation/slide/previous", () => { changeSlide(-1) })
    },
    {
        /// Butt - normal mode
        selector: '.butt-normal',
        action: () => Api.post("presentation/screen/normal", () => updateStatus())
    },
    {
        /// Butt - freez mode
        selector: '.butt-freeze',
        action: () => Api.post("presentation/screen/freeze", () => updateStatus())
    },
    {
        /// Butt - black mode
        selector: '.butt-black',
        action: () => Api.post("presentation/screen/black", () => updateStatus())
    },
    {
        /// Butt - white mode
        selector: '.butt-white',
        action: () => Api.post("presentation/screen/white", () => updateStatus())
    },
    {
        /// Butt - background mode
        selector: '.butt-background',
        action: () => Api.post("presentation/screen/hide", () => updateStatus())
    },
    {
        /// Butt - logo mode
        selector: '.butt-logo',
        action: () => Api.post("presentation/screen/logo", () => updateStatus())
    }
]

$(document).ready(function () {
    $('#ip-address').val(Api.ip_address)

    for (const button of BUTTONS_CONFIGURATION)
        $(button.selector).click(button.action)

    updateList()
})

function displayError(err_id: string = "1") {
    $(`#error${err_id}`).show();
    $('#welcome').fadeIn(1000)
}

function updateStatus(onSuccess = () => { }) {
    Api.get('presentation/status', (data: any, status: string, xhr: JQuery.jqXHR<any>) => {
        setStatusView(xhr)
        onSuccess()
    }
    ).fail(() => { displayError("2") })
}

function setStatusView(xhr: JQuery.jqXHR<any>): void {
    const $xml = $($.parseXML(xhr.responseText))
    const itemNumber = $xml.find('slide').attr('itemnumber')
    const mode = $xml.find('screen').attr('mode') as string

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
    Api.get('presentation/slide/list', (data: any, status: string, xhr: JQuery.jqXHR<any>) => {
        setSlidesListView(xhr)
        updateStatus()
    }
    ).fail(() => { displayError("3") })
}

function setSlidesListView(xhr: JQuery.jqXHR<any>) {
    const $xml = $($.parseXML(xhr.responseText))
    const $listCon = $('#slides-con')
    $listCon.empty()

    $xml.find('response').children().each(function () {
        let $row = createListItem(this)
        $listCon.append($row)
    })

    function createListItem(slide: HTMLElement): JQuery<HTMLElement> {
        const identifier = $(slide).attr('identifier')
        const name = $(slide).attr('name')
        const type = $(slide).attr('type') as string

        let $item = $('<li></li>')
        $item.attr("id", `slide${identifier}`)
        $item.addClass(type)
        $item.append(`<i>${identifier}</i>`)
        $item.append(`<b>${name}</b>`)
        $item.append(`<a>${type}</a>`)
        return $item
    }
}
