// SPDX-License-Identifier: GNU
pragma solidity 0.8.27;

import "./MatesRaffle.sol";

contract MatesRaffleDev is MatesRaffle {
    constructor() MatesRaffle() {}

    function setOracleValues(
        bytes32 raffleId,
        uint64 pythRequestId,
        uint256 pythRandom,
        uint256 chainLinkRandomRequestId,
        uint256 clRandomWord
    ) external onlyOwner {
        require(raffleId != bytes32(0), "Invalid public key");

        Raffle memory raffle = raffles[raffleId];
        require(raffle.manager != address(0), "Raffle is closed");

        // handle CL
        chainLinkRequests[chainLinkRandomRequestId] = RequestStatus({
            randomWords: new uint256[](0),
            exists: true,
            fulfilled: false
        });
        requestIds.push(chainLinkRandomRequestId);
        lastRequestId = chainLinkRandomRequestId;
        emit RequestSent(chainLinkRandomRequestId, numWords);

        raffle.chainLinkRandomRequestId = bytes32(chainLinkRandomRequestId);

        require(
            chainLinkRequests[chainLinkRandomRequestId].exists,
            "request not found"
        );
        chainLinkRequests[chainLinkRandomRequestId].fulfilled = true;
        chainLinkRequests[chainLinkRandomRequestId].randomWords = [
            clRandomWord
        ];
        uint256[] memory clRandomWords = new uint256[](clRandomWord);

        emit RequestFulfilled(chainLinkRandomRequestId, clRandomWords);

        // handle PYTH
        raffle.pythRequestId = pythRequestId;
        emit PythRequested(pythRequestId);

        pythRequests[pythRequestId] = pythRandom;
        emit PythReceived(pythRequestId, pythRandom, provider);
    }

    function hashBytes(bytes calldata toHash) external pure returns (bytes32) {
        return keccak256(toHash);
    }
}
