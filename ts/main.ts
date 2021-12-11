//! Aplication config
/// IP adress of OpenSong computer
var IP_COMP = '192.168.8.113:8080'

var $currentSlide = undefined

$(document).ready(function () {
    /// Default loading list of slides
    updateList()

    ////------------------------------------
    /// Welcome panel
    $('#ip-address').val(IP_COMP)

    /// Butt - Welcome
    $('#butt-welcome').click(() => {
        IP_COMP = $('#ip-address').val() as string

        updateList()
        $('#welcome').fadeOut('fast')
    })

    ////------------------------------------
    $('#slides-con').click(() => {
        updateList();
        updateCurrent()
    })

    ////------------------------------------
    /// Butt - Extendent panel
    $('#butt-ext').click(function () {
        $('#ext-panel').toggle()
    })

    /// Butt - next
    $('#butt-next').click(function () {
        $.post("http://" + IP_COMP + "/presentation/slide/next",
            function () { moveSlide(1) })
    })

    /// Butt - previous
    $('#butt-prev').click(function () {
        $.post("http://" + IP_COMP + "/presentation/slide/previous",
            function () { moveSlide(-1) })
    })

    /// Butt - normal mode
    $('.butt-normal').click(function () {
        $.post("http://" + IP_COMP + "/presentation/screen/normal",
            function () { updateCurrent() })
    })

    /// Butt - freez mode
    $('.butt-freeze').click(function () {
        $.post("http://" + IP_COMP + "/presentation/screen/freeze",
            function () { updateCurrent() })
    })

    /// Butt - black mode
    $('.butt-black').click(function () {
        $.post("http://" + IP_COMP + "/presentation/screen/black",
            function () { updateCurrent() })
    })

    /// Butt - white mode
    $('.butt-white').click(function () {
        $.post("http://" + IP_COMP + "/presentation/screen/white",
            function () { updateCurrent() })
    })

    /// Butt - background mode
    $('.butt-background').click(function () {
        $.post("http://" + IP_COMP + "/presentation/screen/hide",
            function () { updateCurrent() })
    })

    /// Butt - logo mode
    $('.butt-logo').click(function () {
        $.post("http://" + IP_COMP + "/presentation/screen/logo",
            function () { updateCurrent() })
    })
})

/** Show communicat about error. */
function displayError(err = 1) {
    $('#error' + err).show();
    $('#welcome').fadeIn(1000)
}

/** Select a current slide on list.
 * \param[in] $listCon - jQuery object of #slides-con
 * \param[in] ffinish - function to do after select.
 */
function updateCurrent($listCon = $('#slides-con'), onFinish = () => { }) {
    $.get(
        "http://" + IP_COMP + "/presentation/status",
        (data, status, xhr) => {
            if (status == "success") {
                let $xml = $($.parseXML(xhr.responseText))

                // Current slide
                if ($currentSlide)
                    $currentSlide.removeClass('current')
                $currentSlide = $listCon.find("#slide" + $xml.find('slide').attr('itemnumber'))
                $currentSlide.addClass('current')

                // On mode
                var mode = $xml.find('screen').attr('mode')
                switch (mode) {
                    case 'N':
                        $('#mode').text("")
                        break
                    case 'F':
                        $('#mode').text("Zamrożony ekran")
                        break
                    case 'L':
                        $('#mode').text("Wyświetla logo")
                        break
                    case 'H':
                        $('#mode').text("Tylko tło")
                        break
                    case 'B':
                        $('#mode').text("Czarny ekran")
                        break
                    case 'W':
                        $('#mode').text("Biały ekran")
                        break
                    default:
                        $('#mode').text("Nie znany tryb")
                        break
                }

                onFinish()
            }
            else {
                console.error(data, status, xhr)
                displayError()
            }
        }
    ).fail(() => { displayError(2) })
}

/** Move by vect slide.
 * \param[in] vect - number of slide, vect>0 -> move down, vect<0 -> move up
 */
function moveSlide(vect) {
    let $moved = $('#slide' + (Number($('.current').find('i').text()) + vect))
    $moved.addClass('moved')
    return updateCurrent($('#slides-con'), () => { $moved.removeClass('moved') })
}

/** Update list of slides. */
function updateList() {
    $.get(
        "http://" + IP_COMP + "/presentation/slide/list",
        function (data, status, xhr) {

            if (status == "success") {
                let $xml = $($.parseXML(xhr.responseText))
                let $listCon = $('#slides-con')
                $listCon.empty()

                $xml.find('response').children().each(function () {
                    let $row = $('<li></li>')

                    $row.attr("id", "slide" + $(this).attr('identifier'))
                    $row.append("<i>" + $(this).attr('identifier') + "</i>")
                    $row.append("<b>" + $(this).attr('name') + "</b>")

                    let type = $(this).attr('type')
                    $row.addClass(type)
                    $row.append("<a>" + type + "</a>")

                    $listCon.append($row)
                })

                updateCurrent($listCon);
            }
            else {
                console.error(data, status, xhr)
                displayError()
            }
        }
    ).fail(function () { displayError(3) })
}
