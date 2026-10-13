document.addEventListener('DOMContentLoaded', () => {

  const dropdownToggles = document.querySelectorAll('.nav-dropdown-link');

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const parent = toggle.closest('.dropdown');
      if (!parent) return;

      const menu = parent.querySelector('.custom-dropdown-menu');
      if (!menu) return;

      document.querySelectorAll('.custom-dropdown-menu.show').forEach((m) => {
        if (m !== menu) m.classList.remove('show');
      });

      menu.classList.toggle('show');
      parent.classList.toggle('show');
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-nav-dropdown')) {
      document.querySelectorAll('.custom-dropdown-menu.show').forEach((menu) => {
        menu.classList.remove('show');
      });
      document.querySelectorAll('.custom-nav-dropdown.show').forEach((item) => {
        item.classList.remove('show');
      });
    }
  });

  document.querySelectorAll('.custom-dropdown-menu .dropdown-item').forEach((item) => {
    if (item.textContent.trim() === 'Help') {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Help & Support: If you need any assistance with our management system, please reach out to support@managementsystem.com');
      });
    }
  });

  const slides = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelectorAll('.indicator-bar');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');

  if (slides.length > 0) {
    let currentSlide = 0;

    function goToSlide(index) {
      if (index < 0) {
        currentSlide = slides.length - 1;
      } else if (index >= slides.length) {
        currentSlide = 0;
      } else {
        currentSlide = index;
      }

      slides.forEach((slide, i) => {
        if (i === currentSlide) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });

      indicators.forEach((indicator, i) => {
        if (i === currentSlide) {
          indicator.classList.add('active');
        } else {
          indicator.classList.remove('active');
        }
      });
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    function prevSlide() {
      goToSlide(currentSlide - 1);
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nextSlide();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        prevSlide();
      });
    }

    indicators.forEach((indicator) => {
      indicator.addEventListener('click', (e) => {
        e.preventDefault();
        const targetIndex = parseInt(indicator.getAttribute('data-index'), 10);
        goToSlide(targetIndex);
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    });
  }

  const modalBackdrop = document.getElementById('courseModalBackdrop');
  const modalTitle = document.getElementById('modalCourseTitle');
  const modalDesc = document.getElementById('modalCourseDesc');
  const closeModalCross = document.getElementById('closeModalCross');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const openModalButtons = document.querySelectorAll('.open-course-modal');

  function openModal(title, desc) {
    if (!modalBackdrop || !modalTitle || !modalDesc) return;
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalBackdrop.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('show');
    document.body.style.overflow = '';
  }

  openModalButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const title = btn.getAttribute('data-title') || '';
      const desc = btn.getAttribute('data-desc') || '';
      openModal(title, desc);
    });
  });

  if (closeModalCross) {
    closeModalCross.addEventListener('click', closeModal);
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('show')) {
      closeModal();
    }
  });
});
