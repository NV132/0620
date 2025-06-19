// Navigation.js - 네비게이션 및 모바일 메뉴
class Navigation {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.navToggle = document.querySelector('.nav-toggle');
    this.navMenu = document.querySelector('.nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.setActiveNavLink();
  }

  bindEvents() {
    // 모바일 메뉴 토글
    this.navToggle.addEventListener('click', () => this.toggleMobileMenu());

    // 네비게이션 링크 클릭 시 모바일 메뉴 닫기
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          this.closeMobileMenu();
        }
      });
    });

    // 스크롤 시 네비게이션 스타일 변경
    window.addEventListener('scroll', () => this.handleScroll());

    // 윈도우 리사이즈 시 모바일 메뉴 상태 초기화
    window.addEventListener('resize', () => this.handleResize());
  }

  toggleMobileMenu() {
    this.navMenu.classList.toggle('active');
    this.navToggle.classList.toggle('active');
    
    // 배경 스크롤 방지
    if (this.navMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu() {
    this.navMenu.classList.remove('active');
    this.navToggle.classList.remove('active');
    document.body.style.overflow = '';
  }

  handleScroll() {
    if (window.scrollY > 100) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }
  }

  handleResize() {
    if (window.innerWidth > 768) {
      this.closeMobileMenu();
    }
  }

  setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    this.navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      
      if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  // 부드러운 스크롤
  smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  // 스크롤 애니메이션
  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // 애니메이션 대상 요소들
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
  }
}

// 페이지 로드 시 네비게이션 초기화
document.addEventListener('DOMContentLoaded', () => {
  const navigation = new Navigation();
  navigation.initScrollAnimations();
}); 