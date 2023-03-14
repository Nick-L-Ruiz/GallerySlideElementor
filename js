<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>

var $ = jQuery,
    html = [],
    prevWidth

/* Set aspect ratio option */

function setAspectRatio(el){
    if(el.css('--image-aspect-ratio') && el.css('--image-aspect-ratio').trim() == 'true'){
        el.addClass('image-aspect-ratio')
    }else{
        el.removeClass('image-aspect-ratio')
    }
}


/* Get initial summation images width */

function getInitialWidth(el){
    
    var width = 0, 
        space = parseFloat(el.css('gap'))
        
    el.find('.elementor-widget').each(function(){
        width += $(this).width() + space
    })
    
    return width
}


/* Set new container width and other values */

function setValues(el, width, indexI, indexJ){
    var ratio = Math.ceil(el.parent().width()/width),
        total = ratio+1
    
    for( i = 0; i < ratio; i++ ){
        el.append(html[indexI][indexJ])
    }
    el.width(width*total)
    el.css('--total', total)
    el.css('--est-speed', width/100)
}


/* Set direction option */

function setDirection(el, width){
    if(el.css('--direction') == -1){
    el.css('margin-left', -1*width + 'px')
    }
}


/* Set pause on hover option */

function setPauseOnHover(el){
    var pauseOnHover = $(window).width() > 767 ? '--pause-on-hover' : '--pause-on-hover-mobile'
    
    if(el.css(pauseOnHover) && el.css(pauseOnHover).trim() == 'true'){
        el.css('--poh', 'paused')
    }else{
        el.css('--poh', 'running')
    }
}
    
$(document).ready(function(){
    
prevWidth = $(window).width()

$('.jr-scrolling-image').each(function(indexI){
    html[indexI] = []
$(this).find('.e-con, .e-container').each(function(indexJ){
    
setAspectRatio($(this))

var width = getInitialWidth($(this))

html[indexI].push($(this).html())
if(width){
    setValues($(this), width, indexI, indexJ)
    setDirection($(this), width)
}
setPauseOnHover($(this))

})

$(this).addClass('showing')

})

})

$(window).on('resize', function(){
    
if( $(window).width() == prevWidth ){
    return
}
prevWidth = $(window).width()

$('.jr-scrolling-image').each(function(indexI){
$(this).find('.e-con, .e-container').each(function(indexJ){

$(this).empty()
$(this).append(html[indexI][indexJ])

var width = getInitialWidth($(this))
if(width){
    setValues($(this), width, indexI, indexJ)
    setDirection($(this), width)
}
setPauseOnHover($(this))

})
})
})

</script>
