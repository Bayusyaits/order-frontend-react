import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import dayjs from 'dayjs'

import type { QueryObj } from 'types'
import { isOnlyNumbers } from 'utils/isOnlyNumbers'
import { formatDateQuery } from 'utils/formatDateQuery'

type DataFormat = 'string' | 'number' | 'date' | 'boolean'

interface Options {
  validQueries?: {
    [key: string]: DataFormat
  }
  sortableColumns?: string[]
  limitOptions?: number[]
}

const checkBoolean = (value: string) => {
  if (value === 'true') return true
  if (value === 'false') return false
  return null
}

const validateDataFormatAndCast = (value: string, dataFormat?: DataFormat) => {
  if (!dataFormat) {
    return null
  }
  if (dataFormat === 'string') {
    return decodeURIComponent(value)
  }
  if (dataFormat === 'number') {
    if (isOnlyNumbers(value)) {
      return +value
    }
  } else if (dataFormat === 'date') {
    // custom encoded date, contains unix timestamp (in seconds, NOT milliseconds)
    if (value.startsWith('%t') && isOnlyNumbers(value.slice(2))) {
      const num = +value.slice(2)

      // Around the year 2100
      if (num < 4110000000) {
        return formatDateQuery(dayjs.unix(num))
      }
    }
  } else if (dataFormat === 'boolean') {
    return checkBoolean(value)
  }
  return null
}

const getCastValue = (key: string, value: string, options: Options) => {
  const { validQueries = {}, sortableColumns, limitOptions = [20, 50, 100] } = options

  // "page", "limit", "sort" are always valid keys. They don't need to be in `validQueries`
  if (key === 'page' || key === 'limit') {
    const castValue = validateDataFormatAndCast(value, 'number')
    if (key === 'limit' && !limitOptions.includes(castValue as number)) {
      return null
    }
    return castValue
  }
  if (key === 'sort') {
    const arr = value.split(',')

    if (sortableColumns) {
      return arr.filter((str) => {
        const columnName = str[0] === '-' ? str.slice(1) : str
        return sortableColumns.includes(columnName)
      })
    }
    return arr
  }
  return validateDataFormatAndCast(value, validQueries[key])
}

const extractQueryObj = (search: string, options: Options) => {
  const { validQueries = {}, sortableColumns, limitOptions = [20, 50, 100] } = options

  try {
    if (search.length < 4) {
      // absolute minimum is something like (?a=b)
      throw new Error()
    }
    if (search[0] !== '?') {
      throw new Error()
    }

    return search
      .substring(1)
      .split('&')
      .reduce((acc, cur) => {
        const [key, val] = cur.split('=')

        if (!val) {
          return acc
        }

        const castValue = getCastValue(key, val, {
          validQueries,
          sortableColumns,
          limitOptions,
        })

        if (castValue === null || castValue === '') {
          return acc
        }

        return {
          ...acc,
          [key]: castValue,
        }
      }, {})
  } catch (err) {
    return {}
  }
}

export interface Config {
  query: QueryObj
  onReadQuery: (newQuery: Record<string, unknown>) => void
  onCleanup?: () => void
  options: Options
  delay?: number
}

export function useReadQuery(config: Config, dependencies: unknown[]): void {
  const { query, onReadQuery, onCleanup, options, delay = 0 } = config
  const { search } = useLocation()

  useEffect(() => {
    const combinedQuery = {
      ...query,
      ...(search && { ...extractQueryObj(search, options) }),
    }
    setTimeout(() => {
      onReadQuery(combinedQuery)
    }, delay)

    if (onCleanup) {
      return () => {
        onCleanup()
      }
    }
    return undefined
    //
  }, dependencies)
}
