//! Aplication config
/// IP adress of OpenSong computer
var IP_COMP = '192.168.8.113:8080';
$(document).ready(function () {
    /// Default loading list of slides
    updateList();
    ////------------------------------------
    /// Welcome panel
    $('#ip-address').val(IP_COMP);
    /// Butt - Welcome
    $('#butt-welcome').click(function () {
        IP_COMP = $('#ip-address').val();
        updateList();
        $('#welcome').fadeOut('fast');
    });
    ////------------------------------------
    $('#slides-con').click(function () {
        updateList();
        updateStatus();
    });
    ////------------------------------------
    /// Butt - Extendent panel
    $('#butt-ext').click(function () {
        $('#ext-panel').toggle();
    });
    /// Butt - next
    $('#butt-next').click(function () {
        $.post("http://" + IP_COMP + "/presentation/slide/next", function () { changeSlide(1); });
    });
    /// Butt - previous
    $('#butt-prev').click(function () {
        $.post("http://" + IP_COMP + "/presentation/slide/previous", function () { changeSlide(-1); });
    });
    /// Butt - normal mode
    $('.butt-normal').click(function () {
        $.post("http://" + IP_COMP + "/presentation/screen/normal", function () { updateStatus(); });
    });
    /// Butt - freez mode
    $('.butt-freeze').click(function () {
        $.post("http://" + IP_COMP + "/presentation/screen/freeze", function () { updateStatus(); });
    });
    /// Butt - black mode
    $('.butt-black').click(function () {
        $.post("http://" + IP_COMP + "/presentation/screen/black", function () { updateStatus(); });
    });
    /// Butt - white mode
    $('.butt-white').click(function () {
        $.post("http://" + IP_COMP + "/presentation/screen/white", function () { updateStatus(); });
    });
    /// Butt - background mode
    $('.butt-background').click(function () {
        $.post("http://" + IP_COMP + "/presentation/screen/hide", function () { updateStatus(); });
    });
    /// Butt - logo mode
    $('.butt-logo').click(function () {
        $.post("http://" + IP_COMP + "/presentation/screen/logo", function () { updateStatus(); });
    });
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
