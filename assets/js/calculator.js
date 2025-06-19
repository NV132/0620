// Calculator.js - 보험료 계산기
class InsuranceCalculator {
  constructor() {
    this.calculators = {};
    this.init();
  }

  init() {
    this.loadCalculatorData();
    this.bindEvents();
  }

  async loadCalculatorData() {
    try {
      const [carData, healthData, lifeData] = await Promise.all([
        fetch('../assets/js/data/car-insurance.json').then(res => res.json()),
        fetch('../assets/js/data/health-insurance.json').then(res => res.json()),
        fetch('../assets/js/data/life-insurance.json').then(res => res.json())
      ]);

      this.calculators = {
        car: carData,
        health: healthData,
        life: lifeData
      };
    } catch (error) {
      console.error('계산기 데이터 로드 실패:', error);
    }
  }

  bindEvents() {
    // 계산기 폼 이벤트
    const calculatorForms = document.querySelectorAll('.calculator-form');
    calculatorForms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.calculatePremium(form);
      });
    });

    // 입력값 변경 시 실시간 계산
    const calculatorInputs = document.querySelectorAll('.calculator-input');
    calculatorInputs.forEach(input => {
      input.addEventListener('input', (e) => {
        this.updateCalculation(e.target.closest('.calculator-form'));
      });
    });
  }

  calculatePremium(form) {
    const type = form.dataset.type;
    const calculator = this.calculators[type];
    
    if (!calculator) {
      this.showError('계산기 데이터를 불러올 수 없습니다.');
      return;
    }

    const formData = new FormData(form);
    const inputs = Object.fromEntries(formData.entries());
    
    let premium = 0;
    let breakdown = [];

    switch (type) {
      case 'car':
        premium = this.calculateCarPremium(inputs, calculator);
        break;
      case 'health':
        premium = this.calculateHealthPremium(inputs, calculator);
        break;
      case 'life':
        premium = this.calculateLifePremium(inputs, calculator);
        break;
    }

    this.displayResult(form, premium, breakdown);
  }

  calculateCarPremium(inputs, calculator) {
    const { age, drivingExperience, carType, coverage, claims } = inputs;
    
    // 기본 보험료
    let basePremium = 500000; // 기본 50만원
    
    // 나이 요인
    const ageFactor = this.getAgeFactor(parseInt(age), calculator.calculators.premium.factors.age);
    
    // 운전 경험 요인
    const experienceFactor = this.getExperienceFactor(parseInt(drivingExperience));
    
    // 차량 타입 요인
    const carTypeFactor = this.getCarTypeFactor(carType);
    
    // 보장 범위 요인
    const coverageFactor = this.getCoverageFactor(parseInt(coverage), calculator.calculators.premium.factors.coverage);
    
    // 사고 이력 요인
    const claimsFactor = this.getClaimsFactor(parseInt(claims));
    
    const premium = basePremium * ageFactor * experienceFactor * carTypeFactor * coverageFactor * claimsFactor;
    
    return Math.round(premium);
  }

  calculateHealthPremium(inputs, calculator) {
    const { age, gender, health, coverage, familyHistory } = inputs;
    
    // 기본 보험료
    let basePremium = 300000; // 기본 30만원
    
    // 나이 요인
    const ageFactor = this.getAgeFactor(parseInt(age), calculator.calculators.premium.factors.age);
    
    // 성별 요인
    const genderFactor = gender === 'female' ? 0.9 : 1.0;
    
    // 건강 상태 요인
    const healthFactor = this.getHealthFactor(health, calculator.calculators.premium.factors.health);
    
    // 보장 범위 요인
    const coverageFactor = this.getCoverageFactor(parseInt(coverage), calculator.calculators.premium.factors.coverage);
    
    // 가족력 요인
    const familyFactor = familyHistory === 'yes' ? 1.2 : 1.0;
    
    const premium = basePremium * ageFactor * genderFactor * healthFactor * coverageFactor * familyFactor;
    
    return Math.round(premium);
  }

  calculateLifePremium(inputs, calculator) {
    const { age, gender, health, coverage, occupation } = inputs;
    
    // 기본 보험료
    let basePremium = 400000; // 기본 40만원
    
    // 나이 요인
    const ageFactor = this.getAgeFactor(parseInt(age), calculator.calculators.premium.factors.age);
    
    // 성별 요인
    const genderFactor = gender === 'female' ? 0.8 : 1.0;
    
    // 건강 상태 요인
    const healthFactor = this.getHealthFactor(health, calculator.calculators.premium.factors.health);
    
    // 보장 범위 요인
    const coverageFactor = this.getCoverageFactor(parseInt(coverage), calculator.calculators.premium.factors.coverage);
    
    // 직업 요인
    const occupationFactor = this.getOccupationFactor(occupation);
    
    const premium = basePremium * ageFactor * genderFactor * healthFactor * coverageFactor * occupationFactor;
    
    return Math.round(premium);
  }

  getAgeFactor(age, ageFactors) {
    if (age <= 30) return ageFactors['18-30'] || 1.0;
    if (age <= 40) return ageFactors['31-40'] || 1.2;
    if (age <= 50) return ageFactors['41-50'] || 1.5;
    if (age <= 60) return ageFactors['51-60'] || 2.0;
    return ageFactors['61-65'] || 2.5;
  }

  getExperienceFactor(experience) {
    if (experience >= 10) return 0.7;
    if (experience >= 5) return 0.8;
    if (experience >= 2) return 0.9;
    return 1.0;
  }

  getCarTypeFactor(carType) {
    const factors = {
      'small': 0.8,
      'medium': 1.0,
      'large': 1.3,
      'suv': 1.2,
      'luxury': 1.5
    };
    return factors[carType] || 1.0;
  }

  getCoverageFactor(coverage, coverageFactors) {
    if (coverage <= 10000000) return coverageFactors['10000000'] || 1.0;
    if (coverage <= 20000000) return coverageFactors['20000000'] || 1.8;
    if (coverage <= 30000000) return coverageFactors['30000000'] || 2.5;
    if (coverage <= 50000000) return coverageFactors['50000000'] || 3.5;
    return coverageFactors['100000000'] || 6.0;
  }

  getClaimsFactor(claims) {
    if (claims === 0) return 0.8;
    if (claims === 1) return 1.0;
    if (claims === 2) return 1.3;
    return 1.6;
  }

  getHealthFactor(health, healthFactors) {
    return healthFactors[health] || 1.0;
  }

  getOccupationFactor(occupation) {
    const factors = {
      'office': 1.0,
      'manual': 1.2,
      'professional': 0.9,
      'student': 0.8,
      'retired': 1.1
    };
    return factors[occupation] || 1.0;
  }

  updateCalculation(form) {
    // 실시간 계산 업데이트 (선택적)
    const inputs = form.querySelectorAll('input, select');
    const allFilled = Array.from(inputs).every(input => input.value);
    
    if (allFilled) {
      this.calculatePremium(form);
    }
  }

  displayResult(form, premium, breakdown) {
    const resultContainer = form.querySelector('.calculator-result');
    if (!resultContainer) return;

    const monthlyPremium = Math.round(premium / 12);
    const yearlyPremium = premium;

    resultContainer.innerHTML = `
      <div class="result-card">
        <h3>예상 보험료</h3>
        <div class="premium-display">
          <div class="premium-item">
            <span class="label">월 보험료</span>
            <span class="amount">${this.formatCurrency(monthlyPremium)}</span>
          </div>
          <div class="premium-item">
            <span class="label">연 보험료</span>
            <span class="amount">${this.formatCurrency(yearlyPremium)}</span>
          </div>
        </div>
        <div class="result-note">
          <p>* 실제 보험료는 정확한 심사 후 결정됩니다.</p>
          <p>* 위 금액은 참고용이며, 실제 가입 시에는 상담을 통해 정확한 견적을 받으시기 바랍니다.</p>
        </div>
        <button type="button" class="btn btn-primary" onclick="window.location.href='consultation.html'">
          상담 신청하기
        </button>
      </div>
    `;

    resultContainer.style.display = 'block';
  }

  formatCurrency(amount) {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(amount);
  }

  showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
      errorDiv.remove();
    }, 3000);
  }
}

// 페이지 로드 시 계산기 초기화
document.addEventListener('DOMContentLoaded', () => {
  new InsuranceCalculator();
}); 