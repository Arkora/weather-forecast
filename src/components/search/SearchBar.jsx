import React,{useState} from 'react'
import { Container, Input } from './styles'



const SearchBar = ({setTerm}) => {

  

  const handleSearch = (e) =>{
    if(e.key === 'Enter'){
      setTerm(e.target.value)     
    }
  }

  

  return (
   <Container>
     <div>
       <Input placeholder='Search City' onKeyPress={handleSearch} />
     </div>
     
   </Container>
  )
}

export default SearchBar