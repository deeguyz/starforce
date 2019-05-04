import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';

class LevelForm extends Component {
  constructor(props){
    super(props);
    this.state = {
    star: '0',
    table: '',
    itemLevel: '0',
    baseStatPrimary: '0',
    baseStatSecondary: '0',
    baseAtk: '0',
    output: [],
    primaryOut:'',
    secondaryOut:'',
    attOut:'',
    select:'Armor'};

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

  weaponMultiplier() {
    
  }

  mathStuff() {
    var star = this.state.star;
    var itemLevel = this.state.itemLevel;
    var baseStatPrimary = this.state.baseStatPrimary;
    var baseStatSecondary = this.state.baseStatSecondary;
    var baseAtk = this.state.baseAtk;
    var select = this.state.select;
    console.log(typeof itemLevel);
    console.log(typeof star);
    console.log(baseStatPrimary);
    console.log(baseStatSecondary);
    console.log(this.state.select);
    if(select === 'Armor') {
      console.log('Armor');
      fetch('/api/armor?itemLevels=' + itemLevel + '&stars=' + star  
      + '&basePrimary=' + baseStatPrimary + '&baseSecondary=' + baseStatSecondary + '&baseAtk=' + baseAtk)
      .then(res => res.json())
      .then((res) =>{
        console.log(JSON.stringify(res));
        this.setState({output: res});
      }); 
    }else if( select === 'Gloves') {
      console.log('Gloves');
      fetch('/api/gloves?itemLevels=' + itemLevel + '&stars=' + star  
      + '&basePrimary=' + baseStatPrimary + '&baseSecondary=' + baseStatSecondary + '&baseAtk=' + baseAtk)
      .then(res => res.json())
      .then((res) =>{
        console.log(JSON.stringify(res));
        this.setState({output: res});
      }); 
    }else if( select === 'Shoes') {
      console.log('Shoes')
      fetch('/api/shoes?itemLevels=' + itemLevel + '&stars=' + star  
      + '&basePrimary=' + baseStatPrimary + '&baseSecondary=' + baseStatSecondary + '&baseAtk=' + baseAtk)
      .then(res => res.json())
      .then((res) =>{
        console.log(JSON.stringify(res));
        this.setState({output: res});
      }); 
    }else if( select === 'Superior') {
      console.log('Superior')
      fetch('/api/superior?itemLevels=' + itemLevel + '&stars=' + star  
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
                <option name="select" value="Superior">Superior</option>
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
            <input onClick={this.mathStuff} type="submit" value="Submit"/>
          </form>
        <p>itemLevel: {this.state.itemLevel}</p>
        </div>
        

        <div className="output">
          <table>
              {
                this.state.output.map(stat => {
                  return (
                    <tbody>
                    {
                      Object.entries(stat).map(([key,value]) => {
                        return (
                          <React.Fragment>
                            <tr>
                              <td>{key}</td>
                              <td>{value}</td>
                            </tr>
                          </React.Fragment>
                        );
                      })
                    }
                    </tbody>
                  );
                })
              } 
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