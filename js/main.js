//! Aplication config
/// IP adress of OpenSong computer
var IP_COMP = '192.168.8.113:8080';
var BUTTONS = [
    {
        /// Butt - Welcome
        selector: '#butt-welcome',
        action: function () {
            IP_COMP = $('#ip-address').val();
            updateList();
            $('#welcome').fadeOut('fast');
        }
    },
    {
        selector: '#slides-con',
        action: function () {
            updateList();
            updateStatus();
        }
    },
    {
        /// Butt - Extendent panel
        selector: '#butt-ext',
        action: function () { $('#ext-panel').toggle(); }
    },
    {
        /// Butt - next
        selector: '#butt-next',
        action: function () {
            $.post("http://" + IP_COMP + "/presentation/slide/next", function () { changeSlide(1); });
        }
    },
    {
        /// Butt - previous
        selector: '#butt-prev',
        action: function () {
            $.post("http://" + IP_COMP + "/presentation/slide/previous", function () { changeSlide(-1); });
        }
    },
    {
        /// Butt - normal mode
        selector: '.butt-normal',
        action: function () {
            $.post("http://" + IP_COMP + "/presentation/screen/normal", function () { return updateStatus(); });
        }
    },
    {
        /// Butt - freez mode
        selector: '.butt-freeze',
        action: function () {
            $.post("http://" + IP_COMP + "/presentation/screen/freeze", function () { return updateStatus(); });
        }
    },
    {
        /// Butt - black mode
        selector: '.butt-black',
        action: function () {
            $.post("http://" + IP_COMP + "/presentation/screen/black", function () { return updateStatus(); });
        }
    },
    {
        /// Butt - white mode
        selector: '.butt-white',
        action: function () {
            $.post("http://" + IP_COMP + "/presentation/screen/white", function () { return updateStatus(); });
        }
    },
    {
        /// Butt - background mode
        selector: '.butt-background',
        action: function () {
            $.post("http://" + IP_COMP + "/presentation/screen/hide", function () { return updateStatus(); });
        }
    },
    {
        /// Butt - logo mode
        selector: '.butt-logo',
        action: function () {
            $.post("http://" + IP_COMP + "/presentation/screen/logo", function () { return updateStatus(); });
        }
    }
];
$(document).ready(function () {
    $('#ip-address').val(IP_COMP);
    for (var _i = 0, BUTTONS_1 = BUTTONS; _i < BUTTONS_1.length; _i++) {
        var button = BUTTONS_1[_i];
        $(button.selector).click(button.action);
    }
    updateList();
});
function displayError(err) {
    if (err === void 0) { err = 1; }
    $('#error' + err).show();
    $('#welcome').fadeIn(1000);
}
function updateStatus(onSuccess) {
    if (onSuccess === void 0) { onSuccess = function () { }; }
    $.get("http://".concat(IP_COMP, "/presentation/status"), function (data, status, xhr) {
        if (status == "success") {
            setStatusView(xhr);
            onSuccess();
        }
        else {
            console.error(data, status, xhr);
            displayError();
        }
    }).fail(function () { displayError(2); });
}
function setStatusView(xhr) {
    var $xml = $($.parseXML(xhr.responseText));
    var itemNumber = $xml.find('slide').attr('itemnumber');
    var mode = $xml.find('screen').attr('mode');
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
    var currentSlideId = Number($('.current').find('i').text());
    var $moved = $("#slide".concat(currentSlideId + slideMove));
    $moved.addClass('moved');
    return updateStatus(function () { $moved.removeClass('moved'); });
}
function updateList() {
    $.get("http://".concat(IP_COMP, "/presentation/slide/list"), function (data, status, xhr) {
        if (status == "success") {
            setSlidesListView(xhr);
            updateStatus();
        }
        else {
            console.error(data, status, xhr);
            displayError();
        }
    }).fail(function () { displayError(3); });
}
function setSlidesListView(xhr) {
    var $xml = $($.parseXML(xhr.responseText));
    var $listCon = $('#slides-con');
    $listCon.empty();
    $xml.find('response').children().each(function () {
        var $row = createListItem(this);
        $listCon.append($row);
    });
    function createListItem(item) {
        var identifier = $(item).attr('identifier');
        var name = $(item).attr('name');
        var type = $(item).attr('type');
        var $row = $('<li></li>');
        $row.attr("id", "slide".concat(identifier));
        $row.addClass(type);
        $row.append("<i>".concat(identifier, "</i>"));
        $row.append("<b>".concat(name, "</b>"));
        $row.append("<a>".concat(type, "</a>"));
        return $row;
    }
}
