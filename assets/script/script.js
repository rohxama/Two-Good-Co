// Locomotive code for smoothness
function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}
locomotiveAnimation();

// Logo Animation
function logoAnimation() {

    gsap.to('.nav-part1 svg', {
        transform: 'translateY(-100%)',
        scrollTrigger: {
            trigger: '#page1',
            scroller: '.main',
            scrub: true,
            start: 'top 0',
            end: 'top -5%'
        }
    });
    gsap.to('.nav-menu', {
        transform: 'translateY(-300%)',
        scrollTrigger: {
            trigger: '#page1',
            scroller: '.main',
            scrub: true,
            start: 'top 0',
            end: 'top -5%'
        }
    });

}
logoAnimation();

// Mouse Cursor on Video
function videoPlayBtnAnimation() {
    let videoContainer = document.querySelector(".video-container");
    let playBtn = document.querySelector(".play-btn");

    videoContainer.addEventListener("mouseenter", function () {
        gsap.to(playBtn, {
            opacity: 1,
            scale: 1
        });
    });
    videoContainer.addEventListener("mouseleave", function () {
        gsap.to(playBtn, {
            opacity: 0,
            scale: 0
        });
    });
    videoContainer.addEventListener("mousemove", function (move) {
        gsap.to(playBtn, {
            left: move.x,
            top: move.y,
            transform: 'translate(-50%, -50%)',
            scale: 1
        });
    });
}
videoPlayBtnAnimation();

videoPlayBtnAnimation();

// Main Heading Animation
function headingAnimation() {
    gsap.from('#page1 h1', {
        y: 100,
        delay: 0.3,
        duration: 0.5,
        stagger: 0.3,
        opacity: 0
    });
    gsap.from('#page1 .video-container', {
        scale: 0.9,
        delay: 1.3,
        duration: 0.3,
        opacity: 0
    });
}
headingAnimation();

// Product Cursor
function productCursor() {
    document.addEventListener("mousemove", function (move) {
        gsap.to('.cursor', {
            left: move.x,
            top: move.y
        });
    });
    document.querySelectorAll('.product').forEach(function (elem) {
        elem.addEventListener('mouseenter', function () {
            gsap.to('.cursor', {
                transform: 'translate(-50%, -50%)',
                scale: 1,
            });
        });
        elem.addEventListener('mouseleave', function () {
            gsap.to('.cursor', {
                scale: 0
            });
        });
    });
    document.querySelector('#product3').addEventListener('mouseenter', function () {
        gsap.to('.cursor', {
            backgroundColor: '#dfdfdf',
        });
    });

    document.querySelector('#product3').addEventListener('mouseleave', function () {
        gsap.to('.cursor', {
            backgroundColor: '#f5dfcf',
        });
    });
    document.querySelector('#product2').addEventListener('mouseenter', function () {
        gsap.to('.cursor', {
            backgroundColor: '#dfdfdf',
        });
    });

    document.querySelector('#product2').addEventListener('mouseleave', function () {
        gsap.to('.cursor', {
            backgroundColor: '#f5dfcf',
        });
    });
}
productCursor();

// Comment Animation
function commnetSlider() {

    $(document).ready(function () {
        const slider = $('.tabs-slider').slick({
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 2,
            // autoplay: true,
            autoplaySpeed: 1000,
            centerMode: true,
            centerPadding: '60px',
            responsive: [
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 4,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 400,
                    settings: {
                        slidesToShow: 2,
                    }
                }
            ]
        });


        $('.tab').on('click', function () {
            const contentId = $(this).data('content');
            const currentActive = $('.tab-content.active');

            // Animate the current active h2 outgoing
            gsap.to(currentActive.find('h2'), {
                y: -100,
                opacity: 0,
                onComplete: function () {
                    // Once the animation is complete, remove the active class and animate the upcoming
                    currentActive.removeClass('active');
                    const newActive = $('#' + contentId);
                    newActive.addClass('active');

                    gsap.from(newActive.find('h2'), {
                        y: 100,
                        opacity: 0,
                    });
                }
            });

            $('.tab').removeClass('slick-active');
            $(this).addClass('slick-active');

            const index = $(this).data('slick-index');
            slider.slick('slickGoTo', index - 1);
        });

        $('.tab').first().click();
    });

}
commnetSlider();

// Footer Animation
function footerLogoAnimation() {
    gsap.to("footer .logo svg path", {
        stagger: 0.2,
        opacity: 1,
        scrollTrigger: {
            trigger: 'footer',
            scroller: '.main',
            end: 'top top',
        }
    });
};
footerLogoAnimation();

// Close button
function closeBtn() {
    document.querySelector('.menu').addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector('.open-menu').classList.toggle('active');
        gsap.from('.upper .upper-left li, .upper-center li, .upper-right li', {
            y: 50,
            duration: 0.5,
            stagger: 0.1,
            opacity: 0,
            ease: "power2.out"
        });
        gsap.from('.side-menu li', {
            y: 50,
            duration: 0.5,
            stagger: 0.1,
            opacity: 0,
            ease: "power2.out"
        });
    });
    document.querySelector('.close').addEventListener('click', function () {
        document.querySelector('.open-menu').classList.remove('active');
    });
}
closeBtn();

