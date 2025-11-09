import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import ScorlaStrategyABI from '@/contracts/ScorlaStrategy.abi.json';
import MockERC20ABI from '@/contracts/MockERC20.abi.json';

const STRATEGY_ADDRESS = process.env.NEXT_PUBLIC_STRATEGY_ADDRESS;
const USDC_ADDRESS = process.env.NEXT_PUBLIC_USDC_ADDRESS;

export function useScorlaStrategy() {
  const { address } = useAccount();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  // Read user's USDC balance
  const { data: usdcBalance } = useReadContract({
    address: USDC_ADDRESS,
    abi: MockERC20ABI,
    functionName: 'balanceOf',
    args: [address],
    enabled: !!address,
  });

  // Read user's strategy shares
  const { data: strategyShares } = useReadContract({
    address: STRATEGY_ADDRESS,
    abi: ScorlaStrategyABI,
    functionName: 'balanceOf',
    args: [address],
    enabled: !!address,
  });

  // Read education split percentage
  const { data: educationSplit } = useReadContract({
    address: STRATEGY_ADDRESS,
    abi: ScorlaStrategyABI,
    functionName: 'getEducationSplitPercentage',
  });

  // Read total strategy assets
  const { data: totalAssets } = useReadContract({
    address: STRATEGY_ADDRESS,
    abi: ScorlaStrategyABI,
    functionName: 'totalAssets',
  });

  // Approve USDC
  const approveUSDC = async (amount) => {
    writeContract({
      address: USDC_ADDRESS,
      abi: MockERC20ABI,
      functionName: 'approve',
      args: [STRATEGY_ADDRESS, parseUnits(amount.toString(), 6)],
    });
  };

  // Deposit to strategy
  const deposit = async (amount) => {
    writeContract({
      address: STRATEGY_ADDRESS,
      abi: ScorlaStrategyABI,
      functionName: 'deposit',
      args: [parseUnits(amount.toString(), 6), address],
    });
  };

  // Withdraw from strategy
  const withdraw = async (amount) => {
    writeContract({
      address: STRATEGY_ADDRESS,
      abi: ScorlaStrategyABI,
      functionName: 'withdraw',
      args: [parseUnits(amount.toString(), 6), address, address],
    });
  };

  return {
    // Balances
    usdcBalance: usdcBalance ? formatUnits(usdcBalance, 6) : '0',
    strategyShares: strategyShares ? formatUnits(strategyShares, 18) : '0',
    totalAssets: totalAssets ? formatUnits(totalAssets, 6) : '0',
    educationSplit: educationSplit ? Number(educationSplit) : 20,
    
    // Actions
    approveUSDC,
    deposit,
    withdraw,
    
    // Status
    isPending,
    isConfirming,
    isSuccess,
  };
}
