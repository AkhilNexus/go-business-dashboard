import '../styles/ServiceSummary.css'

const ServiceSummary = ({serviceSummary}) => (
  <div className="service-summary-container">
    <h2 className="service-summary-heading">Service Summary</h2>

    <div className="summary-list">
      <div className="summary-card">
        <p className="summary-label">SERVICE</p>
        <h3>{serviceSummary.service}</h3>
      </div>

      <div className="summary-card">
        <p className="summary-label">YOUR REFERRALS</p>
        <h3>{serviceSummary.yourReferrals}</h3>
      </div>

      <div className="summary-card">
        <p className="summary-label">ACTIVE REFERRALS</p>
        <h3>{serviceSummary.activeReferrals}</h3>
      </div>

      <div className="summary-card">
        <p className="summary-label">TOTAL REF EARNINGS</p>
        <h3>{serviceSummary.totalRefEarnings}</h3>
      </div>
    </div>
  </div>
)

export default ServiceSummary