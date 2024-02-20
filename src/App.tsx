import React, { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import viteLogo from '/vite.svg'

type ClickPosition = {
  id: number
  x: number
  y: number
  comments?: Comment[]
}

type Comment = {
  id: number
  text: string
}

function App() {
  const [id, setId] = useState(0)
  const [clicks, setClicks] = useState<ClickPosition[]>([])
  /*
  const [chosenEmoji, setChosenEmoji] = useState<string | null>(null)

  const onEmojiClick = (_event: any, emojiObject: EmojiClickData) => {
    setChosenEmoji(emojiObject.emoji)
  }

*/
  const handleSave = (
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>,
    clickId: number,
  ) => {
    if ('key' in event && event.key !== 'Enter') return

    const inputElement = document.querySelector(`.box-${clickId} input`)
    console.log(clicks.map((click) => click.id))
    console.log('input element', inputElement, clickId)

    if (inputElement) {
      const inputValue = (inputElement as HTMLInputElement).value
      console.log('inputValue:', inputValue)

      if (inputValue.trim() === '') return

      const newComment: Comment = {
        id: Date.now(),
        text: inputValue,
      }
      setClicks(
        clicks.map((click) =>
          click.id === clickId
            ? { ...click, comments: [...(click.comments || []), newComment] }
            : click,
        ),
      )
      ;(inputElement as HTMLInputElement).value = ''
    }
  }

  const handleDivClick = (event: React.MouseEvent) => {
    event.stopPropagation()
  }
  const handleClick = (event: MouseEvent) => {
    const targetElement = event.target as Element

    console.log(targetElement.classList)

    if (
      targetElement.classList.contains('click') ||
      targetElement.classList.contains('close-button')
    ) {
      event.stopPropagation()
      return
    }

    setClicks([...clicks, { id: id, x: event.clientX, y: event.clientY }])
    setId(id + 1)
  }

  const handleClose = (id: number) => {
    setClicks(clicks.filter((click) => click.id !== id))
  }

  useEffect(() => {
    window.addEventListener('click', handleClick)
    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [clicks, handleClick, id])

  return (
    <>
      <div>
        <img src={viteLogo} className="logo" alt="Vite logo" />
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setId((count) => count + 1)}>
          count is {id}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      {clicks.map((click) => (
        <div
          key={click.id}
          className={`click box-${click.id}`}
          style={{ top: click.y, left: click.x }}
          onClick={handleDivClick}
        >
          <div className="chat-input">
            <input
              type="text"
              placeholder="Add a comment"
              onKeyDown={(event) => handleSave(event, click.id)}
            />
            {/*

            <button
              className="emoji-button"
              onClick={() => setChosenEmoji(null)}
            >
              😄
            </button>
            <Picker onEmojiClick={onEmojiClick} className="picker-top" />
            <button onClick={(event) => handleSave(event, click.id)}>
              Save
           </button>
*/}
            <button
              className="close-button"
              onClick={() => handleClose(click.id)}
            >
              X
            </button>
          </div>
          {click?.comments?.map((comment) => (
            <div key={comment.id}>{comment.text}</div>
          ))}
        </div>
      ))}
    </>
  )
}

export default App
