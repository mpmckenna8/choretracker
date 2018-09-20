import React, {Component} from 'react';

import { connect } from 'react-redux'

class DoneChores extends Component {

  render() {
    //  console.log(this)
      let choreList = this.props.chores.chorelist
      console.log(choreList);

      return (<div>Done chores to appear here 
        
        <table>
        <tbody>
          <tr> 
          <th>Name</th><th>Chore</th><th>Date</th>
          </tr>
        {
        choreList.map((d, i) => {
          return (
             <tr key={'choretable' + i}>
              <td>{d[0]}</td>
              <td>{d[1]}</td>
              <td>{d[2]}</td>
            </tr>
          )
        })}
        </tbody>
        </table>
        </div>)
  }
  
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(DoneChores)
//export default (DoneChores)