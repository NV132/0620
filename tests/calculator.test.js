// Calculator Tests
describe('InsuranceCalculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new InsuranceCalculator();
  });

  describe('calculateCarPremium', () => {
    it('should calculate car insurance premium correctly', () => {
      const inputs = {
        age: 30,
        drivingExperience: 5,
        carType: 'medium',
        coverage: 20000000,
        claims: 0
      };

      const calculatorData = {
        calculators: {
          premium: {
            factors: {
              age: {
                '18-30': 1.0,
                '31-40': 1.2
              },
              coverage: {
                '20000000': 1.8
              }
            }
          }
        }
      };

      const result = calculator.calculateCarPremium(inputs, calculatorData);
      expect(result).toBeGreaterThan(0);
      expect(typeof result).toBe('number');
    });

    it('should handle different age factors', () => {
      const inputs = {
        age: 45,
        drivingExperience: 10,
        carType: 'small',
        coverage: 10000000,
        claims: 1
      };

      const calculatorData = {
        calculators: {
          premium: {
            factors: {
              age: {
                '41-50': 1.5
              },
              coverage: {
                '10000000': 1.0
              }
            }
          }
        }
      };

      const result = calculator.calculateCarPremium(inputs, calculatorData);
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('calculateHealthPremium', () => {
    it('should calculate health insurance premium correctly', () => {
      const inputs = {
        age: 35,
        gender: 'male',
        health: 'good',
        coverage: 30000000,
        familyHistory: 'no'
      };

      const calculatorData = {
        calculators: {
          premium: {
            factors: {
              age: {
                '31-40': 1.2
              },
              health: {
                'good': 1.0
              },
              coverage: {
                '30000000': 2.5
              }
            }
          }
        }
      };

      const result = calculator.calculateHealthPremium(inputs, calculatorData);
      expect(result).toBeGreaterThan(0);
      expect(typeof result).toBe('number');
    });
  });

  describe('calculateLifePremium', () => {
    it('should calculate life insurance premium correctly', () => {
      const inputs = {
        age: 40,
        gender: 'female',
        health: 'excellent',
        coverage: 50000000,
        occupation: 'office'
      };

      const calculatorData = {
        calculators: {
          premium: {
            factors: {
              age: {
                '41-50': 1.5
              },
              health: {
                'excellent': 0.8
              },
              coverage: {
                '50000000': 3.5
              }
            }
          }
        }
      };

      const result = calculator.calculateLifePremium(inputs, calculatorData);
      expect(result).toBeGreaterThan(0);
      expect(typeof result).toBe('number');
    });
  });

  describe('getAgeFactor', () => {
    it('should return correct age factor for different age ranges', () => {
      const ageFactors = {
        '18-30': 1.0,
        '31-40': 1.2,
        '41-50': 1.5,
        '51-60': 2.0,
        '61-65': 2.5
      };

      expect(calculator.getAgeFactor(25, ageFactors)).toBe(1.0);
      expect(calculator.getAgeFactor(35, ageFactors)).toBe(1.2);
      expect(calculator.getAgeFactor(45, ageFactors)).toBe(1.5);
      expect(calculator.getAgeFactor(55, ageFactors)).toBe(2.0);
      expect(calculator.getAgeFactor(65, ageFactors)).toBe(2.5);
    });
  });

  describe('getExperienceFactor', () => {
    it('should return correct experience factor', () => {
      expect(calculator.getExperienceFactor(15)).toBe(0.7);
      expect(calculator.getExperienceFactor(7)).toBe(0.8);
      expect(calculator.getExperienceFactor(3)).toBe(0.9);
      expect(calculator.getExperienceFactor(1)).toBe(1.0);
    });
  });

  describe('getCarTypeFactor', () => {
    it('should return correct car type factor', () => {
      expect(calculator.getCarTypeFactor('small')).toBe(0.8);
      expect(calculator.getCarTypeFactor('medium')).toBe(1.0);
      expect(calculator.getCarTypeFactor('large')).toBe(1.3);
      expect(calculator.getCarTypeFactor('suv')).toBe(1.2);
      expect(calculator.getCarTypeFactor('luxury')).toBe(1.5);
      expect(calculator.getCarTypeFactor('unknown')).toBe(1.0);
    });
  });

  describe('getClaimsFactor', () => {
    it('should return correct claims factor', () => {
      expect(calculator.getClaimsFactor(0)).toBe(0.8);
      expect(calculator.getClaimsFactor(1)).toBe(1.0);
      expect(calculator.getClaimsFactor(2)).toBe(1.3);
      expect(calculator.getClaimsFactor(5)).toBe(1.6);
    });
  });

  describe('formatCurrency', () => {
    it('should format currency correctly', () => {
      const result = calculator.formatCurrency(1000000);
      expect(result).toContain('₩');
      expect(result).toContain('1,000,000');
    });

    it('should handle zero amount', () => {
      const result = calculator.formatCurrency(0);
      expect(result).toContain('₩');
      expect(result).toContain('0');
    });
  });
}); 