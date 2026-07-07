import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function myBids() {
  const navigate = useNavigate()
  const [bids, setBids] = useState([])
  const [loading, setLoading] = useState(true)
  const [isZeroBids, setZeroBids] = useState(false)
  const [filter, setFilter] = useState('all')
  const [expandedSeller, setExpandedSeller] = useState(null)

  useEffect(() => { getMyBids() }, [])

  const getMyBids = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/product/bid/mybids`, { withCredentials: true })
      setBids(res.data)
    } catch (error) {
      if (error.response?.data?.message === 'No Bids') {
        setZeroBids(true)
      }
    } finally {
      setLoading(false)
    }
  }

  const toggleSeller = (bidId) => setExpandedSeller(prev => prev === bidId ? null : bidId)

  const filteredBids = bids.filter(b => filter === 'all' || b.status === filter)

  const statusConfig = {
    pending:  { label: 'Pending',  color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',  border: 'rgba(245,158,11,0.28)',  icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z' },
    accepted: { label: 'Accepted', color: '#34d399', bg: 'rgba(52,211,153,0.12)',  border: 'rgba(52,211,153,0.28)',  icon: 'M20 6L9 17l-5-5' },
    rejected: { label: 'Rejected', color: '#f87171', bg: 'rgba(248,113,113,0.12)', border: 'rgba(248,113,113,0.28)', icon: 'M18 6L6 18M6 6l12 12' },
  }

  const formatTime = (iso) => {
    if (!iso) return ''
    const d = new Date(iso)
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
      + ' · ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
  }

  /* ── Styles ── */
  const S = {
    page: {
      minHeight: '100vh',
      background: '#0a0a0f',
      backgroundImage:
        'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.18) 0%, transparent 70%),' +
        'radial-gradient(ellipse 40% 40% at 85% 80%, rgba(139,92,246,0.10) 0%, transparent 60%)',
      fontFamily: "'Inter','Space Grotesk',sans-serif",
      padding: '48px 24px 80px',
      color: '#e2e8f0',
    },
    dotGrid: {
      position: 'fixed', inset: 0,
      backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.18) 1px, transparent 1px)',
      backgroundSize: '28px 28px',
      pointerEvents: 'none', zIndex: 0,
    },
    wrap: { position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto' },

    /* Header */
    headerRow: { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 8, flexWrap: 'wrap', gap: 12 },
    title: {
      fontFamily: "'Space Grotesk',sans-serif", fontSize: 34, fontWeight: 800,
      color: '#f1f5f9', letterSpacing: '-0.02em', margin: 0,
    },
    subtitle: { fontSize: 14, color: '#64748b', marginBottom: 28 },

    /* Tabs */
    tabs: { display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' },
    tab: (active) => ({
      padding: '7px 18px', borderRadius: 999, fontSize: 13, fontWeight: 600,
      cursor: 'pointer', border: 'none', transition: 'all 0.2s',
      background: active ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : 'rgba(99,102,241,0.08)',
      color: active ? '#fff' : '#64748b',
      boxShadow: active ? '0 4px 16px rgba(99,102,241,0.3)' : 'none',
    }),

    /* Bid card */
    bidCard: (isOpen) => ({
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

    /* Thumbnail */
    thumb: {
      width: 72, height: 72, borderRadius: 14, overflow: 'hidden', flexShrink: 0,
      background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.18)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    thumbImg: { width: '100%', height: '100%', objectFit: 'cover' },

    /* Mid column */
    midCol: { display: 'flex', flexDirection: 'column', gap: 5, minWidth: 0 },
    productName: {
      fontFamily: "'Space Grotesk',sans-serif", fontSize: 17, fontWeight: 700,
      color: '#f1f5f9', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      cursor: 'pointer', transition: 'color 0.18s',
    },
    metaRow: { display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' },
    bidAmount: {
      fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 800,
      background: 'linear-gradient(135deg,#a5b4fc,#818cf8)',
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
    },
    dot: { width: 3, height: 3, borderRadius: '50%', background: '#334155', flexShrink: 0 },
    timeText: { fontSize: 12, color: '#475569' },

    /* Right column */
    rightCol: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 },
    statusBadge: (status) => ({
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '5px 12px', borderRadius: 999,
      fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
      color: statusConfig[status]?.color || '#64748b',
      background: statusConfig[status]?.bg || 'rgba(100,116,139,0.1)',
      border: `1px solid ${statusConfig[status]?.border || 'rgba(100,116,139,0.2)'}`,
    }),
    btnSeller: (open) => ({
      padding: '7px 14px', borderRadius: 10,
      border: open ? '1px solid rgba(99,102,241,0.5)' : '1px solid rgba(99,102,241,0.2)',
      background: open ? 'rgba(99,102,241,0.18)' : 'rgba(99,102,241,0.07)',
      color: open ? '#a5b4fc' : '#6366f1',
      fontSize: 12, fontWeight: 600, cursor: 'pointer',
      fontFamily: "'Space Grotesk',sans-serif", transition: 'all 0.2s',
      display: 'flex', alignItems: 'center', gap: 5,
    }),

    /* Status hint strip (for accepted/rejected) */
    statusStrip: (status) => ({
      margin: '0 22px',
      padding: '10px 16px',
      borderRadius: 10,
      background: statusConfig[status]?.bg,
      border: `1px solid ${statusConfig[status]?.border}`,
      display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
      marginBottom: 14,
    }),
    statusStripText: (status) => ({
      fontSize: 13, color: statusConfig[status]?.color, fontWeight: 500, flex: 1,
    }),
    btnContactNow: {
      padding: '7px 16px', borderRadius: 10, border: 'none', flexShrink: 0,
      background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
      color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer',
      fontFamily: "'Space Grotesk',sans-serif",
      boxShadow: '0 3px 12px rgba(99,102,241,0.35)',
      transition: 'opacity 0.2s, transform 0.15s',
      display: 'flex', alignItems: 'center', gap: 6,
    },

    /* Seller panel */
    sellerPanel: (open) => ({
      maxHeight: open ? '240px' : '0px',
      opacity: open ? 1 : 0,
      overflow: 'hidden',
      transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease',
    }),
    panelDivider: {
      height: 1, margin: '0 22px',
      background: 'linear-gradient(90deg,rgba(99,102,241,0.2),transparent)',
    },
    sellerInner: {
      margin: '0 22px 20px',
      marginTop: 0,
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
    sellerDetails: { display: 'flex', flexDirection: 'column', gap: 3 },
    sellerLabel: { fontSize: 10, color: '#475569', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase' },
    sellerName: { fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 700, color: '#f1f5f9' },
    sellerMeta: { fontSize: 12, color: '#64748b' },
    sellerTags: { display: 'flex', gap: 7, marginTop: 5, flexWrap: 'wrap' },
    tag: {
      fontSize: 11, fontWeight: 600, color: '#a5b4fc', letterSpacing: '0.05em',
      background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.22)',
      borderRadius: 999, padding: '3px 9px',
    },
    tagGreen: {
      fontSize: 11, fontWeight: 600, color: '#34d399', letterSpacing: '0.04em',
      background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.25)',
      borderRadius: 999, padding: '3px 9px', cursor: 'pointer', textDecoration: 'none',
    },
    viewBtn: {
      marginTop: 8, padding: '6px 13px', borderRadius: 8, border: 'none',
      background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
      color: '#fff', fontSize: 11, fontWeight: 600, cursor: 'pointer',
      fontFamily: "'Space Grotesk',sans-serif", width: 'fit-content',
      boxShadow: '0 2px 10px rgba(99,102,241,0.28)', transition: 'opacity 0.2s',
    },

    /* States */
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
        <p style={{ color: '#64748b', fontSize: 14 }}>Loading your bids…</p>
      </div>
    </div>
  )

  /* ── Zero bids ── */
  if (isZeroBids || (!loading && bids.length === 0)) return (
    <div style={S.page}>
      <div style={S.dotGrid} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ ...S.wrap, ...S.stateWrap }}>
        <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="rgba(99,102,241,0.3)" strokeWidth="1.2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        <p style={S.emptyTitle}>No bids placed yet</p>
        <p style={S.emptySubtitle}>Go explore products and place your first bid!</p>
        <button
          onClick={() => navigate('/')}
          style={{ marginTop: 8, padding: '10px 22px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'Space Grotesk',sans-serif", boxShadow: '0 4px 16px rgba(99,102,241,0.3)' }}
        >
          Browse Products
        </button>
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
          .mb-main{grid-template-columns:56px 1fr !important;gap:12px !important;padding:14px !important;}
          .mb-right{display:none !important;}
          .mb-title{font-size:26px !important;}
        }
      `}</style>

      <div style={S.wrap}>

        {/* Header */}
        <div style={S.headerRow}>
          <h1 className="mb-title" style={S.title}>My Bids</h1>
        </div>
        <p style={S.subtitle}>{bids.length} bid{bids.length !== 1 ? 's' : ''} placed by you</p>

        {/* Filter tabs */}
        <div style={S.tabs}>
          {['all','pending','accepted','rejected'].map(f => (
            <button key={f} style={S.tab(filter === f)} onClick={() => setFilter(f)}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === 'all'
                ? ` (${bids.length})`
                : ` (${bids.filter(b => b.status === f).length})`}
            </button>
          ))}
        </div>

        {/* Empty filtered state */}
        {filteredBids.length === 0 && (
          <div style={{ ...S.stateWrap, minHeight: '30vh' }}>
            <p style={S.emptyTitle}>No {filter} bids</p>
          </div>
        )}

        {/* Bid list */}
        {filteredBids.map(bid => {
          const product = bid.productId || {}
          const seller  = bid.seller   || {}
          const isOpen  = expandedSeller === bid._id
          const sc      = statusConfig[bid.status] || statusConfig.pending
          const sellerInitial = (seller.fullname || seller.username || 'S')[0].toUpperCase()

          return (
            <div key={bid._id} style={S.bidCard(isOpen)}>

              {/* Main row */}
              <div className="mb-main" style={S.mainRow}>

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
                    onClick={() => product._id && navigate(`/product/${product._id}`)}
                    onMouseEnter={e => e.currentTarget.style.color = '#a5b4fc'}
                    onMouseLeave={e => e.currentTarget.style.color = '#f1f5f9'}
                    title="View product"
                  >
                    {product.productName || product.name || 'Unnamed Product'}
                  </span>
                  <div style={S.metaRow}>
                    <span style={S.bidAmount}>
                      ₹{Number(bid.bidAmount).toLocaleString('en-IN')}
                    </span>
                    <span style={S.dot} />
                    <span style={S.timeText}>{formatTime(bid.createdAt)}</span>
                  </div>
                  {/* mobile status */}
                  <span style={{ ...S.statusBadge(bid.status), marginTop: 4 }}>{sc.label}</span>
                </div>

                {/* Right */}
                <div className="mb-right" style={S.rightCol}>
                  {/* Status badge with icon */}
                  <span style={S.statusBadge(bid.status)}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
                      <path d={sc.icon}/>
                    </svg>
                    {sc.label}
                  </span>
                  {/* Seller toggle */}
                  <button style={S.btnSeller(isOpen)} onClick={() => toggleSeller(bid._id)}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                    {isOpen ? 'Hide Seller' : 'Seller Info'}
                  </button>
                </div>
              </div>

              {/* Status strip for accepted / rejected */}
              {(bid.status === 'accepted' || bid.status === 'rejected') && (
                <div style={S.statusStrip(bid.status)}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={sc.color} strokeWidth="2.2" strokeLinecap="round">
                    <path d={sc.icon}/>
                  </svg>
                  <span style={S.statusStripText(bid.status)}>
                    {bid.status === 'accepted'
                      ? 'Your bid was accepted! Contact the seller to complete the deal.'
                      : 'Your bid was declined by the seller.'}
                  </span>
                  {bid.status === 'accepted' && (
                    <button
                      style={S.btnContactNow}
                      onClick={() => navigate(`/contact-for-bid/${bid._id}`)}
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

              {/* Seller panel */}
              <div style={S.sellerPanel(isOpen)}>
                <div style={S.panelDivider} />
                <div style={{ height: 14 }} />
                <div style={S.sellerInner}>
                  <div style={S.avatarOuter}>
                    <div style={S.avatarInner}>
                      {seller.avatar ? (
                        <img src={seller.avatar} alt={seller.fullname} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <span style={S.avatarInitial}>{sellerInitial}</span>
                      )}
                    </div>
                  </div>
                  <div style={S.sellerDetails}>
                    <span style={S.sellerLabel}>Seller</span>
                    <span style={S.sellerName}>{seller.fullname || seller.username || 'Unknown Seller'}</span>
                    {seller.email && <span style={S.sellerMeta}>{seller.email}</span>}
                    <div style={S.sellerTags}>
                      {seller.college && <span style={S.tag}>{seller.college}</span>}
                      {seller.course  && <span style={S.tag}>{seller.course}</span>}
                      {seller.year    && <span style={S.tag}>Year {seller.year}</span>}
                      {seller.contactNumber && bid.status === 'accepted' && (
                        <a href={`tel:${seller.contactNumber}`} style={{ textDecoration: 'none' }}>
                          <span style={S.tagGreen}>📞 {seller.contactNumber}</span>
                        </a>
                      )}
                    </div>
                    <button
                      style={S.viewBtn}
                      onClick={() => navigate(`/owner/${seller._id}`)}
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

export default myBids
