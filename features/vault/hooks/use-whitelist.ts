'use client'

import { useState, useCallback } from 'react'
import { useReadContract, useWriteContract, useAccount, usePublicClient } from 'wagmi'
import abi from '../constants/abi'
import { VAULT_CONTRACT_ADDRESS } from '../constants'
import type { Address } from 'viem'

export const useWhitelist = () => {
  const client = usePublicClient()
  const { address } = useAccount()
  const { writeContractAsync } = useWriteContract()
  const [isUpdateWhitelistLoading, setIsUpdateWhitelistLoading] = useState(false)

  const { isLoading: isFetchWhitelistLoading, data: whitelist = [], refetch: refetchWhitelist } = useReadContract({
    address: VAULT_CONTRACT_ADDRESS,
    abi: abi,
    functionName: 'getDepositorWhitelist',
    args: [address as Address],
    query: {
      enabled: !!address,
    },
  })

  const updateWhitelist = useCallback(
    async (addresses: Address[], isAdd: boolean) => {
      if (!address || addresses.length === 0) return
      setIsUpdateWhitelistLoading(true)
      try {
        const hash = await writeContractAsync({
          address: VAULT_CONTRACT_ADDRESS,
          abi: abi,
          functionName: 'batchUpdateWhitelist',
          args: [addresses, isAdd],
        })
        await client?.waitForTransactionReceipt({ hash })
        return hash
      } catch (e) {
        throw e
      } finally {
        setIsUpdateWhitelistLoading(false)
      }
    },
    [address, writeContractAsync, client]
  )

  return {
    isFetchWhitelistLoading,
    whitelist,
    refetchWhitelist,
    isUpdateWhitelistLoading,
    updateWhitelist,
  }
}
