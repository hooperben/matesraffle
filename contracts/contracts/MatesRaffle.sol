// SPDX-License-Identifier: GNU
pragma solidity 0.8.27;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./vrf/ChainLinkSubscriptionConsumer.sol";
import "./vrf/PythSubscriptionConsumer.sol";

contract MatesRaffle is
    ERC1155,
    ChainLinkSubscriptionConsumer,
    PythSubscriptionConsumer
{
    constructor()
        ERC1155("MatesRaffle")
        ChainLinkSubscriptionConsumer()
        PythSubscriptionConsumer()
    {}

    struct Raffle {
        address manager;
        uint64 pythRequestId;
        bytes32 chainLinkRandomRequestId;
        bytes reveal;
        bool open;
        uint256 ticketsSold;
        uint64 prizes;
    }

    mapping(bytes32 rafflePubKey => Raffle raffle) public raffles;

    function _getRandomness(
        bytes32 raffleId,
        Raffle memory raffle
    ) internal view returns (bytes32) {
        return
            keccak256(
                abi.encode(
                    raffleId,
                    chainLinkRequests[uint256(raffle.chainLinkRandomRequestId)],
                    pythRequests[raffle.pythRequestId],
                    raffle.reveal
                )
            );
    }

    event TicketBought(
        bytes32 indexed raffle,
        address indexed owner,
        uint256 amount
    );

    function buyTickets(
        bytes32 _pubKey,
        address owner,
        uint256 amount // TODO make 1 / remove this for now
    ) external {
        require(_pubKey != bytes32(0), "Invalid public key");
        require(raffles[_pubKey].open, "Raffle is closed");

        // TODO gotta make this more dynamic based on sig inputs/raffle config
        require(balanceOf(owner, uint256(_pubKey)) == 0, "single use only atm");

        _mint(owner, uint256(_pubKey), amount, "0x");

        emit TicketBought(_pubKey, owner, amount);
    }

    event RaffleCreated(bytes32 indexed pubKey, Raffle indexed raffle);

    function createRaffle(
        bytes32 _pubKey,
        uint64 _rafflePrizes,
        bool _raffleOpen
    ) external {
        require(_pubKey != bytes32(0), "Invalid public key");
        require(
            raffles[_pubKey].manager == address(0),
            "Raffle already exists"
        );
        require(_rafflePrizes > 0, "no prizes? what kinda sick joke is that");

        raffles[_pubKey] = Raffle({
            manager: msg.sender,
            pythRequestId: 0,
            chainLinkRandomRequestId: bytes32(0),
            reveal: new bytes(0),
            open: _raffleOpen,
            ticketsSold: 0,
            prizes: _rafflePrizes
        });

        emit RaffleCreated(_pubKey, raffles[_pubKey]);
    }

    function beginDrawRaffle(bytes32 _pubKey) external payable {
        Raffle memory raffle = raffles[_pubKey];
        require(raffle.manager != address(0), "Doesn't exist");

        // TODO make sure that this is only callable by manager

        require(
            raffle.pythRequestId == 0 &&
                raffle.chainLinkRandomRequestId == bytes32(0),
            "Already Written"
        );

        // request CL random
        uint256 chainLinkRandomRequestId = _requestRandomWords(true); // native payment
        raffles[_pubKey].chainLinkRandomRequestId = bytes32(
            chainLinkRandomRequestId
        );

        // request PYTH random
        uint64 pythRequestId = requestPythRandomNumber(
            bytes32(chainLinkRandomRequestId)
        );
        raffles[_pubKey].pythRequestId = pythRequestId;

        // mark raffle as closed for ticket purchases
        raffles[_pubKey].open = false;
    }

    event RandomNessReveal(
        bytes32 indexed rafflePubKey,
        uint256 indexed _finalRandom
    );

    function settleRaffle(bytes calldata secret) external {
        bytes32 reconstructed = keccak256(secret);
        Raffle memory raffle = raffles[reconstructed];
        require(
            raffle.manager != address(0),
            "Reconstructed Raffle Doesn't exist"
        );

        raffle.reveal = secret;

        emit RandomNessReveal(
            reconstructed,
            uint256(_getRandomness(reconstructed, raffle))
        );
    }

    function getRaffleRandomness(
        bytes32 _pubKey
    ) external view returns (uint256) {
        Raffle memory raffle = raffles[_pubKey];

        if (raffle.reveal.length == 0) {
            return 0;
        }

        return uint256(uint256(_getRandomness(_pubKey, raffle)));
    }
}
