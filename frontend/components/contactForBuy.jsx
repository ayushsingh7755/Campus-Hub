import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { userContext } from './context.jsx'

function contactForBuy() {
  const { user } = useContext(userContext)
  const { buyId } = useParams()
  const navigate = useNavigate()

  const [contact, setContact] = useState(null)   // the other person (buyer or seller)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)
  const [imgLoaded, setImgLoaded] = useState(false)

  const currentUserId = user?.data?._id

  useEffect(() => { getOwnerOrBuyer() }, [])

  const getOwnerOrBuyer = async () => {
    try {
      const res  = await axios.get(
        `${import.meta.env.RENDER_BACKEND_URL}/product/getOneBuyData/${buyId}`,
        { withCredentials: true }
      )
      const buyData = res.data
      setProduct(buyData.productId)

      // show the OTHER person — if I'm the seller, show buyer; if I'm the buyer, show seller
      if (buyData.seller._id === currentUserId) {
        setContact(buyData.buyer)
      } else {
        setContact(buyData.seller)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load contact details.')
    } finally {
      setLoading(false)
    }
  }

  /* ─── WhatsApp link ─── */
  const whatsappLink = (number, name, productName) => {
    const cleaned = number?.replace(/\D/g, '')
    const msg = encodeURIComponent(
      `Hi ${name}! I'm reaching out regarding "${productName}" on CampusHub. Is it still available?`
    )
    return `https://wa.me/91${cleaned}?text=${msg}`
  }

  /* ─── Gmail compose link ─── */
  const gmailLink = (email, productName) => {
    const subject = encodeURIComponent(`CampusHub — Regarding: ${productName}`)
    const body = encodeURIComponent(
      `Hi,\n\nI found your listing "${productName}" on CampusHub and would like to connect.\n\nLooking forward to hearing from you!\n\nRegards`
    )
    return `https://mail.google.com/mail/?view=cm&to=${email}&su=${subject}&body=${body}`
  }

  /* ─── Styles ─── */
  const S = {
    page: {
      minHeight: '100vh',
      background: '#0a0a0f',
      backgroundImage:
        'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(52,211,153,0.10) 0%, transparent 65%),' +
        'radial-gradient(ellipse 40% 40% at 85% 80%, rgba(99,102,241,0.10) 0%, transparent 60%)',
      fontFamily: "'Inter','Space Grotesk',sans-serif",
      padding: '48px 24px 80px',
      color: '#e2e8f0',
    },
    dotGrid: {
      position: 'fixed', inset: 0,
      backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.15) 1px, transparent 1px)',
      backgroundSize: '28px 28px',
      pointerEvents: 'none', zIndex: 0,
    },
    wrap: { position: 'relative', zIndex: 1, maxWidth: 580, margin: '0 auto' },

    backBtn: {
      display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 36,
      color: '#a5b4fc', fontSize: 14, fontWeight: 500, cursor: 'pointer',
      background: 'none', border: 'none', padding: 0, transition: 'color 0.2s',
    },

    /* ── Hero ── */
    heroWrap: {
      textAlign: 'center', marginBottom: 32,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
    },
    checkRing: {
      width: 68, height: 68, borderRadius: '50%',
      background: 'rgba(52,211,153,0.10)',
      border: '1px solid rgba(52,211,153,0.30)',
      boxShadow: '0 0 40px rgba(52,211,153,0.18)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    heroTitle: {
      fontFamily: "'Space Grotesk',sans-serif", fontSize: 26, fontWeight: 800,
      color: '#f1f5f9', letterSpacing: '-0.02em', margin: 0,
    },
    heroSub: { fontSize: 14, color: '#64748b', margin: 0 },

    /* ── Product strip ── */
    productStrip: {
      background: 'rgba(13,13,26,0.80)',
      border: '1px solid rgba(99,102,241,0.15)',
      borderRadius: 16, padding: '14px 18px', marginBottom: 18,
      backdropFilter: 'blur(20px)',
      display: 'flex', alignItems: 'center', gap: 14,
    },
    productThumb: {
      width: 52, height: 52, borderRadius: 12, overflow: 'hidden', flexShrink: 0,
      background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.18)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    thumbImg: { width: '100%', height: '100%', objectFit: 'cover' },
    productInfo: { display: 'flex', flexDirection: 'column', gap: 2 },
    productMicroLabel: { fontSize: 10, color: '#475569', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' },
    productName: { fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 700, color: '#f1f5f9' },
    productPrice: {
      fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 700,
      background: 'linear-gradient(135deg,#a5b4fc,#818cf8)',
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
    },

    /* ── Contact card ── */
    contactCard: {
      background: 'rgba(13,13,26,0.82)',
      border: '1px solid rgba(52,211,153,0.20)',
      borderRadius: 22, overflow: 'hidden',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 8px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(52,211,153,0.06)',
      marginBottom: 18,
    },

    /* Card header / avatar section */
    cardHeader: {
      background: 'linear-gradient(135deg,rgba(52,211,153,0.10) 0%,rgba(99,102,241,0.10) 100%)',
      borderBottom: '1px solid rgba(52,211,153,0.12)',
      padding: '28px 26px 24px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
    },
    avatarRing: {
      width: 90, height: 90, borderRadius: '50%',
      background: 'conic-gradient(from 0deg,#34d399,#6366f1,#a78bfa,#34d399)',
      padding: 3,
      boxShadow: '0 0 32px rgba(52,211,153,0.28)',
    },
    avatarInner: {
      width: '100%', height: '100%', borderRadius: '50%',
      background: '#0a0a0f',
      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
    },
    avatarInitial: {
      fontFamily: "'Space Grotesk',sans-serif", fontSize: 30, fontWeight: 800, color: '#34d399',
    },
    nameBlock: { textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 4 },
    contactFullname: {
      fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 800,
      color: '#f1f5f9', letterSpacing: '-0.01em',
    },
    contactUsername: { fontSize: 14, color: '#6366f1', fontWeight: 600 },
    roleBadge: {
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 14px', borderRadius: 999,
      fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
      color: '#34d399', background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.25)',
    },

    /* Info rows */
    infoSection: { padding: '6px 26px 6px' },
    infoRow: {
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '13px 0',
      borderBottom: '1px solid rgba(99,102,241,0.07)',
    },
    infoIconBox: {
      width: 36, height: 36, borderRadius: 10, flexShrink: 0,
      background: 'rgba(99,102,241,0.10)', border: '1px solid rgba(99,102,241,0.18)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    infoLabel: {
      fontSize: 10, color: '#475569', fontWeight: 600,
      letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 2,
    },
    infoValue: {
      fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600, color: '#e2e8f0',
    },

    /* Action buttons */
    actionsSection: { padding: '18px 26px 24px', display: 'flex', flexDirection: 'column', gap: 10 },

    btnWhatsApp: {
      padding: '14px 20px', borderRadius: 13, border: 'none',
      background: 'linear-gradient(135deg,#128C7E,#25D366)',
      color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer',
      fontFamily: "'Space Grotesk',sans-serif",
      boxShadow: '0 4px 20px rgba(37,211,102,0.32)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
      textDecoration: 'none', transition: 'opacity 0.2s, transform 0.15s',
    },
    btnCall: {
      padding: '14px 20px', borderRadius: 13, border: 'none',
      background: 'linear-gradient(135deg,#059669,#34d399)',
      color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer',
      fontFamily: "'Space Grotesk',sans-serif",
      boxShadow: '0 4px 20px rgba(52,211,153,0.28)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
      textDecoration: 'none', transition: 'opacity 0.2s, transform 0.15s',
    },
    btnGmail: {
      padding: '14px 20px', borderRadius: 13,
      border: '1px solid rgba(234,67,53,0.35)',
      background: 'rgba(234,67,53,0.08)',
      color: '#f87171', fontSize: 15, fontWeight: 600, cursor: 'pointer',
      fontFamily: "'Space Grotesk',sans-serif",
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
      textDecoration: 'none', transition: 'background 0.2s',
    },
    btnProfile: {
      padding: '12px 20px', borderRadius: 13,
      border: '1px solid rgba(99,102,241,0.22)',
      background: 'transparent',
      color: '#64748b', fontSize: 14, fontWeight: 500, cursor: 'pointer',
      fontFamily: "'Space Grotesk',sans-serif",
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      transition: 'color 0.2s, border-color 0.2s',
    },

    /* Safety note */
    note: {
      background: 'rgba(245,158,11,0.07)',
      border: '1px solid rgba(245,158,11,0.2)',
      borderRadius: 13, padding: '14px 18px',
      display: 'flex', gap: 12, alignItems: 'flex-start',
    },
    noteText: { fontSize: 13, color: '#94a3b8', lineHeight: 1.65 },

    /* States */
    stateWrap: { minHeight: '65vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 },
    spinnerRing: { width: 44, height: 44, borderRadius: '50%', border: '3px solid rgba(99,102,241,0.2)', borderTopColor: '#6366f1', animation: 'spin 0.8s linear infinite' },
  }

  /* ── Icons ── */
  const icons = {
    email: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" strokeWidth="1.8" strokeLinecap="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    phone: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" strokeWidth="1.8" strokeLinecap="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.16 1.18 2 2 0 012.14.02h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.63 6.63l1.06-1.06a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
    college: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" strokeWidth="1.8" strokeLinecap="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    course: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" strokeWidth="1.8" strokeLinecap="round">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
      </svg>
    ),
    year: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" strokeWidth="1.8" strokeLinecap="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    user: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" strokeWidth="1.8" strokeLinecap="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  }

  /* ── Loading ── */
  if (loading) return (
    <div style={S.page}>
      <div style={S.dotGrid} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ ...S.wrap, ...S.stateWrap }}>
        <div style={S.spinnerRing} />
        <p style={{ color: '#64748b', fontSize: 14 }}>Loading contact details…</p>
      </div>
    </div>
  )

  /* ── Error ── */
  if (error) return (
    <div style={S.page}>
      <div style={S.dotGrid} />
      <div style={{ ...S.wrap, ...S.stateWrap }}>
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <p style={{ color: '#f87171', fontSize: 15, fontWeight: 500 }}>{error}</p>
        <button
          onClick={() => navigate(-1)}
          style={{ padding: '10px 22px', borderRadius: 10, border: '1px solid rgba(99,102,241,0.35)', background: 'rgba(99,102,241,0.08)', color: '#a5b4fc', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'Space Grotesk',sans-serif" }}
        >Go Back</button>
      </div>
    </div>
  )

  const initial = (contact?.fullname || contact?.username || '?')[0].toUpperCase()
  const isSeller = contact?._id !== currentUserId  // true when showing seller to buyer
  const roleLabel = isSeller ? 'Seller' : 'Buyer'

  /* Build info rows from available data */
  const infoRows = [
    contact?.username    && { label: 'Username',       value: `@${contact.username}`,    icon: icons.user   },
    contact?.email       && { label: 'Email',           value: contact.email,              icon: icons.email  },
    contact?.contactNumber && { label: 'Phone',         value: contact.contactNumber,      icon: icons.phone  },
    contact?.college     && { label: 'College',         value: contact.college,            icon: icons.college },
    contact?.course      && { label: 'Course',          value: contact.course,             icon: icons.course },
    contact?.year        && { label: 'Year',            value: `Year ${contact.year}`,     icon: icons.year   },
  ].filter(Boolean)

  return (
    <div style={S.page}>
      <div style={S.dotGrid} />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');
        @keyframes spin{to{transform:rotate(360deg)}}
      `}</style>

      <div style={S.wrap}>

        {/* Back */}
        <button
          style={S.backBtn}
          onClick={() => navigate(-1)}
          onMouseEnter={e => e.currentTarget.style.color = '#c7d2fe'}
          onMouseLeave={e => e.currentTarget.style.color = '#a5b4fc'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Back
        </button>

        {/* Hero */}
        <div style={S.heroWrap}>
          <div style={S.checkRing}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.2" strokeLinecap="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h1 style={S.heroTitle}>Deal Accepted!</h1>
          <p style={S.heroSub}>Here are the contact details — reach out to close the deal.</p>
        </div>

        {/* Product strip */}
        {product && (
          <div style={S.productStrip}>
            <div style={S.productThumb}>
              {product.productImage?.[0] ? (
                <img
                  src={product.productImage[0]}
                  alt={product.productName}
                  style={{ ...S.thumbImg, opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.4s' }}
                  onLoad={() => setImgLoaded(true)}
                />
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(99,102,241,0.4)" strokeWidth="1.2">
                  <rect x="3" y="3" width="18" height="18" rx="3"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              )}
            </div>
            <div style={S.productInfo}>
              <span style={S.productMicroLabel}>Product</span>
              <span style={S.productName}>{product.productName}</span>
              {product.productPrice && (
                <span style={S.productPrice}>₹{Number(product.productPrice).toLocaleString('en-IN')}</span>
              )}
            </div>
          </div>
        )}

        {/* Contact card */}
        <div style={S.contactCard}>

          {/* Avatar + name header */}
          <div style={S.cardHeader}>
            <div style={S.avatarRing}>
              <div style={S.avatarInner}>
                {contact?.avatar ? (
                  <img src={contact.avatar} alt={contact.fullname} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={S.avatarInitial}>{initial}</span>
                )}
              </div>
            </div>
            <div style={S.nameBlock}>
              <span style={S.roleBadge}>
                <svg width="8" height="8" viewBox="0 0 24 24" fill="#34d399"><circle cx="12" cy="12" r="10"/></svg>
                {roleLabel}
              </span>
              <span style={S.contactFullname}>{contact?.fullname || contact?.username}</span>
              {contact?.username && (
                <span style={S.contactUsername}>@{contact.username}</span>
              )}
            </div>
          </div>

          {/* Info rows */}
          <div style={S.infoSection}>
            {infoRows.map((row, i) => (
              <div
                key={i}
                style={{
                  ...S.infoRow,
                  borderBottom: i === infoRows.length - 1 ? 'none' : '1px solid rgba(99,102,241,0.07)',
                }}
              >
                <div style={S.infoIconBox}>{row.icon}</div>
                <div>
                  <div style={S.infoLabel}>{row.label}</div>
                  <div style={S.infoValue}>{row.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div style={S.actionsSection}>

            {/* WhatsApp */}
            {contact?.contactNumber && (
              <a
                href={whatsappLink(contact.contactNumber, contact.fullname || contact.username, product?.productName || 'the product')}
                target="_blank"
                rel="noopener noreferrer"
                style={S.btnWhatsApp}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'scale(0.98)' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)' }}
              >
                {/* WhatsApp SVG logo */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Message on WhatsApp
              </a>
            )}

            {/* Direct Call */}
            {contact?.contactNumber && (
              <a
                href={`tel:${contact.contactNumber}`}
                style={S.btnCall}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'scale(0.98)' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.16 1.18 2 2 0 012.14.02h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.63 6.63l1.06-1.06a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                Call · {contact.contactNumber}
              </a>
            )}

            {/* Gmail */}
            {contact?.email && (
              <a
                href={gmailLink(contact.email, product?.productName || 'your listing')}
                target="_blank"
                rel="noopener noreferrer"
                style={S.btnGmail}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(234,67,53,0.15)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(234,67,53,0.08)'}
              >
                {/* Gmail M logo */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.548l8.073-6.055C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335"/>
                </svg>
                Send Email via Gmail
              </a>
            )}

            {/* View full profile */}
            <button
              style={S.btnProfile}
              onClick={() => navigate(`/owner/${contact?._id}`)}
              onMouseEnter={e => { e.currentTarget.style.color = '#a5b4fc'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.22)' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              View Full Profile
            </button>
          </div>
        </div>

        {/* Safety note */}
        <div style={S.note}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 1 }}>
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <span style={S.noteText}>
            Always meet in a safe, public place on campus to exchange items. Never share sensitive financial details. Stay safe!
          </span>
        </div>

      </div>
    </div>
  )
}

export default contactForBuy
