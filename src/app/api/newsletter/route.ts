import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, fullName } = await req.json();

    if (!email || !fullName) {
      return NextResponse.json(
        { message: "Email and full name are required." },
        { status: 400 }
      );
    }

    const [firstName, ...rest] = fullName.trim().split(" ");
    const lastName = rest.join(" ") || "";

    const brevoRes = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY || "",
      },
      body: JSON.stringify({
        email: email.trim(),
        attributes: {
          FIRSTNAME: firstName,
          LASTNAME: lastName,
        },
        listIds: [
          // Replace with your Brevo list ID
          Number(process.env.BREVO_LIST_ID) || 2,
        ],
        updateEnabled: true,
      }),
    });

    if (brevoRes.ok || brevoRes.status === 204) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const errorData = await brevoRes.json();
    return NextResponse.json(
      { message: errorData?.message || "Subscription failed." },
      { status: brevoRes.status }
    );
  } catch (err: any) {
    console.error("Newsletter API error:", err);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
