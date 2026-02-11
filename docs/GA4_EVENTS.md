# GA4 이벤트 가이드

> Google Analytics 4 트래킹 ID: `G-R7NDTY01GE`

## 📊 이벤트 목록

### CTA 버튼 클릭

| 이벤트명 | 설명 | 카테고리 |
|----------|------|----------|
| `click_cta_hero_primary` | Hero 섹션 "무료 상담 받기" 버튼 클릭 | CTA |
| `click_cta_hero_secondary` | Hero 섹션 "서비스 알아보기" 버튼 클릭 | CTA |

### 서비스 상담 신청

| 이벤트명 | 설명 | 카테고리 |
|----------|------|----------|
| `click_service_basic` | Basic 설치 "상담 신청" 클릭 | Service |
| `click_service_pro` | Pro 커스터마이징 "상담 신청" 클릭 | Service |
| `click_service_enterprise` | Enterprise "상담 신청" 클릭 | Service |

### 연락처 클릭

| 이벤트명 | 설명 | 카테고리 |
|----------|------|----------|
| `click_phone_call` | "즉시 전화 상담" 버튼 클릭 | Contact |
| `click_kakao_chat` | 카카오톡 플로팅 버튼 클릭 | Contact |

### 폼 이벤트

| 이벤트명 | 설명 | 카테고리 | 파라미터 |
|----------|------|----------|----------|
| `form_submit_success` | 상담 신청 폼 제출 성공 | Form | - |
| `form_submit_error` | 상담 신청 폼 제출 실패 | Form | `error_message` |

### 스크롤 이벤트

| 이벤트명 | 설명 | 카테고리 |
|----------|------|----------|
| `scroll_section_problems` | "왜 필요한가" 섹션 도달 | Scroll |
| `scroll_section_services` | "서비스" 섹션 도달 | Scroll |
| `scroll_section_process` | "진행 절차" 섹션 도달 | Scroll |
| `scroll_section_faq` | "FAQ" 섹션 도달 | Scroll |
| `scroll_section_contact` | "상담 신청" 섹션 도달 | Scroll |

### FAQ 이벤트

| 이벤트명 | 설명 | 카테고리 | 파라미터 |
|----------|------|----------|----------|
| `faq_open` | FAQ 항목 열기 | FAQ | `event_label` (질문 내용) |

### 네비게이션 이벤트

| 이벤트명 | 설명 | 카테고리 | 파라미터 |
|----------|------|----------|----------|
| `nav_click` | 상단 네비게이션 메뉴 클릭 | Navigation | `event_label` (메뉴명) |

---

## 🎯 주요 전환 이벤트 (Conversions)

GA4에서 다음 이벤트를 **전환**으로 설정하는 것을 권장합니다:

1. `form_submit_success` - 상담 신청 완료
2. `click_phone_call` - 전화 상담 시도
3. `click_kakao_chat` - 카카오톡 상담 시도

---

## 📈 추천 리포트

### 퍼널 분석
```
scroll_section_services → click_service_* → scroll_section_contact → form_submit_success
```

### 서비스별 관심도
- `click_service_basic` vs `click_service_pro` vs `click_service_enterprise`

### FAQ 관심 주제
- `faq_open` 이벤트의 `event_label` 분석

---

## 🔧 구현 파일

- `src/lib/gtag.ts` - 이벤트 트래킹 함수
- `src/app/layout.tsx` - GA4 스크립트 로드
- `src/app/page.tsx` - 이벤트 호출
