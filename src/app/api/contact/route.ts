import { NextRequest, NextResponse } from "next/server";

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL || "";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "모든 필드를 입력해주세요." },
        { status: 400 }
      );
    }

    const slackMessage = {
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "🔔 ClawSetup 새 상담 문의",
            emoji: true,
          },
        },
        {
          type: "section",
          fields: [
            { type: "mrkdwn", text: `*이름/회사명*\n${name}` },
            { type: "mrkdwn", text: `*이메일*\n${email}` },
          ],
        },
        {
          type: "section",
          fields: [
            { type: "mrkdwn", text: `*연락처*\n${phone}` },
            {
              type: "mrkdwn",
              text: `*접수 시간*\n${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}`,
            },
          ],
        },
        { type: "divider" },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: "via <https://clawsetup.newdev.it|ClawSetup 랜딩페이지>",
            },
          ],
        },
      ],
    };

    const slackRes = await fetch(SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(slackMessage),
    });

    if (!slackRes.ok) {
      console.error("Slack webhook error:", await slackRes.text());
      return NextResponse.json(
        { error: "알림 전송에 실패했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
