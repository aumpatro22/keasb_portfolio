import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(4),
  message: z.string().min(20),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = parsed.data;

    // Use the API key from .env.local
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'onboarding@resend.dev', // You must use this email until you verify your own domain in Resend
      to: 'kesabnayak4@gmail.com',
      subject: `Portfolio Contact: ${subject}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <br/>
             <p><strong>Message:</strong></p>
             <p>${message.replace(/\n/g, '<br/>')}</p>`,
    });

    console.log("Contact form email sent via Resend for:", email);

    return NextResponse.json(
      { success: true, message: "Message received successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
