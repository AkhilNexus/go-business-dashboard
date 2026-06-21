import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import '../styles/ReferralsTable.css'

const ReferralsTable = ({referrals}) => {
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(1)
  const [searchText, setSearchText] = useState('')
  const [sortOrder, setSortOrder] = useState('desc')

  const itemsPerPage = 10

  const filteredReferrals = referrals
    .filter(item => {
      const search = searchText.toLowerCase()

      return (
        item.name.toLowerCase().includes(search) ||
        item.serviceName.toLowerCase().includes(search)
      )
    })
    .sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)

      return sortOrder === 'asc'
        ? dateA - dateB
        : dateB - dateA
    })

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const currentRows = filteredReferrals.slice(
    startIndex,
    endIndex,
  )

  const totalPages = Math.ceil(
    filteredReferrals.length / itemsPerPage,
  )

  return (
    <div className="table-container">
      <h2>All Referrals</h2>

      <div className="table-controls">
        <input
          type="search"
          placeholder="Name or service..."
          className="search-input"
          value={searchText}
          onChange={e => {
            setSearchText(e.target.value)
            setCurrentPage(1)
          }}
        />

        <select
          className="sort-select"
          value={sortOrder}
          onChange={e => {
            setSortOrder(e.target.value)
            setCurrentPage(1)
          }}
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
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
              onClick={() =>
                navigate(`/referral/${item.id}`)
              }
              className="table-row"
            >
              <td>{item.name}</td>

              <td>{item.serviceName}</td>

              <td>
                {item.date.replaceAll('-', '/')}
              </td>

              <td className="profit-value">
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
      <p className="entries-text">
        Showing {startIndex + 1}–
        {Math.min(endIndex, filteredReferrals.length)}
        {' '}of {filteredReferrals.length} entries
      </p>
      <div className="pagination-container">
        <button
          type="button"
          className="page-btn"
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(currentPage - 1)
          }
        >
          Previous
        </button>

        {Array.from(
          {length: totalPages},
          (_, index) => (
            <button
              key={index}
              type="button"
              className={
                currentPage === index + 1
                  ? 'page-btn active'
                  : 'page-btn'
              }
              onClick={() =>
                setCurrentPage(index + 1)
              }
            >
              {index + 1}
            </button>
          ),
        )}

        <button
          type="button"
          className="page-btn"
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage(currentPage + 1)
          }
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default ReferralsTable