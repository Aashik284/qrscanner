
import './Qrscanner.css'
import {useState} from 'react'
export const Qrscanner =()=>{

const [img,setImg]=useState('')
const [loading,setLoading]=useState(false)
var [qrdata,setQrdata]=useState("")
var [size,setSize]=useState()
function handler(e){
    try {
        setLoading(true)
        var url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(qrdata)}`
        setImg(url)
    } catch (error) {
        console.error("error is occuered" ,error)
    }
    finally{
        setLoading(false)
    }
}
const download=()=>{
    fetch(img)
    .then((response)=>response.blob())
    .then((blob)=>{
        var link = document.createElement("a")
        link.href=URL.createObjectURL(blob)
        link.download="qrcode.png"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    })
} 
return(
        <>
        <div className="container">
            <h2 style={{color:"blue",alignSelf:"center"}}>Qrcode Generator</h2>
          {img && <img src={img} alt="Qrcode" />}
            {loading && <p>please wait...</p>}
            <label htmlFor="url">Enter the url: </label>
            <input type="text" id="url" placeholder="Enter the data" onChange={(e)=>setQrdata(e.target.value)} value={qrdata}/>

            <label htmlFor="size">eg.size : 150</label>
            <input type="text " id="size" placeholder="Enter the size" onChange={(e)=>setSize(e.target.value)} value={size} />

            <div className="btn">
                <button className="gbtn" onClick={handler} disabled={loading} >Generate Qrcode</button>
                <button className="dbtn" onClick={download}>Download Qrcode</button>
            </div>

        <p> Designed by <span style={{color:"blue"}}> Aashik</span></p>
        </div>
        </>
    )
}