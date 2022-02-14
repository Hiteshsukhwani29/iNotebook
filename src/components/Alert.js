import React from 'react'

function Alert({alert_title,alert_desc,type}) {
    return (
        <div className={`alert alert-${type}`} role="alert">
            <strong>{alert_title}</strong> {alert_desc}
        </div>
    )
}

export default Alert