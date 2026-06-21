import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import Navbar from '../components/Navbar'
import '../styles/ReferralDetails.css'

import axios from 'axios'
import Cookies from 'js-cookie'

import {REFERRALS_API} from '../services/api'
const ReferralDetails = () => {
  const {id} = useParams()
  const [referral, setReferral] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getReferral()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  const getReferral = async () => {
    try {
      const token = Cookies.get('jwt_token')

      const response = await axios.get(REFERRALS_API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const referrals =
        response.data.data.referrals || []

      const selectedReferral = referrals.find(
        item => item.id === Number(id),
      )

      setReferral(selectedReferral || null)
    } catch (error) {
      setReferral(null)
    }

    setLoading(false)
  }

  if (loading) {
    return <h2>Loading...</h2>
  }

  if (!referral) {
    return (
      <>
        <Navbar />

        <div className="details-page">
        <div className="referral-not-found">
          <h1>Referral not found</h1>

          <Link to="/">Back to dashboard</Link>
        </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />

      <div className="details-page">
        <Link to="/" className="back-link">
          ← Back to dashboard
        </Link>

        <h1 className="details-heading">
          Referral Details
        </h1>

        <p className="details-subtitle">
          Full information for this referral partner.
        </p>

        <div className="details-card">
          <div className="partner-header">
            <h2 className="partner-name">
              {referral.name}
            </h2>

            <span className="service-badge">
              {referral.serviceName}
            </span>
          </div>

          <hr className="divider" />

          <div className="detail-row">
            <span className="detail-label">
              Referral ID
            </span>

            <span className="detail-value">
              {referral.id}
            </span>
          </div>

          <div className="detail-row">
            <span className="detail-label">
              Name
            </span>

            <span className="detail-value">
              {referral.name}
            </span>
          </div>

          <div className="detail-row">
            <span className="detail-label">
              Service Name
            </span>

            <span className="detail-value">
              {referral.serviceName}
            </span>
          </div>

          <div className="detail-row">
            <span className="detail-label">
              Date
            </span>

            <span className="detail-value">
              {referral.date.replaceAll('-', '/')}
            </span>
          </div>

          <div className="detail-row">
            <span className="detail-label">
              Profit
            </span>

            <span className="detail-value">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
              }).format(referral.profit)}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReferralDetails