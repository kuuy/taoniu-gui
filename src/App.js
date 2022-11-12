import React, { useState } from 'react'
import { DiceHunts } from './components/DiceHunts.js'
import qs from 'qs'

let started = false
const queryParams = {
  side: '',
  numbers: '',
  dpart: '',
  ipart: '',
  is_mirror: 0,
  is_repeate: 0,
  is_neighbor: 0
}

export function App () {
  const queryString = () => {
    console.log('params', queryParams)
    return qs.stringify(
      queryParams,
      { skipNulls: true }
    )
  }

  return (
    <Layout>
      <DiceHunts queryString={queryString} />
    </Layout>
  )
}

function Layout ({ children }) {
  const [buttonIcon, setButtonIcon] = useState('&#xe626;')
  const [buttonText, setButtonText] = useState('开始')
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [side, setSide] = useState('')
  const [numbers, setNumbers] = useState('')
  const [ipart, setIpart] = useState('')
  const [dpart, setDpart] = useState('')
  const [isMirror, setIsMirror] = useState(false)
  const [isRepeate, setIsRepeate] = useState(false)
  const [isNeighbor, setIsNeighbor] = useState(false)

  const url = () => {
    return 'https://taoniu.kuuy.com/api/gamblings/v1/wolf/dice/hunt/'.concat(started ? 'stop' : 'start')
  }

  const handleClick = e => {
    e.preventDefault()
    setButtonDisabled(true)
    setTimeout(() => {
      setButtonDisabled(false)
    }, 3000)
    // eslint-disable-next-line no-undef
    fetch(url())
      .then(async response => {
        const data = await response.json()
        if (!response.ok) {
          const error = (data && data.message) || response.statusText
          return Promise.reject(error)
        }
        setButtonIcon(started ? '&#xe626;' : '&#xe631;')
        setButtonText(started ? '开始' : '停止')
        started = !started
        console.log('started', started)
      })
      .catch(error => {
        console.error('There was an error!', error)
      })
  }

  const ChangeSide = (e) => {
    queryParams.side = e.target.value
    setSide(e.target.value)
  }

  const ChangeNumbers = (e) => {
    queryParams.numbers = e.target.value
    setNumbers(e.target.value)
  }

  const ChangeIpart = (e) => {
    queryParams.ipart = e.target.value
    setIpart(e.target.value)
  }

  const ChangeDpart = (e) => {
    queryParams.dpart = e.target.value
    setDpart(e.target.value)
  }

  const ChangeIsMirror = (e) => {
    queryParams.is_mirror = e.target.checked ? 1 : 0
    setIsMirror(e.target.checked)
  }

  const ChangeIsRepeate = (e) => {
    queryParams.is_repeate = e.target.checked ? 1 : 0
    setIsRepeate(e.target.checked)
  }

  const ChangeIsNeightbor = (e) => {
    queryParams.is_neighbor = e.target.checked ? 1 : 0
    setIsNeighbor(e.target.checked)
  }

  return (
    <div className='flex vh-100'>
      <div className='flex-none'>
        <div className='ma4 mr0'>
          <button disabled={buttonDisabled} onClick={handleClick}>
            <i className='iconfont' dangerouslySetInnerHTML={{ __html: buttonIcon }} />
            <span>{buttonText}</span>
          </button>
          <div className='split' />
          <label>镜像：</label>
          <label className='checkbox'>
            <input type='checkbox' checked={isMirror} onChange={ChangeIsMirror} />
            <i className='iconfont' />
          </label>
          <label>重复：</label>
          <label className='checkbox'>
            <input type='checkbox' checked={isRepeate} onChange={ChangeIsRepeate} />
            <i className='iconfont' />
          </label>
          <label>相邻：</label>
          <label className='checkbox'>
            <input type='checkbox' checked={isNeighbor} onChange={ChangeIsNeightbor} />
            <i className='iconfont' />
          </label>
          <div className='split' />
          <span>趋势：</span>
          <input type='text' value={side} onChange={ChangeSide} />
          <div className='split' />
          <span>数字：</span>
          <input type='text' value={numbers} onChange={ChangeNumbers} />
          <div className='split' />
          <span>实部：</span>
          <input type='text' value={ipart} onChange={ChangeIpart} />
          <div className='split' />
          <span>虚部：</span>
          <input type='text' value={dpart} onChange={ChangeDpart} />
        </div>
      </div>
      <div className='flex-auto h-100 flex'>
        {children}
      </div>
    </div>
  )
}
