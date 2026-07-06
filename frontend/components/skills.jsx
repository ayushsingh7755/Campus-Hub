import React from 'react'

function skills() {
  return (
    <>
       <div className='bg-[var(--bg2)] py-[90px] py-[5%]  '>
      <div className='  flex flex-col justify-center items-center  gap-4 mb-[50px]'>
        <p className=" bg-[rgba(132,85,239,.12)] text-[12px] font-semibold border border-[rgba(132,85,239,0.25)] rounded-[100px] pt-[4px] pb-[4px] pl-[14px] pr-[14px]">Services</p>
        <h2 className="text-4xl font-extrabold text-[var(--text)] font-['Space_Grotesk',sans-serif] leading-[1.2] max-[690px]:text-2xl max-[690px]:w-full max-[690px]:text-center">Skills your peers are offering</h2>
        <p className='text-[var(--text-muted)] text-[16px] leading-2 max-[690px]:text-[11px] max-[690px]:text-center '>Hire fellow students for affordable, high-quality services you can actually trust.</p>
        
    </div>
    <div className="flex flex-wrap gap-4 justify-center ">
      <div class="service-card">
        <div class="service-icon">📐</div>
        <div class="service-name">Tutoring</div>
        <div class="service-tag">Maths · Physics · CS</div>
      </div>
      <div class="service-card">
        <div class="service-icon">🎨</div>
        <div class="service-name">Graphic Design</div>
        <div class="service-tag">Posters · Logos · UI</div>
      </div>
      <div class="service-card">
        <div class="service-icon">🔧</div>
        <div class="service-name">Repairs</div>
        <div class="service-tag">Devices · Bikes · More</div>
      </div>
      <div class="service-card">
        <div class="service-icon">🎤</div>
        <div class="service-name">Event Services</div>
        <div class="service-tag">Photography · MC · DJ</div>
      </div>
      <div class="service-card">
        <div class="service-icon">💻</div>
        <div class="service-name">Coding Help</div>
        <div class="service-tag">Projects · Debugging</div>
      </div>
      <div class="service-card">
        <div class="service-icon">✍️</div>
        <div class="service-name">Content Writing</div>
        <div class="service-tag">Essays · Blogs · Reports</div>
      </div>
    </div>
      
    </div>
    </>
  )
}

export default skills
