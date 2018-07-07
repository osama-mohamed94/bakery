$(function(){
    /*Start Header*/
    
    /*$("div.header").click(function(e){
        if($(e.target).hasClass("next")){
            e.preventDefault();
            var currentElement = $(e.target);
            $("div.header .next").not(currentElement).next().slideUp(1000 * 0.2);
            currentElement.next().slideToggle(1000 * 0.2);
        }
    });*/
    
    $("div.header li a.next").click(function(e){
        e.preventDefault();
        $("div.header li a.next").not($(this)).next().slideUp(1000 * 0.2);
        $(this).next().slideToggle(1000 * 0.2);
    });
    
    //When Scroll
    var headerOriginal = $("div.header"),
        headerOffsetOriginal = headerOriginal.offset().top,
        headerHeightOriginal = headerOriginal.innerHeight(),
        open = true;//To Fix Problem Execute Some Lines Every Time When Make Scroll
    function headerScroll(){
        if($(this).scrollTop() > (headerOffsetOriginal + headerHeightOriginal)){
            if(open){
                headerOriginal.hide().delay(1000 * 0.2).fadeIn("1000 * 0.4").addClass("position-fixed when-scroll").css({
                    "top": 0,
                    "left": 0
                })
                .next().css("margin-top", headerHeightOriginal + "px");
                open = false;
            }
        } else {
            if(!open){
                headerOriginal.removeClass("position-fixed when-scroll")
                .next().css("margin-top", "0px");
                open = true;
            }
        }
    }
    $(window).scroll(headerScroll);
    
    /*End Header*/
    /*Start Slider Show (Hero Area)*/
    
    function workSizes(){
        //To Select Responsive Height To Slideshow
        var widthCarousel = $("div.slideshow").innerWidth();
        $(".slideshow .carousel").height(widthCarousel * 0.6);
        
        //To Make img In Center And Make It Relative (Width, Height)
        $("div.latest-bakery div.big-img div.img img").css("max-height", $(window).innerHeight());
        
        //Function To Responsive Font Size
        /*
            Function (responsiveFontSize) How To Work:
            
            1- Add (data-min) Attribute In HTML Elements If You Want Select The Lowest Value Is Accessible
            2- Add (data-max) Attribute In HTML Elements If You Want Select The Maximum Value Is Accessible
            3- Add (resheader) Class In Header Elements For Appropriate Font Size 
            4- Add (resparagraph) Class In Paragraph Elements For Appropriate Font Size 
            5- Add (resother) Class In Any Elements For Appropriate Font Size 
            6- (resheader) Class ==> Biger Font Size.
               (resparagraph) Class ==> Big Font Size
               (resother) Class ==> Small Font Size
               
        */
        function responsiveFontSize(){
            var resHeader = $(".resheader"),
                resParagraph = $(".resparagraph"),
                resother = $(".resother"),
                min,
                max,
                bridge;
            function operation(n){
                if((widthCarousel / n) > max) {
                    bridge.css("font-size", max);
                } else if((widthCarousel / n) < min) {
                    bridge.css("font-size", min);
                } else {
                    bridge.css("font-size", (widthCarousel / n));
                }
            }
            resHeader.each(function(){
                bridge = $(this);
                min = bridge.data("min");
                max = bridge.data("max");
                operation(25);
            });
            resParagraph.each(function(){
                bridge = $(this);
                min = bridge.data("min");
                max = bridge.data("max");
                operation(40);
            });
            resother.each(function(){
                bridge = $(this);
                min = bridge.data("min");
                max = bridge.data("max");
                operation(45);
            });
        }
        responsiveFontSize();
    }
    workSizes();
    $(window).resize(workSizes);
    
    /*End Slider Show (Hero Area)*/
    /*Start Our Latest Bakery Products*/
    
    $("div.latest-bakery div.product > div.overlay div.content div.option span.zoom").click(function(){
        $(this).parents("div.product").next().fadeIn(1000 * 0.2).end()
        .next().find("div.img").removeClass("zoomOut").addClass("zoomIn");
    });
    $("div.latest-bakery div.toggle .big-img, div.latest-bakery div.toggle button").click(function(e){
        var toClose = $(this),
            i1,
            i2;
        for(i1 = 0, i2 = 0;i1 < $("div.latest-bakery div.toggle button").length, i2 < $("div.latest-bakery div.toggle .big-img").length;i1++, i2++){
            if(e.currentTarget == $("div.latest-bakery div.toggle button")[i1]){
                toClose.next().removeClass("zoomIn").addClass("zoomOut").end()
                .parents("div.toggle").fadeOut(1000 * 0.2);
            } else if(e.target == $("div.latest-bakery div.toggle .big-img")[i2]){
                toClose.find("div.img").removeClass("zoomIn").addClass("zoomOut").end()
                .parents("div.toggle").fadeOut(1000 * 0.2);
            }
        }
    });
    
    /*End Our Latest Bakery Products*/
    /*Start Offers*/
    
    $("div.offers div.switch .bullet .b").click(function(){
        var a = $(this);
        a.parent().addClass("active").siblings().removeClass("active").end()
        .parents(".bases").next().find(".section-content .product-" + a.data("target"))
        .fadeIn(1000 * 0.7).siblings().css("display", "none");
        
        //a.parents(".bases").next().find(".section-content").find(".product-" + a.data("target"))
        
    });
    
    /*End Offers*/
    /*Start Blog Posts*/
    
    $("div.blog-posts .slideshow-cards .row").slick({
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
            breakpoint: 992,
            settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
            breakpoint: 768,
            settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    
    //To Apply The Changes When Change (breakpoint)
    function slideShowHandle(){
        var sliderButton = $("div.blog-posts .slideshow-cards .row button");
        sliderButton.addClass("position-absolute btn rounded-circle")
            .first().html("<i class= \"fas fa-arrow-left fa-lg\"></i>").end()
            .last().html("<i class= \"fas fa-arrow-right fa-lg\"></i>");
    }
    slideShowHandle();
    $(window).resize(slideShowHandle);
    
    /*End Blog Posts*/
    /*Start Scroll To Top*/
    
    $(".scroll-to-top").click(function(){
        $("html, body").animate({
            scrollTop: 0
        }, 1000 * 2);
    });
    
    /*End Scroll To Top*/
    /*Start Menu For Small Screen*/
    
    $("div.menu-small .top span, div.header .container .row > div:first-of-type div.parent-menu a").click(function(e){
        if(e.currentTarget == $("div.menu-small .top span")[0]){
            $(this).parents(".menu-small").fadeOut(1000 * 0.3);
        } else if(e.currentTarget == $("div.header .container .row > div:first-of-type div.parent-menu a")[0]){
            e.preventDefault();
            $(this).parents(".header").nextAll(".menu-small").fadeIn(1000 * 0.3);
        }
    });
    
    /*End Menu For Small Screen*/
});
/*Start Load Page*/

$(window).on("load", function(){
    $("div.load-page").fadeOut(1000 * 1);
});

/*End Load Page*/