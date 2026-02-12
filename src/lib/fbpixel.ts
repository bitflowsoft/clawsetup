// Meta Pixel (Facebook Pixel) Event Tracking

export const FB_PIXEL_ID = '2305148396630028';

// fbq 타입 선언
declare global {
  interface Window {
    fbq: (
      command: 'init' | 'track' | 'trackCustom',
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
    _fbq: unknown;
  }
}

// 페이지뷰 트래킹
export const pageview = () => {
  if (typeof window.fbq !== 'undefined') {
    window.fbq('track', 'PageView');
  }
};

// ============ 표준 이벤트 ============

// 리드 (상담 신청 완료)
export const trackLead = (params?: { content_name?: string; value?: number }) => {
  if (typeof window.fbq !== 'undefined') {
    window.fbq('track', 'Lead', params);
  }
};

// 연락처 클릭 (전화/카카오톡)
export const trackContact = () => {
  if (typeof window.fbq !== 'undefined') {
    window.fbq('track', 'Contact');
  }
};

// 콘텐츠 조회 (서비스 상세 보기)
export const trackViewContent = (params: { content_name: string; content_category?: string }) => {
  if (typeof window.fbq !== 'undefined') {
    window.fbq('track', 'ViewContent', params);
  }
};

// ============ 커스텀 이벤트 ============

// CTA 버튼 클릭
export const trackCtaClick = (buttonName: string) => {
  if (typeof window.fbq !== 'undefined') {
    window.fbq('trackCustom', 'CtaClick', { button_name: buttonName });
  }
};

// 서비스 상담 신청 버튼 클릭
export const trackServiceClick = (serviceTier: 'basic' | 'pro' | 'enterprise') => {
  if (typeof window.fbq !== 'undefined') {
    window.fbq('trackCustom', 'ServiceClick', { service_tier: serviceTier });
  }
};

// 전화 상담 클릭
export const trackPhoneClick = () => {
  if (typeof window.fbq !== 'undefined') {
    window.fbq('track', 'Contact');
    window.fbq('trackCustom', 'PhoneClick');
  }
};

// 카카오톡 상담 클릭
export const trackKakaoClick = () => {
  if (typeof window.fbq !== 'undefined') {
    window.fbq('track', 'Contact');
    window.fbq('trackCustom', 'KakaoClick');
  }
};

// 폼 제출 성공 (리드)
export const trackFormSubmit = () => {
  if (typeof window.fbq !== 'undefined') {
    window.fbq('track', 'Lead', {
      content_name: '상담 신청',
      content_category: 'ClawSetup',
    });
  }
};

// 스크롤 도달
export const trackScrollSection = (section: string) => {
  if (typeof window.fbq !== 'undefined') {
    window.fbq('trackCustom', 'ScrollSection', { section_name: section });
  }
};
