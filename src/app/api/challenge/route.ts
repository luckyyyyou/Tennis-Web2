export async function POST(request: Request) {
  const body = await request.json();
  // 处理挑战逻辑
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
} 