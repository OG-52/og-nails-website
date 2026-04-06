/**
 * OG Nails — Main JavaScript
 * Animations, form handling, smooth scroll, navigation
 */

(function () {
  'use strict';

  // ===== DOM ELEMENTS =====
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  // ===== MOBILE NAV OVERLAY =====
  let overlay = document.createElement('div');
  overlay.classList.add('nav__overlay');
  document.body.appendChild(overlay);

  // ===== MOBILE NAVIGATION =====
  function openMenu() {
    navToggle.classList.add('active');
    navMenu.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', function () {
    if (navMenu.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  overlay.addEventListener('click', closeMenu);

  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // ===== HEADER SCROLL EFFECT =====
  let lastScroll = 0;

  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY;

    if (scrollY > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }

    lastScroll = scrollY;
  }, { passive: true });

  // ===== SCROLL ANIMATIONS (IntersectionObserver) =====
  var animatedElements = document.querySelectorAll('.animate-fade-in');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all elements
    animatedElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        var headerHeight = header.offsetHeight;
        var targetPos = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== FORM VALIDATION & SUBMIT =====
  // Validates required fields, then allows native form POST to Formspree.
  // Formspree redirects to danke.html on success via the hidden _next field.
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Reset errors
      var inputs = contactForm.querySelectorAll('input, select, textarea');
      inputs.forEach(function (input) {
        input.classList.remove('error');
      });

      // Validate
      var isValid = true;
      var name = contactForm.querySelector('#name');
      var phone = contactForm.querySelector('#phone');
      var service = contactForm.querySelector('#service');
      var email = contactForm.querySelector('#email');

      if (!name.value.trim()) {
        name.classList.add('error');
        isValid = false;
      }

      if (!phone.value.trim()) {
        phone.classList.add('error');
        isValid = false;
      }

      if (!service.value) {
        service.classList.add('error');
        isValid = false;
      }

      if (email.value && !isValidEmail(email.value)) {
        email.classList.add('error');
        isValid = false;
      }

      if (!isValid) {
        var firstError = contactForm.querySelector('.error');
        if (firstError) firstError.focus();
        return;
      }

      // Validation passed — submit natively to Formspree
      var submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Wird gesendet…';
      contactForm.submit();
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ===== ACTIVE NAV LINK ON SCROLL =====
  var sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY + 100;

    sections.forEach(function (section) {
      var sectionTop = section.offsetTop - 100;
      var sectionHeight = section.offsetHeight;
      var sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(function (link) {
          link.classList.remove('nav__link--active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('nav__link--active');
          }
        });
      }
    });
  }, { passive: true });

})();
