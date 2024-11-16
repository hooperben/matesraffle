async function main() {
  const { ethers } = require("hardhat");

  const [signer] = await ethers.getSigners();

  const balance = await ethers.provider.getBalance(signer.address);

  console.log("Signer address:", signer.address);
  console.log("Balance: ", ethers.formatEther(balance), " ETH");

  const amount = ethers.parseEther("0.01");
  console.log(amount.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
