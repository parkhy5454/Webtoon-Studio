import { Webhook } from '@portone/server-sdk';
import { NextRequest, NextResponse } from 'next/server';
import { paymentConfig, verifyWorkPayment } from '@/lib/work-payments';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const config = paymentConfig();
  if (!config) return new NextResponse(null, { status: 503 });
  let event: Awaited<ReturnType<typeof Webhook.verify>>;
  try {
    event = await Webhook.verify(config.webhookSecret, await request.text(), Object.fromEntries(request.headers));
  } catch {
    return new NextResponse(null, { status: 400 });
  }
  const data = 'data' in event ? event.data : null;
  if (!data || !('paymentId' in data) || typeof data.paymentId !== 'string' ||
      !/^workpass-[a-f0-9-]{36}$/.test(data.paymentId)) return new NextResponse(null, { status: 204 });
  try {
    await verifyWorkPayment(data.paymentId);
    return new NextResponse(null, { status: 204 });
  } catch {
    console.error('PortOne webhook reconciliation failed');
    return new NextResponse(null, { status: 500 });
  }
}
