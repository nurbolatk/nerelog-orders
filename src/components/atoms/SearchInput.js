import React from 'react'

export const SearchInput = ({
  value,
  onChange,
  placeholder,
  onClearClick,
  className,
  ...props
}) => {
  return (
    <div className={className}>
      <input
        id="query"
        type="text"
        onChange={onChange}
        className="input !pr-7"
        placeholder={placeholder}
        value={value}
        {...props}
      />
      <button
        type="button"
        onClick={onClearClick}
        className="absolute right-2.5 top-1/2 -translate-y-1/2">
        &#10005;
      </button>
    </div>
  )
}
