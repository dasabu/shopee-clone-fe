export const SORT_BY = {
  CREATED_AT: 'createdAt',
  VIEW: 'view',
  SOLD: 'sold',
  PRICE: 'price'
} as const

export const ORDER = {
  ASC: 'asc',
  DESC: 'desc'
} as const

export const PURCHASE_STATUS = {
  inCart: -1,
  all: 0,
  waitForConfirmation: 1,
  waitForGetting: 2,
  inProgress: 3,
  delivered: 4,
  cancelled: 5
} as const
