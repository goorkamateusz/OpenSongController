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
        $.post("http://" + IP_COMP + "/presentation/slide/next", function () { moveSlide(1); });
    });
    /// Butt - previous
    $('#butt-prev').click(function () {
        $.post("http://" + IP_COMP + "/presentation/slide/previous", function () { moveSlide(-1); });
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
/** Show communicat about error. */
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
/** Move by vect slide.
 * \param[in] vect - number of slide, vect>0 -> move down, vect<0 -> move up
 */
function moveSlide(vect) {
    var $moved = $('#slide' + (Number($('.current').find('i').text()) + vect));
    $moved.addClass('moved');
    return updateStatus(function () { $moved.removeClass('moved'); });
}
/** Update list of slides. */
function updateList() {
    $.get("http://" + IP_COMP + "/presentation/slide/list", function (data, status, xhr) {
        if (status == "success") {
            var $xml = $($.parseXML(xhr.responseText));
            var $listCon_1 = $('#slides-con');
            $listCon_1.empty();
            $xml.find('response').children().each(function () {
                var $row = $('<li></li>');
                $row.attr("id", "slide" + $(this).attr('identifier'));
                $row.append("<i>" + $(this).attr('identifier') + "</i>");
                $row.append("<b>" + $(this).attr('name') + "</b>");
                var type = $(this).attr('type');
                $row.addClass(type);
                $row.append("<a>" + type + "</a>");
                $listCon_1.append($row);
            });
            updateStatus();
        }
        else {
            console.error(data, status, xhr);
            displayError();
        }
    }).fail(function () { displayError(3); });
}
