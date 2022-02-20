import React from 'react'

export default function History({searchHistory, deleteHistory, showHistory}) {
  
  return (
    <>
      <div>History: </div>
      <ul>{searchHistory.map(history => {
        return <li key={history.id} onClick={() => showHistory(history.id)}>{history.request.method.toUpperCase()} {history.request.url} Time: {history.date.getHours()}:{history.date.getMinutes()}:{history.date.getSeconds()} Date: {history.date.getMonth()} / {history.date.getDate()} / {history.date.getFullYear()}  <button onClick={() => deleteHistory(history.id)}>Delete</button></li>
      })}</ul>
    </>
  )
}

