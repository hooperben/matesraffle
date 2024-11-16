import { ethers } from "ethers";

async function main() {
  console.log("control");
  console.log(
    "0xf67c0fecd26402b98db7cadc1ab9f95107464100f3957f318a933637f5ebebbc",
  );

  const secret = ethers.toUtf8Bytes("12412123412");
  const publicRoundId = ethers.keccak256(secret);

  console.log(publicRoundId);

  const mojitoSecret = ethers.toUtf8Bytes(process.env.MOJITO_SECRET!);
  const mojitoPublic = ethers.keccak256(mojitoSecret);

  console.log("mojito public: ", mojitoPublic);

  const testSecret = ethers.toUtf8Bytes(process.env.TEST_SECRET!);
  const testPublic = ethers.keccak256(testSecret);

  console.log("test public: ", testPublic);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
