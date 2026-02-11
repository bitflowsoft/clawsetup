"use client";

import { useState, useEffect, FormEvent, useRef } from "react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector("nav");
      if (nav) {
        nav.style.background =
          window.scrollY > 20
            ? "rgba(255,255,255,0.95)"
            : "rgba(255,255,255,0.85)";
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false);
    }
  };

  const toggleFaq = (e: React.MouseEvent<HTMLDivElement>) => {
    const item = e.currentTarget.closest(".faq-item");
    if (item) item.classList.toggle("open");
  };

  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      });

      if (res.ok) {
        alert(`감사합니다, ${name}님! 빠른 시간 내에 연락드리겠습니다.`);
        form.reset();
      } else {
        alert("전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    } catch {
      alert("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Navigation */}
      <nav>
        <div className="nav-inner">
          <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            Claw<span>Setup</span>
          </a>
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="메뉴"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
          <div className={`nav-links${mobileMenuOpen ? " open" : ""}`}>
            <a href="#problems" onClick={(e) => { e.preventDefault(); scrollTo("problems"); }}>왜 필요한가</a>
            <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo("services"); }}>서비스</a>
            <a href="#process" onClick={(e) => { e.preventDefault(); scrollTo("process"); }}>진행 절차</a>
            <a href="#faq" onClick={(e) => { e.preventDefault(); scrollTo("faq"); }}>FAQ</a>
            <a href="#contact" className="nav-cta" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>무료 상담 신청</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-badge">
            <span className="dot" />
            OpenClaw 설치 &amp; 커스터마이징 전문
          </div>
          <h1>
            OpenClaw, <span className="gradient-text">설치부터 커스터마이징까지</span>
            <br />
            전문가에게 맡기세요
          </h1>
          <p>
            복잡한 환경 세팅, 보안 설정, 메신저 연동, 스킬 구성까지.
            AI 에이전트의 모든 셋업을 대신 해드립니다.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>
              무료 상담 받기
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12l7-7M5 5h7v7" />
              </svg>
            </a>
            <a href="#services" className="btn-secondary" onClick={(e) => { e.preventDefault(); scrollTo("services"); }}>
              서비스 알아보기
            </a>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section id="problems">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Problem</div>
            <h2 className="section-title">OpenClaw, 왜 직접 설치하기 어려운가요?</h2>
            <p className="section-desc">
              GitHub 스타 16만 개. 모두가 쓰고 싶지만, 설치와 운영은 쉽지 않습니다.
            </p>
          </div>
          <div className="pain-grid">
            <div className="pain-card">
              <div className="pain-icon red">⚙️</div>
              <h3>복잡한 설치 과정</h3>
              <p>
                Node.js, npm, WSL2(Windows), 데몬 설정, API 키 발급 등 10단계 이상의
                셋업 과정을 거쳐야 합니다. 비개발자에게는 사실상 불가능에 가까운 진입
                장벽입니다.
              </p>
            </div>
            <div className="pain-card">
              <div className="pain-icon amber">🔒</div>
              <h3>보안 취약점 위험</h3>
              <p>
                CVE-2026-25253(CVSS 8.8) 등 치명적 보안 이슈가 발견되고 있습니다.
                잘못된 설정은 이메일, 캘린더, 메신저 등 민감한 데이터 유출로 이어질 수
                있습니다.
              </p>
            </div>
            <div className="pain-card">
              <div className="pain-icon purple">🔧</div>
              <h3>커스터마이징의 벽</h3>
              <p>
                스킬 설정, Ollama 로컬 모델 연동, 메신저 봇 연결, 워크스페이스 구성 등
                원하는 대로 사용하려면 깊은 기술적 이해가 필요합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="services-section">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Services</div>
            <h2 className="section-title">필요한 만큼만 선택하세요</h2>
            <p className="section-desc">
              기본 설치부터 엔터프라이즈급 커스터마이징까지, 상황에 맞는 서비스를
              제공합니다.
            </p>
          </div>
          <div className="service-grid">
            <div className="service-card">
              <h3>Basic 설치</h3>
              <div className="service-price">상담 후 견적 안내</div>
              <ul className="service-list">
                <li>운영체제별 환경 세팅 (Mac / Windows / Linux)</li>
                <li>OpenClaw 최신 버전 설치 및 온보딩</li>
                <li>AI 모델 API 키 연동 (Anthropic, OpenAI 등)</li>
                <li>메신저 1개 채널 연동 (Telegram / Discord 등)</li>
                <li>기본 보안 설정 및 가이드 문서 제공</li>
              </ul>
              <a
                href="#contact"
                className="btn-secondary"
                style={{ width: "100%", justifyContent: "center" }}
                onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}
              >
                상담 신청
              </a>
            </div>
            <div className="service-card featured">
              <span className="service-tag">추천</span>
              <h3>Pro 커스터마이징</h3>
              <div className="service-price">상담 후 견적 안내</div>
              <ul className="service-list">
                <li>Basic 설치 전체 포함</li>
                <li>커스텀 스킬 3개 구성 및 세팅</li>
                <li>Ollama 로컬 AI 모델 연동</li>
                <li>메신저 멀티 채널 연동 (최대 3개)</li>
                <li>보안 강화 설정 (포트 제한, 인증 모드 등)</li>
                <li>1개월 기술 지원 포함</li>
              </ul>
              <a
                href="#contact"
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
                onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}
              >
                상담 신청
              </a>
            </div>
            <div className="service-card">
              <h3>Enterprise</h3>
              <div className="service-price">맞춤 견적</div>
              <ul className="service-list">
                <li>Pro 커스터마이징 전체 포함</li>
                <li>전용 서버(미니PC, 클라우드) 구축 컨설팅</li>
                <li>팀 전용 워크스페이스 및 권한 설정</li>
                <li>사내 시스템 연동 (이메일, 캘린더, CRM 등)</li>
                <li>보안 감사 및 취약점 점검</li>
                <li>3개월 유지보수 및 업데이트 지원</li>
              </ul>
              <a
                href="#contact"
                className="btn-secondary"
                style={{ width: "100%", justifyContent: "center" }}
                onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}
              >
                상담 신청
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Process</div>
            <h2 className="section-title">4단계로 완료됩니다</h2>
            <p className="section-desc">상담부터 완료까지, 복잡한 과정을 심플하게.</p>
          </div>
          <div className="process-grid">
            <div className="process-step">
              <div className="process-num">01</div>
              <h3>무료 상담</h3>
              <p>
                사용 환경, 목적, 예산을 파악하고 최적의 서비스 패키지를 추천해
                드립니다.
              </p>
            </div>
            <div className="process-step">
              <div className="process-num">02</div>
              <h3>환경 분석</h3>
              <p>
                운영체제, 네트워크, 보안 요구사항 등 기술적 환경을 사전 점검합니다.
              </p>
            </div>
            <div className="process-step">
              <div className="process-num">03</div>
              <h3>설치 &amp; 세팅</h3>
              <p>
                원격 접속으로 OpenClaw 설치, 메신저 연동, 스킬 구성, 보안 설정을
                진행합니다.
              </p>
            </div>
            <div className="process-step">
              <div className="process-num">04</div>
              <h3>인수 &amp; 교육</h3>
              <p>
                사용법 교육과 가이드 문서를 제공하고, 약정 기간 동안 기술 지원을
                드립니다.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="stats-bar">
            <div className="stat-item">
              <div className="stat-num">160K+</div>
              <div className="stat-label">OpenClaw GitHub Stars</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">2시간</div>
              <div className="stat-label">평균 설치 완료 시간</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">100%</div>
              <div className="stat-label">원격 진행 가능</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">24h</div>
              <div className="stat-label">기술 지원 응답</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ background: "var(--surface)" }}>
        <div className="container">
          <div className="section-header">
            <div className="section-label">FAQ</div>
            <h2 className="section-title">자주 묻는 질문</h2>
          </div>
          <div className="faq-list">
            <div className="faq-item">
              <div className="faq-q" onClick={toggleFaq}>
                OpenClaw이 정확히 무엇인가요?
              </div>
              <div className="faq-a">
                <p>
                  OpenClaw는 오스트리아 개발자 Peter Steinberger가 만든 오픈소스 AI
                  에이전트입니다. 사용자의 컴퓨터에서 로컬로 실행되며, Telegram,
                  WhatsApp, Discord 등 메신저를 통해 명령을 내리면 이메일 관리, 코드
                  실행, 파일 작업 등을 자동으로 수행합니다. ChatGPT 같은 챗봇과 달리,
                  실제로 컴퓨터에서 작업을 &apos;실행&apos;하는 것이 핵심 차이점입니다.
                </p>
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-q" onClick={toggleFaq}>
                비개발자도 사용할 수 있나요?
              </div>
              <div className="faq-a">
                <p>
                  네, 그것이 바로 저희 서비스의 존재 이유입니다. 설치와 초기 세팅은
                  기술적 지식이 필요하지만, 저희가 모든 셋업을 완료해 드리면 이후
                  사용은 메신저 대화를 하듯 자연스럽게 가능합니다. 사용법 교육과 가이드
                  문서도 함께 제공해 드립니다.
                </p>
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-q" onClick={toggleFaq}>
                보안은 안전한가요?
              </div>
              <div className="faq-a">
                <p>
                  OpenClaw는 이메일, 캘린더 등 민감한 서비스에 접근하므로 보안 설정이
                  매우 중요합니다. 저희는 최신 보안 패치 적용, 포트 제한, 인증 모드
                  설정, 별도 계정/환경 분리 등 체계적인 보안 강화 설정을 기본으로
                  제공합니다.
                </p>
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-q" onClick={toggleFaq}>
                어떤 컴퓨터가 필요한가요?
              </div>
              <div className="faq-a">
                <p>
                  Mac, Windows, Linux 모두 지원됩니다. 24시간 AI 에이전트를
                  운영하려면 전용 장비(맥 미니, 미니PC, 라즈베리파이 등)를 권장하며,
                  클라우드 서버 구축도 가능합니다. 상담 시 최적의 환경을 함께 안내해
                  드립니다.
                </p>
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-q" onClick={toggleFaq}>
                API 키 비용은 별도인가요?
              </div>
              <div className="faq-a">
                <p>
                  네, OpenClaw를 사용하려면 AI 모델 API 키(Anthropic Claude, OpenAI
                  등)가 필요하며, 해당 비용은 사용량에 따라 각 제공사에 직접 결제하는
                  구조입니다. 완전 무료로 사용하고 싶으시면 Ollama를 통한 로컬 AI 모델
                  연동 서비스도 제공합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" style={{ padding: "6rem 2rem" }}>
        <div className="cta-section">
          <h2>지금 무료 상담을 신청하세요</h2>
          <p>
            사용 환경과 목적을 알려주시면, 최적의 서비스 패키지와 견적을 안내해
            드립니다.
          </p>
          <form className="cta-form-grid" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="이름 또는 회사명" required />
            <input type="email" name="email" placeholder="이메일 주소" required />
            <input type="tel" name="phone" placeholder="연락처 (예: 010-1234-5678)" required />
            <button type="submit" disabled={submitting}>
              {submitting ? "전송 중..." : "상담 신청"}
            </button>
          </form>
          <div className="cta-divider">
            <span>또는</span>
          </div>
          <a href="tel:010-9062-4281" className="cta-phone-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            즉시 전화 상담: 010-9062-4281
          </a>
          <p style={{ fontSize: "0.8rem", opacity: 0.7, marginTop: "1rem" }}>
            * 영업일 기준 24시간 이내 답변 드립니다.
          </p>
        </div>
      </section>

      {/* Kakao Floating Button */}
      <div className="kakao-float-wrap">
        <span className="kakao-float-label">바로 상담</span>
        <a
          href="http://pf.kakao.com/_gSShX"
          target="_blank"
          rel="noopener noreferrer"
          className="kakao-float-btn"
          aria-label="카카오톡으로 문의하기"
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 3C6.48 3 2 6.58 2 11c0 2.83 1.89 5.31 4.72 6.71l-.97 3.59c-.09.32.26.58.54.4l4.2-2.77c.49.05.99.07 1.51.07 5.52 0 10-3.58 10-8s-4.48-8-10-8z" fill="#3C1E1E"/>
          </svg>
        </a>
      </div>

      {/* Footer */}
      <footer>
        <div className="container">
          <p>
            © 2026 ClawSetup. OpenClaw와 공식적인 제휴 관계는 없으며, 독립적인 기술
            서비스 제공업체입니다.
          </p>
        </div>
      </footer>
    </>
  );
}
