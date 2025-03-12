import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAddress(address: string): string {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function formatAmount(amount: bigint, decimals = 18): string {
  if (!amount) return '0'

  const amountString = amount.toString()
  if (amountString.length <= decimals) {
    return `0.${amountString.padStart(decimals, '0')}`
  }

  const integerPart = amountString.slice(0, amountString.length - decimals)
  const decimalPart = amountString.slice(amountString.length - decimals)

  return `${integerPart}.${decimalPart}`
}
