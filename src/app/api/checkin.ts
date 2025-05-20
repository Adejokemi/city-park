// pages/api/checkin.ts
export async function POST(req: Request) {
  const data = await req.json();

  const googleSheetsUrl =
    "https://script.google.com/macros/s/AKfycbwZW0gCUPF30LdIowwHBRFRW6qG8DhKHWESnwdyCKI4H6uiN_4vE7g_pBt10UzQ57I9/exec";

  await fetch(googleSheetsUrl, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  return Response.json({ success: true });
}
