import {
  ApprovalForAll as ApprovalForAllEvent,
  CoordinatorSet as CoordinatorSetEvent,
  MR_ChainLinkRequest as MR_ChainLinkRequestEvent,
  MR_PythRequest as MR_PythRequestEvent,
  MR_RaffleCreated as MR_RaffleCreatedEvent,
  OwnershipTransferRequested as OwnershipTransferRequestedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  PythReceived as PythReceivedEvent,
  PythRequested as PythRequestedEvent,
  RandomNessReveal as RandomNessRevealEvent,
  RequestFulfilled as RequestFulfilledEvent,
  RequestSent as RequestSentEvent,
  TicketBought as TicketBoughtEvent,
  TransferBatch as TransferBatchEvent,
  TransferSingle as TransferSingleEvent,
  URI as URIEvent
} from "../generated/MatesRaffle/MatesRaffle"
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
} from "../generated/schema"

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.operator = event.params.operator
  entity.approved = event.params.approved

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

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

export function handleMR_RaffleCreated(event: MR_RaffleCreatedEvent): void {
  let entity = new MR_RaffleCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.pubKey = event.params.pubKey
  entity.manager = event.params.manager

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

export function handleRandomNessReveal(event: RandomNessRevealEvent): void {
  let entity = new RandomNessReveal(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.rafflePubKey = event.params.rafflePubKey
  entity._finalRandom = event.params._finalRandom

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

export function handleTicketBought(event: TicketBoughtEvent): void {
  let entity = new TicketBought(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.raffle = event.params.raffle
  entity.owner = event.params.owner
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransferBatch(event: TransferBatchEvent): void {
  let entity = new TransferBatch(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.operator = event.params.operator
  entity.from = event.params.from
  entity.to = event.params.to
  entity.ids = event.params.ids
  entity.values = event.params.values

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransferSingle(event: TransferSingleEvent): void {
  let entity = new TransferSingle(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.operator = event.params.operator
  entity.from = event.params.from
  entity.to = event.params.to
  entity.MatesRaffle_id = event.params.id
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleURI(event: URIEvent): void {
  let entity = new URI(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.value = event.params.value
  entity.MatesRaffle_id = event.params.id

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
