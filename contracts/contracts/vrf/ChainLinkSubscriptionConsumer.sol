// SPDX-License-Identifier: MIT
// An example of a consumer contract that relies on a subscription for funding.
pragma solidity ^0.8.27;

import {VRFConsumerBaseV2Plus} from "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import {VRFV2PlusClient} from "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";

contract ChainLinkSubscriptionConsumer is VRFConsumerBaseV2Plus {
    event RequestSent(uint256 requestId, uint32 numWords);
    event RequestFulfilled(uint256 requestId, uint256[] randomWords);

    struct RequestStatus {
        bool fulfilled; // whether the request has been successfully fulfilled
        bool exists; // whether a requestId exists
        uint256[] randomWords;
    }

    mapping(uint256 requestId => RequestStatus requestStatus)
        public chainLinkRequests;

    // MatesRaffle Base Mainnet Sub Id
    uint256 public s_subscriptionId =
        16957555368649562865782493065259495534450158366126501289265118670583371774576;

    // Past request IDs.
    uint256[] public requestIds;
    uint256 public lastRequestId;

    // The gas lane to use, which specifies the maximum gas price to bump to.
    bytes32 public keyHash =
        0xdc2f87677b01473c763cb0aee938ed3341512f6057324a584e5944e786144d70; // 30 on base mainnet

    uint32 public callbackGasLimit = 30_000;
    uint16 public requestConfirmations = 3;
    uint32 public numWords = 1;

    /**
     * HARDCODED FOR BASE MAINNET
     * COORDINATOR: 0xd5D517aBE5cF79B7e95eC98dB0f0277788aFF634
     */
    constructor()
        VRFConsumerBaseV2Plus(0xd5D517aBE5cF79B7e95eC98dB0f0277788aFF634)
    {}

    // Assumes the subscription is funded sufficiently.
    // @param enableNativePayment: Set to `true` to enable payment in native tokens, or
    // `false` to pay in LINK
    function _requestRandomWords(
        bool enableNativePayment
    ) internal returns (uint256 requestId) {
        // Will revert if subscription is not set and funded.
        requestId = s_vrfCoordinator.requestRandomWords(
            VRFV2PlusClient.RandomWordsRequest({
                keyHash: keyHash,
                subId: s_subscriptionId,
                requestConfirmations: requestConfirmations,
                callbackGasLimit: callbackGasLimit,
                numWords: numWords,
                extraArgs: VRFV2PlusClient._argsToBytes(
                    VRFV2PlusClient.ExtraArgsV1({
                        nativePayment: enableNativePayment
                    })
                )
            })
        );
        chainLinkRequests[requestId] = RequestStatus({
            randomWords: new uint256[](0),
            exists: true,
            fulfilled: false
        });
        requestIds.push(requestId);
        lastRequestId = requestId;
        emit RequestSent(requestId, numWords);
        return requestId;
    }

    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] calldata _randomWords
    ) internal override {
        require(chainLinkRequests[_requestId].exists, "request not found");
        chainLinkRequests[_requestId].fulfilled = true;
        chainLinkRequests[_requestId].randomWords = _randomWords;
        emit RequestFulfilled(_requestId, _randomWords);
    }

    function getRequestStatus(
        uint256 _requestId
    ) external view returns (bool fulfilled, uint256[] memory randomWords) {
        require(chainLinkRequests[_requestId].exists, "request not found");
        RequestStatus memory request = chainLinkRequests[_requestId];
        return (request.fulfilled, request.randomWords);
    }
}
