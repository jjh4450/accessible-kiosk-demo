# Sticky Front

Sticky Front는 React, TypeScript, Vite를 기반으로 하는 현대적인 프론트엔드 프로젝트 템플릿입니다. 이 조합은 높은 성능, 개발 생산성, 안정성을 제공합니다. 프로젝트 초기 설정부터 최적화된 빌드와 효율적인 개발 환경을 제공하며, 빠른 개발, 확장성, 최적화를 목표로 설계되었습니다.

## 주요 특징

### 1. 최적화된 빌드 환경
- **이미지 최적화**:
  - 이미지를 WebP 형식으로 변환 (품질 80%)
  - 최대 높이 1080px 제한
  - 메타데이터 제거로 파일 크기 감소
- **에셋 압축**:
  - 1.4KB 이상의 JS, CSS, HTML, SVG 파일을 Gzip로 압축
- **SVG 처리**:
  - 하드코딩된 크기를 제거하여 CSS로 크기 제어 가능
  - 반응형 디자인 지원을 위한 아이콘 처리 활성화
- **번들 최적화**:
  - 스마트 벤더 청크 분리

### 2. 경로 별칭
- `@`를 `/src`로 매핑하여 클린한 import 경로를 제공합니다.

### 3. 플러그인 구성
- **React SWC**: 빠르고 효율적인 React 컴파일러
- **Vanilla Extract**: 타입 안전 스타일링 도구
- **Imagetools**: 이미지 처리 최적화
- **SVGR**: SVG를 React 컴포넌트로 변환
- **Compression Plugin**: 압축된 파일 생성

### 4. 폴더 기반 구조
```plaintext
├── assets        # 이미지 및 정적 파일
├── components    # 재사용 가능한 UI 컴포넌트
├── pages         # 폴더 기반 라우팅을 활용한 페이지 구성
└── shared
    ├── routing   # 라우팅 관련 설정
    ├── styles    # 공통 스타일 및 테마
    ├── types     # 타입 정의 파일
    └── utils     # 공통 유틸리티 함수
```

### 5. 폴더 기반 라우팅
- **pages 디렉토리**를 기반으로 자동 라우팅을 구성 중입니다. 개발자가 직접 라우팅 설정을 작성할 필요 없이 파일 및 폴더 구조를 활용해 직관적이고 빠르게 라우트를 추가할 수 있습니다.

### 6. CI/CD 통합 (Husky)
- **Husky**를 활용한 Git Hooks 템플릿 준비 중:
    - 코드 퀄리티 유지
    - 사전 커밋 및 푸시 단계에서 자동화된 검증

---

## 설치 및 사용법

### 1. 프로젝트 클론 및 설치
> 본 프로젝트의 패키지 관리자는 기본적으로 pnpm입니다. [설치 방법](https://pnpm.io/installation)
```bash
git clone https://github.com/your-username/stickyfront.git
cd stickyfront
pnpm install
```

### 2. 개발 서버 실행
```bash
pnpm run dev
```

### 3. 빌드
```bash
pnpm run build
```

### 4. 빌드 미리보기
```bash
pnpm run preview
```

---

## 기여 방법
기여는 언제든지 환영합니다!  
새로운 기능 추가, 버그 수정 또는 문서 개선을 위해 Pull Request를 만들어 주세요.

---

## 라이선스
이 프로젝트는 [MIT License](LICENSE)를 따릅니다.