import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  CoordinatorSet,
  MR_ChainLinkRequest,
  MR_PythRequest,
  OwnershipTransferRequested,
  OwnershipTransferred,
  PythReceived,
  PythRequested,
  RequestFulfilled,
  RequestSent
} from "../generated/MatesRaffle/MatesRaffle"

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
