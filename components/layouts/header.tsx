'use client'

import Link from 'next/link'
import { Github, Coins } from 'lucide-react'
import { Button } from '@/components/ui/button'
import WalletConnectButton from '@/features/auth/components/wallet-connect-button'
import { ThemeToggle } from '@/components/theme/theme-toggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center h-14 px-4 md:px-6 ">
        <Link href="/" className="flex items-center space-x-2">
          <Coins size={24} />
          <span className="font-bold max-sm:hidden">Monad Vault</span>
        </Link>
        <nav className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://github.com/holazz/monad-vault" target="_blank" rel="noreferrer">
              <Github size={24} />
            </Link>
          </Button>
          <ThemeToggle />
          <WalletConnectButton />
        </nav>
      </div>
    </header>
  )
}
