// Chatbot.js - 보험 상담 챗봇
class InsuranceChatbot {
  constructor() {
    this.messages = [];
    this.isOpen = false;
    this.currentStep = 'greeting';
    
    this.init();
  }

  init() {
    this.toggle = document.getElementById('chatbot-toggle');
    this.window = document.getElementById('chatbot-window');
    this.close = document.getElementById('chatbot-close');
    this.messagesContainer = document.getElementById('chatbot-messages');
    this.input = document.getElementById('chatbot-input');
    this.send = document.getElementById('chatbot-send');

    this.bindEvents();
  }

  bindEvents() {
    // 챗봇 토글
    this.toggle.addEventListener('click', () => this.toggleChatbot());
    this.close.addEventListener('click', () => this.closeChatbot());

    // 메시지 전송
    this.send.addEventListener('click', () => this.sendMessage());
    this.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.sendMessage();
      }
    });

    // 챗봇 외부 클릭 시 닫기
    document.addEventListener('click', (e) => {
      if (!this.window.contains(e.target) && !this.toggle.contains(e.target)) {
        this.closeChatbot();
      }
    });
  }

  toggleChatbot() {
    if (this.isOpen) {
      this.closeChatbot();
    } else {
      this.openChatbot();
    }
  }

  openChatbot() {
    this.window.style.display = 'block';
    this.isOpen = true;
    this.input.focus();
    
    // 애니메이션 효과
    setTimeout(() => {
      this.window.classList.add('active');
    }, 10);
  }

  closeChatbot() {
    this.window.classList.remove('active');
    setTimeout(() => {
      this.window.style.display = 'none';
      this.isOpen = false;
    }, 300);
  }

  sendMessage() {
    const message = this.input.value.trim();
    if (!message) return;

    // 사용자 메시지 추가
    this.addMessage(message, 'user');
    this.input.value = '';

    // 봇 응답 처리
    setTimeout(() => {
      this.processUserMessage(message);
    }, 500);
  }

  addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.textContent = text;
    
    this.messagesContainer.appendChild(messageDiv);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  processUserMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    // 키워드 기반 응답
    if (lowerMessage.includes('자동차') || lowerMessage.includes('차량')) {
      this.addMessage('자동차보험에 대해 궁금하신 점이 있으시군요! 어떤 부분을 도와드릴까요?\n\n1. 보험료 계산\n2. 보장 내용\n3. 가입 방법', 'bot');
    } else if (lowerMessage.includes('건강') || lowerMessage.includes('의료')) {
      this.addMessage('건강보험에 대해 문의하시는군요! 어떤 도움이 필요하신가요?\n\n1. 보장 범위\n2. 가입 조건\n3. 보험료 안내', 'bot');
    } else if (lowerMessage.includes('생명') || lowerMessage.includes('사망')) {
      this.addMessage('생명보험에 대해 궁금하시군요! 어떤 상품을 찾고 계신가요?\n\n1. 종신보험\n2. 정기보험\n3. 연금보험', 'bot');
    } else if (lowerMessage.includes('보험료') || lowerMessage.includes('가격')) {
      this.addMessage('보험료는 개인의 상황에 따라 다르게 계산됩니다. 정확한 견적을 원하시면 상담 신청을 해주세요!', 'bot');
    } else if (lowerMessage.includes('상담') || lowerMessage.includes('문의')) {
      this.addMessage('전문 상담사와 상담을 원하시는군요! 상담 신청 페이지로 이동하시겠습니까?', 'bot');
    } else if (lowerMessage.includes('감사') || lowerMessage.includes('고마워')) {
      this.addMessage('천만에요! 언제든지 도움이 필요하시면 말씀해 주세요. 😊', 'bot');
    } else {
      this.addMessage('죄송합니다. 더 구체적으로 말씀해 주시면 도움을 드릴 수 있습니다. 자동차보험, 건강보험, 생명보험 중 어떤 것에 대해 궁금하신가요?', 'bot');
    }
  }

  // 자동 응답 (일정 시간 후)
  autoResponse() {
    const responses = [
      '혹시 보험 상품에 대해 궁금한 점이 있으시면 언제든 말씀해 주세요!',
      '자동차보험, 건강보험, 생명보험 등 다양한 상품을 안내해 드릴 수 있습니다.',
      '보험료 계산이나 상담 신청도 도와드릴 수 있어요!'
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    this.addMessage(randomResponse, 'bot');
  }
}

// 페이지 로드 시 챗봇 초기화
document.addEventListener('DOMContentLoaded', () => {
  new InsuranceChatbot();
}); 