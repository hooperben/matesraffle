// SPDX-License-Identifier: MIT
// An example of a consumer contract that relies on a subscription for funding.
pragma solidity 0.8.27;

import {IEntropyConsumer} from "@pythnetwork/entropy-sdk-solidity/IEntropyConsumer.sol";
import {IEntropy} from "@pythnetwork/entropy-sdk-solidity/IEntropy.sol";

contract PythSubscriptionConsumer is IEntropyConsumer {
    // base mainnet entropy contract
    IEntropy public entropy =
        IEntropy(0x6E7D74FA7d5c90FEF9F0512987605a6d546181Bb);

    // base mainnet entropy provider contract
    address public provider = 0x52DeaA1c84233F7bb8C8A45baeDE41091c616506;

    mapping(uint64 _id => uint256 _randomValue) public pythRequests;

    event PythRequested(uint64 indexed requestId);
    event PythReceived(
        uint64 indexed requestId,
        uint256 indexed randomValue,
        address provider
    );

    constructor() {}

    function getPythFee() external view returns (uint128) {
        uint128 requestFee = entropy.getFee(provider);
        return requestFee;
    }

    function requestPythRandomNumber(
        bytes32 userRandomNumber
    ) public payable returns (uint64) {
        // get the required fee
        uint128 requestFee = entropy.getFee(provider);
        // check if the user has sent enough fees
        if (msg.value < requestFee) revert("not enough fees");

        // pay the fees and request a random number from entropy
        uint64 requestId = entropy.requestWithCallback{value: requestFee}(
            provider,
            userRandomNumber
        );

        emit PythRequested(requestId);

        return requestId;
    }

    function entropyCallback(
        uint64 requestId,
        // If your app uses multiple providers, you can use this argument
        // to distinguish which one is calling the app back. This app only
        // uses one provider so this argument is not used.
        address _providerAddress,
        bytes32 randomNumber
    ) internal override {
        pythRequests[requestId] = uint256(randomNumber);

        // TODO check provider here ?

        emit PythReceived(requestId, uint256(randomNumber), _providerAddress);
    }

    // This method is required by the IEntropyConsumer interface
    function getEntropy() internal view override returns (address) {
        return address(entropy);
    }
}
