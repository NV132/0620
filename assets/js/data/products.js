const productsData = [
  {
    id: "car",
    name: "자동차보험",
    icon: "assets/images/icons/car-insurance.svg",
    badgeIcon: "fas fa-car",
    description: "교통사고로 인한 인적·물적 손해를 보장하는 종합 자동차보험입니다.",
    features: ["사고보장", "24시간 긴급출동", "무료견인서비스"],
    products: [
      {
        id: "car-001",
        name: "안전운전 자동차보험",
        description: "안전운전 할인과 다양한 특약으로 합리적인 보험료",
        features: ["안전운전 할인 최대 50%", "자동차 수리비 보장", "대인배상 무제한"],
        image: "assets/images/products/car-insurance-1.jpg"
      },
      {
        id: "car-002",
        name: "프리미엄 자동차보험",
        description: "최고 수준의 보장과 프리미엄 서비스 제공",
        features: ["완전보장 특약 포함", "VIP 긴급출동서비스", "렌터카 무료 제공"],
        image: "assets/images/products/car-insurance-2.jpg"
      }
    ]
  },
  {
    id: "health",
    name: "건강보험",
    icon: "assets/images/icons/health-insurance.svg",
    badgeIcon: "fas fa-heartbeat",
    description: "질병과 상해에 대한 의료비를 종합적으로 보장하는 건강보험입니다.",
    features: ["입원보장", "수술보장", "건강검진"],
    products: [
      {
        id: "health-001",
        name: "종합건강보험",
        description: "입원, 수술, 통원을 모두 보장하는 종합 건강보험",
        features: ["입원보장", "수술보장", "통원보장", "건강검진"],
        image: "assets/images/products/health-insurance-1.jpg"
      }
    ]
  },
  {
    id: "life",
    name: "생명보험",
    icon: "assets/images/icons/life-insurance.svg",
    badgeIcon: "fas fa-shield-alt",
    description: "가족의 경제적 안정을 위한 생명 보장과 연금 혜택을 제공합니다.",
    features: ["사망보장", "만기보장", "연금보장"],
    products: [
      {
        id: "life-001",
        name: "종신보험",
        description: "사망할 때까지 보장이 지속되는 보험",
        features: ["사망보장", "만기보장", "해지환급금"],
        image: "assets/images/products/life-insurance-1.jpg"
      }
    ]
  },
  {
    id: "home",
    name: "주택보험",
    icon: "assets/images/icons/home-insurance.svg",
    badgeIcon: "fas fa-home",
    description: "재산 손실과 책임 위험에 대한 종합적인 주택 보장을 제공합니다.",
    features: ["화재보장", "도난보장", "배상책임"],
    products: [
      {
        id: "home-001",
        name: "종합주택보험",
        description: "화재, 도난, 배상책임을 모두 보장하는 종합 보험",
        features: ["화재보장", "도난보장", "배상책임", "자연재해"],
        image: "assets/images/products/home-insurance-1.jpg"
      }
    ]
  },
  {
    id: "travel",
    name: "여행보험",
    icon: "assets/images/icons/travel-insurance.svg",
    badgeIcon: "fas fa-plane",
    description: "해외여행 중 발생할 수 있는 다양한 위험을 보장하는 여행보험입니다.",
    features: ["의료보장", "항공지연", "여행취소"],
    products: [
      {
        id: "travel-001",
        name: "종합여행보험",
        description: "의료, 항공지연, 여행취소를 모두 보장하는 종합 보험",
        features: ["의료보장", "항공지연", "여행취소", "항공사고"],
        image: "assets/images/products/travel-insurance-1.jpg"
      }
    ]
  }
];

if (typeof module !== "undefined") {
  module.exports = productsData;
} else {
  window.productsData = productsData;
} 