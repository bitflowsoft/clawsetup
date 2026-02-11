// Google Analytics 4 Event Tracking

export const GA_TRACKING_ID = 'G-R7NDTY01GE';

// gtag 타입 선언
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

// 페이지뷰 트래킹
export const pageview = (url: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// 이벤트 트래킹
export const event = (action: string, params?: Record<string, unknown>) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, params);
  }
};

// ============ CTA 버튼 이벤트 ============

export const trackHeroPrimaryCTA = () => {
  event('click_cta_hero_primary', {
    event_category: 'CTA',
    event_label: '무료 상담 받기 (Hero)',
  });
};

export const trackHeroSecondaryCTA = () => {
  event('click_cta_hero_secondary', {
    event_category: 'CTA',
    event_label: '서비스 알아보기 (Hero)',
  });
};

export const trackServiceBasic = () => {
  event('click_service_basic', {
    event_category: 'Service',
    event_label: 'Basic 설치 상담 신청',
  });
};

export const trackServicePro = () => {
  event('click_service_pro', {
    event_category: 'Service',
    event_label: 'Pro 커스터마이징 상담 신청',
  });
};

export const trackServiceEnterprise = () => {
  event('click_service_enterprise', {
    event_category: 'Service',
    event_label: 'Enterprise 상담 신청',
  });
};

export const trackPhoneCall = () => {
  event('click_phone_call', {
    event_category: 'Contact',
    event_label: '즉시 전화 상담',
  });
};

export const trackKakaoChat = () => {
  event('click_kakao_chat', {
    event_category: 'Contact',
    event_label: '카카오톡 상담',
  });
};

// ============ 폼 이벤트 ============

export const trackFormSubmitSuccess = () => {
  event('form_submit_success', {
    event_category: 'Form',
    event_label: '상담 신청 성공',
  });
};

export const trackFormSubmitError = (error: string) => {
  event('form_submit_error', {
    event_category: 'Form',
    event_label: '상담 신청 실패',
    error_message: error,
  });
};

// ============ 스크롤 이벤트 ============

export const trackScrollSection = (section: string) => {
  event(`scroll_section_${section}`, {
    event_category: 'Scroll',
    event_label: `${section} 섹션 도달`,
  });
};

// ============ FAQ 이벤트 ============

export const trackFaqOpen = (question: string) => {
  event('faq_open', {
    event_category: 'FAQ',
    event_label: question,
  });
};

// ============ 네비게이션 이벤트 ============

export const trackNavClick = (menu: string) => {
  event('nav_click', {
    event_category: 'Navigation',
    event_label: menu,
  });
};
