import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const showcase = () => {
  const navigate = useNavigate();
  const handleClick = async (e) => {
    try {
      const res = await axios.get(`${import.meta.env.RENDER_BACKEND_URL}/users/getuser`,
        { withCredentials: true })

      if (res.data.success === true) {
        navigate('/sell')
      } else {
        navigate('/login')
      }

    } catch (error) {
      if (error.response.data.success === false) {
        navigate("/login")
      }
    }
  }

  const cards = [
    {
      icon: '📚',
      label: 'Assignments & Projects',
      tag: 'Popular',
      tagBg: 'bg-[rgba(126,184,255,0.18)]',
      tagBorder: 'border-[rgba(126,184,255,0.35)]',
      tagText: 'text-[#7EB8FF]',
      meta: '3 students nearby',
      dot: 'bg-[#7EB8FF]',
      desc: 'Hand written assignments',
    },
    {
      icon: '💻',
      label: 'Academic essentials',
      tag: 'Trending',
      tagBg: 'bg-[rgba(196,162,255,0.18)]',
      tagBorder: 'border-[rgba(196,162,255,0.35)]',
      tagText: 'text-[#C4A2FF]',
      meta: '8 listings today',
      dot: 'bg-[#C4A2FF]',
      desc: 'Laptops, accessories, calculators & more',
    },
    {
      icon: '🪑',
      label: 'Guidance and support',
      tag: 'New',
      tagBg: 'bg-[rgba(196,162,255,0.12)]',
      tagBorder: 'border-[rgba(196,162,255,0.25)]',
      tagText: 'text-[#d4b8ff]',
      meta: 'New arrivals',
      dot: 'bg-[#a78bfa]',
      desc: 'Get guidance from experts',
    },
  ];

  return (
    <>
    <style>{`
      @keyframes card-float-1 {
        0%,100% { transform: translateY(0px); }
        50%      { transform: translateY(-10px); }
      }
      @keyframes card-float-2 {
        0%,100% { transform: translateY(0px); }
        50%      { transform: translateY(-8px); }
      }
      @keyframes card-float-3 {
        0%,100% { transform: translateY(0px); }
        50%      { transform: translateY(-12px); }
      }
      @keyframes glow-breathe {
        0%,100% { opacity: 0.3; transform: translate(-50%,-50%) scale(1);    }
        50%      { opacity: 0.55; transform: translate(-50%,-50%) scale(1.1); }
      }
      @keyframes live-ping {
        0%      { transform: scale(1);   opacity: 0.8; }
        75%,100%{ transform: scale(2.2); opacity: 0;   }
      }
      @keyframes ticker-slide {
        0%   { transform: translateX(0%);   }
        100% { transform: translateX(-50%); }
      }
      .showcase-card {
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
      }
      @media (prefers-reduced-motion: reduce) {
        .showcase-card,
        .showcase-card * {
          animation: none !important;
        }
      }
    `}</style>

    <div className="bgnav"></div>

    <div className='flex flex-col lg:flex-row items-center justify-center lg:justify-between
      min-h-[92vh] w-full
      px-5 sm:px-8 md:px-12 lg:pl-[100px] lg:pr-[60px]
      py-14 lg:py-0
      gap-12 lg:gap-8'>

      {/* Text column */}
      <div className='flex flex-col items-center text-center lg:items-start lg:text-left max-w-[560px]'>
        <h1 className='font-bold leading-tight mb-5
          text-[34px] xs:text-4xl sm:text-5xl lg:text-6xl
          text-[var(--text)]'>
          Your Campus
          <br />
          <span className='bg-gradient-to-r from-[#C4A2FF] to-[#7EB8FF] bg-clip-text text-transparent'>
            Marketplace
          </span>
        </h1>

        <p className='text-sm sm:text-base text-[rgba(255,255,255,0.6)] max-w-[440px]'>
          Buy, Sell, and Connect with Students Around You
          <br className='hidden sm:block' />
          {' '}— all within your trusted college community
        </p>

        <div className='flex flex-col sm:flex-row mt-7 gap-4 sm:gap-6 w-full sm:w-auto'>
          <button
            onClick={() => navigate('/college')}
            className="py-[13px] px-[28px] rounded-[var(--radius)] text-[15px] font-semibold text-white bg-[var(--purple)] border-none cursor-pointer shadow-[0_0_28px_rgba(132,85,239,0.55)] transition-[background,box-shadow,transform] duration-200 font-['Inter']
            hover:bg-[#9B6FF5]
            hover:shadow-[0_0_35px_rgba(132,85,239,0.7)]
            hover:-translate-y-0.5
            w-full sm:w-auto"
          >
            Start Exploring
          </button>
          <button
            onClick={handleClick}
            className="py-[13px] px-[28px] rounded-[var(--radius)]
            text-[15px] font-semibold
            text-[var(--neon)]
            bg-[rgba(132,85,239,0.1)]
            border border-[rgba(132,85,239,0.35)]
            cursor-pointer
            transition-[background,border-color,transform] duration-200
            hover:bg-[rgba(132,85,239,0.2)]
            hover:border-[rgba(132,85,239,0.6)]
            hover:-translate-y-0.5
            font-['Inter']
            w-full sm:w-auto"
          >
            Sell Your Item
          </button>
        </div>
      </div>

      {/* Card / showcase column */}
      <div className='relative flex flex-col gap-3.5
        w-full max-w-[360px]
        sm:max-w-[380px]
        lg:w-[300px] lg:min-w-[300px] lg:max-w-[300px] lg:mr-0
        z-[1]'>

        {/* glow */}
        <div className='absolute w-[340px] h-[340px] rounded-full
          top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          bg-[radial-gradient(circle,rgba(196,162,255,0.2)_0%,rgba(126,184,255,0.1)_55%,transparent_100%)]
          blur-[22px] z-0 pointer-events-none
          [animation:glow-breathe_5s_ease-in-out_infinite]' />

        {/* header row */}
        <div className='relative z-[2] flex items-center justify-between mb-0.5'>
          <span className='text-xs font-semibold text-[rgba(255,255,255,0.4)] tracking-[0.08em] uppercase'>
            Browse Categories
          </span>

          <span className='flex items-center gap-[5px] bg-[rgba(74,222,128,0.1)] border border-[rgba(74,222,128,0.3)]
            rounded-full px-[9px] py-[3px] text-[11px] font-semibold text-[#4ade80]'>
            <span className='relative inline-flex w-[7px] h-[7px]'>
              <span className='absolute inset-0 rounded-full bg-[#4ade80]
                [animation:live-ping_1.5s_ease-out_infinite]' />
              <span className='relative block w-[7px] h-[7px] rounded-full bg-[#4ade80]' />
            </span>
            Live
          </span>
        </div>

        {/* cards */}
        {cards.map((c, i) => (
          <div
            key={i}
            className={`showcase-card relative z-[2]
              bg-[rgba(255,255,255,0.045)] backdrop-blur-[16px]
              rounded-2xl px-[18px] py-4
              border border-[rgba(196,162,255,0.18)]
              shadow-[0_4px_28px_rgba(132,85,239,0.13)]
              w-full box-border cursor-default
              transition-[border-color,box-shadow,transform] duration-[250ms]
              hover:border-[rgba(196,162,255,0.42)]
              hover:shadow-[0_8px_36px_rgba(132,85,239,0.28)]
              hover:-translate-y-[3px]`}
            style={{
              animationName: `card-float-${i + 1}`,
              animationDuration: `${3.8 + i * 0.4}s`,
              animationDelay: `${i * 0.6}s`,
            }}
          >
            <div className='flex items-start justify-between mb-[9px]'>
              <div className='flex items-center gap-2.5 min-w-0'>
                <div className='w-[38px] h-[38px] rounded-[10px] bg-[rgba(255,255,255,0.06)]
                  border border-[rgba(255,255,255,0.1)] flex items-center justify-center
                  text-[19px] shrink-0'>
                  {c.icon}
                </div>
                <div className='min-w-0'>
                  <div className='text-[13px] font-bold text-[var(--text)] leading-[1.3]'>{c.label}</div>
                  <div className='flex items-center gap-1 mt-0.5'>
                    <span className={`w-1.5 h-1.5 rounded-full block shrink-0 ${c.dot}`} />
                    <span className='text-[10px] text-[rgba(255,255,255,0.38)]'>{c.meta}</span>
                  </div>
                </div>
              </div>
              <span className={`text-[10px] font-semibold rounded-full px-[9px] py-[3px]
                whitespace-nowrap mt-0.5 shrink-0 border ${c.tagBg} ${c.tagBorder} ${c.tagText}`}>
                {c.tag}
              </span>
            </div>

            <p className='text-[11.5px] text-[rgba(255,255,255,0.38)] m-0 mb-[11px] leading-[1.55]'>
              {c.desc}
            </p>

            <div className='h-px bg-[rgba(196,162,255,0.1)] mb-[11px]' />
          </div>
        ))}

        {/* ticker */}
        <div className='relative z-[2] overflow-hidden rounded-[10px]
          bg-[rgba(255,255,255,0.04)] border border-[rgba(196,162,255,0.14)]
          py-[7px]
          [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]
          [-webkit-mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]'>
          <div className='flex gap-8 w-max whitespace-nowrap
            [animation:ticker-slide_14s_linear_infinite]'>
            {['📖 Notes shared', '🛋 Room essentials', '🎒 Bags & gear', '🔬 Lab equipment', '🖨 Printer access',
              '📖 Notes shared', '🛋 Room essentials', '🎒 Bags & gear', '🔬 Lab equipment', '🖨 Printer access'].map((t, i) => (
              <span key={i} className='text-[11px] text-[rgba(255,255,255,0.32)] font-medium'>{t}</span>
            ))}
          </div>
        </div>

      </div>
    </div>
    </>
  )
}

export default showcase