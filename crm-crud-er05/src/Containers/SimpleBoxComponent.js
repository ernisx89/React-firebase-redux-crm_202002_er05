import React, { Component } from 'react'
//for login
export default class SimpleBox extends Component {
  render() {
    return (
      <div className="container">
        <div className="d-flex justify-content-center align-self-center">
          <div className="card col-sm-6">
            <div className="card-block">
              <div className="card-title text-center">
                {this.props.title /**output title, gonna send in from its parent 
                * in props the title*/} 
              </div>
              <div className="card-body">
                {this.props.body}
              </div>
              {/*conditional rendering if footer exists*/this.props.footer && <div className="card-footer">
                {this.props.footer}
              </div>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

//when we call a component <SimpleBox title="Title" body={this.renderBody()} />