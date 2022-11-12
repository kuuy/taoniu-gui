import React, { useState, useEffect } from 'react'

let flushed = false

export function DiceHunts ({ queryString }) {
  const [hunts, setHunts] = useState([])
  const labelStyle = { backgroundColor: 'rgba(255,255,255,0.1)' }

  const flush = () => {
    const url = 'https://taoniu.kuuy.com/api/gamblings/v1/wolf/dice/hunt?'.concat(queryString())
    console.log('url', url)
    flushed = true
    setTimeout(() => {
      flushed = false
    }, 3000)
    // eslint-disable-next-line no-undef
    fetch(url)
      .then(async response => {
        const data = await response.json()
        if (!response.ok) {
          const error = (data && data.message) || response.statusText
          return Promise.reject(error)
        }
        flushed = !flushed
        setHunts(data.data)
      })
      .catch(error => {
        console.error('There was an error!', error)
      })
  }

  const handleCopy = (e, hash) => {
    e.preventDefault()
    navigator.clipboard.writeText('bet_dice:#'.concat(hash))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!flushed) {
        flush()
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <label htmlFor='hunts' className='relative ba bw4 b--light-red b--dashed br4 ma4 flex-auto' style={labelStyle}>
      <div className='flex items-center h-100'>
        {hunts.length === 0
          ? (
            <div className='tc w-100 f3'>
              暂无结果
            </div>
            )
          : (
            <ul className='hunts-list h-100' onMouseOver={() => { flushed = true }} onMouseLeave={() => { flushed = false }}>
              {hunts.map(function (d, idx) {
                return (
                  <li key={idx}>
                    <span className='number'>{d.number}</span>
                    <span>{d.hash}</span>
                    <span className='copy iconfont' onClick={e => handleCopy(e, d.hash)}>&#xec7a;</span>
                  </li>
                )
              })}
            </ul>
            )}
      </div>
    </label>
  )
}
