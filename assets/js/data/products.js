const productsData = [
  {
    id: "car",
    name: "자동차보험",
    icon: "assets/images/icons/car-insurance.svg",
    badgeIcon: "fas fa-car",
    description: "교통사고로 인한 인적·물적 손해를 보장하는 종합 자동차보험입니다.",
    features: ["사고보장", "24시간 긴급출동", "무료견인서비스"]
  },
  {
    id: "health",
    name: "건강보험",
    icon: "assets/images/icons/health-insurance.svg",
    badgeIcon: "fas fa-heartbeat",
    description: "질병과 상해에 대한 의료비를 종합적으로 보장하는 건강보험입니다.",
    features: ["입원보장", "수술보장", "건강검진"]
  },
  {
    id: "life",
    name: "생명보험",
    icon: "assets/images/icons/life-insurance.svg",
    badgeIcon: "fas fa-shield-alt",
    description: "가족의 경제적 안정을 위한 생명 보장과 연금 혜택을 제공합니다.",
    features: ["사망보장", "만기보장", "연금보장"]
  },
  {
    id: "home",
    name: "주택보험",
    icon: "assets/images/icons/home-insurance.svg",
    badgeIcon: "fas fa-home",
    description: "재산 손실과 책임 위험에 대한 종합적인 주택 보장을 제공합니다.",
    features: ["화재보장", "도난보장", "배상책임"]
  },
  {
    id: "travel",
    name: "여행보험",
    icon: "assets/images/icons/travel-insurance.svg",
    badgeIcon: "fas fa-plane",
    description: "해외여행 중 발생할 수 있는 다양한 위험을 보장하는 여행보험입니다.",
    features: ["의료보장", "항공지연", "여행취소"]
  }
];

if (typeof module !== "undefined") {
  module.exports = productsData;
} else {
  window.productsData = productsData;
} 