// SPDX-License-Identifier: GNU
pragma solidity ^0.8.27;

import "./vrf/ChainLinkSubscriptionConsumer.sol";

contract MatesRaffle is ChainLinkSubscriptionConsumer {
    constructor() ChainLinkSubscriptionConsumer() {}

    event MR_ChainLinkRequest(uint256 indexed _chainLinkRandomRequestId);

    function requestRandomnessFromTheOracles() public {
        uint256 chainLinkRandomRequestId = _requestRandomWords(true); // native payment

        emit MR_ChainLinkRequest(chainLinkRandomRequestId);
    }
}
