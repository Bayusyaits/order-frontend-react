interface CommonState {
  isLoading: boolean
  isDataLoading: boolean
  query: {
    currentPage: number;
    limit: number;
    sortBy: string;
  }
  lastSort: string
  data: {
    params: {
      uri: string;
    }
    query: {
      currentPage: number;
      limit: number;
      sortBy: string;
    }
    items: Record<string, unknown>[]
  }
}

export const createResetHandler = <T>(initialState: T) => (): T => initialState
export const fetchHandler = <T extends CommonState>(state: T): void => {
  state.isDataLoading = true
  state.lastSort = JSON.stringify(state.query.sortBy)
  state.query.currentPage = 1
}
export const fetchSuccessHandler = <T extends CommonState>(
  state: T,
  action: CustomAction,
): void => {
  const data = action.payload
  state.isDataLoading = false
  state.data = data
  if (state.query.sortBy.length === 0 || !state.lastSort) {
    state.lastSort = JSON.stringify(data.query.sortBy)
  }
}
export const fetchFailureHandler = <T extends CommonState>(state: T): void => {
  state.isDataLoading = false
}
export const sortHandler = <T extends CommonState>(state: T, action: CustomAction): void => {
  if (!action.payload) {
    return
  }
  const { index, sortString } = action.payload
  const { sortBy } = state.query
  if (sortString === null) {
    state.query.sortBy = sortBy.slice(0, index).concat(sortBy.slice(index + 1))
  } else {
    state.query.sortBy[index] = sortString
  }
}
export const setQueryHandler = <T extends CommonState>(state: T, action: CustomAction): void => {
  state.isDataLoading = true
  state.lastSort = JSON.stringify(state.query.sortBy)
  state.query = {
    ...state.query,
    ...action.payload,
  }
}
export const filterResetHandler = <T extends CommonState>(state: T): void => {
  const { limit, sortBy } = state.query
  state.isDataLoading = true
  state.query = {
    currentPage: 1,
    limit,
    sortBy,
  }
}
export const loadingHandler = <T extends CommonState>(state: T): void => {
  state.isLoading = true
}
export const stopLoadingHandler = <T extends CommonState>(state: T): void => {
  state.isLoading = false
}
