// SPDX-License-Identifier: GNU
pragma solidity ^0.8.27;

import "./vrf/ChainLinkSubscriptionConsumer.sol";
import "./vrf/PythSubscriptionConsumer.sol";

contract MatesRaffle is
    ChainLinkSubscriptionConsumer,
    PythSubscriptionConsumer
{
    constructor() ChainLinkSubscriptionConsumer() PythSubscriptionConsumer() {}

    event MR_ChainLinkRequest(uint256 indexed _chainLinkRandomRequestId);
    event MR_PythRequest(uint64 indexed _pythRequestId);

    function requestRandomnessFromTheOracles() public payable {
        uint256 chainLinkRandomRequestId = _requestRandomWords(true); // native payment

        emit MR_ChainLinkRequest(chainLinkRandomRequestId);

        uint64 pythRequestId = requestPythRandomNumber(
            bytes32(chainLinkRandomRequestId)
        );

        emit MR_PythRequest(pythRequestId);
    }
}
