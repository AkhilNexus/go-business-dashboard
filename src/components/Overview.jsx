import '../styles/Overview.css'

import {
  FaDollarSign,
  FaPercentage,
  FaLink,
  FaHourglassHalf,
  FaLock,
  FaUsers,
  FaExchangeAlt,
} from 'react-icons/fa'

const iconList = [
  <FaDollarSign />,
  <FaPercentage />,
  <FaLink />,
  <FaHourglassHalf />,
  <FaPercentage />,
  <FaLock />,
  <FaUsers />,
  <FaExchangeAlt />,
]

const Overview = props => {
  const {metrics} = props

  return (
    <div className="overview-container">
      <h3 className="section-heading">
        Overview
      </h3>

      <ul className="metrics-list">
        {metrics.map((each, index) => (
          <li
            key={each.id}
            className="metric-card"
          >
            <div className="metric-icon">
              {iconList[index]}
            </div>

            <h2>{each.value}</h2>

            <p>{each.label}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Overview