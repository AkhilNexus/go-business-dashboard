import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import '../styles/ReferralsTable.css'

const ReferralsTable = ({referrals}) => {
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 10

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const currentRows = referrals.slice(startIndex, endIndex)

  const totalPages = Math.ceil(referrals.length / itemsPerPage)

  return (
    <div className="table-container">
      <h2>All Referrals</h2>

      <div className="table-controls">
        <input
          type="search"
          placeholder="Name or service..."
          className="search-input"
        />

        <select className="sort-select">
          <option>Newest First</option>
          <option>Oldest First</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Service</th>
            <th>Date</th>
            <th>Profit</th>
          </tr>
        </thead>

        <tbody>
          {currentRows.map(item => (
            <tr
              key={item.id}
              onClick={() => navigate(`/referral/${item.id}`)}
              className="table-row"
            >
              <td>{item.name}</td>

              <td>{item.serviceName}</td>

              <td>{item.date.replaceAll('-', '/')}</td>

              <td>
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0,
                }).format(item.profit)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-container">
        {Array.from({length: totalPages}, (_, index) => (
          <button
            key={index}
            type="button"
            className="page-btn"
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ReferralsTable