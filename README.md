# 접근성 키오스크 데모 (Accessible Kiosk Demo)
시각 장애인과 고령자를 위한 음성 지원 키오스크 시스템입니다.
## 프로젝트 개요
이 프로젝트는 디지털 접근성을 고려하여 설계된 키오스크 시스템으로, 음성 안내와 키보드/터치 네비게이션을 통해 모든 사용자가 쉽게 이용할 수 있도록 개발되었습니다.
# 주요 기능
## 접근성 기능

OpenAI Realtime API를 활용해 자연스러운 대화 가능
키보드 네비게이션: Tab, Enter, 방향키를 통한 전체 기능 접근
고대비 모드: 시각적 가독성 향상
큰 글자 지원: 폰트 크기 조절 기능
점자 디스플레이 지원: 스크린 리더 호환

## 사용자 인터페이스

직관적이고 단순한 메뉴 구조
터치와 음성을 통한 이중 조작 방식
실시간 피드백 시스템
다국어 지원 (한국어, 영어)

## 기술 스택

Frontend: HTML5, CSS3, React
음성 처리: OpenAI Realtime API
접근성: ARIA 표준, WCAG 2.1 AA 준수
반응형 디자인: Mobile-First 접근법

## 시스템 요구사항

모던 웹 브라우저 (Chrome 80+, Firefox 75+, Safari 13+)
마이크 및 스피커 지원
터치스크린 또는 키보드 입력 장치

## 설치 및 사용법

### 1. 프로젝트 클론 및 설치
> 본 프로젝트의 패키지 관리자는 기본적으로 pnpm입니다. [설치 방법](https://pnpm.io/installation)
```bash
git clone https://github.com/jjh4450/accessible-kiosk-demo
cd accessible-kiosk-demo
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

---

## 기여 방법
기여는 언제든지 환영합니다!  
새로운 기능 추가, 버그 수정 또는 문서 개선을 위해 Pull Request를 만들어 주세요.

---

## 라이선스
이 프로젝트는 [MIT License](LICENSE)를 따릅니다.
