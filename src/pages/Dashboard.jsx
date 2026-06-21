import '../styles/Dashboard.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ReferralsTable from '../components/ReferralsTable'
import ShareReferral from '../components/ShareReferral'
import ServiceSummary from '../components/ServiceSummary'
import Overview from '../components/Overview'
import {useEffect, useState} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

import {REFERRALS_API} from '../services/api'

const Dashboard = () => {
  const [metrics, setMetrics] = useState([])
  const [serviceSummary, setServiceSummary] = useState({})
  const [referral, setReferral] = useState({})
  const [referrals, setReferrals] = useState([])

  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    getDashboardData()
  }, [])

  const getDashboardData = async () => {
    try {
      const token = Cookies.get('jwt_token')

      const response = await axios.get(REFERRALS_API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = response.data.data

      setMetrics(data.metrics || [])
      setServiceSummary(data.serviceSummary || {})
      setReferral(data.referral || {})
      setReferrals(data.referrals || [])

      setLoading(false)
    } catch (error) {
      setErrorMsg(
        error?.response?.data?.message || 'Something went wrong',
      )
      setLoading(false)
    }
  }

  if (loading) {
    return <h2>Loading...</h2>
  }

  if (errorMsg) {
    return (
      <div role="alert">
        <h2>{errorMsg}</h2>
      </div>
    )
  }

  return (
  <>
    <Navbar />

    <div className="dashboard-container">
      <h1>Referral Dashboard</h1>
      <p className="dashboard-subtitle">
        Track your referrals, earnings, and partner activity in one place.
      </p>

      <Overview metrics={metrics} />

      <ServiceSummary serviceSummary={serviceSummary} />

      <ShareReferral referral={referral} />

      <ReferralsTable referrals={referrals} />
    </div>

    <Footer />
  </>
)
}

export default Dashboard