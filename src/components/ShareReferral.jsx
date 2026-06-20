import '../styles/ShareReferral.css'

const ShareReferral = ({referral}) => {
  const copyText = text => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="share-referral-container">
      <h2 className="share-heading">
        Refer Friends and Earn More
      </h2>

      <div className="referral-grid">
        <div className="referral-box">
          <p className="referral-label">YOUR REFERRAL LINK</p>

          <div className="copy-container">
            <input
              type="text"
              value={referral.link}
              readOnly
              className="referral-input"
            />

            <button
              type="button"
              className="copy-btn"
              onClick={() => copyText(referral.link)}
            >
              Copy
            </button>
          </div>
        </div>

        <div className="referral-box">
          <p className="referral-label">YOUR REFERRAL CODE</p>

          <div className="copy-container">
            <input
              type="text"
              value={referral.code}
              readOnly
              className="referral-input"
            />

            <button
              type="button"
              className="copy-btn"
              onClick={() => copyText(referral.code)}
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShareReferral