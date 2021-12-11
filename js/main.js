"use strict";
const DEFAULT_IP_ADDRESS = '192.168.8.113:8080';
class APIProvider {
    constructor() {
        this.ip_address = DEFAULT_IP_ADDRESS;
    }
    get(endpoint, onSuccess) {
        return $.get(this.get_url(endpoint), this.success_control(onSuccess));
    }
    post(endpoint, onSuccess) {
        return $.post(this.get_url(endpoint), this.success_control(onSuccess));
    }
    get_url(endpoint) {
        return `http://${this.ip_address}/${endpoint}`;
    }
    success_control(onSuccess) {
        return (data, status, xhr) => {
            if (status == "success") {
                onSuccess(xhr, status, data);
            }
            else {
                console.error(xhr, status, data);
                displayError();
            }
        };
    }
}
const Api = new APIProvider();
const BUTTONS_CONFIGURATION = [
    {
        selector: '#butt-welcome',
        action: () => {
            Api.ip_address = $('#ip-address').val();
            updateList();
            $('#welcome').fadeOut('fast');
        }
    },
    {
        selector: '#slides-con',
        action: () => {
            updateList();
            updateStatus();
        }
    },
    {
        selector: '#butt-ext',
        action: () => { $('#ext-panel').toggle(); }
    },
    {
        selector: '#butt-next',
        action: () => Api.post("presentation/slide/next", () => { changeSlide(1); })
    },
    {
        selector: '#butt-prev',
        action: () => Api.post("presentation/slide/previous", () => { changeSlide(-1); })
    },
    {
        selector: '.butt-normal',
        action: () => Api.post("presentation/screen/normal", () => updateStatus())
    },
    {
        selector: '.butt-freeze',
        action: () => Api.post("presentation/screen/freeze", () => updateStatus())
    },
    {
        selector: '.butt-black',
        action: () => Api.post("presentation/screen/black", () => updateStatus())
    },
    {
        selector: '.butt-white',
        action: () => Api.post("presentation/screen/white", () => updateStatus())
    },
    {
        selector: '.butt-background',
        action: () => Api.post("presentation/screen/hide", () => updateStatus())
    },
    {
        selector: '.butt-logo',
        action: () => Api.post("presentation/screen/logo", () => updateStatus())
    }
];
$(document).ready(function () {
    $('#ip-address').val(Api.ip_address);
    for (const button of BUTTONS_CONFIGURATION)
        $(button.selector).click(button.action);
    updateList();
});
function displayError(err_id = "1") {
    $(`#error${err_id}`).show();
    $('#welcome').fadeIn(1000);
}
function updateStatus(onSuccess = () => { }) {
    Api.get('presentation/status', (data, status, xhr) => {
        setStatusView(xhr);
        onSuccess();
    }).fail(() => { displayError("2"); });
}
function setStatusView(xhr) {
    const $xml = $($.parseXML(xhr.responseText));
    const itemNumber = $xml.find('slide').attr('itemnumber');
    const mode = $xml.find('screen').attr('mode');
    $('.current').removeClass('current');
    $('#slides-con').find("#slide" + itemNumber).addClass('current');
    $('#mode').text(getStatusDescription(mode));
}
function getStatusDescription(mode) {
    switch (mode) {
        case 'N': return "";
        case 'F': return "Zamrożony ekran";
        case 'L': return "Wyświetla logo";
        case 'H': return "Tylko tło";
        case 'B': return "Czarny ekran";
        case 'W': return "Biały ekran";
    }
    return "Nie znany tryb";
}
function changeSlide(slideMove) {
    const currentSlideId = Number($('.current').find('i').text());
    const $moved = $(`#slide${currentSlideId + slideMove}`);
    $moved.addClass('moved');
    return updateStatus(() => { $moved.removeClass('moved'); });
}
function updateList() {
    Api.get('presentation/slide/list', (data, status, xhr) => {
        setSlidesListView(xhr);
        updateStatus();
    }).fail(() => { displayError("3"); });
}
function setSlidesListView(xhr) {
    const $xml = $($.parseXML(xhr.responseText));
    const $listCon = $('#slides-con');
    $listCon.empty();
    $xml.find('response').children().each(function () {
        let $row = createListItem(this);
        $listCon.append($row);
    });
    function createListItem(slide) {
        const identifier = $(slide).attr('identifier');
        const name = $(slide).attr('name');
        const type = $(slide).attr('type');
        let $item = $('<li></li>');
        $item.attr("id", `slide${identifier}`);
        $item.addClass(type);
        $item.append(`<i>${identifier}</i>`);
        $item.append(`<b>${name}</b>`);
        $item.append(`<a>${type}</a>`);
        return $item;
    }
}
//# sourceMappingURL=main.js.map