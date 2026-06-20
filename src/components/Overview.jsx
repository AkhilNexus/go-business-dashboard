import '../styles/Overview.css'

const Overview = props => {
  const {metrics} = props

  return (
    <div className="overview-container">
      <h3 className="section-heading">Overview</h3>

      <ul className="metrics-list">
        {metrics.map(each => (
          <li key={each.id} className="metric-card">
            <h2>{each.value}</h2>
            <p>{each.label}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Overview