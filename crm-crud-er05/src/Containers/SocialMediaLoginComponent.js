/** Created by er05 */
//for google
import React from 'react'
import '../styles/bootstrap-social.css'

const SocialMediaLogin = (props) => {
  return (
    <div className="d-flex justify-content-between mt-1">
      <button className="btn-google" onClick={props.googleLogin}>
        <span className="fa fa-google"> Sign in with Google</span>
      </button>
    </div>
  )
}

export default SocialMediaLogin
