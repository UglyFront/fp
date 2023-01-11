import './App.css';
import {useState, useEffect, useRef} from 'react'

function App() {
  const [name, setName] = useState('')
  const [messages, setMessages] = useState([{}, {}])

  useEffect(() => {
    let userName = prompt("Привет! Как тебя зовут?")
    setName(userName)

    setInterval(() => {
      fetch('http://localhost:5000/allmsg')
      .then(res => res.json())
      .then(data => {
        if (data.length != messages.length) {
          bottom.current.scrollIntoView({ behavior: 'smooth' })
        }
        setMessages(data)  
      })
     
    }, 500)
  }, [])


  const [input, setInput] = useState("")
  const bottom = useRef()

  function sendMsg(e) {
    e.preventDefault()
    const msg = {
      text: input,
      name: name
    }
    fetch('http://localhost:5000/send_msg', {
      method: 'POST',
      headers: {
        'Content-type': "application/json"
      },
      body: JSON.stringify(msg)
    })
      .then(res => {
        console.log(res)
        bottom.current.scrollIntoView({ behavior: 'smooth' })
        setInput("")
      })

  }

  return (
    <div className="App">
      <header>
        <h1>Привет, {name}!</h1>
      </header>

      <section>
        <ul>
          {messages.map((el) => {return  <li>
            <span>{el.name}: </span>
            <div className="msg">
            {el.text}
            </div>
          </li>})}
          <div className="bottom" ref={bottom}></div>
        </ul>

        <form onSubmit={sendMsg}>
          <input type="text" placeholder='Ввод...' value={input} onChange={(e) => setInput(e.target.value)}/>
          <button type="submit">Отправить</button>
        </form>
      </section>
    </div>
  );
}

export default App;
