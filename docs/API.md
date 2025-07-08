# API 문서

## 개요
보험 웹사이트의 JavaScript API 문서입니다.

## 클래스

### InsuranceCalculator
보험료 계산을 담당하는 클래스입니다.

#### 메서드

##### `calculateCarPremium(inputs, calculator)`
자동차보험료를 계산합니다.

**매개변수:**
- `inputs` (Object): 사용자 입력값
  - `age` (number): 나이
  - `drivingExperience` (number): 운전 경험 (년)
  - `carType` (string): 차량 타입
  - `coverage` (number): 보장 금액
  - `claims` (number): 사고 이력 횟수
- `calculator` (Object): 계산기 데이터

**반환값:**
- `number`: 계산된 보험료

##### `calculateHealthPremium(inputs, calculator)`
건강보험료를 계산합니다.

**매개변수:**
- `inputs` (Object): 사용자 입력값
  - `age` (number): 나이
  - `gender` (string): 성별
  - `health` (string): 건강 상태
  - `coverage` (number): 보장 금액
  - `familyHistory` (string): 가족력 여부
- `calculator` (Object): 계산기 데이터

**반환값:**
- `number`: 계산된 보험료

##### `calculateLifePremium(inputs, calculator)`
생명보험료를 계산합니다.

**매개변수:**
- `inputs` (Object): 사용자 입력값
  - `age` (number): 나이
  - `gender` (string): 성별
  - `health` (string): 건강 상태
  - `coverage` (number): 보장 금액
  - `occupation` (string): 직업
- `calculator` (Object): 계산기 데이터

**반환값:**
- `number`: 계산된 보험료

### InsuranceChatbot
보험 상담 챗봇을 담당하는 클래스입니다.

#### 메서드

##### `sendMessage()`
사용자 메시지를 전송하고 봇 응답을 처리합니다.

##### `processUserMessage(message)`
사용자 메시지를 분석하고 적절한 응답을 생성합니다.

**매개변수:**
- `message` (string): 사용자 메시지

### Navigation
네비게이션 기능을 담당하는 클래스입니다.

#### 메서드

##### `toggleMobileMenu()`
모바일 메뉴를 토글합니다.

##### `handleScroll()`
스크롤 이벤트를 처리합니다.

##### `smoothScroll(target)`
부드러운 스크롤을 실행합니다.

**매개변수:**
- `target` (string): 스크롤 대상 선택자

### Particles
배경 파티클 효과를 담당하는 클래스입니다.

#### 메서드

##### `animate()`
파티클 애니메이션을 실행합니다.

##### `createParticles()`
파티클을 생성합니다.

## 이벤트

### DOMContentLoaded
페이지 로드 시 각 클래스의 인스턴스를 생성합니다.

```javascript
document.addEventListener('DOMContentLoaded', () => {
  new InsuranceCalculator();
  new InsuranceChatbot();
  new Navigation();
});
```

## 데이터 구조

### 보험 상품 데이터
JSON 파일로 관리되는 보험 상품 정보입니다.

**파일 위치:**
- `assets/js/data/car-insurance.json`
- `assets/js/data/health-insurance.json`
- `assets/js/data/life-insurance.json`

**구조:**
```json
{
  "products": [
    {
      "id": "string",
      "name": "string",
      "category": "string",
      "type": "string",
      "description": "string",
      "features": ["string"],
      "coverage": {
        "property": "string",
        "liability": "string"
      },
      "premium": {
        "monthly": "number",
        "yearly": "number",
        "currency": "string"
      },
      "requirements": {
        "age": {
          "min": "number",
          "max": "number"
        },
        "health": "string",
        "occupation": "string"
      },
      "discounts": [
        {
          "type": "string",
          "amount": "number"
        }
      ],
      "image": "string",
      "rating": "number",
      "reviews": "number",
      "popular": "boolean"
    }
  ],
  "calculators": {
    "premium": {
      "formula": "string",
      "factors": {
        "age": "object",
        "health": "object",
        "coverage": "object"
      }
    }
  }
}
```

## 에러 처리

### 네트워크 에러
데이터 로드 실패 시 콘솔에 에러를 출력합니다.

### 계산 에러
계산 실패 시 사용자에게 에러 메시지를 표시합니다.

## 브라우저 지원

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 라이선스

MIT License 