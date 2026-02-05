# sbp-token
Sustainable Bitcoin Protocol - Token 

### Setup env
```shell
cp .env.sample .env
```
Update env vars in the ".env" file.

### Compile
```shell
npx hardhat compile
```

### Tests
```shell
npx hardhat test
```

### Deploy
```shell
npx hardhat run --network <network> scripts/deploy.ts
```

### Mint
```shell
npx hardhat run --network <network> scripts/mint.ts
```

---

## Deployed contracts

### BASE Sepolia (Testnet)

| Resource | Address | Link |
|----------|---------|------|
| Contract Owner | `0x2cbCdb2c6018a2bf18f4c31A9a4A8426Ddc74610` | [View on BaseScan](https://sepolia.basescan.org/address/0x2cbCdb2c6018a2bf18f4c31A9a4A8426Ddc74610) |
| SBP Token | `0x43fbBABEb03370d4dF9A0E41F0AE0606eD8F4d31` | [View on BaseScan](https://sepolia.basescan.org/address/0x43fbBABEb03370d4dF9A0E41F0AE0606eD8F4d31) |
| Deployment Tx | `0xe0daf8e1bbec6deeda54d7bcbc445aa0e03aeeb3ff5398490b69265367bb0e8a` | [View on BaseScan](https://sepolia.basescan.org/tx/0xe0daf8e1bbec6deeda54d7bcbc445aa0e03aeeb3ff5398490b69265367bb0e8a) |

### BASE Mainnet

| Resource | Address | Link |
|----------|---------|------|
| Contract Owner | `0x91D3c1a50CfBdDa72fa4F508eAde38e55949EB24` | [View on BaseScan](https://basescan.org/address/0x91D3c1a50CfBdDa72fa4F508eAde38e55949EB24) |
| SBP Token | `0xf7F172498Cd51FD4026355aF3474D7BC07BF3C75` | [View on BaseScan](https://basescan.org/address/0xf7F172498Cd51FD4026355aF3474D7BC07BF3C75) |
| Deployment Tx | `0x3a531b328c02a9476c49170cda9f5a46c7b1a5525c932d40186ff73c3d87df63` | [View on BaseScan](https://basescan.org/tx/0x3a531b328c02a9476c49170cda9f5a46c7b1a5525c932d40186ff73c3d87df63) |
