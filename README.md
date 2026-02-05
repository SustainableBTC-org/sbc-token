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
