import { format, isValid, parseISO } from "date-fns";
import { es } from "date-fns/locale";

export function parseDate(value: string) {
  const d = value.length <= 10 ? parseISO(`${value}T12:00:00`) : parseISO(value);
  return isValid(d) ? d : new Date(value);
}

export function formatDay(value: string) {
  return format(parseDate(value), "d MMM", { locale: es });
}

export function formatLong(value: string) {
  return format(parseDate(value), "d 'de' MMMM yyyy", { locale: es });
}

export function formatWhen(value: string) {
  const d = parseDate(value);
  if (!isValid(d)) return value;
  if (value.length > 10) return format(d, "d MMM, HH:mm", { locale: es });
  return format(d, "EEE d MMM", { locale: es });
}

export function todayIso() {
  return format(new Date(), "yyyy-MM-dd");
}

export function nowIso() {
  return new Date().toISOString();
}

export function pct(n: number) {
  return `${Math.round(n * 100)}%`;
}
