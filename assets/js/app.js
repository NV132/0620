/**
 * 프리미엄 보험사이트 통합 애플리케이션
 * 모든 페이지의 기능을 통합한 완전한 웹 애플리케이션
 */

// SCSS 스타일 import
import '../../src/scss/main.scss';

// Three.js 3D 보험 연출 시스템 시작
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class PremiumInsuranceApp {
  constructor() {
    this.currentStep = 1;
    this.selectedInsurances = [];
    this.selectedSchedule = {};
    this.currentSlide = 0;
    this.isLoading = false;
    this.init();
  }

  /**
   * 애플리케이션 초기화
   */
  init() {
    this.setupEventListeners();
    this.initializeComponents();
    this.setupParticles();
    this.setupStatistics();
    this.setupTestimonials();
    this.setupChatbot();
    this.setupFAQ();
    this.setupProductTabs();
    this.setupConsultationForm();
    this.setupDatePicker();
    console.log('프리미엄 보험사이트 애플리케이션이 초기화되었습니다.');
  }

  /**
   * 이벤트 리스너 설정
   */
  setupEventListeners() {
    // DOM 로드 완료 후 실행
    document.addEventListener('DOMContentLoaded', () => {
      this.setupLoadingSpinner();
      this.setupNotifications();
    });

    // 스크롤 이벤트
    window.addEventListener('scroll', this.handleScroll.bind(this));

    // 리사이즈 이벤트
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  /**
   * 컴포넌트 초기화
   */
  initializeComponents() {
    this.loadingSpinner = document.getElementById('loading-spinner');
    this.toastContainer = document.getElementById('toast-container');
  }

  /**
   * 스크롤 이벤트 처리
   */
  handleScroll() {
    this.triggerScrollAnimations();
  }

  /**
   * 스크롤 애니메이션 트리거
   */
  triggerScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left');
    
    animatedElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('visible');
      }
    });
  }

  /**
   * 파티클 효과 설정
   */
  setupParticles() {
    const particlesBg = document.getElementById('particles-bg');
    if (!particlesBg) return;

    // 파티클 생성
    for (let i = 0; i < 30; i++) {
      this.createParticle(particlesBg);
    }
  }

  /**
   * 파티클 생성
   */
  createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 2;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: rgba(99, 102, 241, ${Math.random() * 0.3 + 0.1});
      border-radius: 50%;
      left: ${x}%;
      top: ${y}%;
      animation: particleFloat ${duration}s linear infinite ${delay}s;
      pointer-events: none;
    `;
    
    container.appendChild(particle);
  }

  /**
   * 통계 카운터 설정
   */
  setupStatistics() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const finalValue = parseInt(target.getAttribute('data-target'));
          this.animateCounter(target, 0, finalValue, 2000);
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
      observer.observe(stat);
    });
  }

  /**
   * 카운터 애니메이션
   */
  animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    const difference = end - start;
    
    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // 이징 함수 (부드러운 시작과 끝)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (difference * easeOutQuart));
      
      element.textContent = current.toLocaleString();
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };
    
    requestAnimationFrame(updateCounter);
  }

  /**
   * 고객 후기 슬라이더 설정
   */
  setupTestimonials() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    
    if (testimonialCards.length === 0) return;

    // 자동 슬라이드
    setInterval(() => {
      this.nextTestimonial();
    }, 5000);

    // 도트 클릭 이벤트
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.showTestimonial(index);
      });
    });
  }

  /**
   * 다음 후기로 이동
   */
  nextTestimonial() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    
    testimonialCards[this.currentSlide].classList.remove('active');
    dots[this.currentSlide].classList.remove('active');
    
    this.currentSlide = (this.currentSlide + 1) % testimonialCards.length;
    
    testimonialCards[this.currentSlide].classList.add('active');
    dots[this.currentSlide].classList.add('active');
  }

  /**
   * 특정 후기 표시
   */
  showTestimonial(index) {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    
    testimonialCards[this.currentSlide].classList.remove('active');
    dots[this.currentSlide].classList.remove('active');
    
    this.currentSlide = index;
    
    testimonialCards[this.currentSlide].classList.add('active');
    dots[this.currentSlide].classList.add('active');
  }

  /**
   * 챗봇 설정
   */
  setupChatbot() {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotMessages = document.getElementById('chatbot-messages');

    if (chatbotToggle) {
      chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.toggle('active');
        if (chatbotWindow.classList.contains('active')) {
          chatbotInput.focus();
        }
      });
    }

    if (chatbotClose) {
      chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
      });
    }

    if (chatbotSend && chatbotInput) {
      const sendMessage = () => {
        const message = chatbotInput.value.trim();
        if (!message) return;

        this.addChatbotMessage(message, 'user');
        chatbotInput.value = '';

        // 봇 응답 처리
        setTimeout(() => {
          this.processChatbotMessage(message);
        }, 500);
      };

      chatbotSend.addEventListener('click', sendMessage);
      chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          sendMessage();
        }
      });
    }
  }

  /**
   * 챗봇 메시지 추가
   */
  addChatbotMessage(text, sender) {
    const chatbotMessages = document.getElementById('chatbot-messages');
    if (!chatbotMessages) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.textContent = text;
    
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  /**
   * 챗봇 메시지 처리
   */
  processChatbotMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('자동차') || lowerMessage.includes('차량')) {
      this.addChatbotMessage('자동차보험에 대해 궁금하신 점이 있으시군요! 어떤 부분을 도와드릴까요?\n\n1. 보험료 계산\n2. 보장 내용\n3. 가입 방법', 'bot');
    } else if (lowerMessage.includes('건강') || lowerMessage.includes('의료')) {
      this.addChatbotMessage('건강보험에 대해 문의하시는군요! 어떤 도움이 필요하신가요?\n\n1. 보장 범위\n2. 가입 조건\n3. 보험료 안내', 'bot');
    } else if (lowerMessage.includes('생명') || lowerMessage.includes('사망')) {
      this.addChatbotMessage('생명보험에 대해 궁금하시군요! 어떤 상품을 찾고 계신가요?\n\n1. 종신보험\n2. 정기보험\n3. 연금보험', 'bot');
    } else if (lowerMessage.includes('보험료') || lowerMessage.includes('가격')) {
      this.addChatbotMessage('보험료는 개인의 상황에 따라 다르게 계산됩니다. 정확한 견적을 원하시면 상담 신청을 해주세요!', 'bot');
    } else if (lowerMessage.includes('상담') || lowerMessage.includes('문의')) {
      this.addChatbotMessage('전문 상담사와 상담을 원하시는군요! 상담 신청 페이지로 이동하시겠습니까?', 'bot');
    } else if (lowerMessage.includes('감사') || lowerMessage.includes('고마워')) {
      this.addChatbotMessage('천만에요! 언제든지 도움이 필요하시면 말씀해 주세요. 😊', 'bot');
    } else {
      this.addChatbotMessage('죄송합니다. 더 구체적으로 말씀해 주시면 도움을 드릴 수 있습니다. 자동차보험, 건강보험, 생명보험 중 어떤 것에 대해 궁금하신가요?', 'bot');
    }
  }

  /**
   * FAQ 설정
   */
  setupFAQ() {
    const searchInput = document.getElementById('faq-search');
    const searchBtn = document.getElementById('search-btn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const faqItems = document.querySelectorAll('.faq-item');

    // 검색 기능
    if (searchInput) {
      const handleSearch = () => {
        const searchTerm = searchInput.value.toLowerCase();
        this.filterFAQ(searchTerm, 'all');
      };

      searchInput.addEventListener('input', handleSearch);
      if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
      }
    }

    // 카테고리 필터
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-category');
        this.filterFAQ('', category);
        
        // 활성 버튼 업데이트
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    // FAQ 아이템 클릭 이벤트
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      question.addEventListener('click', () => {
        item.classList.toggle('active');
      });
    });
  }

  /**
   * FAQ 필터링
   */
  filterFAQ(searchTerm, category) {
    const faqItems = document.querySelectorAll('.faq-item');
    const noResults = document.getElementById('no-results');
    let visibleCount = 0;

    faqItems.forEach(item => {
      const itemCategory = item.getAttribute('data-category');
      const questionText = item.querySelector('h3').textContent.toLowerCase();
      const answerText = item.querySelector('.faq-answer p').textContent.toLowerCase();
      const text = questionText + ' ' + answerText;

      const matchesSearch = !searchTerm || text.includes(searchTerm);
      const matchesCategory = category === 'all' || itemCategory === category;

      if (matchesSearch && matchesCategory) {
        item.style.display = 'block';
        visibleCount++;
      } else {
        item.style.display = 'none';
      }
    });

    // 결과가 없을 때 메시지 표시
    if (noResults) {
      if (visibleCount === 0) {
        noResults.style.display = 'block';
      } else {
        noResults.style.display = 'none';
      }
    }
  }

  /**
   * 보험상품 탭 설정
   */
  setupProductTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        
        // 활성 탭 업데이트
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // 탭 내용 업데이트
        tabContents.forEach(content => {
          content.classList.remove('active');
          if (content.id === `${tabId}-tab`) {
            content.classList.add('active');
          }
        });
      });
    });
  }

  /**
   * 상담 예약 폼 설정
   */
  setupConsultationForm() {
    const form = document.getElementById('consultation-form');
    if (!form) return;

    // 보험 선택 이벤트
    const insuranceOptions = document.querySelectorAll('.insurance-option');
    insuranceOptions.forEach(option => {
      option.addEventListener('click', () => {
        const insurance = option.getAttribute('data-insurance');
        this.toggleInsuranceSelection(insurance, option);
      });
    });

    // 시간 슬롯 선택 이벤트
    const timeSlots = document.querySelectorAll('.time-slot');
    timeSlots.forEach(slot => {
      slot.addEventListener('click', () => {
        timeSlots.forEach(s => s.classList.remove('selected'));
        slot.classList.add('selected');
        this.updateScheduleSummary();
      });
    });

    // 폼 제출 이벤트
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmit();
    });
  }

  /**
   * 보험 선택 토글
   */
  toggleInsuranceSelection(insurance, element) {
    const index = this.selectedInsurances.indexOf(insurance);
    
    if (index > -1) {
      this.selectedInsurances.splice(index, 1);
      element.classList.remove('selected');
    } else {
      this.selectedInsurances.push(insurance);
      element.classList.add('selected');
    }
    
    this.updateSelectedInsurance();
  }

  /**
   * 선택된 보험 업데이트
   */
  updateSelectedInsurance() {
    const selectedList = document.getElementById('selected-list');
    if (!selectedList) return;

    if (this.selectedInsurances.length === 0) {
      selectedList.innerHTML = '<p class="no-selection">보험을 선택해주세요</p>';
    } else {
      const insuranceNames = {
        car: '자동차보험',
        health: '건강보험',
        life: '생명보험',
        home: '주택보험',
        travel: '여행보험',
        comprehensive: '종합상담'
      };

      const list = this.selectedInsurances.map(insurance => 
        `<span class="selected-item">${insuranceNames[insurance]}</span>`
      ).join('');
      
      selectedList.innerHTML = list;
    }
  }

  /**
   * 일정 요약 업데이트
   */
  updateScheduleSummary() {
    const summary = document.getElementById('schedule-summary');
    if (!summary) return;

    const consultationType = document.querySelector('input[name="consultation-type"]:checked');
    const consultationDate = document.getElementById('consultation-date');
    const selectedTime = document.querySelector('.time-slot.selected');

    if (consultationType && consultationDate.value && selectedTime) {
      const typeNames = {
        phone: '전화상담',
        video: '화상상담',
        visit: '방문상담'
      };

      summary.innerHTML = `
        <div class="summary-item">
          <span class="label">상담 방법:</span>
          <span class="value">${typeNames[consultationType.value]}</span>
        </div>
        <div class="summary-item">
          <span class="label">상담 날짜:</span>
          <span class="value">${consultationDate.value}</span>
        </div>
        <div class="summary-item">
          <span class="label">상담 시간:</span>
          <span class="value">${selectedTime.textContent}</span>
        </div>
      `;
    } else {
      summary.innerHTML = '<p>일정을 선택해주세요</p>';
    }
  }

  /**
   * 날짜 선택기 설정
   */
  setupDatePicker() {
    const dateInput = document.getElementById('consultation-date');
    if (!dateInput) return;

    // 최소 날짜를 오늘로 설정
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    // 날짜 변경 시 요약 업데이트
    dateInput.addEventListener('change', () => {
      this.updateScheduleSummary();
    });

    // 상담 방법 변경 시 요약 업데이트
    const typeOptions = document.querySelectorAll('input[name="consultation-type"]');
    typeOptions.forEach(option => {
      option.addEventListener('change', () => {
        this.updateScheduleSummary();
      });
    });
  }

  /**
   * 폼 제출 처리
   */
  async handleFormSubmit() {
    try {
      this.showLoading(true);
      
      // 폼 데이터 수집
      const formData = this.collectFormData();
      
      // 유효성 검사
      if (!this.validateFormData(formData)) {
        return;
      }

      // API 호출 시뮬레이션
      await this.simulateApiCall();
      
      this.showNotification('상담 예약이 완료되었습니다! 상담사가 곧 연락드리겠습니다.', 'success');
      
      // 폼 초기화
      this.resetForm();
      
    } catch (error) {
      this.showNotification('오류가 발생했습니다. 다시 시도해주세요.', 'error');
    } finally {
      this.showLoading(false);
    }
  }

  /**
   * 폼 데이터 수집
   */
  collectFormData() {
    const formData = {
      name: document.getElementById('name')?.value,
      phone: document.getElementById('phone')?.value,
      email: document.getElementById('email')?.value,
      age: document.getElementById('age')?.value,
      gender: document.getElementById('gender')?.value,
      occupation: document.getElementById('occupation')?.value,
      selectedInsurances: this.selectedInsurances,
      consultationType: document.querySelector('input[name="consultation-type"]:checked')?.value,
      consultationDate: document.getElementById('consultation-date')?.value,
      consultationTime: document.querySelector('.time-slot.selected')?.textContent,
      consultantPreference: document.querySelector('input[name="consultant-preference"]:checked')?.value,
      additionalNotes: document.getElementById('additional-notes')?.value
    };

    return formData;
  }

  /**
   * 폼 데이터 유효성 검사
   */
  validateFormData(data) {
    if (!data.name || !data.phone || !data.age) {
      this.showNotification('필수 항목을 모두 입력해주세요.', 'error');
      return false;
    }

    if (this.selectedInsurances.length === 0) {
      this.showNotification('관심 보험을 선택해주세요.', 'error');
      return false;
    }

    if (!data.consultationType || !data.consultationDate || !data.consultationTime) {
      this.showNotification('상담 일정을 선택해주세요.', 'error');
      return false;
    }

    return true;
  }

  /**
   * 폼 초기화
   */
  resetForm() {
    this.currentStep = 1;
    this.selectedInsurances = [];
    this.selectedSchedule = {};
    
    // 폼 필드 초기화
    const form = document.getElementById('consultation-form');
    if (form) {
      form.reset();
    }

    // 선택된 보험 초기화
    const insuranceOptions = document.querySelectorAll('.insurance-option');
    insuranceOptions.forEach(option => {
      option.classList.remove('selected');
    });

    // 시간 슬롯 초기화
    const timeSlots = document.querySelectorAll('.time-slot');
    timeSlots.forEach(slot => {
      slot.classList.remove('selected');
    });

    // 진행 단계 초기화
    this.updateProgressBar(1);
    this.showStep(1);
  }

  /**
   * 진행 단계 업데이트
   */
  updateProgressBar(step) {
    const progressSteps = document.querySelectorAll('.progress-step');
    progressSteps.forEach((stepEl, index) => {
      if (index + 1 <= step) {
        stepEl.classList.add('active');
      } else {
        stepEl.classList.remove('active');
      }
    });
  }

  /**
   * 단계 표시
   */
  showStep(step) {
    const formSteps = document.querySelectorAll('.form-step');
    formSteps.forEach((stepEl, index) => {
      if (index + 1 === step) {
        stepEl.classList.add('active');
      } else {
        stepEl.classList.remove('active');
      }
    });
  }

  /**
   * 로딩 표시
   */
  showLoading(show) {
    if (this.loadingSpinner) {
      if (show) {
        this.loadingSpinner.classList.add('active');
      } else {
        this.loadingSpinner.classList.remove('active');
      }
    }
  }

  /**
   * 알림 표시
   */
  showNotification(message, type = 'info') {
    if (!this.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    this.toastContainer.appendChild(toast);

    // 3초 후 자동 제거
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  /**
   * 리사이즈 이벤트 처리
   */
  handleResize() {
    // 반응형 처리 로직
  }

  /**
   * 로딩 스피너 설정
   */
  setupLoadingSpinner() {
    // 페이지 로드 완료 후 로딩 스피너 숨기기
    setTimeout(() => {
      this.showLoading(false);
    }, 1000);
  }

  /**
   * 알림 시스템 설정
   */
  setupNotifications() {
    // 알림 시스템 초기화
  }

  /**
   * API 호출 시뮬레이션
   */
  simulateApiCall() {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  }

  /**
   * 유틸리티 함수들
   */
  utils = {
    // 디바운스 함수
    debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },

    // 스로틀 함수
    throttle(func, limit) {
      let inThrottle;
      return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    }
  };
}

// 전역 함수들
window.nextStep = function() {
  if (window.app) {
    window.app.currentStep++;
    window.app.updateProgressBar(window.app.currentStep);
    window.app.showStep(window.app.currentStep);
  }
};

window.prevStep = function() {
  if (window.app && window.app.currentStep > 1) {
    window.app.currentStep--;
    window.app.updateProgressBar(window.app.currentStep);
    window.app.showStep(window.app.currentStep);
  }
};

window.openChatbot = function() {
  const chatbotWindow = document.getElementById('chatbot-window');
  if (chatbotWindow) {
    chatbotWindow.classList.add('active');
  }
};

// 보험료 계산 함수들
window.calculateCarInsurance = function() {
  const carType = document.getElementById('car-type').value;
  const drivingExperience = document.getElementById('driving-experience').value;
  const carAge = document.getElementById('car-age').value;
  const accidentHistory = document.getElementById('accident-history').value;

  if (!carType || !drivingExperience || !carAge || !accidentHistory) {
    window.app.showNotification('모든 정보를 입력해주세요.', 'error');
    return;
  }

  // 간단한 보험료 계산 로직
  let basePrice = 500000; // 기본 보험료 50만원
  
  // 차량 종류별 조정
  const carTypeMultiplier = {
    sedan: 1.0,
    suv: 1.2,
    truck: 1.5,
    motorcycle: 0.8
  };
  
  // 운전 경력별 조정
  const experienceMultiplier = {
    1: 1.5, // 1년 미만
    3: 1.2, // 1-3년
    5: 1.0, // 3-5년
    10: 0.9, // 5-10년
    15: 0.8  // 10년 이상
  };
  
  // 나이별 조정
  let ageMultiplier = 1.0;
  if (carAge < 30) ageMultiplier = 1.3;
  else if (carAge < 50) ageMultiplier = 1.0;
  else if (carAge < 70) ageMultiplier = 1.2;
  else ageMultiplier = 1.5;
  
  // 사고 이력별 조정
  const accidentMultiplier = {
    0: 0.8, // 사고 없음
    1: 1.0, // 1회
    2: 1.3, // 2회
    3: 1.8  // 3회 이상
  };
  
  const monthlyPrice = Math.round(
    basePrice * 
    carTypeMultiplier[carType] * 
    experienceMultiplier[drivingExperience] * 
    ageMultiplier * 
    accidentMultiplier[accidentHistory] / 12
  );
  
  const resultDiv = document.getElementById('car-calculator-result');
  if (resultDiv) {
    resultDiv.innerHTML = `
      <div class="result-success">
        <h4>예상 월 보험료</h4>
        <div class="price-display">${monthlyPrice.toLocaleString()}원</div>
        <p>* 실제 보험료는 상담을 통해 정확히 계산됩니다.</p>
      </div>
    `;
  }
};

window.calculateHealthInsurance = function() {
  const healthAge = document.getElementById('health-age').value;
  const healthGender = document.getElementById('health-gender').value;
  const healthCoverage = document.getElementById('health-coverage').value;
  const healthCondition = document.getElementById('health-condition').value;

  if (!healthAge || !healthGender || !healthCoverage || !healthCondition) {
    window.app.showNotification('모든 정보를 입력해주세요.', 'error');
    return;
  }

  // 간단한 보험료 계산 로직
  let basePrice = 300000; // 기본 보험료 30만원
  
  // 나이별 조정
  let ageMultiplier = 1.0;
  if (healthAge < 30) ageMultiplier = 0.8;
  else if (healthAge < 50) ageMultiplier = 1.0;
  else if (healthAge < 70) ageMultiplier = 1.5;
  else ageMultiplier = 2.0;
  
  // 성별 조정
  const genderMultiplier = healthGender === 'female' ? 0.9 : 1.0;
  
  // 보장금액별 조정
  const coverageMultiplier = {
    3000: 1.0,
    5000: 1.3,
    10000: 1.8,
    20000: 2.5
  };
  
  // 건강상태별 조정
  const conditionMultiplier = {
    excellent: 0.8,
    good: 1.0,
    fair: 1.3
  };
  
  const monthlyPrice = Math.round(
    basePrice * 
    ageMultiplier * 
    genderMultiplier * 
    coverageMultiplier[healthCoverage] * 
    conditionMultiplier[healthCondition] / 12
  );
  
  const resultDiv = document.getElementById('health-calculator-result');
  if (resultDiv) {
    resultDiv.innerHTML = `
      <div class="result-success">
        <h4>예상 월 보험료</h4>
        <div class="price-display">${monthlyPrice.toLocaleString()}원</div>
        <p>* 실제 보험료는 상담을 통해 정확히 계산됩니다.</p>
      </div>
    `;
  }
};

window.calculateLifeInsurance = function() {
  const lifeAge = document.getElementById('life-age').value;
  const lifeGender = document.getElementById('life-gender').value;
  const lifeCoverage = document.getElementById('life-coverage').value;
  const lifePeriod = document.getElementById('life-period').value;

  if (!lifeAge || !lifeGender || !lifeCoverage || !lifePeriod) {
    window.app.showNotification('모든 정보를 입력해주세요.', 'error');
    return;
  }

  // 간단한 보험료 계산 로직
  let basePrice = 200000; // 기본 보험료 20만원
  
  // 나이별 조정
  let ageMultiplier = 1.0;
  if (lifeAge < 30) ageMultiplier = 0.7;
  else if (lifeAge < 50) ageMultiplier = 1.0;
  else if (lifeAge < 70) ageMultiplier = 1.8;
  else ageMultiplier = 3.0;
  
  // 성별 조정
  const genderMultiplier = lifeGender === 'female' ? 0.8 : 1.0;
  
  // 보장금액별 조정
  const coverageMultiplier = {
    5000: 1.0,
    10000: 1.5,
    20000: 2.2,
    50000: 3.5
  };
  
  // 보험기간별 조정
  const periodMultiplier = {
    10: 0.8,
    20: 1.0,
    30: 1.3,
    lifetime: 1.8
  };
  
  const monthlyPrice = Math.round(
    basePrice * 
    ageMultiplier * 
    genderMultiplier * 
    coverageMultiplier[lifeCoverage] * 
    periodMultiplier[lifePeriod] / 12
  );
  
  const resultDiv = document.getElementById('life-calculator-result');
  if (resultDiv) {
    resultDiv.innerHTML = `
      <div class="result-success">
        <h4>예상 월 보험료</h4>
        <div class="price-display">${monthlyPrice.toLocaleString()}원</div>
        <p>* 실제 보험료는 상담을 통해 정확히 계산됩니다.</p>
      </div>
    `;
  }
};

window.calculateHomeInsurance = function() {
  const homeType = document.getElementById('home-type').value;
  const homeValue = document.getElementById('home-value').value;
  const homeYear = document.getElementById('home-year').value;
  const homeSecurity = document.getElementById('home-security').value;

  if (!homeType || !homeValue || !homeYear || !homeSecurity) {
    window.app.showNotification('모든 정보를 입력해주세요.', 'error');
    return;
  }

  // 간단한 보험료 계산 로직
  let basePrice = 100000; // 기본 보험료 10만원
  
  // 주택 유형별 조정
  const typeMultiplier = {
    apartment: 0.8,
    villa: 1.0,
    house: 1.3,
    officetel: 0.9
  };
  
  // 건물가액별 조정
  const valueMultiplier = {
    300: 0.8,
    500: 1.0,
    1000: 1.5,
    2000: 2.2
  };
  
  // 건축년도별 조정
  const yearMultiplier = {
    2020: 0.9,
    2010: 1.0,
    2000: 1.2,
    1990: 1.5
  };
  
  // 보안시설별 조정
  const securityMultiplier = {
    high: 0.7,
    medium: 1.0,
    low: 1.3
  };
  
  const monthlyPrice = Math.round(
    basePrice * 
    typeMultiplier[homeType] * 
    valueMultiplier[homeValue] * 
    yearMultiplier[homeYear] * 
    securityMultiplier[homeSecurity] / 12
  );
  
  const resultDiv = document.getElementById('home-calculator-result');
  if (resultDiv) {
    resultDiv.innerHTML = `
      <div class="result-success">
        <h4>예상 월 보험료</h4>
        <div class="price-display">${monthlyPrice.toLocaleString()}원</div>
        <p>* 실제 보험료는 상담을 통해 정확히 계산됩니다.</p>
      </div>
    `;
  }
};

window.calculateTravelInsurance = function() {
  const travelDestination = document.getElementById('travel-destination').value;
  const travelDuration = document.getElementById('travel-duration').value;
  const travelPeople = document.getElementById('travel-people').value;
  const travelType = document.getElementById('travel-type').value;

  if (!travelDestination || !travelDuration || !travelPeople || !travelType) {
    window.app.showNotification('모든 정보를 입력해주세요.', 'error');
    return;
  }

  // 간단한 보험료 계산 로직
  let basePrice = 10000; // 기본 보험료 1만원
  
  // 목적지별 조정
  const destinationMultiplier = {
    asia: 1.0,
    europe: 1.5,
    america: 1.3,
    africa: 2.0,
    oceania: 1.4
  };
  
  // 여행 기간별 조정
  const durationMultiplier = {
    7: 1.0,
    14: 1.8,
    30: 3.0,
    90: 7.0
  };
  
  // 인원별 조정
  const peopleMultiplier = {
    1: 1.0,
    2: 1.8,
    3: 2.5,
    4: 3.2
  };
  
  // 여행 유형별 조정
  const typeMultiplier = {
    leisure: 1.0,
    business: 1.2,
    study: 1.5,
    backpacking: 1.3
  };
  
  const totalPrice = Math.round(
    basePrice * 
    destinationMultiplier[travelDestination] * 
    durationMultiplier[travelDuration] * 
    peopleMultiplier[travelPeople] * 
    typeMultiplier[travelType]
  );
  
  const resultDiv = document.getElementById('travel-calculator-result');
  if (resultDiv) {
    resultDiv.innerHTML = `
      <div class="result-success">
        <h4>예상 보험료</h4>
        <div class="price-display">${totalPrice.toLocaleString()}원</div>
        <p>* 실제 보험료는 상담을 통해 정확히 계산됩니다.</p>
      </div>
    `;
  }
};

// 상품 상세 모달 닫기 기능 및 접근성 개선
function closeModal() {
  const modal = document.getElementById('product-detail-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    // 포커스 복원
    if (window._lastActiveElement) {
      window._lastActiveElement.focus();
      window._lastActiveElement = null;
    }
  }
}

// 모달 바깥 클릭, ESC 키 닫기, 포커스 트랩
if (document.location.pathname.includes('products.html')) {
  document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('product-detail-modal');
    if (!modal) return;
    // 바깥 클릭
    modal.addEventListener('mousedown', e => {
      if (e.target === modal) closeModal();
    });
    // ESC 키
    document.addEventListener('keydown', e => {
      if (modal.classList.contains('active') && e.key === 'Escape') closeModal();
    });
    // 포커스 트랩
    modal.addEventListener('keydown', e => {
      if (!modal.classList.contains('active')) return;
      const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    });
  });
}

// openProductDetail에서 접근성/애니메이션/포커스 적용
async function openProductDetail(categoryId, productId) {
  // 카테고리별 json 파일명 매핑
  const jsonMap = {
    car: 'assets/js/data/car-insurance.json',
    health: 'assets/js/data/health-insurance.json',
    life: 'assets/js/data/life-insurance.json',
    home: 'assets/js/data/home-insurance.json',
    travel: 'assets/js/data/travel-insurance.json'
  };
  const jsonUrl = jsonMap[categoryId];
  if (!jsonUrl) return;
  try {
    const res = await fetch(jsonUrl);
    if (!res.ok) throw new Error('데이터 로드 실패');
    const data = await res.json();
    const product = (data.products || []).find(p => p.id === productId);
    if (!product) return;
    const modal = document.getElementById('product-detail-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    if (!modal || !modalTitle || !modalBody) return;
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'modal-title');
    // 상세 필드 렌더링
    modalTitle.textContent = product.name;
    modalBody.innerHTML = `
      <div class="product-detail-modal-content slideInUp">
        <div class="product-detail-main">
          <div id="three-canvas-container" style="width:320px;height:240px;float:left;margin-right:24px;background:#f8f8f8;border-radius:12px;"></div>
          <img src="${product.image || ''}" alt="${product.name}" class="product-detail-image" style="display:none;" />
          <div class="product-detail-info">
            <h3>${product.name}</h3>
            <p>${product.description || ''}</p>
            <div class="product-features">
              ${(product.features||[]).map(f => `<span>${f}</span>`).join(' ')}
            </div>
            ${product.coverage ? `<div class='product-coverage'><strong>보장:</strong> <pre>${JSON.stringify(product.coverage, null, 2)}</pre></div>` : ''}
            ${product.premium ? `<div class='product-premium'><strong>보험료:</strong> <pre>${JSON.stringify(product.premium, null, 2)}</pre></div>` : ''}
            ${product.discounts ? `<div class='product-discounts'><strong>할인:</strong> ${(product.discounts||[]).map(d => `<span>${typeof d === 'string' ? d : d.type + ' ' + d.amount + '%'}</span>`).join(' ')} </div>` : ''}
            ${product.requirements ? `<div class='product-reqs'><strong>가입조건:</strong> <pre>${JSON.stringify(product.requirements, null, 2)}</pre></div>` : ''}
            ${product.rating ? `<div class='product-rating'><strong>평점:</strong> ${product.rating} / 5 (${product.reviews||0}건)</div>` : ''}
          </div>
        </div>
      </div>
    `;
    renderInsurance3DScene(categoryId);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    window._lastActiveElement = document.activeElement;
    setTimeout(() => {
      const firstInput = modal.querySelector('button, input, select');
      if (firstInput) firstInput.focus();
    }, 100);
  } catch (e) {
    alert('상품 정보를 불러오지 못했습니다.');
  }
}
window.openProductDetail = openProductDetail;

function openCalculator(category) {
    const modal = document.getElementById('calculator-modal');
    const calculatorTitle = document.getElementById('calculator-title');
    const calculatorForm = document.getElementById('calculator-form');
    
    // 카테고리별 제목 설정
    const titles = {
        'car': '자동차보험료 계산기',
        'health': '건강보험료 계산기',
        'life': '생명보험료 계산기',
        'home': '주택보험료 계산기',
        'travel': '여행보험료 계산기'
    };
    
    calculatorTitle.textContent = titles[category] || '보험료 계산기';
    
    // 카테고리별 계산기 폼 로드
    loadCalculatorForm(category, calculatorForm);
    
    // 모달 표시
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function loadCalculatorForm(category, container) {
    // 로딩 표시
    container.innerHTML = '<div class="loading">계산기를 불러오는 중...</div>';
    
    // 실제 구현에서는 API 호출 또는 정적 데이터 사용
    setTimeout(() => {
        const formData = getCalculatorForm(category);
        container.innerHTML = formData;
    }, 300);
}

function getCalculatorForm(category) {
    const forms = {
        'car': `
            <div class="calculator-form-content">
                <h3>자동차보험료 계산</h3>
                <div class="form-grid">
                    <div class="form-group">
                        <label for="car-type">차량 종류</label>
                        <select id="car-type" title="차량 종류">
                            <option value="">선택하세요</option>
                            <option value="sedan">승용차</option>
                            <option value="suv">SUV</option>
                            <option value="truck">트럭</option>
                            <option value="motorcycle">오토바이</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="car-age">연령</label>
                        <input type="number" id="car-age" placeholder="나이를 입력하세요" min="18" max="80" title="연령">
                    </div>
                    <div class="form-group">
                        <label for="driving-experience">운전 경력</label>
                        <select id="driving-experience" title="운전 경력">
                            <option value="">선택하세요</option>
                            <option value="1">1년 미만</option>
                            <option value="3">1-3년</option>
                            <option value="5">3-5년</option>
                            <option value="10">5-10년</option>
                            <option value="15">10년 이상</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="accident-history">사고 이력</label>
                        <select id="accident-history" title="사고 이력">
                            <option value="">선택하세요</option>
                            <option value="0">사고 없음</option>
                            <option value="1">1회</option>
                            <option value="2">2회</option>
                            <option value="3">3회 이상</option>
                        </select>
                    </div>
                </div>
                <button class="btn btn-primary btn-large" onclick="calculateInsurance('car')">
                    <span>보험료 계산하기</span>
                    <i class="fas fa-calculator"></i>
                </button>
            </div>
        `,
        'health': `
            <div class="calculator-form-content">
                <h3>건강보험료 계산</h3>
                <div class="form-grid">
                    <div class="form-group">
                        <label for="health-age">연령</label>
                        <input type="number" id="health-age" placeholder="나이를 입력하세요" min="0" max="100" title="연령">
                    </div>
                    <div class="form-group">
                        <label for="health-gender">성별</label>
                        <select id="health-gender" title="성별">
                            <option value="">선택하세요</option>
                            <option value="male">남성</option>
                            <option value="female">여성</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="health-coverage">보장금액</label>
                        <select id="health-coverage" title="보장금액">
                            <option value="">선택하세요</option>
                            <option value="basic">기본보장 (1천만원)</option>
                            <option value="standard">표준보장 (3천만원)</option>
                            <option value="premium">프리미엄보장 (5천만원)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="health-period">보험기간</label>
                        <select id="health-period" title="보험기간">
                            <option value="">선택하세요</option>
                            <option value="1">1년</option>
                            <option value="3">3년</option>
                            <option value="5">5년</option>
                            <option value="10">10년</option>
                        </select>
                    </div>
                </div>
                <button class="btn btn-primary btn-large" onclick="calculateInsurance('health')">
                    <span>보험료 계산하기</span>
                    <i class="fas fa-calculator"></i>
                </button>
            </div>
        `
    };
    
    return forms[category] || '<p>계산기를 불러올 수 없습니다.</p>';
}

function calculateInsurance(category) {
    const resultContainer = document.getElementById('calculator-result');
    
    // 로딩 표시
    resultContainer.innerHTML = '<div class="loading">계산 중...</div>';
    
    // 실제 계산 로직 (간단한 예시)
    setTimeout(() => {
        let result = '';
        
        switch(category) {
            case 'car':
                const carType = document.getElementById('car-type').value;
                const carAge = document.getElementById('car-age').value;
                const drivingExp = document.getElementById('driving-experience').value;
                const accidentHistory = document.getElementById('accident-history').value;
                
                if (!carType || !carAge || !drivingExp || !accidentHistory) {
                    result = '<div class="error">모든 정보를 입력해주세요.</div>';
                } else {
                    const baseRate = 500000;
                    const typeMultiplier = { sedan: 1, suv: 1.2, truck: 1.5, motorcycle: 0.8 };
                    const ageMultiplier = carAge < 25 ? 1.5 : carAge < 35 ? 1.2 : 1;
                    const expMultiplier = drivingExp < 3 ? 1.3 : drivingExp < 10 ? 1.1 : 1;
                    const accidentMultiplier = accidentHistory == 0 ? 0.9 : 1 + (accidentHistory * 0.2);
                    
                    const premium = Math.round(baseRate * typeMultiplier[carType] * ageMultiplier * expMultiplier * accidentMultiplier);
                    
                    result = `
                        <div class="calculation-result">
                            <h3>계산 결과</h3>
                            <div class="result-details">
                                <div class="result-item">
                                    <span class="label">차량 종류:</span>
                                    <span class="value">${document.getElementById('car-type').options[document.getElementById('car-type').selectedIndex].text}</span>
                                </div>
                                <div class="result-item">
                                    <span class="label">연령:</span>
                                    <span class="value">${carAge}세</span>
                                </div>
                                <div class="result-item">
                                    <span class="label">운전 경력:</span>
                                    <span class="value">${document.getElementById('driving-experience').options[document.getElementById('driving-experience').selectedIndex].text}</span>
                                </div>
                                <div class="result-item">
                                    <span class="label">사고 이력:</span>
                                    <span class="value">${document.getElementById('accident-history').options[document.getElementById('accident-history').selectedIndex].text}</span>
                                </div>
                            </div>
                            <div class="premium-result">
                                <div class="premium-amount">월 보험료: ${premium.toLocaleString()}원</div>
                                <div class="premium-note">* 실제 보험료는 상담을 통해 정확히 계산됩니다.</div>
                            </div>
                        </div>
                    `;
                }
                break;
                
            case 'health':
                const healthAge = document.getElementById('health-age').value;
                const healthGender = document.getElementById('health-gender').value;
                const healthCoverage = document.getElementById('health-coverage').value;
                const healthPeriod = document.getElementById('health-period').value;
                
                if (!healthAge || !healthGender || !healthCoverage || !healthPeriod) {
                    result = '<div class="error">모든 정보를 입력해주세요.</div>';
                } else {
                    const baseRate = 30000;
                    const ageMultiplier = healthAge < 30 ? 0.8 : healthAge < 50 ? 1 : healthAge < 70 ? 1.5 : 2;
                    const genderMultiplier = healthGender === 'female' ? 0.9 : 1;
                    const coverageMultiplier = { basic: 1, standard: 1.5, premium: 2 };
                    const periodMultiplier = healthPeriod == 1 ? 1 : healthPeriod == 3 ? 0.9 : healthPeriod == 5 ? 0.8 : 0.7;
                    
                    const premium = Math.round(baseRate * ageMultiplier * genderMultiplier * coverageMultiplier[healthCoverage] * periodMultiplier);
                    
                    result = `
                        <div class="calculation-result">
                            <h3>계산 결과</h3>
                            <div class="result-details">
                                <div class="result-item">
                                    <span class="label">연령:</span>
                                    <span class="value">${healthAge}세</span>
                                </div>
                                <div class="result-item">
                                    <span class="label">성별:</span>
                                    <span class="value">${healthGender === 'male' ? '남성' : '여성'}</span>
                                </div>
                                <div class="result-item">
                                    <span class="label">보장금액:</span>
                                    <span class="value">${document.getElementById('health-coverage').options[document.getElementById('health-coverage').selectedIndex].text}</span>
                                </div>
                                <div class="result-item">
                                    <span class="label">보험기간:</span>
                                    <span class="value">${healthPeriod}년</span>
                                </div>
                            </div>
                            <div class="premium-result">
                                <div class="premium-amount">월 보험료: ${premium.toLocaleString()}원</div>
                                <div class="premium-note">* 실제 보험료는 상담을 통해 정확히 계산됩니다.</div>
                            </div>
                        </div>
                    `;
                }
                break;
                
            default:
                result = '<div class="error">지원하지 않는 보험 종류입니다.</div>';
        }
        
        resultContainer.innerHTML = result;
    }, 1000);
}

function closeCalculator() {
    const modal = document.getElementById('calculator-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// FAQ 페이지 기능
function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const isActive = answer.classList.contains('active');
    
    // 모든 FAQ 닫기
    document.querySelectorAll('.faq-answer').forEach(ans => {
        ans.classList.remove('active');
    });
    document.querySelectorAll('.faq-question').forEach(q => {
        q.classList.remove('active');
    });
    
    // 클릭된 FAQ만 열기
    if (!isActive) {
        answer.classList.add('active');
        element.classList.add('active');
    }
}

function searchFAQ() {
    const searchTerm = document.getElementById('faq-search').value.toLowerCase();
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('h3').textContent.toLowerCase();
        const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
        
        if (question.includes(searchTerm) || answer.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function filterByCategory(category) {
    const faqCategories = document.querySelectorAll('.faq-category');
    const tags = document.querySelectorAll('.search-tags .tag');
    
    // 태그 활성화 상태 변경
    tags.forEach(tag => tag.classList.remove('active'));
    event.target.classList.add('active');
    
    if (category === 'all') {
        faqCategories.forEach(cat => cat.style.display = 'block');
    } else {
        faqCategories.forEach(cat => {
            if (cat.dataset.category === category) {
                cat.style.display = 'block';
            } else {
                cat.style.display = 'none';
            }
        });
    }
}

// 전역 인스턴스 생성
window.app = new PremiumInsuranceApp();

// CSS 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
  @keyframes particleFloat {
    0% {
      transform: translateY(0px) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(-100vh) rotate(360deg);
      opacity: 0;
    }
  }

  .particle {
    pointer-events: none;
  }

  /* 스크롤 애니메이션 */
  .fade-in {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease-out;
  }

  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .slide-in-left {
    opacity: 0;
    transform: translateX(-50px);
    transition: all 0.6s ease-out;
  }

  .slide-in-left.visible {
    opacity: 1;
    transform: translateX(0);
  }

  /* 버튼 호버 효과 */
  .btn {
    position: relative;
    overflow: hidden;
  }

  .btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease-in-out;
  }

  .btn:hover::before {
    left: 100%;
  }

  /* 카테고리 카드 호버 효과 */
  .category-card {
    transition: all 0.3s ease-in-out;
  }

  .category-card:hover {
    transform: translateY(-10px) scale(1.02);
  }

  /* 특징 카드 호버 효과 */
  .feature-card {
    transition: all 0.3s ease-in-out;
  }

  .feature-card:hover {
    transform: translateY(-10px);
  }

  /* 통계 숫자 애니메이션 */
  .stat-number {
    transition: all 0.3s ease-in-out;
  }

  /* 파티클 배경 효과 */
  .particles-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
  }

  /* 스크롤 인디케이터 애니메이션 */
  .scroll-arrow {
    animation: scrollBounce 2s infinite;
  }

  /* 플로팅 카드 애니메이션 */
  .floating-card {
    animation: float 6s ease-in-out infinite;
  }

  .floating-card.card-1 {
    animation-delay: 0s;
  }

  .floating-card.card-2 {
    animation-delay: 2s;
  }

  .floating-card.card-3 {
    animation-delay: 4s;
  }

  /* 반응형 개선 */
  @media (max-width: 768px) {
    .hero-stats {
      flex-direction: column;
      gap: 1rem;
    }
    
    .hero-buttons {
      flex-direction: column;
      align-items: center;
    }
    
    .btn {
      width: 100%;
      max-width: 300px;
    }
  }

  @media (max-width: 480px) {
    .hero-title {
      font-size: 2rem;
    }
    
    .section-title {
      font-size: 1.5rem;
    }
  }
`;
document.head.appendChild(style);

