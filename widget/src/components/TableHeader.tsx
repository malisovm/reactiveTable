import React, { useState } from 'react'

export default function TableHeader(props: {
  setSortBy: (sortBy: string) => void
  setSortOrder: (sortOrder: string) => void
}) {
  const [sortByName, setSortByName] = useState('Название ↓')
  const [sortByQuantity, setSortByQuantity] = useState('Количество ⇅')
  const [sortByDistance, setSortByDistance] = useState('Расстояние ⇅')
  const setSortBy = props.setSortBy
  const setSortOrder = props.setSortOrder

  return (
    <thead>
      <tr>
        <td>Дата</td>
        <td>
          <button
            onClick={(e) => {
              setSortBy('name')
              setSortByQuantity('Количество ⇅')
              setSortByDistance('Расстояние ⇅')
              if (sortByName === 'Название ⇅') {
                setSortByName('Название ↓')
                setSortOrder('ASC')
              } else if (sortByName === 'Название ↓') {
                setSortByName('Название ↑')
                setSortOrder('DESC')
              } else if (sortByName === 'Название ↑') {
                setSortByName('Название ↓')
                setSortOrder('ASC')
              }
            }}
          >
            {sortByName}
          </button>
        </td>
        <td>
          <button
            onClick={(e) => {
              setSortBy('quantity')
              setSortByName('Название ⇅')
              setSortByDistance('Расстояние ⇅')
              if (sortByQuantity === 'Количество ⇅') {
                setSortByQuantity('Количество ↓')
                setSortOrder('ASC')
              } else if (sortByQuantity === 'Количество ↓') {
                setSortByQuantity('Количество ↑')
                setSortOrder('DESC')
              } else if (sortByQuantity === 'Количество ↑') {
                setSortByQuantity('Количество ↓')
                setSortOrder('ASC')
              }
            }}
          >
            {sortByQuantity}
          </button>
        </td>
        <td>
          <button
            onClick={(e) => {
              setSortBy('distance')
              setSortByName('Название ⇅')
              setSortByQuantity('Количество ⇅')
              if (sortByDistance === 'Расстояние ⇅') {
                setSortByDistance('Расстояние ↓')
                setSortOrder('ASC')
              } else if (sortByDistance === 'Расстояние ↓') {
                setSortByDistance('Расстояние ↑')
                setSortOrder('DESC')
              } else if (sortByDistance === 'Расстояние ↑') {
                setSortByDistance('Расстояние ↓')
                setSortOrder('ASC')
              }
            }}
          >
            {sortByDistance}
          </button>
        </td>
      </tr>
    </thead>
  )
}
