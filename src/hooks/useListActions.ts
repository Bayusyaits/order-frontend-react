import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { TablePaginationProps } from '@material-ui/core'

import { SortMenuProps } from 'components/sortMenu'
import { Config } from 'hooks/useReadQuery'

export type UseListActionsProps = {
  setQuery: Config['onReadQuery']
  reset?: Config['onCleanup']
  sort?: SortMenuProps['handleSort']
  filterReset?: () => void
  exportExcel?: () => void
  additionalAction?: () => void
}

export type UseListActionsReturn = {
  handleSetQuery: Config['onReadQuery']
  handleReset?: Config['onCleanup']
  handleSort: SortMenuProps['handleSort']
  handleFilterReset: () => void
  handleExportExcel: () => void
  handlePageChange: TablePaginationProps['onPageChange']
  handleRowsPerPageChange: TablePaginationProps['onRowsPerPageChange']
  handleAdditionalAction?: () => void
}

export const useListActions = ({
  setQuery,
  exportExcel,
  filterReset,
  reset,
  sort,
  additionalAction = () => null,
}: UseListActionsProps): UseListActionsReturn => {
  const dispatch = useDispatch()

  const handleSetQuery: UseListActionsReturn['handleSetQuery'] = useCallback(
    (combinedQuery) => {
      dispatch(setQuery(combinedQuery))
    },
    [dispatch, setQuery],
  )

  const handleReset: UseListActionsProps['reset'] = useCallback(() => {
    if (reset) {
      dispatch(reset())
    }
  }, [dispatch, reset])

  const handleSort: UseListActionsReturn['handleSort'] = useCallback(
    (item) => {
      if (sort) {
        dispatch(sort(item))
      }
    },
    [dispatch, sort],
  )

  const handleFilterReset = useCallback(() => {
    if (filterReset) {
      dispatch(filterReset())
    }
  }, [dispatch, filterReset])

  const handleExportExcel = useCallback(() => {
    if (exportExcel) {
      dispatch(exportExcel())
    }
  }, [dispatch, exportExcel])

  const handlePageChange: UseListActionsReturn['handlePageChange'] = useCallback(
    (_, newPage) => {
      handleSetQuery({ page: newPage + 1 })
    },
    [handleSetQuery],
  )

  const handleRowsPerPageChange: UseListActionsReturn['handleRowsPerPageChange'] = useCallback(
    (e: any) => {
      handleSetQuery({
        page: 1,
        limit: Number(e.target.value),
      })
    },
    [handleSetQuery],
  )

  const handleAdditionalAction = useCallback(() => {
    dispatch(additionalAction())
  }, [dispatch, additionalAction])

  return {
    handleSetQuery,
    handleExportExcel,
    handleFilterReset,
    handleReset,
    handleSort,
    handlePageChange,
    handleRowsPerPageChange,
    handleAdditionalAction,
  }
}
