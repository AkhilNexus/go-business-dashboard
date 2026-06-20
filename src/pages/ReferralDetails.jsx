import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

import {REFERRALS_API} from '../services/api'
import NotFound from './NotFound'

const ReferralDetails = () => {
  const {id} = useParams()

  const [referral, setReferral] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getReferral()
  }, [])

  const getReferral = async () => {
    try {
      const token = Cookies.get('jwt_token')

      const response = await axios.get(REFERRALS_API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const referrals = response.data.data.referrals

      const selectedReferral = referrals.find(
        item => item.id === parseInt(id),
      )

      setReferral(selectedReferral || null)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (!referral) {
    return <NotFound />
  }

  return (
    <div>
      <h1>Referral Details</h1>

      <p>ID: {referral.id}</p>

      <p>Name: {referral.name}</p>

      <p>Service: {referral.serviceName}</p>

      <p>Date: {referral.date}</p>

      <p>
        Profit: $
        {referral.profit.toLocaleString()}
      </p>
    </div>
  )
}

export default ReferralDetails