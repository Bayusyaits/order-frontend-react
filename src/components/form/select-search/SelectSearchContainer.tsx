import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import cloneDeep from 'lodash.clonedeep'
import * as yup from 'yup'

import SelectSearchView from './SelectSearchView'
import { Props } from './SelectSearchContext'

const SelectSearchContainer = (props: Props) => {
  const { data, ...res } = props
  const { id, isApi, value, required } = props
  const el = document.getElementById(`#select-${id}`)
  const [showResult, setShowResult] = useState<boolean>(false)
  const [active, setActive] = useState<boolean>(false)
  const [activeCode, setActiveCode] = useState('')
  const [isFirst, setIsFirst] = useState<boolean>(true)
  const [state, setState] = useState<string>('idle')
  const [tmpValue, setTmpValue] = useState<any>(value)
  const [tmpData, setTmpData] = useState<any>([])
  const [mutableData, setMutableData] = useState<any>(data)
  const cloneData = cloneDeep(data)
  const schema = yup
    .object({
      input: yup.string().required(),
    })
    .required()
  const { watch, register, setError, setValue, formState } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  })
  const { errors } = formState
  const watchAllFields = watch()
  const { input } = watchAllFields
  useEffect(() => {
    search()
    if (isApi && !isFirst) {
      props?.setSearch(input)
    }
  }, [input])

  useEffect(() => {
    const v = data
    if ((tmpData.length < 5 || tmpData == 0) && v && v.length > 0) {
      setTmpData(JSON.stringify(v))
    }
  }, [data])
  useEffect(() => {
    setValue('input', findName(value))
  }, [])
  useEffect(() => {
    if (!isFirst) {
      setValue('input', findName(value))
    }
    if (value && required) {
      setTmpValue(value)
    }
  }, [value])
  useEffect(() => {
    if (!value && required && tmpValue) {
      props.setValue(tmpValue)
    }
  }, [value, tmpValue])
  const doShowResult = (val: any) => {
    if (val && el) {
      el.focus()
    }
    setShowResult(true)
    setState('search')
    setIsFirst(false)
    setActive(true)
  }
  const doHideResult = async () => {
    setState('idle')
    await setActive(false)
    const docId = document.getElementById(`select-${id}`)
    const option = document.getElementById(`select-${id}--wrapper`)
    if (docId) {
      docId.blur()
    }
    setTimeout(() => {
      if (option && option.hasAttribute('style')) {
        option.removeAttribute('style')
        option.style.removeProperty('z-index')
        option.style.removeProperty('background-color')
        option.style.removeProperty('width')
        option.style.removeProperty('left')
      }
    }, 10)
    setTimeout(() => setShowResult(false), 1)
  }
  const onMouseLeave = () => {
    setActive(false)
  }
  const onFocus = (val: any) => {
    doShowResult(val)
  }
  const onFocusOut = () => {
    if (!active) {
      doHideResult()
    }
    if (!showResult && required && !value) {
      setError('input', { type: 'focus', message: 'Input is required' })
    }
  }
  const onKeyDown = (val: any) => {
    console.log('onKeyDown', val)
  }
  const extractData = (val: any) => {
    const items = []
    if (val && val.length > 0) {
      for (let i = 0; i < val.length; i++) {
        const obj = val[i]
        if (obj && obj.items && obj.items.length > 0) {
          for (let k = 0; k < obj.items.length; k++) {
            items.push(obj.items[k])
            delete val[i]
          }
        } else if (obj && obj.code) {
          items.push(val[i])
        }
      }
    }
    if (items.length > 0) {
      return items.flat()
    }
    return items
  }
  const findName = (val: any) => {
    let str = val
    const d = extractData(cloneData)
    if (d && d.length > 0 && val) {
      for (let i = 0; i < d.length; i++) {
        const el = d[i]
        if (el && el.code && el.code.toString().toLowerCase() === val.toString().toLowerCase()) {
          str = el.name
          setActiveCode(el.code)
          break
        } else if (
          el &&
          el.name &&
          el.name.toString().toLowerCase() === val.toString().toLowerCase()
        ) {
          str = el.name
          setActiveCode(el.code)
          break
        }
      }
    }
    return str
  }
  const search = () => {
    const val = input
    const arr: any = []
    if (val && cloneData && cloneData.length > 0 && !isApi) {
      for (let i = 0; i < cloneData.length; i++) {
        const item = cloneData[i]
        const findIndex = arr.findIndex(
          (el: any) => el && JSON.stringify(el) === JSON.stringify(item),
        )
        if (
          item &&
          item.name &&
          item.name.toLowerCase().includes(val.toLowerCase()) &&
          findIndex === -1
        ) {
          arr.push(item)
        }
      }
      if (arr && arr.length > 0) {
        setMutableData(arr)
      }
    } else if (!val && tmpData && tmpData.length > 0 && !isApi) {
      let data = []
      try {
        data = JSON.parse(tmpData)
      } catch {
        data = []
      }
      setMutableData(data)
    }
    return arr
  }
  const setSelected = async (val: any) => {
    await props.setValue(val)
    doHideResult()
  }
  const obj = {
    ...res,
    mutableData,
    errors,
    watchAllFields,
    onMouseLeave,
    showResult,
    setShowResult,
    onFocus,
    onFocusOut,
    onKeyDown,
    register,
    setSelected,
    active,
    activeCode,
    isFirst,
    state,
  }
  return <SelectSearchView {...obj} />
}

export default SelectSearchContainer
