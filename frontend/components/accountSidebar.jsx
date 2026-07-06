import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const accountSidebar = ({ user, activeTab, setActiveTab }) => {

    const navigate = useNavigate()
    const [imgHovered, setImgHovered] = useState(false)

    const handleLogout = async () => {
        try {
            const res = await axios.post('http://localhost:4000/users/logout',
                {},
                { withCredentials: true }
            )
            if (res.data.success === true) {
                navigate('/login')
            }
        } catch (error) {
            if (error.response?.data?.success === false) {
                navigate('/login')
            }
        }
    }

    const menuItems = [
        {
            id: 'update',
            icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
            ),
            label: 'Update Details',
        },
        {
            id: 'password',
            icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
            ),
            label: 'Change Password',
        },
    ]

    return (
        <>
        <style>{`
            @keyframes sidebar-glow {
                0%,100% { opacity: 0.25; transform: scale(1);   }
                50%      { opacity: 0.45; transform: scale(1.06); }
            }
            @keyframes avatar-ring {
                0%,100% { box-shadow: 0 0 0 3px rgba(196,162,255,0.35), 0 0 22px rgba(132,85,239,0.3); }
                50%      { box-shadow: 0 0 0 3px rgba(126,184,255,0.55), 0 0 32px rgba(132,85,239,0.45); }
            }
            .sidebar-menu-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 11px 14px;
                border-radius: 12px;
                border: 1px solid transparent;
                cursor: pointer;
                transition: background 0.2s, border-color 0.2s, transform 0.18s, color 0.2s;
                font-size: 14px;
                font-weight: 500;
                color: rgba(255,255,255,0.52);
                background: transparent;
                width: 100%;
                text-align: left;
                position: relative;
                overflow: hidden;
            }
            .sidebar-menu-item:hover {
                background: rgba(132,85,239,0.1);
                border-color: rgba(196,162,255,0.22);
                color: rgba(255,255,255,0.85);
                transform: translateX(3px);
            }
            .sidebar-menu-item.active {
                background: rgba(132,85,239,0.18);
                border-color: rgba(196,162,255,0.35);
                color: #C4A2FF;
            }
            .sidebar-menu-item.active .menu-icon {
                color: #C4A2FF;
            }
            .sidebar-menu-item .menu-icon {
                color: rgba(255,255,255,0.38);
                transition: color 0.2s;
                flex-shrink: 0;
            }
            .sidebar-menu-item:hover .menu-icon {
                color: rgba(255,255,255,0.75);
            }
            .logout-btn {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 11px 14px;
                border-radius: 12px;
                border: 1px solid rgba(255,100,100,0.2);
                cursor: pointer;
                transition: background 0.2s, border-color 0.2s, transform 0.18s;
                font-size: 14px;
                font-weight: 500;
                color: rgba(255,120,120,0.7);
                background: rgba(255,80,80,0.06);
                width: 100%;
                text-align: left;
            }
            .logout-btn:hover {
                background: rgba(255,80,80,0.14);
                border-color: rgba(255,100,100,0.4);
                color: #ff8080;
                transform: translateX(3px);
            }
            .logout-btn:hover .logout-icon {
                color: #ff8080;
            }
            .logout-icon {
                color: rgba(255,120,120,0.5);
                transition: color 0.2s;
                flex-shrink: 0;
            }
            .info-field {
                display: flex;
                flex-direction: column;
                gap: 3px;
                padding: 10px 13px;
                border-radius: 10px;
                background: rgba(255,255,255,0.03);
                border: 1px solid rgba(196,162,255,0.1);
            }
            .info-field-label {
                font-size: 10px;
                font-weight: 600;
                letter-spacing: 0.07em;
                text-transform: uppercase;
                color: rgba(255,255,255,0.3);
            }
            .info-field-value {
                font-size: 13px;
                font-weight: 500;
                color: rgba(255,255,255,0.7);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        `}</style>

        <div style={{
            width: '270px',
            minWidth: '270px',
            minHeight: '100vh',
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(196,162,255,0.12)',
            display: 'flex',
            flexDirection: 'column',
            padding: '32px 20px 28px',
            position: 'relative',
            gap: '0',
            boxSizing: 'border-box',
        }}>

            {/* ambient glow */}
            <div style={{
                position: 'absolute',
                width: '260px',
                height: '260px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(196,162,255,0.15) 0%, rgba(126,184,255,0.08) 55%, transparent 100%)',
                top: '10%',
                left: '50%',
                transform: 'translateX(-50%)',
                animation: 'sidebar-glow 6s ease-in-out infinite',
                filter: 'blur(28px)',
                pointerEvents: 'none',
                zIndex: 0,
            }} />

            {/* ── PROFILE SECTION ── */}
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '28px' }}>

                {/* avatar wrapper */}
                <div
                    style={{ position: 'relative', marginBottom: '14px', cursor: 'pointer' }}
                    onMouseEnter={() => setImgHovered(true)}
                    onMouseLeave={() => setImgHovered(false)}
                >
                    <div style={{
                        width: '82px',
                        height: '82px',
                        borderRadius: '50%',
                        animation: 'avatar-ring 3.5s ease-in-out infinite',
                        overflow: 'hidden',
                        position: 'relative',
                        flexShrink: 0,
                    }}>
                        {user?.profileImage ? (
                            <img
                                src={user.profileImage}
                                alt="profile"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                            />
                        ) : (
                            <div style={{
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(135deg, rgba(196,162,255,0.25) 0%, rgba(126,184,255,0.18) 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '30px',
                                fontWeight: 700,
                                color: '#C4A2FF',
                            }}>
                                {user?.name ? user.name.charAt(0).toUpperCase() : '?'}
                            </div>
                        )}

                        {/* hover overlay */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(0,0,0,0.52)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: imgHovered ? 1 : 0,
                            transition: 'opacity 0.2s',
                            flexDirection: 'column',
                            gap: '3px',
                        }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C4A2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                <circle cx="12" cy="13" r="4" />
                            </svg>
                            <span style={{ fontSize: '9px', color: '#C4A2FF', fontWeight: 600, letterSpacing: '0.04em' }}>Change</span>
                        </div>
                    </div>

                    {/* online dot */}
                    <span style={{
                        position: 'absolute',
                        bottom: '4px',
                        right: '4px',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: '#4ade80',
                        border: '2px solid rgba(15,15,20,0.9)',
                        zIndex: 2,
                    }} />
                </div>

                {/* name */}
                <div style={{
                    fontSize: '17px',
                    fontWeight: 700,
                    color: 'var(--text)',
                    marginBottom: '3px',
                    textAlign: 'center',
                    maxWidth: '220px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}>
                    {user?.name || 'Student Name'}
                </div>

                {/* username */}
                <div style={{
                    fontSize: '12px',
                    fontWeight: 500,
                    background: 'linear-gradient(90deg, #C4A2FF, #7EB8FF)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '14px',
                }}>
                    @{user?.username || 'username'}
                </div>

                {/* info fields — email */}
                <div className='info-field' style={{ width: '100%' }}>
                    <span className='info-field-label'>Email</span>
                    <span className='info-field-value'>{user?.email || 'you@college.edu'}</span>
                </div>
            </div>

            {/* divider */}
            <div style={{
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(196,162,255,0.2), transparent)',
                marginBottom: '20px',
                position: 'relative',
                zIndex: 1,
            }} />

            {/* ── MENU ITEMS ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, position: 'relative', zIndex: 1 }}>

                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        className={`sidebar-menu-item ${activeTab === item.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(item.id)}
                    >
                        {/* active left bar */}
                        {activeTab === item.id && (
                            <span style={{
                                position: 'absolute',
                                left: 0,
                                top: '20%',
                                height: '60%',
                                width: '3px',
                                borderRadius: '0 3px 3px 0',
                                background: 'linear-gradient(180deg, #C4A2FF, #7EB8FF)',
                            }} />
                        )}
                        <span className='menu-icon'>{item.icon}</span>
                        {item.label}
                    </button>
                ))}

            </div>

            {/* divider */}
            <div style={{
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(196,162,255,0.15), transparent)',
                margin: '20px 0 16px',
                position: 'relative',
                zIndex: 1,
            }} />

            {/* ── LOGOUT ── */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                <button className='logout-btn' onClick={handleLogout}>
                    <span className='logout-icon'>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                    </span>
                    Log Out
                </button>
            </div>

        </div>
        </>
    )
}

export default accountSidebar
