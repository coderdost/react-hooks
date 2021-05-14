import logo from './logo.svg';
import './App.css';
import React, { useState , useRef, useEffect, useContext, useReducer} from 'react';
import {ThemeContext, StoreContext} from './context'

const themes = {
  red : {background:'white',color:'red'},
  light : {background:'white',color:'grey'},
  dark :{background:'black',color:'white'}
}
function App() {
const [ theme, setTheme] = useState(themes.light);

const reducer = (state, action)=>{
  switch(action.type){
    case 'ADD':
      return [...state,<ComponentWithHooks></ComponentWithHooks>]
  
    case 'REMOVE':
      return [...state].slice(0,-1)
  }

}

const [state, dispatch] = useReducer(reducer, [<ComponentWithHooks></ComponentWithHooks>])

  return (
    <ThemeContext.Provider value={theme}>
     <StoreContext.Provider value={{state, dispatch}}>

    
    <div className="App">
     App
     <button onClick={()=>setTheme(themes.red)}>Red</button>
     <button onClick={()=>setTheme(themes.dark)}>Dark</button>
     <button onClick={()=>setTheme(themes.light)}>Light</button>

     <br></br>
     <button onClick={()=>dispatch({type:'ADD'})}>Add Component</button>
     <button onClick={()=>dispatch({type:'REMOVE'})}>Remove Component</button>

     {
       state.map(c=>c)
     }

    {/* <ComponentWithClass></ComponentWithClass> */}
    {/* <ComponentWithHooks></ComponentWithHooks> */}
     
    </div>
    </StoreContext.Provider>
    </ThemeContext.Provider>
  );
}

class ComponentWithClass extends React.Component{
  constructor(){
    super();
    this.state = {};
    this.state.name = "demo";
    this.logo = React.createRef(null);
  }

  setName(e){
     this.setState({
       ...this.state, name:e.target.value
     })
  }

  changeImage = ()=>{
    this.logo.current.style.transform = "rotate(25deg)";
 }

 componentDidMount(){
  console.log("component mounted")
}
componentDidUpdate(){
  console.log("component updated");
}
componentWillUnmount(){
  console.log("component unmounted")
}
  render(){
    return (
    <ThemeContext.Consumer>
      {
        (theme)=><div className="App" style={{background:theme.background,color:theme.color}}>
        <h1>Class Based Component : {this.state.name}</h1>
        <img src="logo192.png" onClick={this.changeImage} ref={this.logo}></img>         <br></br>
        <input type="text" onChange={(e)=>this.setName(e)}></input>
        <Btn></Btn>
     </div>
      }
    </ThemeContext.Consumer>

      
    )
  }
}

function ComponentWithHooks(){

 const [name, setName] = useState("demo");
 const logo = useRef(null);

 const theme = useContext(ThemeContext);

 useEffect(()=>{
    console.log("hook component updated");
    return ()=>{
      console.log("hook component unmounted")
    }
 },[name])

 const changeImage = ()=>{
    logo.current.style.transform = "rotate(25deg)";
 }
  return (
    <div className="App" style={{background:theme.background,color:theme.color}}>
    <h1>Hook Based Component : {name}</h1>
    <img src="logo192.png" onClick={changeImage} ref={logo}></img>
         <br></br>
    <input type="text" onChange={(e)=>setName(e.target.value)}></input>
    <Btn></Btn>
 </div>
  )
}

const Btn = ()=>{
  const theme = useContext(ThemeContext);
  const {state, dispatch} = useContext(StoreContext);
  return(
    <div >
      {state.length} Components
          <button style={{background:theme.background,color:theme.color}}>Change</button>
          <button style={{background:theme.background,color:theme.color}} onClick={()=>dispatch({type:'ADD'})}>Add</button>
          <button style={{background:theme.background,color:theme.color}} onClick={()=>dispatch({type:'REMOVE'})}>Remove</button>

    </div>
  )
  
}

export default App;
