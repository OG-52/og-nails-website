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
  // Validates required fields, then POSTs JSON to Formspree via fetch.
  // Success: shows in-page confirmation. Error: shows alert with fallback contact.
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Honeypot check — bail if filled by a bot
      var gotcha = contactForm.querySelector('input[name="_gotcha"]');
      if (gotcha && gotcha.value) return;

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

      // Validation passed — POST to Formspree
      var submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Wird gesendet…';

      var formData = {
        name: name.value.trim(),
        phone: phone.value.trim(),
        email: email.value.trim(),
        service: service.value,
        date: (contactForm.querySelector('#date') || {}).value || '',
        message: (contactForm.querySelector('#message') || {}).value.trim()
      };

      fetch('https://formspree.io/f/mvzvlqrr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData)
      })
      .then(function (response) {
        if (response.ok) {
          formSuccess.classList.add('show');
          submitBtn.textContent = 'Gesendet!';
          setTimeout(function () {
            contactForm.reset();
            formSuccess.classList.remove('show');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Anfrage senden';
          }, 5000);
        } else {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Anfrage senden';
          alert('Es gab ein Problem. Bitte ruf uns an oder schreib per WhatsApp.');
        }
      })
      .catch(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Anfrage senden';
        alert('Keine Verbindung. Bitte ruf uns an oder schreib per WhatsApp.');
      });
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ===== STICKY MOBILE CTA BAR =====
  // Appears after 600px scroll on mobile; hides when footer is in view.
  var ctaBar = document.getElementById('cta-bar');
  var siteFooter = document.querySelector('.footer');

  if (ctaBar && siteFooter) {
    function updateCtaBar() {
      if (window.innerWidth >= 768) {
        ctaBar.style.display = 'none';
        return;
      }
      ctaBar.style.display = 'block';
      ctaBar.setAttribute('aria-hidden', 'false');

      var footerTop = siteFooter.getBoundingClientRect().top + window.scrollY;
      var footerVisible = window.scrollY + window.innerHeight >= footerTop;

      if (window.scrollY > 600 && !footerVisible) {
        ctaBar.classList.add('cta-bar--visible');
      } else {
        ctaBar.classList.remove('cta-bar--visible');
      }
    }

    window.addEventListener('scroll', updateCtaBar, { passive: true });
    window.addEventListener('resize', updateCtaBar, { passive: true });
    updateCtaBar();
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
