# sbc-token
Sustainable Bitcoin Certificate - Token 

### Setup env
```shell
cp .env.sample .env
```
Update env vars in the ".env" file.

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
