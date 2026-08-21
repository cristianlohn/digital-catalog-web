export async function GET() {
  return new Response("google-site-verification: google5721d1a133c0a2e7.html", {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
