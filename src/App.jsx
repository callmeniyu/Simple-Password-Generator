import { useEffect, useRef, useState } from "react"
import "./App.css"

function App() {
    const [password, setPassword] = useState("")
    const [length, setLength] = useState("8")
    const [numberAllowed, setNubmerAllowed] = useState(false)
    const [charAllowed, setCharAllowed] = useState(false)

    const passwordRef = useRef(null)

    const generator = () => {
        let pass = ""
        let str = "ABCDEFGHIJKLMNOPQRSTabcdefghijklmnopqrstuvwxyz"
        const char = "!@#$%^&*()_+}{|:><~`;?"
        const num = "1234567890"

        if (numberAllowed) str += num
        if (charAllowed) str += char

        for (let i = 0; i < length; i++) {
            const character = Math.floor(Math.random() * str.length + 1)
            pass += str.charAt(character)
        }

        setPassword(pass)
    }

    useEffect(() => {
        generator()
    }, [length, numberAllowed, charAllowed])

    const copyPassword = () => {
        window.navigator.clipboard.writeText(password)
        passwordRef.current.select()
    }

    return (
        <>
            <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
                <h1 className="text-white text-center my-3">Password Generator</h1>
                <div className="flex shadow rounded-lg overflow-hidden mb-4">
                    <input
                        type="text"
                        value={password}
                        className="outline-none w-full py-1 px-3"
                        placeholder="Password"
                        readOnly
                        ref={passwordRef}
                    />
                    <button onClick={copyPassword} className="outline-none bg-blue-700 text-white px-3 py-0.5 ">
                        Copy
                    </button>
                </div>
                <div className="flex text-sm gap-x-2">
                    <div className="flex items-center gap-x-1">
                        <input
                            type="range"
                            min={4}
                            max={100}
                            value={length}
                            className="cursor-pointer"
                            onChange={(e) => setLength(e.target.value)}
                            name="text"
                        />
                        <label htmlFor="text">Length:{length}</label>
                    </div>
                    <div className="flex items-center gap-x-1">
                        <input
                            type="checkbox"
                            defaultChecked={numberAllowed}
                            onChange={() => {
                                setNubmerAllowed((prev) => !prev)
                            }}
                            name="numbers"
                        />
                        <label htmlFor="numbers">Numbers</label>
                    </div>
                    <div className="flex items-center gap-x-1">
                        <input
                            type="checkbox"
                            defaultChecked={charAllowed}
                            onChange={() => {
                                setCharAllowed((prev) => !prev)
                            }}
                            name="characters"
                        />
                        <label htmlFor="Character">Character</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
