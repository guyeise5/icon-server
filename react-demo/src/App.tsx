import React, { useState } from 'react'
import './App.css'
const App = () => {
    const [iconHost, setIconHost] = useState<string>(`${document.location.origin}/icon`)
    const [url, setUrl] = useState<string>("https://google.com/")
    const [imageUrl, setImageUrl] = useState<string>("")

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value)
    }

    const handleIconHostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIconHost(e.target.value)
    }

    const onButtonClick = () => {
        setImageUrl(`${iconHost}/${url}`);
    }

    return (
        <div style={{ textAlign: "center" }}>
            <form onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label>Icon server: </label>
                    <input type="url" value={iconHost} onChange={handleIconHostChange} />
                </div>
                <div>
                    <label>Server URL: </label>
                    <input type={'url'} value={url} onChange={handleInputChange} />
                </div>
                <button onClick={onButtonClick} type="submit">Apply</button>
            </form>
            <div>
                {imageUrl && <img src={imageUrl} />}
            </div>
        </div>
    )
}

export default App
