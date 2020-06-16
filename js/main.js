//! Aplication config

/// IP adress of OpenSong computer
var IP_COMP = '192.168.1.104:8082'

///! Interface
$(document).ready(function(){

    $currentSlide = undefined //< current slide in jq

    /** Show communicat about error. */
    function err_display(t){
        $('#error').html("ERROR<br/>"+t)
        $('#welcome').fadeIn(1000)
    }

    /** Select a current slide on list.
     * \param[in] $listCon - jQuery object of #slides-con
     * \param[in] ffinish - function to do after select.
     */
    function update_current( $listCon = $('#slides-con'), ffinish = function(){} ){
        $.get(
            "http://"+IP_COMP+"/presentation/status",
            function( data, status, xhr ){
                if( status == "success" ){
                    $xml = $($.parseXML(xhr.responseText) )

                    // Current slide
                    if( $currentSlide ) $currentSlide.removeClass('current')
                    $currentSlide = $listCon.find("#slide"+$xml.find('slide').attr('itemnumber'))
                    $currentSlide.addClass('current')

                    // On mode
                    var mode = $xml.find('screen').attr('mode')
                    switch( mode ){
                    case 'N':
                        $('#mode').text("")
                        break;
                    case 'F':
                        $('#mode').text("Zamrożony ekran")
                        break;
                    case 'L':
                        $('#mode').text("Wyświetla logo")
                        break;
                    case 'H':
                        $('#mode').text("Tylko tło")
                        break;
                    case 'B':
                        $('#mode').text("Czarny ekran")
                        break;
                    case 'W':
                        $('#mode').text("Biały ekran")
                        break;
                    default:
                        $('#mode').text("Nie znany tryb")
                        break;
                    }

                    // On finish
                    ffinish()
                }
                else {
                    console.error( data, status, xhr )
                    err_display("Błąd komunikacji")
                }
            }
        ).fail(function(){ err_display("Błąd komunikacji") })
    }

    /** Move by vect slide.
     * \param[in] vect - number of slide, vect>0 -> move down, vect<0 -> move up
     */
    function move_slide( vect ){
        $moved = $('#slide'+(Number($('.current').find('i').text())+vect))
        $moved.addClass('moved')
        return update_current( $('#slides-con'), function(){ $moved.removeClass('moved') })
    }

    /** Update list of slides. */
    function update_list(){
        $.get(
            "http://"+IP_COMP+"/presentation/slide/list",
            function( data, status, xhr ){
    
                if( status == "success" ){
                    $xml = $( $.parseXML( xhr.responseText ) )
                    $listCon = $('#slides-con')
                    $listCon.empty()
    
                    $xml.find('response').children().each(function(){
                        $row = $('<li></li>')

                        $row.attr("id","slide"+$(this).attr('identifier'))
                        $row.append( "<i>"+$(this).attr('identifier')+"</i>" )
                        $row.append( "<b>"+$(this).attr('name')+"</b>" )

                        type = $(this).attr('type')
                        $row.addClass( type )
                        $row.append( "<a>"+type+"</a>" )

                        $listCon.append( $row )
                    })

                    update_current( $listCon );
                }
                else {
                    console.error( data, status, xhr )
                    err_display("Błąd komunikacji")
                }
            }
        ).fail(function(){ err_display("Błąd komunikacji!") })
    }

    /// Default loading list of slides
    update_list()

    ////------------------------------------
    /// Welcome panel
    $('#ip-address').val( IP_COMP )

    /// Butt - Welcome
    $('#butt-welcome').click(function(){
        IP_COMP = $('#ip-address').val()

        update_list()
        $('#welcome').fadeOut('fast')
    })

    ////------------------------------------
    $('#slides-con').click(function(){ update_list(); update_current(); })

    ////------------------------------------
    /// Butt - Extendent panel
    $('#butt-ext').click(function(){
        $('#ext-panel').toggle()
    })

    /// Butt - next
    $('#butt-next').click(function(){
        $.post( "http://"+IP_COMP+"/presentation/slide/next" )
        move_slide(1)
    })

    /// Butt - previous
    $('#butt-prev').click(function(){
        $.post( "http://"+IP_COMP+"/presentation/slide/previous" )
        move_slide(-1)
    })

    /// Butt - normal mode
    $('.butt-normal').click(function(){
        $.post( "http://"+IP_COMP+"/presentation/screen/normal" )
        update_current()
    })

    /// Butt - freez mode
    $('.butt-freeze').click(function(){
        $.post( "http://"+IP_COMP+"/presentation/screen/freeze" )
        update_current()
    })

    /// Butt - black mode
    $('.butt-black').click(function(){
        $.post( "http://"+IP_COMP+"/presentation/screen/black" )
        update_current()
    })

    /// Butt - white mode
    $('.butt-white').click(function(){
        $.post( "http://"+IP_COMP+"/presentation/screen/white" )
        update_current()
    })

    /// Butt - background mode
    $('.butt-background').click(function(){
        $.post( "http://"+IP_COMP+"/presentation/screen/hide" )
        update_current()
    })

    /// Butt - logo mode
    $('.butt-logo').click(function(){
        $.post( "http://"+IP_COMP+"/presentation/screen/logo" )
        update_current()
    })

})