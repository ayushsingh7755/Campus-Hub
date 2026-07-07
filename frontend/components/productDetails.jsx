import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useContext } from 'react';
import { userContext } from './context.jsx';


function productDetails() {
  const { productId } = useParams();
  const {isLoggedIn}=useContext(userContext)
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [ownerHover, setOwnerHover] = useState(false);

  // Image carousel
  const [activeImg, setActiveImg] = useState(0);

  // Bid states
  const [bidOpen, setBidOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [bidFocus, setBidFocus] = useState(false);
  const [bidSubmitting, setBidSubmitting] = useState(false);

  // Buy states
  const [buyOpen, setBuyOpen] = useState(false);
  const [buySubmitting, setBuySubmitting] = useState(false);
  const [buySuccess, setBuySuccess] = useState(false);

  const [seller, setSeller] = useState(null);
  const [loginPrompt, setLoginPrompt] = useState(null); // 'bid' | 'buy' | null

  useEffect(() => { getProduct(); }, []);

  const getProduct = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/product/getProducts/one/${productId}`,
        { withCredentials: true }
      );
      setProduct(res.data);
      setSeller(res.data.productOwner._id);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load product.');
    } finally {
      setLoading(false);
    }
  };

  const handleBidClick = () => {
    if (!isLoggedIn) { setLoginPrompt('bid'); setBuyOpen(false); setBidOpen(false); return; }
    setLoginPrompt(null);
    setBidOpen(prev => !prev);
    setBidAmount('');
    setBuyOpen(false);
    setBuySuccess(false);
  };

  const handleBidSubmit = async () => {
    if (!bidAmount || isNaN(bidAmount) || Number(bidAmount) <= 0) return;
    setBidSubmitting(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/product/bid/${productId}/${seller}`,
        { bidAmount },
        { withCredentials: true }
      );
      setBidOpen(false);
      setBidAmount('');
    } catch (err) {
      console.error(err);
    } finally {
      setBidSubmitting(false);
    }
  };

  const handleBuyClick = () => {
    if (buySuccess) return;
    if (!isLoggedIn) { setLoginPrompt('buy'); setBidOpen(false); setBidAmount(''); setBuyOpen(false); return; }
    setLoginPrompt(null);
    setBuyOpen(prev => !prev);
    setBidOpen(false);
    setBidAmount('');
  };

  const handleBuyConfirm = async () => {
    setBuySubmitting(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/product/buyrequest/${productId}/${seller}`,
        {},
        { withCredentials: true }
      );
      setBuyOpen(false);
      setBuySuccess(true);
    } catch (err) {
      console.error(err.response);
    } finally {
      setBuySubmitting(false);
    }
  };

  // Carousel helpers
  const images = product?.productImage?.length ? product.productImage : (product?.image ? [product.image] : []);
  const totalImgs = images.length;

  const prevImg = (e) => {
    e.stopPropagation();
    setImgLoaded(false);
    setActiveImg(i => (i - 1 + totalImgs) % totalImgs);
  };
  const nextImg = (e) => {
    e.stopPropagation();
    setImgLoaded(false);
    setActiveImg(i => (i + 1) % totalImgs);
  };

  const styles = {
    page: {
      minHeight: '100vh',
      background: '#0a0a0f',
      backgroundImage:
        'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.18) 0%, transparent 70%), ' +
        'radial-gradient(ellipse 40% 40% at 80% 80%, rgba(139,92,246,0.10) 0%, transparent 60%)',
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
    container: { position: 'relative', zIndex: 1, maxWidth: 1080, margin: '0 auto' },
    backBtn: {
      display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 40,
      color: '#a5b4fc', fontSize: 14, fontWeight: 500, cursor: 'pointer',
      background: 'none', border: 'none', padding: 0, letterSpacing: '0.02em', transition: 'color 0.2s',
    },
    card: {
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48,
      background: 'rgba(15,15,30,0.75)',
      border: '1px solid rgba(99,102,241,0.18)', borderRadius: 24, padding: 48,
      backdropFilter: 'blur(20px)',
      boxShadow: '0 0 0 1px rgba(99,102,241,0.08), 0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
    },

    /* ── Image section ── */
    imageSection: { display: 'flex', flexDirection: 'column', gap: 12 },
    imageWrapper: {
      position: 'relative', borderRadius: 18, overflow: 'hidden', aspectRatio: '1 / 1',
      background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    conicRing: {
      position: 'absolute', inset: -2, borderRadius: 20,
      background: 'conic-gradient(from 0deg, #6366f1, #8b5cf6, #a78bfa, #6366f1)',
      zIndex: 0, opacity: 0.5, filter: 'blur(1px)',
    },
    imageInner: {
      position: 'relative', zIndex: 1, inset: 2, borderRadius: 16, overflow: 'hidden',
      background: 'rgba(10,10,20,0.9)', width: 'calc(100% - 4px)', height: 'calc(100% - 4px)',
    },
    productImage: { width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'opacity 0.4s ease' },
    imagePlaceholder: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' },

    /* Nav arrows */
    navBtn: (side) => ({
      position: 'absolute', top: '50%', [side]: 12,
      transform: 'translateY(-50%)',
      zIndex: 2,
      width: 34, height: 34, borderRadius: '50%',
      background: 'rgba(10,10,20,0.70)',
      border: '1px solid rgba(99,102,241,0.35)',
      backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', transition: 'background 0.2s, border-color 0.2s',
      color: '#a5b4fc',
    }),

    /* Counter pill */
    counterPill: {
      position: 'absolute', bottom: 12, right: 12, zIndex: 2,
      background: 'rgba(10,10,20,0.72)',
      border: '1px solid rgba(99,102,241,0.28)',
      backdropFilter: 'blur(8px)',
      borderRadius: 999, padding: '3px 10px',
      fontSize: 11, fontWeight: 700, color: '#a5b4fc',
      letterSpacing: '0.04em',
    },

    /* Dot strip */
    dotStrip: {
      display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6,
    },
    dot: (active) => ({
      width: active ? 18 : 6,
      height: 6,
      borderRadius: 999,
      background: active ? '#6366f1' : 'rgba(99,102,241,0.28)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      border: 'none', padding: 0,
    }),

    /* Thumbnail strip */
    thumbStrip: {
      display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4,
    },
    thumbItem: (active) => ({
      width: 52, height: 52, borderRadius: 10, overflow: 'hidden', flexShrink: 0,
      border: active ? '2px solid #6366f1' : '2px solid rgba(99,102,241,0.18)',
      cursor: 'pointer', transition: 'border-color 0.2s',
      boxShadow: active ? '0 0 10px rgba(99,102,241,0.35)' : 'none',
    }),
    thumbImg: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },

    infoCol: { display: 'flex', flexDirection: 'column', gap: 24 },
    badge: {
      display: 'inline-block', background: 'rgba(99,102,241,0.15)',
      border: '1px solid rgba(99,102,241,0.3)', color: '#a5b4fc', borderRadius: 999,
      padding: '4px 14px', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em',
      textTransform: 'uppercase', width: 'fit-content',
    },
    productName: {
      fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 700,
      lineHeight: 1.15, color: '#f1f5f9', letterSpacing: '-0.02em', margin: 0,
    },
    productDesc: { fontSize: 15, lineHeight: 1.75, color: '#94a3b8', margin: 0 },
    divider: { height: 1, background: 'linear-gradient(90deg, rgba(99,102,241,0.25), transparent)', border: 'none', margin: 0 },
    priceRow: { display: 'flex', alignItems: 'center', gap: 16 },
    priceLabel: { fontSize: 13, color: '#64748b', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' },
    price: {
      fontFamily: "'Space Grotesk', sans-serif", fontSize: 40, fontWeight: 800,
      background: 'linear-gradient(135deg, #a5b4fc 0%, #818cf8 100%)',
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      backgroundClip: 'text', letterSpacing: '-0.03em', lineHeight: 1,
    },
    ownerCard: {
      background: ownerHover ? 'rgba(99,102,241,0.13)' : 'rgba(99,102,241,0.06)',
      border: ownerHover ? '1px solid rgba(99,102,241,0.40)' : '1px solid rgba(99,102,241,0.18)',
      borderRadius: 16, padding: '20px 24px',
      display: 'flex', alignItems: 'center', gap: 16,
      cursor: 'pointer',
      transform: ownerHover ? 'translateY(-2px)' : 'translateY(0)',
      boxShadow: ownerHover ? '0 8px 32px rgba(99,102,241,0.18)' : 'none',
      transition: 'all 0.22s ease',
    },
    avatarOuter: {
      width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
      background: 'conic-gradient(from 0deg, #6366f1, #8b5cf6, #a78bfa, #6366f1)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2,
    },
    avatarInner: {
      width: '100%', height: '100%', borderRadius: '50%', background: '#0f0f1e',
      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
    },
    avatarInitial: { fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: '#a5b4fc' },
    ownerInfo: { display: 'flex', flexDirection: 'column', gap: 2, flex: 1 },
    ownerSectionLabel: { fontSize: 11, color: '#64748b', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 },
    ownerName: { fontSize: 16, fontWeight: 600, color: '#e2e8f0', fontFamily: "'Space Grotesk', sans-serif" },
    ownerEmail: { fontSize: 13, color: '#64748b' },
    chevron: { color: ownerHover ? '#a5b4fc' : '#475569', transition: 'color 0.2s, transform 0.2s', transform: ownerHover ? 'translateX(4px)' : 'translateX(0)' },
    ctaCol: { display: 'flex', flexDirection: 'column', gap: 12, marginTop: 'auto' },
    ctaRow: { display: 'flex', gap: 12 },
    btnPrimary: {
      flex: 1, padding: '14px 24px', borderRadius: 12, border: 'none',
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer',
      fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.01em',
      boxShadow: '0 4px 24px rgba(99,102,241,0.35)', transition: 'opacity 0.2s, transform 0.15s',
    },
    btnBidActive: {
      flex: 1, padding: '14px 24px', borderRadius: 12,
      border: '1px solid rgba(99,102,241,0.6)', background: 'rgba(99,102,241,0.15)',
      color: '#a5b4fc', fontSize: 15, fontWeight: 600, cursor: 'pointer',
      fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.01em', transition: 'all 0.2s',
    },
    btnBuyActive: {
      flex: 1, padding: '14px 24px', borderRadius: 12,
      border: '1px solid rgba(52,211,153,0.45)', background: 'rgba(52,211,153,0.10)',
      color: '#34d399', fontSize: 15, fontWeight: 600, cursor: 'pointer',
      fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.01em', transition: 'all 0.2s',
    },
    btnBuySuccess: {
      flex: 1, padding: '14px 24px', borderRadius: 12,
      background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.3)',
      color: '#34d399', fontSize: 15, fontWeight: 600,
      fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.01em',
      cursor: 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    },
    bidPanel: {
      overflow: 'hidden',
      maxHeight: bidOpen ? '120px' : '0px',
      opacity: bidOpen ? 1 : 0,
      transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease',
    },
    bidInner: { paddingTop: 4, display: 'flex', gap: 10, alignItems: 'center' },
    bidInputWrap: { flex: 1, position: 'relative', display: 'flex', alignItems: 'center' },
    bidRupee: {
      position: 'absolute', left: 14,
      fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 600,
      color: bidFocus ? '#a5b4fc' : '#64748b', transition: 'color 0.2s',
      pointerEvents: 'none', lineHeight: 1,
    },
    bidInput: {
      width: '100%', padding: '13px 14px 13px 30px', borderRadius: 12,
      border: bidFocus ? '1px solid rgba(99,102,241,0.6)' : '1px solid rgba(99,102,241,0.22)',
      background: bidFocus ? 'rgba(99,102,241,0.10)' : 'rgba(99,102,241,0.05)',
      color: '#f1f5f9', fontSize: 15, fontWeight: 600,
      fontFamily: "'Space Grotesk', sans-serif", outline: 'none',
      boxShadow: bidFocus ? '0 0 0 3px rgba(99,102,241,0.15)' : 'none',
      transition: 'all 0.2s', boxSizing: 'border-box',
    },
    bidSubmitBtn: {
      padding: '13px 20px', borderRadius: 12, border: 'none',
      background: bidAmount && !isNaN(bidAmount) && Number(bidAmount) > 0
        ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' : 'rgba(99,102,241,0.15)',
      color: bidAmount && !isNaN(bidAmount) && Number(bidAmount) > 0 ? '#fff' : '#475569',
      fontSize: 14, fontWeight: 600, cursor: 'pointer',
      fontFamily: "'Space Grotesk', sans-serif",
      boxShadow: bidAmount && !isNaN(bidAmount) && Number(bidAmount) > 0 ? '0 4px 16px rgba(99,102,241,0.35)' : 'none',
      transition: 'all 0.2s', whiteSpace: 'nowrap', opacity: bidSubmitting ? 0.7 : 1,
    },
    buyPanel: {
      overflow: 'hidden',
      maxHeight: buyOpen ? '160px' : '0px',
      opacity: buyOpen ? 1 : 0,
      transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease',
    },
    buyConfirmBox: {
      background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.22)',
      borderRadius: 14, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12,
    },
    buyConfirmText: { fontSize: 13, color: '#94a3b8', lineHeight: 1.6 },
    buyConfirmHighlight: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: '#f1f5f9' },
    buyConfirmActions: { display: 'flex', gap: 10 },
    btnConfirm: {
      flex: 1, padding: '11px 18px', borderRadius: 10, border: 'none',
      background: 'linear-gradient(135deg, #059669 0%, #34d399 100%)',
      color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer',
      fontFamily: "'Space Grotesk', sans-serif",
      boxShadow: '0 4px 16px rgba(52,211,153,0.3)', transition: 'opacity 0.2s',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
      opacity: buySubmitting ? 0.7 : 1,
    },
    btnCancelBuy: {
      padding: '11px 16px', borderRadius: 10, border: '1px solid rgba(100,116,139,0.3)',
      background: 'rgba(100,116,139,0.08)', color: '#64748b', fontSize: 14, fontWeight: 600,
      cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif", transition: 'background 0.2s',
    },
    successPanel: {
      overflow: 'hidden',
      maxHeight: buySuccess ? '100px' : '0px',
      opacity: buySuccess ? 1 : 0,
      transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease',
    },
    successBanner: {
      background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.25)',
      borderRadius: 14, padding: '14px 18px', display: 'flex', alignItems: 'flex-start', gap: 12,
    },
    successIconWrap: {
      width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
      background: 'rgba(52,211,153,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    successTextCol: { display: 'flex', flexDirection: 'column', gap: 3 },
    successTitle: { fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: '#34d399' },
    successSub: { fontSize: 12, color: '#64748b', lineHeight: 1.5 },
    dashboardLink: {
      fontSize: 12, color: '#a5b4fc', fontWeight: 600, cursor: 'pointer',
      background: 'none', border: 'none', padding: 0, marginTop: 2,
      textDecoration: 'underline', textUnderlineOffset: 3,
      fontFamily: "'Space Grotesk', sans-serif",
    },
    loginPromptPanel: {
      overflow: 'hidden',
      maxHeight: loginPrompt ? '110px' : '0px',
      opacity: loginPrompt ? 1 : 0,
      transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease',
    },
    loginPromptBox: {
      background: 'rgba(99,102,241,0.07)',
      border: '1px solid rgba(99,102,241,0.25)',
      borderRadius: 14, padding: '14px 18px',
      display: 'flex', alignItems: 'center', gap: 14,
    },
    loginIconWrap: {
      width: 36, height: 36, borderRadius: 10, flexShrink: 0,
      background: 'rgba(99,102,241,0.14)', border: '1px solid rgba(99,102,241,0.25)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    loginPromptText: { fontSize: 13, color: '#94a3b8', lineHeight: 1.5, flex: 1 },
    loginPromptHighlight: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: '#f1f5f9' },
    btnLoginNow: {
      padding: '9px 18px', borderRadius: 10, border: 'none', flexShrink: 0,
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer',
      fontFamily: "'Space Grotesk', sans-serif",
      boxShadow: '0 3px 12px rgba(99,102,241,0.35)',
      transition: 'opacity 0.2s',
    },
    stateWrap: { minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 },
    spinnerRing: { width: 48, height: 48, borderRadius: '50%', border: '3px solid rgba(99,102,241,0.2)', borderTopColor: '#6366f1', animation: 'spin 0.8s linear infinite' },
    spinnerSm: { width: 14, height: 14, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.25)', borderTopColor: '#fff', display: 'inline-block', animation: 'spin 0.7s linear infinite' },
    btnSecondary: {
      padding: '14px 20px', borderRadius: 12, border: '1px solid rgba(99,102,241,0.35)',
      background: 'rgba(99,102,241,0.08)', color: '#a5b4fc', fontSize: 15, fontWeight: 600,
      cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif", transition: 'background 0.2s',
    },
  };

  if (loading) return (
    <div style={styles.page}><div style={styles.dotGrid} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{ ...styles.container, ...styles.stateWrap }}>
        <div style={styles.spinnerRing} />
        <p style={{ color: '#64748b', fontSize: 14 }}>Loading product…</p>
      </div>
    </div>
  );

  if (error) return (
    <div style={styles.page}><div style={styles.dotGrid} />
      <div style={{ ...styles.container, ...styles.stateWrap }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <p style={{ color: '#f87171', fontSize: 16, fontWeight: 500 }}>{error}</p>
        <button style={styles.btnSecondary} onClick={getProduct}>Try again</button>
      </div>
    </div>
  );

  const owner = product?.productOwner || product?.user || {};
  const ownerInitial = (owner.fullname || owner.username || 'U')[0].toUpperCase();
  const ownerId = owner._id || owner.id;

  return (
    <div style={styles.page}>
      <div style={styles.dotGrid} />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
        .nav-arrow:hover { background: rgba(99,102,241,0.35) !important; border-color: rgba(99,102,241,0.6) !important; }
        .thumb-strip::-webkit-scrollbar { height: 3px; }
        .thumb-strip::-webkit-scrollbar-track { background: transparent; }
        .thumb-strip::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.3); border-radius: 99px; }
        @media (max-width: 768px) {
          .pd-card { grid-template-columns: 1fr !important; padding: 28px !important; }
          .pd-name { font-size: 26px !important; }
          .pd-price { font-size: 30px !important; }
        }
      `}</style>

      <div style={styles.container}>
        <button style={styles.backBtn} onClick={() => window.history.back()}
          onMouseEnter={e => e.target.style.color = '#c7d2fe'}
          onMouseLeave={e => e.target.style.color = '#a5b4fc'}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to products
        </button>

        <div className="pd-card" style={styles.card}>

          {/* ── Image section with carousel ── */}
          <div style={styles.imageSection}>
            <div style={styles.imageWrapper}>
              <div style={styles.conicRing} />
              <div style={styles.imageInner}>
                {images.length > 0 ? (
                  <img
                    key={activeImg}
                    src={images[activeImg]}
                    alt={`${product.productName} ${activeImg + 1}`}
                    style={{ ...styles.productImage, opacity: imgLoaded ? 1 : 0 }}
                    onLoad={() => setImgLoaded(true)}
                  />
                ) : (
                  <div style={styles.imagePlaceholder}>
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(99,102,241,0.35)" strokeWidth="1">
                      <rect x="3" y="3" width="18" height="18" rx="3" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                )}

                {/* Prev arrow */}
                {totalImgs > 1 && (
                  <button className="nav-arrow" style={styles.navBtn('left')} onClick={prevImg} aria-label="Previous image">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                )}

                {/* Next arrow */}
                {totalImgs > 1 && (
                  <button className="nav-arrow" style={styles.navBtn('right')} onClick={nextImg} aria-label="Next image">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                )}

                {/* Counter pill */}
                {totalImgs > 1 && (
                  <div style={styles.counterPill}>{activeImg + 1} / {totalImgs}</div>
                )}
              </div>
            </div>

            {/* Dot strip — up to 5 images */}
            {totalImgs > 1 && totalImgs <= 5 && (
              <div style={styles.dotStrip}>
                {images.map((_, i) => (
                  <button key={i} style={styles.dot(i === activeImg)} onClick={() => { setImgLoaded(false); setActiveImg(i); }} aria-label={`Go to image ${i + 1}`} />
                ))}
              </div>
            )}

            {/* Thumbnail strip — 6+ images */}
            {totalImgs >= 6 && (
              <div className="thumb-strip" style={styles.thumbStrip}>
                {images.map((src, i) => (
                  <div key={i} style={styles.thumbItem(i === activeImg)} onClick={() => { setImgLoaded(false); setActiveImg(i); }}>
                    <img src={src} alt={`Thumb ${i + 1}`} style={styles.thumbImg} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Info column ── */}
          <div style={styles.infoCol}>
            <span style={styles.badge}>{product?.category || 'Product'}</span>

            <h1 className="pd-name" style={styles.productName}>
              {product?.productName || product?.name || 'Unnamed Product'}
            </h1>

            <p style={styles.productDesc}>
              {product?.productDescription || product?.description || 'No description available.'}
            </p>

            <hr style={styles.divider} />

            <div style={styles.priceRow}>
              <div>
                <div style={styles.priceLabel}>Price</div>
                <div className="pd-price" style={styles.price}>
                  ₹{Number(product?.productPrice ?? product?.price ?? 0).toLocaleString('en-IN')}
                </div>
              </div>
              {product?.stock !== undefined && (
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                  <div style={styles.priceLabel}>In Stock</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: product.stock > 0 ? '#34d399' : '#f87171' }}>
                    {product.stock > 0 ? product.stock : 'Sold out'}
                  </div>
                </div>
              )}
            </div>

            <hr style={styles.divider} />

            {/* Owner card */}
            <div>
              <p style={styles.ownerSectionLabel}>Listed by</p>
              <div style={styles.ownerCard} role="button" tabIndex={0}
                aria-label={`View profile of ${owner.fullname || owner.username}`}
                onMouseEnter={() => setOwnerHover(true)}
                onMouseLeave={() => setOwnerHover(false)}
                onClick={() => ownerId && navigate(`/owner/${ownerId}`)}
                onKeyDown={e => e.key === 'Enter' && ownerId && navigate(`/owner/${ownerId}`)}>
                <div style={styles.avatarOuter}>
                  <div style={styles.avatarInner}>
                    {owner.avatar ? (
                      <img src={owner.avatar} alt={owner.fullname} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <span style={styles.avatarInitial}>{ownerInitial}</span>
                    )}
                  </div>
                </div>
                <div style={styles.ownerInfo}>
                  <span style={styles.ownerName}>{owner.fullname || owner.username || 'Unknown Seller'}</span>
                  {owner.email && <span style={styles.ownerEmail}>{owner.email}</span>}
                </div>
                <svg style={styles.chevron} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </div>

            {/* CTAs */}
            <div style={styles.ctaCol}>
              <div style={styles.ctaRow}>
                <button style={bidOpen ? styles.btnBidActive : styles.btnPrimary} onClick={handleBidClick}
                  onMouseEnter={e => { if (!bidOpen) e.currentTarget.style.opacity = '0.88' }}
                  onMouseLeave={e => { if (!bidOpen) e.currentTarget.style.opacity = '1' }}
                  onMouseDown={e => { if (!bidOpen) e.currentTarget.style.transform = 'scale(0.97)' }}
                  onMouseUp={e => { if (!bidOpen) e.currentTarget.style.transform = 'scale(1)' }}>
                  {bidOpen ? (
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                      Cancel
                    </span>
                  ) : 'Bid'}
                </button>

                {buySuccess ? (
                  <div style={styles.btnBuySuccess}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Request Sent
                  </div>
                ) : (
                  <button style={buyOpen ? styles.btnBuyActive : styles.btnPrimary} onClick={handleBuyClick}
                    onMouseEnter={e => { if (!buyOpen) e.currentTarget.style.opacity = '0.88' }}
                    onMouseLeave={e => { if (!buyOpen) e.currentTarget.style.opacity = '1' }}
                    onMouseDown={e => { if (!buyOpen) e.currentTarget.style.transform = 'scale(0.97)' }}
                    onMouseUp={e => { if (!buyOpen) e.currentTarget.style.transform = 'scale(1)' }}>
                    {buyOpen ? (
                      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                        Cancel
                      </span>
                    ) : 'Buy'}
                  </button>
                )}
              </div>

              {/* ── Login prompt panel ── */}
              <div style={styles.loginPromptPanel}>
                <div style={styles.loginPromptBox}>
                  <div style={styles.loginIconWrap}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3"/>
                    </svg>
                  </div>
                  <p style={styles.loginPromptText}>
                    You need to <span style={styles.loginPromptHighlight}>log in</span> to{' '}
                    {loginPrompt === 'bid' ? 'place a bid' : 'send a buy request'} on this product.
                  </p>
                  <button
                    style={styles.btnLoginNow}
                    onClick={() => navigate('/login')}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    Log In
                  </button>
                </div>
              </div>

              {/* Bid panel */}
              <div style={styles.bidPanel}>
                <div style={styles.bidInner}>
                  <div style={styles.bidInputWrap}>
                    <span style={styles.bidRupee}>₹</span>
                    <input type="number" placeholder="Enter your bid amount" value={bidAmount}
                      onChange={e => setBidAmount(e.target.value)}
                      onFocus={() => setBidFocus(true)} onBlur={() => setBidFocus(false)}
                      onKeyDown={e => e.key === 'Enter' && handleBidSubmit()}
                      style={styles.bidInput} autoFocus={bidOpen} min="1" />
                  </div>
                  <button style={styles.bidSubmitBtn} onClick={handleBidSubmit} disabled={bidSubmitting}>
                    {bidSubmitting ? <span style={styles.spinnerSm} /> : 'Place Bid'}
                  </button>
                </div>
              </div>

              {/* Buy confirm panel */}
              <div style={styles.buyPanel}>
                <div style={styles.buyConfirmBox}>
                  <p style={styles.buyConfirmText}>
                    You're about to send a <span style={styles.buyConfirmHighlight}>Buy Request</span> for{' '}
                    <span style={styles.buyConfirmHighlight}>₹{Number(product?.productPrice ?? 0).toLocaleString('en-IN')}</span>{' '}
                    to <span style={styles.buyConfirmHighlight}>{owner.fullname || owner.username || 'the seller'}</span>.
                    They'll be notified and can accept or decline.
                  </p>
                  <div style={styles.buyConfirmActions}>
                    <button style={styles.btnConfirm} onClick={handleBuyConfirm} disabled={buySubmitting}
                      onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                      onMouseLeave={e => e.currentTarget.style.opacity = buySubmitting ? '0.7' : '1'}>
                      {buySubmitting ? <span style={styles.spinnerSm} /> : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                      {buySubmitting ? 'Sending…' : 'Confirm Purchase Request'}
                    </button>
                    <button style={styles.btnCancelBuy} onClick={() => setBuyOpen(false)}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(100,116,139,0.15)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'rgba(100,116,139,0.08)'}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>

              {/* Success banner */}
              <div style={styles.successPanel}>
                <div style={styles.successBanner}>
                  <div style={styles.successIconWrap}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div style={styles.successTextCol}>
                    <span style={styles.successTitle}>Your request has been sent!</span>
                    <span style={styles.successSub}>Check your dashboard for updates once the seller responds.</span>
                    <button style={styles.dashboardLink} onClick={() => navigate('/dashboard')}>Go to Dashboard →</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default productDetails;
