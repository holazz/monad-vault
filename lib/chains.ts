import { defineChain } from 'viem'

export const MONAD_RPC_URL = 'https://testnet-rpc.monad.xyz'

export const MONAD_EXPLORER_URL = 'https://testnet.monadexplorer.com'

export const monadTestnet = defineChain({
  id: 10143,
  name: 'Monad Testnet',
  nativeCurrency: { name: 'MON', symbol: 'MON', decimals: 18 },
  rpcUrls: {
    default: { http: [MONAD_RPC_URL] },
  },
  blockExplorers: {
    default: { name: 'MonadExplorer', url: MONAD_EXPLORER_URL },
  },
})
