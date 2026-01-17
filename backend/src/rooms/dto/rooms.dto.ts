import { IsDateString, IsInt, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';


export class SearchAvailableRoomDto {
  @Transform(({ value }) => normalizeDmyToIso(value))
  @IsDateString()
  checkInDate: string;

  @Transform(({ value }) => normalizeDmyToIso(value))
  @IsDateString()
  checkOutDate: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  capacity: number;
}

function normalizeDmyToIso(value: unknown): string {
  if (typeof value !== 'string') return value as any;
  const trimmed = value.trim();
  const match = trimmed.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
  if (!match) return value as any;

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const asDate = new Date(year, month - 1, day);

  // Invalid date or month/day rollover (e.g., 32-13-2026)
  if (isNaN(asDate.getTime()) || asDate.getDate() !== day || asDate.getMonth() !== month - 1 || asDate.getFullYear() !== year) {
    return value as any;
  }

  return asDate.toISOString();
}

