import React from 'react'
import styles from './selectSearch.module.css'
import { Search, ChevronDown, CheckCircle } from 'react-feather'

const SelectSearch = (props: any) => {
  const {
    register,
    id,
    isInput,
    isFix,
    size,
    required,
    setSelected,
    classesName,
    autocomplete,
    placeholder,
    errorMessage,
    disabled,
    isIcon,
    mutableData,
    onMouseLeave,
    onFocus,
    onFocusOut,
    onKeyDown,
    showResult,
    activeCode,
    active,
  } = props

  type ItemsProps = {
    name: string
    code: string | number
    items?: {
      name: string
      code: string | number
    }[]
  }[]
  const setActiveItem = (val: number | boolean | string) => {
    if (val && activeCode && val === activeCode) {
      return (
        <div className='mr-2'>
          <CheckCircle width={16} />
        </div>
      )
    }
  }
  const setDom = (
    arr: {
      name: string
      code: string | number
    }[],
  ) => {
    if (arr && arr.length > 0) {
      return arr.map((el, j) => (
        <div
          onClick={() => setSelected(el.code)}
          key={`dom-${el.code}-${j}`}
          className={`${styles.optionChild} block pl-3 flex justify-between cursor-pointer`}
        >
          {el.name}
          {setActiveItem(el.code)}
        </div>
      ))
    }
  }
  const showError = () => {
    if (errorMessage) {
      return <span className='sm:ml-auto mt-1 sm:mt-0 text-xs text-gray-600'>{errorMessage}</span>
    }
  }
  const showIcon = () => {
    if (isIcon) {
      return (
        <Search className='w-4 h-4 absolute my-auto inset-y-0 ml-3 left-0 z-10 text-gray-700 dark:text-gray-300' />
      )
    }
  }
  const activeScroll = () => {
    const el: any = document.getElementById(`select-${id}`)
    if (el && active && isFix) {
      const option = document.getElementById(`select-${id}--wrapper`)
      if (option) {
        option.style.position = 'fixed'
        option.style.zIndex = '50'
        option.style.backgroundColor = 'inherit'
        option.style.width = `auto`
        option.style.left = `inherit`
      }
    }
  }
  const setItems = (val: ItemsProps) => {
    const res = []
    if (val && val.length > 0) {
      for (let i = 0; i < val.length; i++) {
        const obj = val[i]
        if (obj && obj.items && obj.items.length > 0) {
          res.push(
            <div
              id={`data-item-${obj.code}-${i}`}
              key={`data-item-${obj.code}-${i}`}
              role='option'
              className={`option align-items-center px-3 py-1 ${
                activeCode === obj.code ? 'active' : ''
              }`}
            >
              <div className={`${styles.optionParent} font-bold`}>{obj.name}</div>
              {setDom(obj.items)}
            </div>,
          )
        } else if (obj && obj.code) {
          res.push(
            <div
              id={`data-${obj.code}-${i}`}
              key={`${obj.code}-${i}`}
              role='option'
              onClick={() => setSelected(obj.code)}
              className={`block option align-items-center px-3 py-1`}
            >
              <div className='flex justify-between cursor-pointer'>
                {obj.name}
                {setActiveItem(obj.code)}
              </div>
            </div>,
          )
        }
      }
    }
    return res
  }
  if (isFix) {
    activeScroll()
  }
  const setSize = (val: string) => {
    let classes = 'form-control-md'
    if (val === 'lg') {
      classes = 'form-control-lg'
    } else if (val === 'sm') {
      classes = 'form-control-sm'
    }
    return classes
  }
  if (isInput) {
    return (
      <div
        onMouseLeave={onMouseLeave}
        id={`select-${id}`}
        className={`${classesName} form-floating-custom form-input-dropdown select-search-container ${
          showResult ? 'active' : ''
        }`}
      >
        <label className={`form-label w-full flex flex-col sm:flex-row`}>
          {placeholder}
          {showError()}
        </label>
        <div className={`box ${styles.formWrapper}`}>
          <div
            className={`${styles.formInput} dropdown-input-wrap sm:w-auto relative mr-auto mt-3 sm:mt-0`}
          >
            {showIcon()}
            <input
              id={`select-input-${id}`}
              type='select-multiple'
              className={`${setSize(size)} ${
                isIcon ? 'px-8' : 'px-3'
              } dropdown-input py-3 w-full box pr-10 placeholder-theme-8`}
              placeholder='Search'
              aria-expanded='false'
              aria-controls='post-form-4-ts-dropdown'
              {...register('input', {
                required: 'Input is required',
              })}
              required={required}
              onFocus={onFocus}
              onBlur={onFocusOut}
              tabIndex={0}
              onKeyDown={onKeyDown}
              disabled={disabled}
              autoComplete={autocomplete}
              readOnly={disabled}
            />
            <div className={`${styles.icon} ${showResult ? 'transform rotate-180' : ''}`}>
              <ChevronDown width={16} />
            </div>
          </div>
          <div
            id={`select-${id}--wrapper`}
            aria-labelledby='post-form-4-ts-label'
            className={`ts-dropdown-content pb-2 ${showResult ? '' : 'none'}`}
          >
            {setItems(mutableData)}
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div
        id={`select-text-${id}`}
        className={`${classesName} mb-3 form-floating-custom form-input-dropdown select-search-container`}
      >
        <label className={`form-label w-full flex flex-col sm:flex-row`}>{placeholder}</label>
        <div className={styles.formWrapper}>
          <div
            className={`${styles.formInput} dropdown-input-wrap sm:w-auto relative mr-auto mt-3 sm:mt-0`}
          >
            <input
              id={`select-input-${id}`}
              type='select-multiple'
              className='px-3 dropdown-input py-3 w-full lg:w-64 box pr-10 placeholder-theme-8'
              placeholder='Search'
              aria-expanded='false'
              aria-controls='post-form-4-ts-dropdown'
              {...register('input', {
                required: 'Input is required',
              })}
              tabIndex={0}
              readOnly={true}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default SelectSearch
