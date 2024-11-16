import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  ApprovalForAll,
  CoordinatorSet,
  MR_ChainLinkRequest,
  MR_PythRequest,
  MR_RaffleCreated,
  OwnershipTransferRequested,
  OwnershipTransferred,
  PythReceived,
  PythRequested,
  RandomNessReveal,
  RequestFulfilled,
  RequestSent,
  TicketBought,
  TransferBatch,
  TransferSingle,
  URI
} from "../generated/MatesRaffle/MatesRaffle"

export function createApprovalForAllEvent(
  account: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createCoordinatorSetEvent(
  vrfCoordinator: Address
): CoordinatorSet {
  let coordinatorSetEvent = changetype<CoordinatorSet>(newMockEvent())

  coordinatorSetEvent.parameters = new Array()

  coordinatorSetEvent.parameters.push(
    new ethereum.EventParam(
      "vrfCoordinator",
      ethereum.Value.fromAddress(vrfCoordinator)
    )
  )

  return coordinatorSetEvent
}

export function createMR_ChainLinkRequestEvent(
  _chainLinkRandomRequestId: BigInt
): MR_ChainLinkRequest {
  let mrChainLinkRequestEvent = changetype<MR_ChainLinkRequest>(newMockEvent())

  mrChainLinkRequestEvent.parameters = new Array()

  mrChainLinkRequestEvent.parameters.push(
    new ethereum.EventParam(
      "_chainLinkRandomRequestId",
      ethereum.Value.fromUnsignedBigInt(_chainLinkRandomRequestId)
    )
  )

  return mrChainLinkRequestEvent
}

export function createMR_PythRequestEvent(
  _pythRequestId: BigInt
): MR_PythRequest {
  let mrPythRequestEvent = changetype<MR_PythRequest>(newMockEvent())

  mrPythRequestEvent.parameters = new Array()

  mrPythRequestEvent.parameters.push(
    new ethereum.EventParam(
      "_pythRequestId",
      ethereum.Value.fromUnsignedBigInt(_pythRequestId)
    )
  )

  return mrPythRequestEvent
}

export function createMR_RaffleCreatedEvent(
  pubKey: Bytes,
  manager: Address
): MR_RaffleCreated {
  let mrRaffleCreatedEvent = changetype<MR_RaffleCreated>(newMockEvent())

  mrRaffleCreatedEvent.parameters = new Array()

  mrRaffleCreatedEvent.parameters.push(
    new ethereum.EventParam("pubKey", ethereum.Value.fromFixedBytes(pubKey))
  )
  mrRaffleCreatedEvent.parameters.push(
    new ethereum.EventParam("manager", ethereum.Value.fromAddress(manager))
  )

  return mrRaffleCreatedEvent
}

export function createOwnershipTransferRequestedEvent(
  from: Address,
  to: Address
): OwnershipTransferRequested {
  let ownershipTransferRequestedEvent = changetype<OwnershipTransferRequested>(
    newMockEvent()
  )

  ownershipTransferRequestedEvent.parameters = new Array()

  ownershipTransferRequestedEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  ownershipTransferRequestedEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )

  return ownershipTransferRequestedEvent
}

export function createOwnershipTransferredEvent(
  from: Address,
  to: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )

  return ownershipTransferredEvent
}

export function createPythReceivedEvent(
  requestId: BigInt,
  randomValue: BigInt,
  provider: Address
): PythReceived {
  let pythReceivedEvent = changetype<PythReceived>(newMockEvent())

  pythReceivedEvent.parameters = new Array()

  pythReceivedEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromUnsignedBigInt(requestId)
    )
  )
  pythReceivedEvent.parameters.push(
    new ethereum.EventParam(
      "randomValue",
      ethereum.Value.fromUnsignedBigInt(randomValue)
    )
  )
  pythReceivedEvent.parameters.push(
    new ethereum.EventParam("provider", ethereum.Value.fromAddress(provider))
  )

  return pythReceivedEvent
}

export function createPythRequestedEvent(requestId: BigInt): PythRequested {
  let pythRequestedEvent = changetype<PythRequested>(newMockEvent())

  pythRequestedEvent.parameters = new Array()

  pythRequestedEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromUnsignedBigInt(requestId)
    )
  )

  return pythRequestedEvent
}

export function createRandomNessRevealEvent(
  rafflePubKey: Bytes,
  _finalRandom: BigInt
): RandomNessReveal {
  let randomNessRevealEvent = changetype<RandomNessReveal>(newMockEvent())

  randomNessRevealEvent.parameters = new Array()

  randomNessRevealEvent.parameters.push(
    new ethereum.EventParam(
      "rafflePubKey",
      ethereum.Value.fromFixedBytes(rafflePubKey)
    )
  )
  randomNessRevealEvent.parameters.push(
    new ethereum.EventParam(
      "_finalRandom",
      ethereum.Value.fromUnsignedBigInt(_finalRandom)
    )
  )

  return randomNessRevealEvent
}

export function createRequestFulfilledEvent(
  requestId: BigInt,
  randomWords: Array<BigInt>
): RequestFulfilled {
  let requestFulfilledEvent = changetype<RequestFulfilled>(newMockEvent())

  requestFulfilledEvent.parameters = new Array()

  requestFulfilledEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromUnsignedBigInt(requestId)
    )
  )
  requestFulfilledEvent.parameters.push(
    new ethereum.EventParam(
      "randomWords",
      ethereum.Value.fromUnsignedBigIntArray(randomWords)
    )
  )

  return requestFulfilledEvent
}

export function createRequestSentEvent(
  requestId: BigInt,
  numWords: BigInt
): RequestSent {
  let requestSentEvent = changetype<RequestSent>(newMockEvent())

  requestSentEvent.parameters = new Array()

  requestSentEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromUnsignedBigInt(requestId)
    )
  )
  requestSentEvent.parameters.push(
    new ethereum.EventParam(
      "numWords",
      ethereum.Value.fromUnsignedBigInt(numWords)
    )
  )

  return requestSentEvent
}

export function createTicketBoughtEvent(
  raffle: Bytes,
  owner: Address,
  amount: BigInt
): TicketBought {
  let ticketBoughtEvent = changetype<TicketBought>(newMockEvent())

  ticketBoughtEvent.parameters = new Array()

  ticketBoughtEvent.parameters.push(
    new ethereum.EventParam("raffle", ethereum.Value.fromFixedBytes(raffle))
  )
  ticketBoughtEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  ticketBoughtEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return ticketBoughtEvent
}

export function createTransferBatchEvent(
  operator: Address,
  from: Address,
  to: Address,
  ids: Array<BigInt>,
  values: Array<BigInt>
): TransferBatch {
  let transferBatchEvent = changetype<TransferBatch>(newMockEvent())

  transferBatchEvent.parameters = new Array()

  transferBatchEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam("ids", ethereum.Value.fromUnsignedBigIntArray(ids))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam(
      "values",
      ethereum.Value.fromUnsignedBigIntArray(values)
    )
  )

  return transferBatchEvent
}

export function createTransferSingleEvent(
  operator: Address,
  from: Address,
  to: Address,
  id: BigInt,
  value: BigInt
): TransferSingle {
  let transferSingleEvent = changetype<TransferSingle>(newMockEvent())

  transferSingleEvent.parameters = new Array()

  transferSingleEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return transferSingleEvent
}

export function createURIEvent(value: string, id: BigInt): URI {
  let uriEvent = changetype<URI>(newMockEvent())

  uriEvent.parameters = new Array()

  uriEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromString(value))
  )
  uriEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )

  return uriEvent
}
