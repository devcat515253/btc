$(function() {

    $(".dropdown").hover(
        function() {
            if(window.matchMedia('(max-width: 767px)').matches){
                return;
            }

            //if($('ul',this).is(":animated")) return;

            // $( 'ul',this).fadeIn();
            ID = setTimeout(()=>{
                $( 'ul',this).fadeIn();
            }, 300)
        }, function() {

            if(window.matchMedia('(max-width: 767px)').matches){
                return;
            }
            clearTimeout(ID);
            $('ul',this ).fadeOut();
        }
    );





    $(".login-language .login .btn-login").on('click', function (e) {
        event.preventDefault();
        if($(this).next('.login_form').is(":animated")) return;

        $(this).toggleClass('active');

        $(this).next('.login_form').fadeToggle();
    });


    $(".language.dropdown").unbind('mouseenter mouseleave');
    $(".language.dropdown").click(function () {
        if($('ul',this).is(":animated")) return;

        $( 'ul',this).fadeToggle();
    });



    $('.rate .tabs-nav a').on('click', function(event) {
        event.preventDefault();

        let targetId = $(this).attr('href');

        $('.rate .tabs-content div').removeClass('show');
        $('.rate .tabs-nav div').removeClass('show');
        $('.rate .tabs-nav a').removeClass('active');


        $('.rate .tabs-content '+ targetId).addClass('show');
        $(this).addClass('active');

    });

    try{
        $('.step_content .drop-parent.active >a').next('.drop-content').slideDown();
    }
    catch(e) {}


    $('.step_content .drop-parent >a').on('click', function(event) {
        event.preventDefault();
        if($(this).closest('.drop-parent').hasClass('active')){
            $(this).next('.drop-content').slideUp();
            $('.step_content .drop-parent').removeClass('active');
            return;
        }
        //alert('frf');
        if($(this).next('.drop-content').is(":animated")) return;

        //$('.step_content .drop-content').css({display:'none'});
        $('.step_content .drop-content').slideUp();
        $('.step_content .drop-parent').removeClass('active');



        $(this).next('.drop-content').slideDown();
        $(this.parentNode).addClass('active');

    });

    $('.minus').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $('.plus').click(function () {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });

    $('.number input').bind("change keyup input click", function() {
        if (this.value.match(/[^0-9.]/g)) {
            this.value = this.value.replace(/[^0-9.]/g, '');
        }
        //this.value = this.value.replace(/(\d)(?=(\d{3})+([^\d.]|$))/g, '$1 ');
    });

    $('.another-option >a').click(function () {
        event.preventDefault();
        if($(this).next('.hidden-option').is(":animated")) return;
        $(this).next('.hidden-option').fadeToggle();
    });


    $('.load_more').click(function () {
        event.preventDefault();


        //$('.feedback_left',this.parentNode).toggle();
        $('.feedback_right',this.parentNode).fadeIn();
        $(this).remove();
    });


    $('.close-menu').click(function () {
        event.preventDefault();


            $('.top-line__nav').fadeOut();
            $("body").css("overflow", "auto");


    });

    $('.top-line__nav_mobile-btn a').click(function () {
        event.preventDefault();

        $("body").css("overflow", "hidden");
        $('.top-line__nav').fadeIn();
        $('.top-line__nav').css({display:'flex'});


    });

    let mobileOptions = () =>{
        if(window.matchMedia('(max-width: 767px)').matches){
            try{


                $('.another-option >a').css({display:'none'});
                $('.hidden-option').removeClass('hidden-option');
                $('.mobile-another-option >a').css({display:'flex'});

                $('.mobile_options').addClass('hidden-option');
            }
            catch(e) {}


        }
        else {
            $('.desktop.another-option >a').css({display:'flex'});
            $('.mobile_options').removeClass('hidden-option');
            $('.mobile-another-option >a').css({display:'none'});

            $('.desktop-options').addClass('hidden-option');
        }
    };

    let contactsInEnd = () =>{
        if(window.matchMedia('(max-width: 767px)').matches){
            try{

                $('#contacts').appendTo('.top-line__nav nav >ul');

            }catch(e){}
        }
        else{
            $('#contacts').insertBefore( $('.top-line__nav nav >ul .dropdown'));
        }

    };

    function returnMenu() {
        if(window.matchMedia('(min-width: 767px)').matches){
            try{

                $('.top-line__nav').fadeIn();
                $('.top-line__nav nav .dropdown ul').css({display:'none'});


            }catch(e){}
        }
        else{
            try{

                $('.top-line__nav').css({display:'none'});

                $('.top-line__nav nav .dropdown ul').css({display:'block'});


            }catch(e){}
        }
    }


    mobileOptions();
    window.addEventListener("orientationchange", function () {
        mobileOptions();
        contactsInEnd();
        returnMenu();
    }, false);


    $(window).resize(function () {
        mobileOptions();
        contactsInEnd();
        returnMenu();
    });

    $(".with-tip input").bind('change keyup input click', function (e) {

        let count = $(this).val().length;
        if(count > 0){
            $(this.parentNode).addClass('verified');
            $(this).next('.tip').fadeOut();
            return;
        }
        $(this.parentNode).removeClass('verified');
        $(this).next('.tip').fadeIn();
    });


    $('.login_form .btn-close').click(function () {
        $(this).closest('.login_form').fadeOut();
        $(this).closest('.login').children('.btn-login').removeClass('active');
    });

    $(document).click( function(event){
        let language = $(event.target).closest(".language").length;
        let loginForm = $(event.target).closest(".login").length;
        let anotherOption = $(event.target).closest(".another-option").length;

        if( language || loginForm || anotherOption) // родитель выпадающего списка
            return;

        $(".language ul").fadeOut();
        $(".login_form").fadeOut();
        $(".login_form").closest('.login').children('.btn-login').removeClass('active');
        $(".hidden-option").fadeOut();
        event.stopPropagation();
    });

    $('.step:first-child .step_content .option:not(".option_another")').on('click', function () {
        event.preventDefault();

        $('.option.active',this.closest('.step_content')).removeClass('active');
        $(this).addClass('active');
        $('.hidden-option',this.closest('.step_content')).fadeOut();

    });
    $('.step:nth-child(2) .step_content .option:not(".option_another")').on('click', function () {
        event.preventDefault();
        $('.option.active',this.closest('.step_content')).removeClass('active');
        $(this).addClass('active');
        $('.hidden-option',this.closest('.step_content')).fadeOut();
    });

    $('.message_success .btn-close, .message_failed .btn-close').click( function(event){
        $(this.parentNode).fadeOut();
        console.log($(this.parentNode));
    });


    $('.partner .drop-parent >a').on('click', function (e) {
        event.preventDefault();
        //console.log('rwf');
        if($(this).next('.drop-content').is(":animated")) return;

        $(this.parentNode).toggleClass('active');

        $(this).next('.drop-content').slideToggle();

    });

    function activeDown() {
        try {
            $('.partner .drop-parent.active >a').next('.drop-content').slideDown();

        } catch(e){}
    }

    activeDown();

});
