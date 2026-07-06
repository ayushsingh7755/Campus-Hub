import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

function incomingbuyRequests() {
  const navigate = useNavigate()
  const [buys, setBuys] = useState([])
  const [loading, setLoading] = useState(true)
  const [isZeroBuys, setZeroBuys] = useState(false)
  const [filter, setFilter] = useState('all')
  const [expandedBuyer, setExpandedBuyer] = useState(null)
  const [actionLoading, setActionLoading] = useState({}) // { [buyId]: 'accept' | 'reject' }

  useEffect(() => { getBuyRequests() }, [])

  const getBuyRequests = async () => {
    try {
      const buyRes = await axios.get(
        'http://localhost:4000/product/buy/getincomingbuys',
        { withCredentials: true }
      )
      setBuys(buyRes.data)
    } catch (error) {
      if (error.response?.data?.message === 'No Buy Requests') setZeroBuys(true)
    } finally {
      setLoading(false)
    }
  }

  const handleAction = async (buyId, action) => {
    setActionLoading(prev => ({ ...prev, [buyId]: action }))
    try {
      await axios.patch(
        `http://localhost:4000/product/buy/${buyId}/${action}`,
        {},
        { withCredentials: true }
      )
      setBuys(prev => prev.map(b =>
        b._id === buyId
          ? { ...b, status: action === 'accepted' ? 'accepted' : 'rejected' }
          : b
      ))
    } catch (err) {
      console.error(err)
    } finally {
      setActionLoading(prev => ({ ...prev, [buyId]: null }))
    }
  }

  const toggleBuyer = (buyId) =>
    setExpandedBuyer(prev => prev === buyId ? null : buyId)

  const filteredBuys = buys.filter(b => filter === 'all' || b.status === filter)

  const statusConfig = {
    pending:  { label: 'Pending',  color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',  border: 'rgba(245,158,11,0.28)'  },
    accepted: { label: 'Accepted', color: '#34d399', bg: 'rgba(52,211,153,0.12)',  border: 'rgba(52,211,153,0.28)'  },
    rejected: { label: 'Rejected', color: '#f87171', bg: 'rgba(248,113,113,0.12)', border: 'rgba(248,113,113,0.28)' },
  }

  const formatTime = (iso) => {
    if (!iso) return ''
    const d = new Date(iso)
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
      + ' · ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
  }

  const S = {
    page: {
      minHeight: '100vh',
      background: '#0a0a0f',
      backgroundImage:
        'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.18) 0%, transparent 70%),' +
        'radial-gradient(ellipse 40% 40% at 85% 80%, rgba(139,92,246,0.10) 0%, transparent 60%)',
      fontFamily: "'Inter','Space Grotesk',sans-serif",
      padding: '48px 24px 80px', color: '#e2e8f0',
    },
    dotGrid: {
      position: 'fixed', inset: 0,
      backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.18) 1px, transparent 1px)',
      backgroundSize: '28px 28px', pointerEvents: 'none', zIndex: 0,
    },
    wrap: { position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto' },

    title: {
      fontFamily: "'Space Grotesk',sans-serif", fontSize: 34, fontWeight: 800,
      color: '#f1f5f9', letterSpacing: '-0.02em', margin: '0 0 6px',
    },
    subtitle: { fontSize: 14, color: '#64748b', marginBottom: 28 },

    tabs: { display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' },
    tab: (active) => ({
      padding: '7px 18px', borderRadius: 999, fontSize: 13, fontWeight: 600,
      cursor: 'pointer', border: 'none', transition: 'all 0.2s',
      background: active ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : 'rgba(99,102,241,0.08)',
      color: active ? '#fff' : '#64748b',
      boxShadow: active ? '0 4px 16px rgba(99,102,241,0.3)' : 'none',
    }),

    /* Card */
    card: (isOpen) => ({
      background: 'rgba(13,13,26,0.80)',
      border: `1px solid ${isOpen ? 'rgba(99,102,241,0.35)' : 'rgba(99,102,241,0.14)'}`,
      borderRadius: 20, marginBottom: 14, overflow: 'hidden',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
      transition: 'border-color 0.2s',
    }),

    mainRow: {
      display: 'grid', gridTemplateColumns: '72px 1fr auto',
      gap: 20, padding: '20px 22px', alignItems: 'center',
    },

    thumb: {
      width: 72, height: 72, borderRadius: 14, overflow: 'hidden', flexShrink: 0,
      background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.18)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    thumbImg: { width: '100%', height: '100%', objectFit: 'cover' },

    midCol: { display: 'flex', flexDirection: 'column', gap: 5, minWidth: 0 },
    productName: {
      fontFamily: "'Space Grotesk',sans-serif", fontSize: 17, fontWeight: 700,
      color: '#f1f5f9', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      cursor: 'pointer', transition: 'color 0.18s',
    },
    metaRow: { display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' },
    priceText: {
      fontFamily: "'Space Grotesk',sans-serif", fontSize: 19, fontWeight: 800,
      background: 'linear-gradient(135deg,#a5b4fc,#818cf8)',
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
    },
    dot: { width: 3, height: 3, borderRadius: '50%', background: '#334155', flexShrink: 0 },
    timeText: { fontSize: 12, color: '#475569' },

    rightCol: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 },
    statusBadge: (status) => ({
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '5px 12px', borderRadius: 999,
      fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
      color: statusConfig[status]?.color || '#64748b',
      background: statusConfig[status]?.bg || 'rgba(100,116,139,0.1)',
      border: `1px solid ${statusConfig[status]?.border || 'rgba(100,116,139,0.2)'}`,
    }),
    actionRow: { display: 'flex', gap: 8 },

    btnAccept: {
      padding: '8px 16px', borderRadius: 10, border: 'none',
      background: 'linear-gradient(135deg,#059669,#34d399)',
      color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer',
      fontFamily: "'Space Grotesk',sans-serif",
      boxShadow: '0 4px 12px rgba(52,211,153,0.25)',
      transition: 'opacity 0.2s, transform 0.15s',
      display: 'flex', alignItems: 'center', gap: 6,
    },
    btnReject: {
      padding: '8px 14px', borderRadius: 10,
      border: '1px solid rgba(248,113,113,0.35)',
      background: 'rgba(248,113,113,0.08)',
      color: '#f87171', fontSize: 13, fontWeight: 600, cursor: 'pointer',
      fontFamily: "'Space Grotesk',sans-serif",
      transition: 'background 0.2s, transform 0.15s',
      display: 'flex', alignItems: 'center', gap: 6,
    },
    btnBuyer: (open) => ({
      padding: '8px 14px', borderRadius: 10,
      border: open ? '1px solid rgba(99,102,241,0.5)' : '1px solid rgba(99,102,241,0.2)',
      background: open ? 'rgba(99,102,241,0.18)' : 'rgba(99,102,241,0.07)',
      color: open ? '#a5b4fc' : '#6366f1',
      fontSize: 12, fontWeight: 600, cursor: 'pointer',
      fontFamily: "'Space Grotesk',sans-serif", transition: 'all 0.2s',
      display: 'flex', alignItems: 'center', gap: 5,
    }),
    spinnerSm: {
      width: 12, height: 12, borderRadius: '50%', flexShrink: 0,
      border: '2px solid rgba(255,255,255,0.25)', borderTopColor: '#fff',
      display: 'inline-block', animation: 'spin 0.7s linear infinite',
    },

    /* Status strip */
    statusStrip: (status) => ({
      margin: '0 22px 14px',
      padding: '12px 16px', borderRadius: 12,
      background: statusConfig[status]?.bg,
      border: `1px solid ${statusConfig[status]?.border}`,
      display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
    }),
    statusStripText: (status) => ({
      fontSize: 13, color: statusConfig[status]?.color, fontWeight: 500, flex: 1,
    }),

    /* Contact Now */
    btnContact: {
      padding: '8px 18px', borderRadius: 10, border: 'none', flexShrink: 0,
      background: 'linear-gradient(135deg,#059669,#34d399)',
      color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer',
      fontFamily: "'Space Grotesk',sans-serif",
      boxShadow: '0 3px 12px rgba(52,211,153,0.35)',
      transition: 'opacity 0.2s, transform 0.15s',
      display: 'flex', alignItems: 'center', gap: 6,
    },

    /* Buyer panel */
    buyerPanel: (open) => ({
      maxHeight: open ? '260px' : '0px',
      opacity: open ? 1 : 0,
      overflow: 'hidden',
      transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease',
    }),
    panelDivider: {
      height: 1, margin: '0 22px',
      background: 'linear-gradient(90deg,rgba(99,102,241,0.2),transparent)',
    },
    buyerInner: {
      margin: '14px 22px 20px',
      background: 'rgba(99,102,241,0.06)',
      border: '1px solid rgba(99,102,241,0.14)',
      borderRadius: 14, padding: '16px 18px',
      display: 'grid', gridTemplateColumns: 'auto 1fr',
      gap: 14, alignItems: 'center',
    },
    avatarOuter: {
      width: 50, height: 50, borderRadius: '50%', flexShrink: 0,
      background: 'conic-gradient(from 0deg,#6366f1,#8b5cf6,#a78bfa,#6366f1)',
      padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    avatarInner: {
      width: '100%', height: '100%', borderRadius: '50%', background: '#0a0a0f',
      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
    },
    avatarInitial: { fontFamily: "'Space Grotesk',sans-serif", fontSize: 17, fontWeight: 700, color: '#a5b4fc' },
    buyerDetails: { display: 'flex', flexDirection: 'column', gap: 3 },
    buyerLabel: { fontSize: 10, color: '#475569', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase' },
    buyerName: { fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 700, color: '#f1f5f9' },
    buyerMeta: { fontSize: 12, color: '#64748b' },
    buyerTags: { display: 'flex', gap: 7, marginTop: 5, flexWrap: 'wrap' },
    tag: {
      fontSize: 11, fontWeight: 600, color: '#a5b4fc',
      background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.22)',
      borderRadius: 999, padding: '3px 9px',
    },
    tagGreen: {
      fontSize: 11, fontWeight: 600, color: '#34d399',
      background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.25)',
      borderRadius: 999, padding: '3px 9px', textDecoration: 'none', cursor: 'pointer',
    },
    viewBtn: {
      marginTop: 8, padding: '6px 13px', borderRadius: 8, border: 'none',
      background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
      color: '#fff', fontSize: 11, fontWeight: 600, cursor: 'pointer',
      fontFamily: "'Space Grotesk',sans-serif", width: 'fit-content',
      boxShadow: '0 2px 10px rgba(99,102,241,0.28)', transition: 'opacity 0.2s',
    },

    stateWrap: { minHeight: '55vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 },
    spinnerRing: { width: 44, height: 44, borderRadius: '50%', border: '3px solid rgba(99,102,241,0.2)', borderTopColor: '#6366f1', animation: 'spin 0.8s linear infinite' },
    emptyTitle: { color: '#475569', fontSize: 15, fontWeight: 600 },
    emptySubtitle: { color: '#334155', fontSize: 13 },
  }

  /* ── Loading ── */
  if (loading) return (
    <div style={S.page}>
      <div style={S.dotGrid} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ ...S.wrap, ...S.stateWrap }}>
        <div style={S.spinnerRing} />
        <p style={{ color: '#64748b', fontSize: 14 }}>Fetching incoming buy requests…</p>
      </div>
    </div>
  )

  /* ── Zero state ── */
  if (isZeroBuys || (!loading && buys.length === 0)) return (
    <div style={S.page}>
      <div style={S.dotGrid} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ ...S.wrap, ...S.stateWrap }}>
        <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="rgba(99,102,241,0.3)" strokeWidth="1.2">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 01-8 0"/>
        </svg>
        <p style={S.emptyTitle}>No buy requests yet</p>
        <p style={S.emptySubtitle}>When buyers request your products, they'll appear here.</p>
      </div>
    </div>
  )

  return (
    <div style={S.page}>
      <div style={S.dotGrid} />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');
        @keyframes spin{to{transform:rotate(360deg)}}
        @media(max-width:620px){
          .ib-main{grid-template-columns:56px 1fr !important;gap:12px !important;padding:14px !important;}
          .ib-right{display:none !important;}
          .ib-title{font-size:26px !important;}
        }
      `}</style>

      <div style={S.wrap}>
        <h1 className="ib-title" style={S.title}>Incoming Buy Requests</h1>
        <p style={S.subtitle}>{buys.length} request{buys.length !== 1 ? 's' : ''} on your listings</p>

        {/* Filter tabs */}
        <div style={S.tabs}>
          {['all','pending','accepted','rejected'].map(f => (
            <button key={f} style={S.tab(filter === f)} onClick={() => setFilter(f)}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === 'all'
                ? ` (${buys.length})`
                : ` (${buys.filter(b => b.status === f).length})`}
            </button>
          ))}
        </div>

        {filteredBuys.length === 0 && (
          <div style={{ ...S.stateWrap, minHeight: '28vh' }}>
            <p style={S.emptyTitle}>No {filter} requests</p>
          </div>
        )}

        {filteredBuys.map(buy => {
          const product = buy.productId || {}
          const buyer   = buy.buyer    || {}
          const owner  = buy.seller   || {}
          const isOpen  = expandedBuyer === buy._id
          const sc      = statusConfig[buy.status] || statusConfig.pending
          const isPending = buy.status === 'pending'
          const aLoading  = actionLoading[buy._id]
          const buyerInitial = (buyer.fullname || buyer.username || 'B')[0].toUpperCase()

          return (
            <div key={buy._id} style={S.card(isOpen)}>

              {/* ── Main row ── */}
              <div className="ib-main" style={S.mainRow}>

                {/* Thumbnail */}
                <div style={S.thumb}>
                  {product.productImage?.[0] || product.image ? (
                    <img src={product.productImage?.[0] || product.image} alt={product.productName} style={S.thumbImg} />
                  ) : (
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(99,102,241,0.35)" strokeWidth="1.2">
                      <rect x="3" y="3" width="18" height="18" rx="3"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                  )}
                </div>

                {/* Info */}
                <div style={S.midCol}>
                  <span
                    style={S.productName}
                    onClick={() => product._id && navigate(`/college/${owner.college}/${product.category}/${product._id}`)}
                    onMouseEnter={e => e.currentTarget.style.color = '#a5b4fc'}
                    onMouseLeave={e => e.currentTarget.style.color = '#f1f5f9'}
                    title="View product"
                  >
                    {product.productName || product.name || 'Unnamed Product'}
                  </span>
                  <div style={S.metaRow}>
                    {(product.productPrice || product.price) && (
                      <>
                        <span style={S.priceText}>
                          ₹{Number(product.productPrice ?? product.price).toLocaleString('en-IN')}
                        </span>
                        <span style={S.dot} />
                      </>
                    )}
                    <span style={S.timeText}>{formatTime(buy.createdAt)}</span>
                  </div>
                  {/* mobile badge */}
                  <span style={{ ...S.statusBadge(buy.status), marginTop: 4, width: 'fit-content' }}>{sc.label}</span>
                </div>

                {/* Right col */}
                <div className="ib-right" style={S.rightCol}>
                  <span style={S.statusBadge(buy.status)}>{sc.label}</span>
                  <div style={S.actionRow}>

                    {/* Buyer info toggle */}
                    <button style={S.btnBuyer(isOpen)} onClick={() => toggleBuyer(buy._id)}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                      </svg>
                      {isOpen ? 'Hide' : 'Buyer'}
                    </button>

                    {/* Accept / Reject — only when pending */}
                    {isPending && (
                      <>
                        <button
                          style={{ ...S.btnAccept, opacity: aLoading ? 0.65 : 1 }}
                          disabled={!!aLoading}
                          onClick={() => handleAction(buy._id, 'accepted')}
                          onMouseEnter={e => { if (!aLoading) e.currentTarget.style.opacity = '0.85' }}
                          onMouseLeave={e => { if (!aLoading) e.currentTarget.style.opacity = '1' }}
                        >
                          {aLoading === 'accept'
                            ? <span style={S.spinnerSm} />
                            : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}
                          Accept
                        </button>
                        <button
                          style={{ ...S.btnReject, opacity: aLoading ? 0.65 : 1 }}
                          disabled={!!aLoading}
                          onClick={() => handleAction(buy._id, 'rejected')}
                          onMouseEnter={e => { if (!aLoading) { e.currentTarget.style.background = 'rgba(248,113,113,0.15)' } }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(248,113,113,0.08)' }}
                        >
                          {aLoading === 'reject'
                            ? <span style={{ ...S.spinnerSm, borderTopColor: '#f87171' }} />
                            : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>}
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* ── Status strip (non-pending) + Contact Now (accepted) ── */}
              {!isPending && (
                <div style={S.statusStrip(buy.status)}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={sc.color} strokeWidth="2.2" strokeLinecap="round">
                    {buy.status === 'accepted'
                      ? <polyline points="20 6 9 17 4 12"/>
                      : <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>}
                  </svg>
                  <span style={S.statusStripText(buy.status)}>
                    {buy.status === 'accepted'
                      ? 'You accepted this request. Reach out to the buyer to coordinate the handover.'
                      : 'You declined this buy request.'}
                  </span>
                  {buy.status === 'accepted' && (
                    <button
                      style={S.btnContact}
                      onClick={() => navigate(`/contact-for-buy/${buy._id}`)}
                      onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'scale(0.97)' }}
                      onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)' }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.16 1.18 2 2 0 012.14.02h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.63 6.63l1.06-1.06a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                      </svg>
                      Contact Now
                    </button>
                  )}
                </div>
              )}

              {/* ── Buyer panel (animated slide-down) ── */}
              <div style={S.buyerPanel(isOpen)}>
                <div style={S.panelDivider} />
                <div style={S.buyerInner}>
                  <div style={S.avatarOuter}>
                    <div style={S.avatarInner}>
                      {buyer.avatar ? (
                        <img src={buyer.avatar} alt={buyer.fullname} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <span style={S.avatarInitial}>{buyerInitial}</span>
                      )}
                    </div>
                  </div>
                  <div style={S.buyerDetails}>
                    <span style={S.buyerLabel}>Buyer</span>
                    <span style={S.buyerName}>{buyer.fullname || buyer.username || 'Unknown Buyer'}</span>
                    {buyer.email && <span style={S.buyerMeta}>{buyer.email}</span>}
                    <div style={S.buyerTags}>
                      {buyer.college && <span style={S.tag}>{buyer.college}</span>}
                      {buyer.course  && <span style={S.tag}>{buyer.course}</span>}
                      {buyer.year    && <span style={S.tag}>Year {buyer.year}</span>}
                      {/* Phone only revealed after accepting */}
                      {buyer.contactNumber && buy.status === 'accepted' && (
                        <a href={`tel:${buyer.contactNumber}`} style={{ textDecoration: 'none' }}>
                          <span style={S.tagGreen}>📞 {buyer.contactNumber}</span>
                        </a>
                      )}
                    </div>
                    <button
                      style={S.viewBtn}
                      onClick={() => navigate(`/owner/${buyer._id}`)}
                      onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    >
                      View Full Profile →
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )
        })}
      </div>
    </div>
  )
}

export default incomingbuyRequests
