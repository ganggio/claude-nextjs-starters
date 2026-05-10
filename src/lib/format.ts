import { format, formatDistanceToNow, parseISO } from "date-fns";
import { ko } from "date-fns/locale";

/**
 * 날짜를 한국어 표준 형식으로 포맷팅
 * @example formatDate("2026-05-10T12:00:00Z") => "2026년 5월 10일"
 */
export function formatDate(date: string | Date): string {
  const target = typeof date === "string" ? parseISO(date) : date;
  return format(target, "yyyy년 M월 d일", { locale: ko });
}

/**
 * 날짜를 한국어 시간 포함 형식으로 포맷팅
 * @example formatDateTime("2026-05-10T12:00:00Z") => "2026년 5월 10일 오후 9:00"
 */
export function formatDateTime(date: string | Date): string {
  const target = typeof date === "string" ? parseISO(date) : date;
  return format(target, "yyyy년 M월 d일 a h:mm", { locale: ko });
}

/**
 * 상대 시간으로 포맷팅 (예: "3분 전", "2일 전")
 * @example formatRelativeTime("2026-05-10T12:00:00Z") => "약 1시간 전"
 */
export function formatRelativeTime(date: string | Date): string {
  const target = typeof date === "string" ? parseISO(date) : date;
  return formatDistanceToNow(target, { addSuffix: true, locale: ko });
}

/**
 * 숫자를 한국어 구분자(쉼표) 포함으로 포맷팅
 * @example formatNumber(1234567) => "1,234,567"
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("ko-KR").format(value);
}

/**
 * 숫자를 통화(원) 형식으로 포맷팅
 * @example formatCurrency(50000) => "₩50,000"
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(value);
}

/**
 * 숫자를 백분율로 포맷팅
 * @example formatPercent(0.157) => "15.7%"
 */
export function formatPercent(value: number, fractionDigits = 1): string {
  return new Intl.NumberFormat("ko-KR", {
    style: "percent",
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  }).format(value);
}
