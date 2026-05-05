import { useState } from "react"

export default function Updates(){
    const [entries, setEntries] = useState<{date:string,title:string}[]>([
        {
            date: "04/05/2026",
            title:"Created Updates History"
        }, 
    ])
    return (
        <div style={{
            width: '270px',
            height:'270px',
            padding: '10px', 
            borderRadius: '10px', 
            textAlign:'start',
            backgroundColor: 'rgba(53, 6, 59, 0.3)',
            }}>
            <h4 style={{margin:'0px', textAlign:'center'}}>Updates</h4>

            ----------------------------------------------
            <div>
            {entries.map((entrie)=>
                <div style={{marginBottom:'5px', fontSize:'12px'}}>{entrie.date} - {entrie.title} </div>
            )}
            </div>
        </div>
)}