import React, {useState} from 'react'
import './Filter.css'
import { ISelections } from '../interfaces'

export default function Filter(props: {
  selections: ISelections
  setSelections: (selections: ISelections) => void
}) {
  const selections = props.selections
  const setSelections = props.setSelections
  console.log(selections)

  /* questions in the filter are rendered conditionally depending on the previous selections.
  'Name' is a string, so it can only be filtered as 'equals' or 'contains', since a string cannot be 'more' or 'less' than another string. Similarly, 'quantity' and 'distance' are numbers, so they cannot 'contain' another number. */

  return (
    <div className="filterContainer">
      <div className="filterHeader">Фильтр</div>
      <form className="filter" method="get" action="/db">
        <label htmlFor="column">По колонке:</label>
        <br />
        <select
          id="column"
          name="column"
          defaultValue="default"
          onChange={(e) => {
            // @ts-ignore
            setSelections((prevState) => {
              return { ...prevState, column: e.target.value, type: 'default', text: '' }
            })
          }}
        >
          <option value="default" disabled>
            Выберите...
          </option>
          <option value="name">Название</option>
          <option value="quantity">Количество</option>
          <option value="distance">Расстояние</option>
        </select>
        <br />
        {selections.column && (
          <>
            <label htmlFor="type">Тип фильтра:</label>
            <br />
            {(function () {
              if (selections.column === 'name')
                return (
                  <>
                    <select
                      id="type"
                      name="type"
                      //defaultValue="default"
                      value={selections.type}
                      onChange={(e) => {
                        // @ts-ignore
                        setSelections((prevState) => {
                          return { ...prevState, type: e.target.value }
                        })
                      }}
                    >
                      <option value="default" disabled>
                        Выберите...
                      </option>
                      <option value="equals">Равно</option>
                      <option value="contains">Содержит</option>
                    </select>
                    <br />
                  </>
                )
              else
                return (
                  <>
                    <select
                      id="type"
                      name="type"
                      value={selections.type}
                      onChange={(e) => {
                        // @ts-ignore
                        setSelections((prevState) => {
                          return { ...prevState, type: e.target.value }
                        })
                      }}
                    >
                      <option value="default" disabled>
                        Выберите...
                      </option>
                      <option value="equals">Равно</option>
                      <option value="more">Больше</option>
                      <option value="less">Меньше</option>
                    </select>
                    <br />
                  </>
                )
            })()}
            {(function () {
              // renders text or number input field based on previously selected type
              if (selections.type && selections.column === 'name')
                return (
                  <>
                    <label htmlFor="text">Значение:</label>
                    <br />
                    <input
                      type="text"
                      id="text"
                      autoComplete="off"
                      value={selections.text}
                      onChange={(e) => {
                          // @ts-ignore
                          setSelections((prevState) => {
                            return { ...prevState, text: e.target.value }
                          })
                      }}
                    ></input>
                  </>
                )
              else if (selections.type && selections.type !== 'default' && selections.column !== 'name')
                return (
                  <>
                    <label htmlFor="text">Значение:</label>
                    <br />
                    <input
                      type="number"
                      id="text"
                      autoComplete="off"
                      value={selections.text}
                      onChange={(e) => {
                          // @ts-ignore
                          setSelections((prevState) => {
                            return { ...prevState, text: e.target.value }
                          })
                      }}
                    ></input>
                  </>
                )
            })()}
          </>
        )}
      </form>
    </div>
  )
}
