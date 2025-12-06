import { NextResponse } from "next/server";

const GSHEET_WEBAPP_URL =
  "https://script.google.com/macros/s/AKfycbwp3nFstCL6E3KivueliyztM4Ug8WSQfPowYXumlFR071Opsn2U21njT_gJDAGLjVv4/exec";

export async function POST(req: Request) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);

  try {
    const data = await req.json();

    const res = await fetch(GSHEET_WEBAPP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json,text/plain,*/*",
      },
      body: JSON.stringify(data),
      cache: "no-store",
      redirect: "follow", // مهم: لو جوجل رجّع redirect نقدر نعرف
      signal: controller.signal,
    });

    const text = await res.text(); // اقرأها text الأول
    let out: any = null;

    try {
      out = text ? JSON.parse(text) : null;
    } catch {
      out = null;
    }

    if (res.status >= 300 && res.status < 400) {
      return NextResponse.json(
        {
          ok: false,
          error: "Google script responded with redirect",
          status: res.status,
        },
        { status: 502 }
      );
    }

    if (!res.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: "Google script request failed",
          status: res.status,
          body: text.slice(0, 500),
        },
        { status: 502 }
      );
    }

    if (out && out.ok === false) {
      return NextResponse.json(
        {
          ok: false,
          error: out.error || "Google script returned ok=false",
          body: out,
        },
        { status: 502 }
      );
    }

    // في حالة إن السكربت بيرجع {ok:true} أو حتى أي نص
    return NextResponse.json({
      status: res.status,
      ok: true,
      gsheet: out ?? text,
    });
  } catch (err: any) {
    const message =
      err?.name === "AbortError"
        ? "Upstream timeout"
        : err?.message || "Unknown error";

    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  } finally {
    clearTimeout(timeout);
  }
}
