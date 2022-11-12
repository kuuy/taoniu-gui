import React from 'react'

const { ipcRenderer } = window.require('electron')

function WindowClose () {
  async function closeWindow () {
    await ipcRenderer.invoke('windowClose')
  }

  return (
    <div className='close'>
      <i className='iconfont' onClick={closeWindow}>&#xe640;</i>
    </div>
  )
}

export default WindowClose
