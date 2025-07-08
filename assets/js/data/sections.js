const sectionHeaders = {
  products: {
    title: "보험상품",
    description: "당신의 라이프스타일에 맞는 다양한 보험을 한눈에 비교하세요.",
    visual: "assets/images/headers/products-visual.svg",
    highlights: [
      { label: "실시간 인기 상품", value: "자동차보험" },
      { label: "오늘 신규 출시", value: "2건" },
      { label: "고객 리뷰", value: "1,250+" }
    ],
    ctas: [
      { label: "상담 신청", action: "goConsultation" },
      { label: "보험료 계산", action: "openCalculator" }
    ]
  },
  consultation: {
    title: "상담예약",
    description: "전문 상담사와 1:1 맞춤 상담을 예약하세요.",
    visual: "assets/images/headers/consultation-visual.svg",
    highlights: [
      { label: "오늘 예약 가능", value: "5타임" },
      { label: "상담 대기", value: "3명" },
      { label: "평균 소요", value: "15분" }
    ],
    ctas: [
      { label: "지금 예약", action: "openReservation" },
      { label: "상담사 소개", action: "showCounselors" }
    ]
  },
  faq: {
    title: "자주 묻는 질문",
    description: "보험에 대해 궁금한 점을 빠르게 찾아보세요.",
    visual: "assets/images/headers/faq-visual.svg",
    highlights: [
      { label: "인기 질문", value: "보험료 산정 기준" },
      { label: "오늘 등록", value: "4건" },
      { label: "챗봇 추천", value: "가입 조건" }
    ],
    ctas: [
      { label: "상담 신청", action: "goConsultation" },
      { label: "문의 남기기", action: "openInquiry" }
    ]
  }
};

if (typeof module !== "undefined") {
  module.exports = sectionHeaders;
} else {
  window.sectionHeaders = sectionHeaders;
} 