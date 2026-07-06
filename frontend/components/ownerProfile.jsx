import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';

function ownerProfile() {
  const { ownerId } = useParams();
  const navigate = useNavigate();
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [avatarLoaded, setAvatarLoaded] = useState(false);

  useEffect(() => { fetchOwner(); }, [ownerId]);

  const fetchOwner = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/users/profile/${ownerId}`,
        { withCredentials: true }
      );
      setOwner(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load profile.');
    } finally {
      setLoading(false);
    }
  };

  /* ─── Styles ─── */
  const S = {
    page: {
      minHeight: '100vh',
      background: '#0a0a0f',
      backgroundImage:
        'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.20) 0%, transparent 70%), ' +
        'radial-gradient(ellipse 45% 45% at 85% 85%, rgba(139,92,246,0.12) 0%, transparent 60%)',
      fontFamily: "'Inter', 'Space Grotesk', sans-serif",
      padding: '48px 24px 80px',
      color: '#e2e8f0',
    },
    dotGrid: {
      position: 'fixed', inset: 0,
      backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.18) 1px, transparent 1px)',
      backgroundSize: '28px 28px',
      pointerEvents: 'none', zIndex: 0,
    },
    wrap: { position: 'relative', zIndex: 1, maxWidth: 780, margin: '0 auto' },

    backBtn: {
      display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 40,
      color: '#a5b4fc', fontSize: 14, fontWeight: 500, cursor: 'pointer',
      background: 'none', border: 'none', padding: 0, letterSpacing: '0.02em', transition: 'color 0.2s',
    },

    /* Hero banner */
    heroBanner: {
      height: 140,
      borderRadius: '20px 20px 0 0',
      background: 'linear-gradient(135deg, rgba(99,102,241,0.35) 0%, rgba(139,92,246,0.28) 50%, rgba(168,139,250,0.20) 100%)',
      border: '1px solid rgba(99,102,241,0.2)',
      borderBottom: 'none',
      position: 'relative',
      overflow: 'hidden',
    },
    heroDots: {
      position: 'absolute', inset: 0,
      backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
      backgroundSize: '20px 20px',
    },
    heroGlow: {
      position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)',
      width: 300, height: 200,
      background: 'radial-gradient(ellipse, rgba(139,92,246,0.35), transparent 70%)',
      pointerEvents: 'none',
    },

    /* Profile card */
    card: {
      background: 'rgba(13,13,26,0.80)',
      border: '1px solid rgba(99,102,241,0.18)',
      borderTop: 'none',
      borderRadius: '0 0 24px 24px',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 32px 80px rgba(0,0,0,0.55), inset 0 -1px 0 rgba(255,255,255,0.03)',
      padding: '0 40px 40px',
    },

    /* Avatar */
    avatarWrap: {
      marginTop: -52,
      marginBottom: 24,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
    avatarRing: {
      width: 104, height: 104, borderRadius: '50%', flexShrink: 0,
      background: 'conic-gradient(from 0deg, #6366f1, #8b5cf6, #a78bfa, #c4b5fd, #6366f1)',
      padding: 3,
      boxShadow: '0 0 32px rgba(99,102,241,0.45)',
    },
    avatarInner: {
      width: '100%', height: '100%', borderRadius: '50%',
      background: '#0a0a0f',
      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
    },
    avatarInitial: {
      fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, color: '#a5b4fc',
    },

    /* Name & username */
    fullname: {
      fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 700,
      color: '#f1f5f9', letterSpacing: '-0.02em', margin: 0,
    },
    username: { fontSize: 14, color: '#6366f1', fontWeight: 600, marginTop: 4 },

    divider: { height: 1, background: 'linear-gradient(90deg, rgba(99,102,241,0.25), transparent)', border: 'none', margin: '28px 0' },

    /* Info grid */
    infoGrid: {
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
    },
    infoCard: {
      background: 'rgba(99,102,241,0.06)',
      border: '1px solid rgba(99,102,241,0.15)',
      borderRadius: 14, padding: '18px 20px',
      display: 'flex', alignItems: 'flex-start', gap: 14,
    },
    iconBox: {
      width: 38, height: 38, borderRadius: 10, flexShrink: 0,
      background: 'rgba(99,102,241,0.12)',
      border: '1px solid rgba(99,102,241,0.2)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    infoLabel: { fontSize: 11, color: '#64748b', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 4 },
    infoValue: { fontSize: 15, fontWeight: 600, color: '#e2e8f0', fontFamily: "'Space Grotesk', sans-serif" },

    /* Contact row */
    contactRow: { display: 'flex', gap: 12, marginTop: 28 },
    btnPrimary: {
      flex: 1, padding: '13px 24px', borderRadius: 12, border: 'none',
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer',
      fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.01em',
      boxShadow: '0 4px 24px rgba(99,102,241,0.35)', transition: 'opacity 0.2s, transform 0.15s',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    },
    btnOutline: {
      flex: 1, padding: '13px 24px', borderRadius: 12,
      border: '1px solid rgba(99,102,241,0.35)', background: 'rgba(99,102,241,0.08)',
      color: '#a5b4fc', fontSize: 14, fontWeight: 600, cursor: 'pointer',
      fontFamily: "'Space Grotesk', sans-serif", transition: 'background 0.2s',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    },

    /* Member since */
    memberBadge: {
      display: 'flex', alignItems: 'center', gap: 8, marginTop: 24,
      color: '#475569', fontSize: 13,
    },

    stateWrap: { minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 },
    spinnerRing: { width: 48, height: 48, borderRadius: '50%', border: '3px solid rgba(99,102,241,0.2)', borderTopColor: '#6366f1', animation: 'spin 0.8s linear infinite' },
  };

  /* ─── Loading ─── */
  if (loading) return (
    <div style={S.page}>
      <div style={S.dotGrid} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{ ...S.wrap, ...S.stateWrap }}>
        <div style={S.spinnerRing} />
        <p style={{ color: '#64748b', fontSize: 14 }}>Loading profile…</p>
      </div>
    </div>
  );

  /* ─── Error ─── */
  if (error) return (
    <div style={S.page}>
      <div style={S.dotGrid} />
      <div style={{ ...S.wrap, ...S.stateWrap }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <p style={{ color: '#f87171', fontSize: 16, fontWeight: 500 }}>{error}</p>
        <button style={S.btnOutline} onClick={fetchOwner}>Retry</button>
      </div>
    </div>
  );

  const memberSince = owner?.createdAt
    ? new Date(owner.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })
    : null;

  const initial = (owner?.fullname || owner?.username || 'U')[0].toUpperCase();

  /* ─── Info cards config ─── */
  const infoItems = [
    {
      label: 'Email', value: owner?.email,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" strokeWidth="1.6" strokeLinecap="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
    {
      label: 'Contact', value: owner?.contactNumber,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" strokeWidth="1.6" strokeLinecap="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.16 1.18 2 2 0 012.14.02h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.63 6.63l1.06-1.06a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
        </svg>
      ),
    },
    {
      label: 'College', value: owner?.college,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" strokeWidth="1.6" strokeLinecap="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      label: 'Course', value: owner?.course,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" strokeWidth="1.6" strokeLinecap="round">
          <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
        </svg>
      ),
    },
    {
      label: 'Year', value: owner?.year ? `${owner.year} Year` : null,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" strokeWidth="1.6" strokeLinecap="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      label: 'Username', value: owner?.username ? `@${owner.username}` : null,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" strokeWidth="1.6" strokeLinecap="round">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
  ].filter(item => item.value);

  return (
    <div style={S.page}>
      <div style={S.dotGrid} />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 600px) {
          .op-grid { grid-template-columns: 1fr !important; }
          .op-card { padding: 0 20px 32px !important; }
          .op-fullname { font-size: 22px !important; }
          .op-contact-row { flex-direction: column !important; }
        }
      `}</style>

      <div style={S.wrap}>
        {/* Back */}
        <button style={S.backBtn} onClick={() => navigate(-1)}
          onMouseEnter={e => e.target.style.color = '#c7d2fe'}
          onMouseLeave={e => e.target.style.color = '#a5b4fc'}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </button>

        {/* Hero banner */}
        <div style={S.heroBanner}>
          <div style={S.heroDots} />
          <div style={S.heroGlow} />
        </div>

        {/* Profile card */}
        <div className="op-card" style={S.card}>

          {/* Avatar + action (top row) */}
          <div style={S.avatarWrap}>
            <div style={S.avatarRing}>
              <div style={S.avatarInner}>
                {owner?.avatar ? (
                  <img
                    src={owner.avatar}
                    alt={owner.fullname}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: avatarLoaded ? 1 : 0, transition: 'opacity 0.4s' }}
                    onLoad={() => setAvatarLoaded(true)}
                  />
                ) : (
                  <span style={S.avatarInitial}>{initial}</span>
                )}
              </div>
            </div>
          </div>

          {/* Name */}
          <h1 className="op-fullname" style={S.fullname}>
            {owner?.fullname || 'Unknown User'}
          </h1>
          {owner?.username && (
            <p style={S.username}>@{owner.username}</p>
          )}

          <hr style={S.divider} />

          {/* Info grid */}
          <div className="op-grid" style={S.infoGrid}>
            {infoItems.map((item, i) => (
              <div key={i} style={S.infoCard}>
                <div style={S.iconBox}>{item.icon}</div>
                <div>
                  <div style={S.infoLabel}>{item.label}</div>
                  <div style={S.infoValue}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact actions */}
          <div className="op-contact-row" style={S.contactRow}>
            {owner?.email && (
              <a href={`mailto:${owner.email}`} style={{ flex: 1, textDecoration: 'none' }}>
                <button style={{ ...S.btnPrimary, width: '100%' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  Send Email
                </button>
              </a>
            )}
            {owner?.contactNumber && (
              <a href={`tel:${owner.contactNumber}`} style={{ flex: 1, textDecoration: 'none' }}>
                <button style={{ ...S.btnOutline, width: '100%' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.15)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(99,102,241,0.08)'}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.16 1.18 2 2 0 012.14.02h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.63 6.63l1.06-1.06a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  Call
                </button>
              </a>
            )}
          </div>

          {/* Member since */}
          {memberSince && (
            <div style={S.memberBadge}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="1.8">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              Member since {memberSince}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ownerProfile;
