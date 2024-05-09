import React from 'react'

function DevisCustomerZone({customer}) {
  return (
    <div>
        <pre><code>{JSON.stringify(customer,null,3)}</code></pre>
    </div>
  )
}

export default DevisCustomerZone