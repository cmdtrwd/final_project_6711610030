'use strict';

// 1. SCROLL REVEAL  
var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll('.fade-in, .slide-up').forEach(function(el) {
    revealObserver.observe(el);
});


// 2. STAGGER DELAY  (team cards, project cards)
document.querySelectorAll('.team-grid, .project-masonry, .testimonials-grid, .stats-row').forEach(function(group) {
    group.querySelectorAll('.slide-up, .stat-item').forEach(function(child, i) {
        child.style.transitionDelay = (i * 0.1) + 's';
    });
});


// 3. HEADER — transparent → solid on scroll
var header = document.getElementById('site-header');

window.addEventListener('scroll', function() {
    if (window.scrollY > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, { passive: true });


// 4. ACTIVE NAV LINK  (highlights current section)
var sections = document.querySelectorAll('section[id]');
var navLinks  = document.querySelectorAll('.main-nav a');

var navObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            var id = entry.target.getAttribute('id');
            navLinks.forEach(function(link) {
                var href = link.getAttribute('href');
                link.classList.toggle('active', href === '#' + id);
            });
        }
    });
}, { rootMargin: '-40% 0px -40% 0px' });

sections.forEach(function(s) { navObserver.observe(s); });


// 5. MOBILE NAV TOGGLE  (hamburger ↔ close)
var navToggle = document.querySelector('.nav-toggle');
var mainNav   = document.querySelector('.main-nav');

if (navToggle) {
    function setMobileNav(open) {
        mainNav.classList.toggle('mobile-open', open);
        navToggle.classList.toggle('open', open);
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.body.style.overflow = open ? 'hidden' : '';
    }

    navToggle.addEventListener('click', function(event) {
        event.stopPropagation();
        var isOpen = !mainNav.classList.contains('mobile-open');
        setMobileNav(isOpen);
    });

  

}


// 6. HERO WORD SWAP  (cycles words with animation)
var wordEl = document.getElementById('word-swap');

if (wordEl) {
    var words = ['NERDS', 'DESIGNERS', 'BUILDERS', 'CREATORS', 'NERDS'];
    var index = 0;

    var wordSwapInterval = setInterval(function() {
        index = (index + 1) % words.length;
        wordEl.textContent = words[index];
        wordEl.style.animation = 'none';
        wordEl.offsetHeight; 
        wordEl.style.animation = 'fadeWord 0.5s ease';
    }, 2200);
}


// 7. TICKER DUPLICATE  (seamless infinite loop)
var tickerTrack = document.getElementById('ticker-track');

if (tickerTrack) {
    var originalItems = Array.from(tickerTrack.children);
    originalItems.forEach(function(item) {
        tickerTrack.appendChild(item.cloneNode(true));
    });
}


// 8. PROJECT FILTER  
var filterBtns   = document.querySelectorAll('.filter-btn');
var projectItems = document.querySelectorAll('.project-item-lg');

if (filterBtns.length) {
    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            filterBtns.forEach(function(b) { b.classList.remove('active'); });
            btn.classList.add('active');

            var filter = btn.getAttribute('data-filter');

            projectItems.forEach(function(item) {
                var show = filter === 'all' || item.getAttribute('data-category') === filter;
               
                item.style.display    = show ? 'block' : 'none';
                item.setAttribute('aria-hidden', show ? 'false' : 'true');
            });
        });
    });
}