import {
  CoordinatorSet as CoordinatorSetEvent,
  MR_ChainLinkRequest as MR_ChainLinkRequestEvent,
  MR_PythRequest as MR_PythRequestEvent,
  OwnershipTransferRequested as OwnershipTransferRequestedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  PythReceived as PythReceivedEvent,
  PythRequested as PythRequestedEvent,
  RequestFulfilled as RequestFulfilledEvent,
  RequestSent as RequestSentEvent
} from "../generated/MatesRaffle/MatesRaffle"
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
} from "../generated/schema"

export function handleCoordinatorSet(event: CoordinatorSetEvent): void {
  let entity = new CoordinatorSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.vrfCoordinator = event.params.vrfCoordinator

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMR_ChainLinkRequest(
  event: MR_ChainLinkRequestEvent
): void {
  let entity = new MR_ChainLinkRequest(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._chainLinkRandomRequestId = event.params._chainLinkRandomRequestId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMR_PythRequest(event: MR_PythRequestEvent): void {
  let entity = new MR_PythRequest(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._pythRequestId = event.params._pythRequestId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferRequested(
  event: OwnershipTransferRequestedEvent
): void {
  let entity = new OwnershipTransferRequested(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePythReceived(event: PythReceivedEvent): void {
  let entity = new PythReceived(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.requestId = event.params.requestId
  entity.randomValue = event.params.randomValue
  entity.provider = event.params.provider

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePythRequested(event: PythRequestedEvent): void {
  let entity = new PythRequested(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.requestId = event.params.requestId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRequestFulfilled(event: RequestFulfilledEvent): void {
  let entity = new RequestFulfilled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.requestId = event.params.requestId
  entity.randomWords = event.params.randomWords

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRequestSent(event: RequestSentEvent): void {
  let entity = new RequestSent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.requestId = event.params.requestId
  entity.numWords = event.params.numWords

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
