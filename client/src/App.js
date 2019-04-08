import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';

class LevelForm extends Component {
  constructor(props){
    super(props);
    this.state = {
    star: '',
    table: '',
    itemLevel: '',
    baseStatPrimary: '',
    baseStatSecondary: '',
    baseAtk: '',
    output: [],
    primaryOut:'',
    secondaryOut:'',
    attOut:'',
    select:'Armor',
    isSup: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.mathStuff = this.mathStuff.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: parseInt(event.target.value,10)});
  }

  getCheckboxValue(event) {
    var val = this.state.isSup;
    if(val === false){
      this.setState({[event.target.name]: true});
    } else if(val === true){
      this.setState({[event.target.name]: false});    }
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  mathStuff() {
    var star = this.state.star;
    var itemLevel = this.state.itemLevel;
    var isSup = this.state.isSup;
    var baseStatPrimary = this.state.baseStatPrimary;
    var baseStatSecondary = this.state.baseStatSecondary;
    var baseAtk = this.state.baseAtk;
    var select = this.state.select;
    console.log(typeof itemLevel);
    console.log(typeof star);
    console.log(typeof isSup);
    console.log(baseStatPrimary);
    console.log(baseStatSecondary);
    console.log(this.state.select);
    console.log(this.state.isSup);
    if(select === 'Armor') {
      console.log('poop');
      fetch('/api/armor?itemLevels=' + itemLevel + '&stars=' + star + '&isSup=' + isSup 
      + '&basePrimary=' + baseStatPrimary + '&baseSecondary=' + baseStatSecondary + '&baseAtk=' + baseAtk)
      .then(res => res.json())
      .then((res) =>{
        console.log(JSON.stringify(res));
        this.setState({output: res});
      }); 
    }else if( select === 'Gloves') {
      console.log('poop2');
      fetch('/api/gloves?itemLevels=' + itemLevel + '&stars=' + star  
      + '&basePrimary=' + baseStatPrimary + '&baseSecondary=' + baseStatSecondary + '&baseAtk=' + baseAtk)
      .then(res => res.json())
      .then((res) =>{
        console.log(JSON.stringify(res));
        this.setState({output: res});
      }); 
    }else if( select === 'Shoes') {
      console.log('poop3')
      fetch('/api/shoes?itemLevels=' + itemLevel + '&stars=' + star  
      + '&basePrimary=' + baseStatPrimary + '&baseSecondary=' + baseStatSecondary + '&baseAtk=' + baseAtk)
      .then(res => res.json())
      .then((res) =>{
        console.log(JSON.stringify(res));
        this.setState({output: res});
      }); 
    }
      
  }


  render(){
    return(
      <div className="master">
        <div className="parentForm">
          <form onSubmit={this.handleSubmit}>

            <div className="select">
              <select id='a' onChange={(e) => this.setState({select: e.target.value})}>         
                <option name="select" value="Armor">Armor/Accessory</option>
                <option name="select" value="Gloves">Gloves</option>
                <option name="select" value="Shoes">Shoes</option>
              </select>
            </div>
            <br />
            <div className="formGroup">
              <input name='star' type="number" placeholder="Star" onChange={this.handleChange}/>              
                <br/>
              <input name='itemLevel' type="number" placeholder="Item Level" onChange={this.handleChange}/>             
                <br/>
              <input name='baseStatPrimary' type="number" placeholder="Base Primary Stat" onChange={this.handleChange}/>              
                <br/>
              <input name='baseStatSecondary' type="number" placeholder="Base Secondary Stat" onChange={this.handleChange}/>              
                <br/>
              <input name='baseAtk' type="number" placeholder="Base (M)Atk" onChange={this.handleChange}/>
                <br/>
            </div>  
            <div className="supBox">
              <input name='isSup' onClick={event => this.getCheckboxValue(event)} type="checkbox"/>
              <label className='checkbox-label'>
                Superior Item
              </label>  
            </div>
            <br />
            <input onClick={this.mathStuff} type="submit" value="Submit"/>
          </form>
        <p>itemLevel: {this.state.itemLevel}</p>
        <p>isSup?: {this.state.isSup}</p>
        </div>
        

        <div className="output">
          <table>
            
              {this.state.output.map(function(item,key) {
                return (
                  <tbody key = {key}>                   
                    <tr>
                      <td>Primary Stat</td>
                      <td>{item.primary}</td>
                    </tr>
                    <tr>  
                      <td>Secondary Stat</td>
                      <td>{item.secondary}</td>
                    </tr>
                    <tr>
                      <td>M(ATT)</td> 
                      <td>{item.att}</td>
                    </tr>
                    <tr>
                      <td>Jump</td>
                      <td>{item.jump}</td>
                    </tr>
                    <tr>
                      <td>Speed</td>
                      <td>{item.speed}</td>
                    </tr>
                  </tbody>
                )
              })}
      
            </table>
        </div>

        <script src="https://unpkg.com/react/umd/react.production.js" crossorigin />

        <script
          src="https://unpkg.com/react-dom/umd/react-dom.production.js"
          crossorigin
        />

        <script
          src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
          crossorigin
        />

        <script>var Alert = ReactBootstrap.Alert;</script>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
          integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
          crossorigin="anonymous"
        />
      

      </div>

    );
  }
}


export default LevelForm;