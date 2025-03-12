'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { toast } from 'sonner'
import { Skeleton } from '@/components/ui/skeleton'
import { MONAD_EXPLORER_URL } from '@/lib/chains'
import { TokenInput } from './ui/token-input'
import { ActionButton } from './ui/action-button'
import { useDeposit } from '../hooks/use-deposit'

export function DepositForm() {
  const { address } = useAccount()
  const [amount, setAmount] = useState('')
  const { isBalanceLoading, isMaxAmountLoading, isDepositLoading, balance, maxAmount, deposit } = useDeposit()

  const isDepositDisabled =
    !address || isDepositLoading || !amount || Number.parseFloat(amount) > Number.parseFloat(maxAmount)
  const isInsufficientBalance = Number.parseFloat(amount) > Number.parseFloat(maxAmount)

  const handleDeposit = async () => {
    try {
      const hash = await deposit(amount)
      toast.success('Deposit successful', {
        description: (
          <a href={`${MONAD_EXPLORER_URL}/tx/${hash}`} target="_blank" rel="noreferrer" className="underline">
            View on Monad Explorer
          </a>
        ),
      })
      setAmount('')
    } catch (e: any) {
      console.error(e)
      toast.error('Deposit failed', {
        description: e?.shortMessage || e?.message || 'Please try again later',
      })

    }
  }

  return (
    <div className="space-y-4">
      <TokenInput value={amount} onChange={setAmount} onMaxClick={() => setAmount(maxAmount)} />

      <div className="flex justify-between text-sm text-muted-foreground px-1">
        {isBalanceLoading || isMaxAmountLoading ? (
          <>
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
          </>
        ) : (
          <>
            <span>Balance: {balance} MON</span>
            <span>Max: {maxAmount} MON</span>
          </>
        )}
      </div>

      <ActionButton
        loading={isDepositLoading}
        disabled={isDepositDisabled}
        text="Deposit"
        isInsufficientBalance={isInsufficientBalance}
        onClick={handleDeposit}
      />
    </div>
  )
}
