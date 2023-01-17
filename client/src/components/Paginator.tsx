import React from 'react'
import './Paginator.css'
import { IItem } from '../interfaces'

export default function Paginator(props: {
  data: IItem[]
  setCurrPage: (currPage: number) => void
  pagesCount: number
}) {
   const buttons = Array.from({ length: props.pagesCount }, (_, index) => {
    return (
      <a
        key={index}
        onClick={(e) => {
          props.setCurrPage(index + 1)
        }}
      >
        {index + 1}
      </a>
    )
  })

  return <div className="pagination">{buttons}</div>
}
