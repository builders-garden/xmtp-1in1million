'use client'

import { useState, useEffect } from 'react'
import { usePublicClient } from 'wagmi'
import { formatEther } from 'viem'

export function PrizePool() {
  const [balance, setBalance] = useState<string>('0')
  const publicClient = usePublicClient()

  const contractAddress = '0x5f91D34dCdFfaF3Ce0f3Fa8A5BA35D4e1eFF8780'

  useEffect(() => {
    async function fetchBalance() {
      try {
        const rawBalance = await publicClient.getBalance({ address: contractAddress })
        setBalance(formatEther(rawBalance))
      } catch (error) {
        console.error('Error fetching balance:', error)
        setBalance('Error')
      }
    }

    fetchBalance()
  }, [publicClient, contractAddress])

  return (
    <div className="text-center mt-8 mb-4">
      <h3 className="text-2xl font-semibold">🏆 Prize Pool 🏆</h3>
      <span className="font-bagel text-5xl md:text-6xl">
        {balance} ETH
      </span>
    </div>
  )
}
