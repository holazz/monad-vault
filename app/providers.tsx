'use client'

import { ThemeProvider } from '@/components/theme/theme-provider'
import { WagmiProvider } from '@/features/auth/providers/wagmi-provider'
import { Provider as JotaiProvider } from 'jotai'

const Providers = ({ children, cookies }: { children: React.ReactNode; cookies: string | null }) => {
  return (
    <JotaiProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <WagmiProvider cookies={cookies}>{children}</WagmiProvider>
      </ThemeProvider>
    </JotaiProvider>
  )
}

export default Providers
