import logo from './logo.svg';
import './App.css';
import React, { useState , useRef, useEffect} from 'react';

function App() {
  const [option,setOption] = useState(0);

  return (
    <div className="App">
     App
    <ComponentWithClass></ComponentWithClass>
    <ComponentWithHooks></ComponentWithHooks>
     
    </div>
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
      <div className="App">
         <h1>Class Based Component : {this.state.name}</h1>
         <img src="logo192.png" onClick={this.changeImage} ref={this.logo}></img>         <br></br>
         <input type="text" onChange={(e)=>this.setName(e)}></input>
      </div>
    )
  }
}

function ComponentWithHooks(){

 const [name, setName] = useState("demo");
 const logo = useRef(null);

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
    <div className="App">
    <h1>Hook Based Component : {name}</h1>
    <img src="logo192.png" onClick={changeImage} ref={logo}></img>
         <br></br>
    <input type="text" onChange={(e)=>setName(e.target.value)}></input>
    
 </div>
  )
}
export default App;
