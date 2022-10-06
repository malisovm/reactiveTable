import React from 'react'
import './Table.css'
import { IItem } from '../interfaces'
import TableHeader from './TableHeader'
import Paginator from './Paginator'

export default function Table(props: {
  data: IItem[]
  setSortBy: (sortBy: string) => void
  setSortOrder: (sortOrder: string) => void
  setCurrPage: (currPage: number) => void
  pagesCount: number
}) {

  return (
    <>
      <div className="tableContainer">
        <table>
          <TableHeader
            setSortBy={props.setSortBy}
            setSortOrder={props.setSortOrder}
          />
          <tbody>
            {props.data.map((item) => {
              let date = new Date(item.date).toLocaleString('ru-RU', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })
              return (
                <tr key={item.id}>
                  <td>{date}</td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.distance + ' км'}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <Paginator data={props.data} setCurrPage={props.setCurrPage} pagesCount={props.pagesCount}/>
    </>
  )
}
