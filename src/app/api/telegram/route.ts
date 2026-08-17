import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

interface CartItemPayload {
  label: string;
  dimensions: string;
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
}

interface TelegramRequestBody {
  type: 'contact' | 'order' | 'quick_order';
  name?: string;
  firstName?: string;
  lastName?: string;
  phone: string;
  email?: string;
  message?: string;
  city?: string;
  address?: string;
  notes?: string;
  productLabel?: string;
  orderDetails?: CartItemPayload[];
  totalAmount?: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildMessage(body: TelegramRequestBody): string {
  const lines: string[] = [];

  if (body.type === 'contact') {
    lines.push('📩 <b>Нове повідомлення з сайту</b>');
    lines.push('');
    lines.push(`👤 Ім'я: ${escapeHtml(body.name || '-')}`);
    lines.push(`📞 Телефон: ${escapeHtml(body.phone || '-')}`);
    if (body.email) lines.push(`✉️ Email: ${escapeHtml(body.email)}`);
    if (body.message) lines.push(`💬 Повідомлення: ${escapeHtml(body.message)}`);
  } else if (body.type === 'quick_order') {
    lines.push('⚡️ <b>Швидке замовлення в 1 клік</b>');
    lines.push('');
    if (body.productLabel) lines.push(`🧱 Товар: ${escapeHtml(body.productLabel)}`);
    lines.push(`👤 Ім'я: ${escapeHtml(body.name || '-')}`);
    lines.push(`📞 Телефон: ${escapeHtml(body.phone || '-')}`);
  } else {
    lines.push('🛒 <b>Нове замовлення з сайту</b>');
    lines.push('');
    lines.push(`👤 Ім'я: ${escapeHtml(body.firstName || '-')} ${escapeHtml(body.lastName || '')}`);
    lines.push(`📞 Телефон: ${escapeHtml(body.phone || '-')}`);
    if (body.city) lines.push(`🏙 Місто: ${escapeHtml(body.city)}`);
    if (body.address) lines.push(`📦 Адреса/відділення: ${escapeHtml(body.address)}`);
    if (body.notes) lines.push(`📝 Примітки: ${escapeHtml(body.notes)}`);

    if (body.orderDetails && body.orderDetails.length > 0) {
      lines.push('');
      lines.push('<b>Склад замовлення:</b>');
      for (const item of body.orderDetails) {
        lines.push(
          `• ${escapeHtml(item.label)} (${escapeHtml(item.dimensions)}) × ${item.quantity} = ${item.totalPrice.toFixed(2)} ₴`
        );
      }
    }

    if (body.totalAmount) {
      lines.push('');
      lines.push(`💰 <b>Разом: ${escapeHtml(body.totalAmount)}</b>`);
    }
  }

  return lines.join('\n');
}

export async function POST(request: NextRequest) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error('Telegram env vars are not configured');
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
  }

  let body: TelegramRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (!body.phone || body.phone.trim().length < 5) {
    return NextResponse.json({ error: "Телефон є обов'язковим" }, { status: 400 });
  }

  const text = buildMessage(body);

  try {
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: 'HTML',
        }),
      }
    );

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.text();
      console.error('Telegram API error:', errorData);
      return NextResponse.json({ error: 'Не вдалося надіслати заявку' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Telegram request failed:', error);
    return NextResponse.json({ error: 'Не вдалося надіслати заявку' }, { status: 502 });
  }
}
