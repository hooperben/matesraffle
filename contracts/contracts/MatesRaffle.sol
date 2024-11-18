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
        uint64[] vrfs;
        uint64 pythRequestId;
        bytes32 chainLinkRandomRequestId;
        bytes32 reveal;
        bool open;
        uint256 ticketsSold;
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

    event MR_RaffleCreated(bytes32 indexed pubKey, address indexed manager);

    function createRaffle(bytes32 _pubKey, uint64[] memory _vrfs) external {
        require(_pubKey != bytes32(0), "Invalid public key");
        require(
            raffles[_pubKey].manager == address(0),
            "Raffle already exists"
        );

        // TODO validate vrfs
        raffles[_pubKey] = Raffle({
            manager: msg.sender,
            vrfs: _vrfs,
            pythRequestId: 0,
            chainLinkRandomRequestId: bytes32(0),
            reveal: bytes32(0),
            open: true,
            ticketsSold: 0
        });

        emit MR_RaffleCreated(_pubKey, msg.sender);
    }

    event MR_ChainLinkRequest(uint256 indexed _chainLinkRandomRequestId);
    event MR_PythRequest(uint64 indexed _pythRequestId);

    function beginDrawRaffle(bytes32 _pubKey) external payable {
        Raffle memory raffle = raffles[_pubKey];
        require(raffle.manager != address(0), "Doesn't exist");

        require(
            raffle.pythRequestId == 0 &&
                raffle.chainLinkRandomRequestId == bytes32(0),
            "Already Written"
        );

        uint256 chainLinkRandomRequestId = _requestRandomWords(true); // native payment
        uint64 pythRequestId = requestPythRandomNumber(
            bytes32(chainLinkRandomRequestId)
        );

        raffles[_pubKey].pythRequestId = pythRequestId;
        raffles[_pubKey].chainLinkRandomRequestId = bytes32(
            chainLinkRandomRequestId
        );

        // mark raffle as closed for ticket purchases
        raffles[_pubKey].open = false;

        emit MR_ChainLinkRequest(chainLinkRandomRequestId);
        emit MR_PythRequest(pythRequestId);
    }

    event RandomNessReveal(
        bytes32 indexed rafflePubKey,
        uint256 indexed _finalRandom
    );

    function settleRaffle(bytes32 commitReveal) external {
        bytes32 reconstructed = keccak256(abi.encodePacked(commitReveal));
        Raffle memory raffle = raffles[reconstructed];
        require(raffle.manager != address(0), "Doesn't exist");

        raffle.reveal = commitReveal;

        emit RandomNessReveal(
            reconstructed,
            uint256(_getRandomness(commitReveal, raffle))
        );
    }

    function getRaffleRandomness(
        bytes32 _pubKey
    ) external view returns (uint256) {
        Raffle memory raffle = raffles[_pubKey];

        if (raffle.reveal == bytes32(0)) {
            return 0;
        }

        return uint256(_getRandomness(_pubKey, raffle));
    }
}
