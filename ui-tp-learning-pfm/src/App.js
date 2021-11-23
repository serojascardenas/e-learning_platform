import React from 'react'
import { root } from './api/APIService'

export default class App extends React.Component {
  state = {
    wellcome: ''
  }

  componentDidMount() {
    root().then(res => {
      const wellcome = JSON.stringify(res.data);
      this.setState({ wellcome });
    }).catch((error) => {
      console.log(error.response.data.message)
    })
  }

  render() {
    return (
      <div className="App">
        <main className="container pt-5">
          {this.state.wellcome}
        </main>
      </div>
    );
  }
}
