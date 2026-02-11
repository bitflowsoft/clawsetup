import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "OpenClaw 설치 & 커스터마이징 전문 서비스 | ClawSetup",
  description:
    "복잡한 OpenClaw 설치, 보안 설정, 메신저 연동, 스킬 구성까지. AI 에이전트의 모든 셋업을 전문가가 대신 해드립니다.",
  openGraph: {
    title: "OpenClaw 설치 & 커스터마이징 전문 서비스 | ClawSetup",
    description:
      "복잡한 OpenClaw 설치, 보안 설정, 메신저 연동, 스킬 구성까지. AI 에이전트의 모든 셋업을 전문가가 대신 해드립니다.",
    url: "https://clawsetup.newdev.it",
    siteName: "ClawSetup",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-R7NDTY01GE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-R7NDTY01GE');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
