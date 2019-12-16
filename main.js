//autoScroll
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function autoScroll(selector) {
    var scrollAttempts = 0;
    var incrementScrollAttempts = debounce(function() {
        scrollAttempts++;
    });

    window.addEventListener('scroll', incrementScrollAttempts);

    var el = document.querySelector(selector);
    var chkReadyState = setInterval(function() {
        if (el) {
            window.scrollTo(0, el.offsetTop);
        }
        if (document.readyState == 'complete' || scrollAttempts > 1) {
            clearInterval(chkReadyState);
            window.removeEventListener('scroll', incrementScrollAttempts, false);
        }
    }, 100);
}

document.querySelectorAll('#section1').forEach(section => {
    section.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector('#section2').scrollIntoView({
            behavior: 'smooth'
        });
    });
});
document.querySelectorAll('#section2').forEach(section => {
    section.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector('#section3').scrollIntoView({
            behavior: 'smooth'
        });
    });
});

