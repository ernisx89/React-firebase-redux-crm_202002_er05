import React from 'react'
//for login inside of a form
const footerButton = (props) => {
  const { submitLabel } = props //other way for props
  return (
    <div className="d-flex justify-content-between">
      <button type="submit" className="btn btn-primary">{submitLabel}</button>
    </div>
  )
}
export default footerButton
//justify is just like 1       1        1       1        1