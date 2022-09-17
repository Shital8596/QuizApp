import React,{createContext, useContext, useEffect, useState} from 'react'
import { QuizContext } from './Context'
import bootstrap from '../../node_modules/bootstrap/dist/css/bootstrap.min.css'


function SelectField(props) {

    const {setCategory} = useContext(QuizContext)
    const { label, options } = props
    const [value, setValue] = useState('')
    const [id, setId] = useState(0)

    const handleChange = (e) => {
        console.log("id:"+ e.target.value)
        setValue(e.target.value)
        setCategory(e.target.value)
    }

  return (
        <>
                    <select className="form-select  mb-2 " id={id} value={value} label={label} onChange={handleChange}>
                        {options?.map((item, index) => <option onClick={() => setId(item.id)} value={item.id} key={index}>{item.name}</option>)}
                    </select>        
        </>
  )
}

export default SelectField
