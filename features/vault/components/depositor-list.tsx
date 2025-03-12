'use client'

import { isAddressEqual } from 'viem'
import { useAccount } from 'wagmi'
import { useDeposit } from '../hooks/use-deposit'
import { formatAddress } from '@/lib/utils'
import { MONAD_EXPLORER_URL } from '@/lib/chains'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'

export function DepositorList() {
  const { isFetchDepositorsLoading, depositors } = useDeposit()
  const { address } = useAccount()

  const sortedDepositors = [...depositors].sort((a, b) => {
    if (address && isAddressEqual(a, address)) return -1
    if (address && isAddressEqual(b, address)) return 1
    return 0
  })

  return (
    <Card className="flex flex-col max-h-[350px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">Depositors</CardTitle>
        <CardDescription>Users who add you to the whitelist</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        {isFetchDepositorsLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <ScrollArea className="h-[calc(100%-1rem)] pr-4">
            {sortedDepositors.length > 0 ? (
              <ul className="space-y-2">
                {sortedDepositors.map((depositor, index) => {
                  const isUserAddress = address && isAddressEqual(depositor, address)
                  return (
                    <li
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-md ${
                        isUserAddress ? 'bg-primary/10 border border-primary/30' : 'bg-secondary'
                      }`}
                    >
                      <span className={`text-sm ${isUserAddress ? 'font-medium' : ''}`}>
                        {formatAddress(depositor)}
                        {isUserAddress && ' (You)'}
                      </span>
                      <a
                        href={`${MONAD_EXPLORER_URL}/address/${depositor}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline"
                      >
                        View
                      </a>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No depositors found yet.</p>
              </div>
            )}
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}
