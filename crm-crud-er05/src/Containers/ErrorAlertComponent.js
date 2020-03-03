import React from 'react'

const ErrorAlert = (props) => {
  return (
    <div className="alert alert-danger" role="alert">
      {/* becouse its functional doesnt need this */}
      {props.children}
    </div>
  )
}

export default ErrorAlert