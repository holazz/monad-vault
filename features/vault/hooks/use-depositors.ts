'use client'

import { useAccount, useReadContract } from 'wagmi'
import abi from '../constants/abi'
import { VAULT_CONTRACT_ADDRESS } from '../constants'
import type { Address } from 'viem'

export const useDepositors = () => {
  const { address } = useAccount()

  const {
    isLoading: loading,
    data: depositors = [],
    refetch: refetchDepositors,
  } = useReadContract({
    address: VAULT_CONTRACT_ADDRESS,
    abi: abi,
    functionName: 'getAuthorizedDepositors',
    args: [address as Address],
    query: {
      enabled: !!address,
    },
  })

  return {
    loading,
    depositors,
    refetchDepositors,
  }
}
