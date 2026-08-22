export async function POST(request: Request) {
  try {
    const body = await request.json() as { asin?: unknown; context?: unknown; occurredAt?: unknown };
    if (typeof body.asin !== "string" || !/^[A-Z0-9]{10}$/.test(body.asin)) return Response.json({ ok: false }, { status: 400 });
    console.info(JSON.stringify({ event: "affiliate_click", asin: body.asin, context: typeof body.context === "string" ? body.context.slice(0, 60) : "unknown", occurredAt: typeof body.occurredAt === "string" ? body.occurredAt : new Date().toISOString() }));
    return new Response(null, { status: 204 });
  } catch { return Response.json({ ok: false }, { status: 400 }); }
}
