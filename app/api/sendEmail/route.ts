import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const fullname = String(body.fullname ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const subject = String(body.subject ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!fullname || !email || !subject || !message) {
      return Response.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Basic anti-abuse guardrails
    if (message.length > 4000 || subject.length > 140) {
      return Response.json(
        { ok: false, error: "Message too long." },
        { status: 400 }
      );
    }

    const to = process.env.CONTACT_TO_EMAIL || "okorewizjoyce@gmail.com";

    // ✅ DEV/TEST: Resend allows sending from onboarding@resend.dev in their docs
    // ✅ PROD: replace with your verified domain sender (see section 5)
    const from = "Joyce Portfolio <onboarding@resend.dev>";

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.5">
        <h2>New Portfolio Message</h2>
        <p><strong>Name:</strong> ${escapeHtml(fullname)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <hr />
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email, // so you can hit "Reply" and respond to the sender
      subject: `Portfolio: ${subject}`,
      html,
    });

    if (error) {
      return Response.json({ ok: false, error }, { status: 500 });
    }

    return Response.json({ ok: true, id: data?.id });
  } catch (err) {
    return Response.json(
      { ok: false, error: "Server error sending email." },
      { status: 500 }
    );
  }
}