window.openProductDetail = openProductDetail;
window.openCalculator = openCalculator;
window.closeCalculator = closeCalculator;

/**
 * 보험상품 상단 영역 렌더링
 */
function renderProductsHeader() {
  if (!window.sectionHeaders || !sectionHeaders.products) return;
  const data = sectionHeaders.products;
  const headerEl = document.getElementById('products-header');
  if (!headerEl) return;

  headerEl.innerHTML = `
    <div class="container">
      <div class="products-header-content fade-in">
        <div class="header-visual">
          <img src="${data.visual}" alt="보험상품 비주얼" loading="lazy" />
        </div>
        <div class="header-text">
          <span class="header-badge"><i class="fas fa-shield-alt"></i> ${data.title}</span>
          <h1 class="header-title">${data.title}</h1>
          <p class="header-description">${data.description}</p>
          <div class="header-highlights">
            ${data.highlights.map(h => `
              <div class="highlight-item">
                <span class="highlight-label">${h.label}</span>
                <span class="highlight-value">${h.value}</span>
              </div>
            `).join('')}
          </div>
          <div class="header-ctas">
            ${data.ctas.map(c => `
              <button class="btn btn-primary" onclick="${c.action}()">${c.label}</button>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

// 페이지 로드 시 products.html에서만 실행
if (document.location.pathname.includes('products.html')) {
  document.addEventListener('DOMContentLoaded', renderProductsHeader);
}

/**
 * 보험상품 카드 리스트 렌더링
 */
function renderProductsList() {
  if (!window.productsData) return;
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  let html = '';
  window.productsData.forEach(category => {
    category.products.forEach(product => {
      html += `
        <div class="product-card fade-in" data-category="${category.id}">
          <div class="product-image">
            <img src="${category.icon}" alt="${category.name}">
          </div>
          <div class="product-content">
            <div class="product-badge"><i class="${category.badgeIcon}"></i> <span>${category.name}</span></div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-features">
              ${product.features.map(f => `<span>${f}</span>`).join(' ')}
            </div>
            <div class="product-actions">
              <button class="btn btn-primary" onclick="openProductDetail('${category.id}','${product.id}')"><span>상세보기</span> <i class="fas fa-arrow-right"></i></button>
            </div>
          </div>
        </div>
      `;
    });
  });
  grid.innerHTML = html;
}

// 페이지 로드 시 products.html에서만 실행
if (document.location.pathname.includes('products.html')) {
  document.addEventListener('DOMContentLoaded', renderProductsList);
}

window.closeModal = closeModal;

function clearThreeCanvas() {
  const container = document.getElementById('three-canvas-container');
  if (container) container.innerHTML = '';
}

function renderInsurance3DScene(type) {
  clearThreeCanvas();
  const container = document.getElementById('three-canvas-container');
  if (!container) return;
  const width = container.offsetWidth;
  const height = container.offsetHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.set(0, 1.5, 5);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);

  // 조명
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, 7.5);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0xffffff, 0.5));

  // 보험별 모델 파일명 매핑
  const modelMap = {
    'car': 'Sports Car.glb',
    'health': 'Man.glb',
    'home': 'House.glb',
    'life': 'Man.glb', // family.glb 없으므로 임시 대체
    'travel': 'Airplane.glb',
  };
  const modelFile = modelMap[type] || 'Man.glb';
  const loader = new GLTFLoader();
  loader.load(`/assets/models/${modelFile}`, (gltf) => {
    const model = gltf.scene;
    model.position.set(0, 0, 0);
    model.scale.set(1.5, 1.5, 1.5);
    scene.add(model);
    // 애니메이션: 천천히 회전
    function animate() {
      requestAnimationFrame(animate);
      model.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();
  }, undefined, (error) => {
    console.error('3D 모델 로딩 실패:', error);
  });
}

// 상세보기 모달 오픈 시 renderInsurance3DScene(type) 호출 필요
// 예시: renderInsurance3DScene('car'); 