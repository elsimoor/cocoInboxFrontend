// "use client"

// import { useRef } from "react"

// import type React from "react"

// const HeroSection: React.FC = () => {
//   const heroRef = useRef<HTMLDivElement>(null)

//   const handleParallax = (e: React.MouseEvent<HTMLDivElement>) => {
//     const root = heroRef.current
//     if (!root) return
//     const rect = root.getBoundingClientRect()
//     const x = (e.clientX - rect.left) / rect.width - 0.5
//     const y = (e.clientY - rect.top) / rect.height - 0.5
//     // Parallax layers move at different speeds based on data-speed
//     root.querySelectorAll<HTMLElement>("[data-speed]").forEach((el) => {
//       const speed = Number(el.dataset.speed || "0.1")
//       const tx = -x * 30 * speed
//       const ty = -y * 30 * speed
//       el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`
//     })
//   }

//   const resetParallax = () => {
//     const root = heroRef.current
//     if (!root) return
//     root.querySelectorAll<HTMLElement>("[data-speed]").forEach((el) => {
//       el.style.transform = "translate3d(0,0,0)"
//     })
//   }

//   const handleCopy = (email: string, e: React.MouseEvent) => {
//     // Implement copy functionality here
//     navigator.clipboard
//       .writeText(email)
//       .then(() => {
//         alert("Email copied to clipboard!")
//       })
//       .catch((err) => {
//         console.error("Failed to copy email: ", err)
//       })
//   }

//   return (
//     <div className="tropical-page">
//       {/* Navbar */}
//       {/* <nav className="navbar">
//         <div className="nav-container">
//           <div className="nav-logo">
//             <span className="logo-icon">🥥</span>
//             <span className="logo-text">Cocoinbox</span>
//           </div>
//           <div className="nav-menu">
//             <a href="#services" className="nav-item">
//               PRICING
//             </a>
//             <a href="#about" className="nav-item">
//               ABOUT US
//             </a>
//             <a href="#faq" className="nav-item">
//               FAQ
//             </a>
//             <a href="#contact" className="nav-item">
//               CONTACT
//             </a>
//             <a href="#blog" className="nav-item">
//               BLOG
//             </a>
//             <button className="nav-login">LOGIN / SIGN UP</button>
//           </div>
//         </div>
//       </nav> */}

//       <section className="hero-section">
//         <div className="hero-container" ref={heroRef} onMouseMove={handleParallax} onMouseLeave={resetParallax}>
//           {/* Cloud badge with eSIMs text */}
//           <div className="cloud-badge parallax-layer" data-speed="0.05">
//             <svg className="cloud-badge-svg" viewBox="0 0 180 70" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <ellipse cx="90" cy="45" rx="85" ry="25" fill="white" opacity="0.9" />
//               <circle cx="50" cy="35" r="30" fill="white" />
//               <circle cx="90" cy="30" r="35" fill="white" />
//               <circle cx="130" cy="35" r="30" fill="white" />
//             </svg>
//             <span className="cloud-text">eSIMs</span>
//           </div>

//           {/* Main tropical scene */}
//           <div className="tropical-scene">
//             {/* Sky background with decorative clouds */}
//             <div className="sky-clouds parallax-layer" data-speed="0.03">
//               <svg
//                 className="decorative-cloud cloud-pos-1"
//                 viewBox="0 0 120 50"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <ellipse cx="60" cy="35" rx="50" ry="15" fill="white" opacity="0.95" />
//                 <circle cx="30" cy="25" r="20" fill="white" opacity="0.95" />
//                 <circle cx="60" cy="20" r="25" fill="white" opacity="0.95" />
//                 <circle cx="90" cy="25" r="20" fill="white" opacity="0.95" />
//               </svg>
//               <svg
//                 className="decorative-cloud cloud-pos-2"
//                 viewBox="0 0 120 50"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <ellipse cx="60" cy="35" rx="50" ry="15" fill="white" opacity="0.9" />
//                 <circle cx="30" cy="25" r="20" fill="white" opacity="0.9" />
//                 <circle cx="60" cy="20" r="25" fill="white" opacity="0.9" />
//                 <circle cx="90" cy="25" r="20" fill="white" opacity="0.9" />
//               </svg>
//               <svg
//                 className="decorative-cloud cloud-pos-3"
//                 viewBox="0 0 100 45"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <ellipse cx="50" cy="32" rx="45" ry="13" fill="white" opacity="0.85" />
//                 <circle cx="25" cy="22" r="18" fill="white" opacity="0.85" />
//                 <circle cx="50" cy="18" r="22" fill="white" opacity="0.85" />
//                 <circle cx="75" cy="22" r="18" fill="white" opacity="0.85" />
//               </svg>
//             </div>

//             {/* Airplane with banner */}
//             <div className="plane-banner parallax-layer" data-speed="0.35">
//               <svg className="airplane-svg" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 {/* Airplane body */}
//                 <ellipse cx="50" cy="35" rx="35" ry="12" fill="#FF9933" />
//                 <ellipse cx="50" cy="35" rx="30" ry="10" fill="#FFAA55" />
//                 {/* Wings */}
//                 <ellipse cx="45" cy="35" rx="25" ry="8" fill="#FF9933" transform="rotate(-20 45 35)" />
//                 <ellipse cx="55" cy="35" rx="25" ry="8" fill="#FF9933" transform="rotate(20 55 35)" />
//                 {/* Propeller */}
//                 <circle cx="20" cy="35" r="8" fill="#666" />
//                 <rect x="18" y="30" width="4" height="10" fill="#333" />
//                 {/* Windows */}
//                 <circle cx="45" cy="32" r="3" fill="#4A90E2" />
//                 <circle cx="55" cy="32" r="3" fill="#4A90E2" />
//                 {/* Tail */}
//                 <path d="M 75 35 L 85 30 L 85 40 Z" fill="#FF9933" />
//               </svg>
//               <div className="banner-flag">
//                 <span className="banner-text">Boite mail éphémère</span>
//               </div>
//             </div>

//             {/* Island with palm tree and treasure */}
//             <div className="island-group parallax-layer" data-speed="0.25">
//               {/* Island base */}
//               <svg className="island-base" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <ellipse cx="100" cy="60" rx="95" ry="20" fill="#D4A574" />
//                 <ellipse cx="100" cy="55" rx="90" ry="18" fill="#E8C090" />
//                 <ellipse cx="100" cy="50" rx="85" ry="16" fill="#F5D5A8" />
//               </svg>

//               {/* Palm tree */}
//               <svg className="palm-tree-svg" viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 {/* Trunk */}
//                 <rect x="35" y="40" width="10" height="60" fill="#8B5A3C" rx="5" />
//                 <ellipse cx="40" cy="50" rx="6" ry="3" fill="#6B4423" />
//                 <ellipse cx="40" cy="65" rx="6" ry="3" fill="#6B4423" />
//                 <ellipse cx="40" cy="80" rx="6" ry="3" fill="#6B4423" />
//                 {/* Palm leaves */}
//                 <ellipse cx="40" cy="30" rx="35" ry="15" fill="#2D8B57" transform="rotate(-30 40 30)" />
//                 <ellipse cx="40" cy="30" rx="35" ry="15" fill="#3AA76D" transform="rotate(-60 40 30)" />
//                 <ellipse cx="40" cy="30" rx="35" ry="15" fill="#2D8B57" transform="rotate(30 40 30)" />
//                 <ellipse cx="40" cy="30" rx="35" ry="15" fill="#3AA76D" transform="rotate(60 40 30)" />
//                 <ellipse cx="40" cy="30" rx="35" ry="15" fill="#47C77F" transform="rotate(0 40 30)" />
//               </svg>

//               {/* Treasure chest */}
//               <div className="treasure-chest-container">
//                 <svg className="treasure-chest-svg" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   {/* Chest base */}
//                   <rect x="15" y="35" width="70" height="40" fill="#D4A029" rx="5" />
//                   <rect x="15" y="35" width="70" height="40" fill="#F5C842" rx="5" opacity="0.8" />
//                   {/* Chest lid */}
//                   <path d="M 15 35 Q 50 15 85 35" fill="#D4A029" />
//                   <path d="M 15 35 Q 50 15 85 35" fill="#F5C842" opacity="0.8" />
//                   {/* Lock */}
//                   <circle cx="50" cy="50" r="8" fill="#8B6914" />
//                   <rect x="48" y="50" width="4" height="12" fill="#8B6914" />
//                   <circle cx="50" cy="48" r="3" fill="#333" />
//                 </svg>
//                 <span className="chest-label">
//                   Notes
//                   <br />
//                   cryptées
//                 </span>
//               </div>
//             </div>

//             {/* Ocean with waves */}
//             <div className="ocean-layer parallax-layer" data-speed="0.2">
//               <svg
//                 className="ocean-waves"
//                 viewBox="0 0 1200 100"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 preserveAspectRatio="none"
//               >
//                 <path
//                   d="M0 50 Q 150 30 300 50 T 600 50 T 900 50 T 1200 50 L 1200 100 L 0 100 Z"
//                   fill="#22D3EE"
//                   opacity="0.6"
//                 />
//                 <path
//                   d="M0 60 Q 150 40 300 60 T 600 60 T 900 60 T 1200 60 L 1200 100 L 0 100 Z"
//                   fill="#06B6D4"
//                   opacity="0.4"
//                 />
//               </svg>

//               {/* Sailboat */}
//               <div className="sailboat-container parallax-layer" data-speed="0.3">
//                 <svg className="sailboat-svg" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   {/* Sail */}
//                   <path d="M 50 20 L 50 80 L 20 80 Z" fill="#F5F5F5" />
//                   <path d="M 50 20 L 50 80 L 20 80 Z" fill="#E8E8E8" opacity="0.7" />
//                   <line x1="50" y1="20" x2="50" y2="80" stroke="#999" strokeWidth="2" />
//                   {/* Boat hull */}
//                   <ellipse cx="50" cy="85" rx="30" ry="8" fill="#E85D4A" />
//                   <path d="M 20 85 Q 50 95 80 85" fill="#D94A3A" />
//                 </svg>
//                 <div className="boat-label">
//                   Transfert
//                   <br />
//                   de fichiers
//                 </div>
//               </div>
//             </div>

//             {/* Beach with coconut character */}
//             <div className="beach-layer parallax-layer" data-speed="0.3">
//               <div className="coconut-character-container">
//                 <svg className="coconut-svg" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   {/* Coconut body */}
//                   <circle cx="40" cy="40" r="35" fill="#6B4423" />
//                   <circle cx="40" cy="40" r="32" fill="#8B5A3C" />
//                   {/* Texture lines */}
//                   <path d="M 15 25 Q 40 30 65 25" stroke="#6B4423" strokeWidth="2" fill="none" />
//                   <path d="M 15 40 Q 40 45 65 40" stroke="#6B4423" strokeWidth="2" fill="none" />
//                   <path d="M 15 55 Q 40 60 65 55" stroke="#6B4423" strokeWidth="2" fill="none" />
//                   {/* Eyes */}
//                   <circle cx="28" cy="35" r="6" fill="white" />
//                   <circle cx="52" cy="35" r="6" fill="white" />
//                   <circle cx="30" cy="35" r="4" fill="#333" />
//                   <circle cx="54" cy="35" r="4" fill="#333" />
//                   <circle cx="31" cy="33" r="2" fill="white" />
//                   <circle cx="55" cy="33" r="2" fill="white" />
//                   {/* Smile */}
//                   <path d="M 25 48 Q 40 58 55 48" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />
//                 </svg>
//               </div>
//             </div>
//           </div>

//           {/* Email Input Card */}
//           <div className="email-card parallax-layer" data-speed="0.15">
//             <div className="email-input-wrapper">
//               <input
//                 type="text"
//                 placeholder="Your temporary email..."
//                 className="email-input"
//                 value={process.env.NEXT_PUBLIC_TEMP_EMAIL || ""}
//                 readOnly
//               />
//               <button className="generate-btn" onClick={(e) => handleCopy(process.env.NEXT_PUBLIC_TEMP_EMAIL || "", e)}>
//                 Generate
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//       {/* </CHANGE> */}

//       {/* Services Section */}

//       {/* Inbox Section */}

//       {/* User Feedback Section */}

//       {/* Footer */}

//       <style jsx>{`
//         * {
//           box-sizing: border-box;
//         }

//         .tropical-page {
//           min-height: 100vh;
//           background: linear-gradient(180deg, #7DD3FC 0%, #38BDF8 50%, #22D3EE 100%);
//           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
//         }

//         /* Navbar */
//         .navbar {
//           background: rgba(6, 182, 212, 0.95);
//           backdrop-filter: blur(10px);
//           border-bottom: 3px solid #0891B2;
//           padding: 1rem 0;
//           position: sticky;
//           top: 0;
//           z-index: 100;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
//         }

//         .nav-container {
//           max-width: 1400px;
//           margin: 0 auto;
//           padding: 0 1.5rem;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           flex-wrap: wrap;
//           gap: 1rem;
//         }

//         .nav-logo {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           font-weight: 800;
//           font-size: 1.5rem;
//           color: white;
//         }

//         .logo-icon {
//           font-size: 2rem;
//         }

//         .nav-menu {
//           display: flex;
//           align-items: center;
//           gap: 1.5rem;
//           flex-wrap: wrap;
//         }

//         .nav-item {
//           color: white;
//           text-decoration: none;
//           font-weight: 600;
//           font-size: 0.75rem;
//           letter-spacing: 0.5px;
//           transition: all 0.2s;
//           padding: 0.5rem;
//           border-radius: 0.5rem;
//         }

//         .nav-item:hover {
//           background: rgba(255, 255, 255, 0.2);
//           transform: translateY(-2px);
//         }

//         .nav-login {
//           background: white;
//           color: #0891B2;
//           border: none;
//           padding: 0.75rem 1.5rem;
//           border-radius: 2rem;
//           font-weight: 700;
//           font-size: 0.75rem;
//           cursor: pointer;
//           transition: all 0.2s;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
//         }

//         .nav-login:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
//         }

//         /* Redesigned hero section styles with professional assets */
//         .hero-section {
//           padding: 2rem 1rem;
//           position: relative;
//           overflow: hidden;
//         }

//         .hero-container {
//           max-width: 1200px;
//           margin: 0 auto;
//           position: relative;
//           min-height: 600px;
//         }

//         .parallax-layer {
//           will-change: transform;
//           transition: transform 150ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
//         }

//         /* Cloud badge */
//         .cloud-badge {
//           position: absolute;
//           top: 20px;
//           left: 30px;
//           z-index: 10;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .cloud-badge-svg {
//           width: 180px;
//           height: 70px;
//           filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
//         }

//         .cloud-text {
//           position: absolute;
//           font-weight: 800;
//           font-size: 1.75rem;
//           color: #334155;
//           letter-spacing: 0.5px;
//         }

//         /* Tropical scene container */
//         .tropical-scene {
//           background: linear-gradient(180deg, #7DD3FC 0%, #38BDF8 35%, #22D3EE 65%, #FDE68A 100%);
//           border-radius: 2rem;
//           position: relative;
//           min-height: 550px;
//           overflow: hidden;
//           box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
//           border: 4px solid rgba(255, 255, 255, 0.3);
//         }

//         /* Sky clouds */
//         .sky-clouds {
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           height: 200px;
//           z-index: 1;
//           pointer-events: none;
//         }

//         .decorative-cloud {
//           position: absolute;
//           filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
//           animation: float 8s ease-in-out infinite;
//         }

//         .cloud-pos-1 {
//           top: 30px;
//           left: 10%;
//           width: 120px;
//           animation-delay: 0s;
//         }

//         .cloud-pos-2 {
//           top: 60px;
//           right: 15%;
//           width: 100px;
//           animation-delay: 2s;
//         }

//         .cloud-pos-3 {
//           top: 100px;
//           left: 50%;
//           width: 90px;
//           animation-delay: 4s;
//         }

//         @keyframes float {
//           0%, 100% {
//             transform: translateY(0px);
//           }
//           50% {
//             transform: translateY(-12px);
//           }
//         }

//         /* Airplane with banner */
//         .plane-banner {
//           position: absolute;
//           top: 80px;
//           right: 12%;
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//           z-index: 3;
//         }

//         .airplane-svg {
//           width: 100px;
//           height: 60px;
//           filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2));
//           animation: fly-wobble 3s ease-in-out infinite;
//         }

//         @keyframes fly-wobble {
//           0%, 100% {
//             transform: translateY(0px) rotate(-5deg);
//           }
//           50% {
//             transform: translateY(-8px) rotate(-3deg);
//           }
//         }

//         .banner-flag {
//           background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
//           padding: 0.75rem 1.25rem;
//           border-radius: 0.75rem;
//           border: 3px solid #F59E0B;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
//         }

//         .banner-text {
//           font-weight: 800;
//           font-size: 0.875rem;
//           color: #92400E;
//           white-space: nowrap;
//           letter-spacing: 0.3px;
//         }

//         /* Island group */
//         .island-group {
//           position: absolute;
//           right: 8%;
//           top: 45%;
//           transform: translateY(-50%);
//           z-index: 4;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//         }

//         .island-base {
//           width: 200px;
//           height: 80px;
//           filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2));
//         }

//         .palm-tree-svg {
//           position: absolute;
//           top: -60px;
//           left: 50%;
//           transform: translateX(-50%);
//           width: 80px;
//           height: 120px;
//           filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2));
//           animation: sway 4s ease-in-out infinite;
//         }

//         @keyframes sway {
//           0%, 100% {
//             transform: translateX(-50%) rotate(0deg);
//           }
//           50% {
//             transform: translateX(-50%) rotate(3deg);
//           }
//         }

//         .treasure-chest-container {
//           position: absolute;
//           top: -20px;
//           right: -40px;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 0.5rem;
//         }

//         .treasure-chest-svg {
//           width: 100px;
//           height: 80px;
//           filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.25));
//         }

//         .chest-label {
//           background: linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%);
//           color: #78350F;
//           padding: 0.75rem 1rem;
//           border-radius: 0.75rem;
//           font-weight: 800;
//           font-size: 0.8rem;
//           text-align: center;
//           line-height: 1.3;
//           border: 3px solid #92400E;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
//           letter-spacing: 0.3px;
//         }

//         /* Ocean layer */
//         .ocean-layer {
//           position: absolute;
//           bottom: 22%;
//           left: 0;
//           right: 0;
//           height: 100px;
//           z-index: 3;
//         }

//         .ocean-waves {
//           width: 100%;
//           height: 100%;
//           opacity: 0.8;
//         }

//         .sailboat-container {
//           position: absolute;
//           left: 28%;
//           top: -40px;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 0.75rem;
//           animation: bob 4s ease-in-out infinite;
//         }

//         @keyframes bob {
//           0%, 100% {
//             transform: translateY(0px) rotate(0deg);
//           }
//           50% {
//             transform: translateY(-10px) rotate(-2deg);
//           }
//         }

//         .sailboat-svg {
//           width: 100px;
//           height: 120px;
//           filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.2));
//         }

//         .boat-label {
//           background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
//           color: white;
//           padding: 0.75rem 1.25rem;
//           border-radius: 0.75rem;
//           font-weight: 800;
//           font-size: 0.8rem;
//           text-align: center;
//           line-height: 1.3;
//           border: 3px solid #991B1B;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
//           letter-spacing: 0.3px;
//         }

//         /* Beach layer */
//         .beach-layer {
//           position: absolute;
//           bottom: 0;
//           left: 0;
//           right: 0;
//           height: 22%;
//           background: linear-gradient(180deg, #FDE68A 0%, #FCD34D 50%, #F59E0B 100%);
//           z-index: 5;
//           border-radius: 0 0 1.75rem 1.75rem;
//         }

//         .coconut-character-container {
//           position: absolute;
//           left: 12%;
//           bottom: 15%;
//         }

//         .coconut-svg {
//           width: 80px;
//           height: 80px;
//           filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.25));
//           animation: bounce 2s ease-in-out infinite;
//         }

//         @keyframes bounce {
//           0%, 100% {
//             transform: translateY(0px);
//           }
//           50% {
//             transform: translateY(-6px);
//           }
//         }

//         /* Email Card */
//         .email-card {
//           position: absolute;
//           top: 140px;
//           left: 30px;
//           width: 100%;
//           max-width: 380px;
//           background: white;
//           padding: 1.5rem;
//           border-radius: 1.5rem;
//           box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
//           z-index: 8;
//           border: 4px solid rgba(6, 182, 212, 0.3);
//         }

//         .email-input-wrapper {
//           display: flex;
//           flex-direction: column;
//           gap: 1rem;
//         }

//         .email-input {
//           width: 100%;
//           padding: 1rem 1.25rem;
//           border: 3px solid #E5E7EB;
//           border-radius: 1rem;
//           font-size: 0.95rem;
//           color: #64748B;
//           font-weight: 500;
//           background: #F9FAFB;
//           transition: all 0.2s;
//         }

//         .email-input:focus {
//           outline: none;
//           border-color: #22D3EE;
//           background: white;
//         }

//         .email-input::placeholder {
//           color: #94A3B8;
//         }

//         .generate-btn {
//           background: linear-gradient(135deg, #22D3EE 0%, #06B6D4 100%);
//           color: white;
//           border: none;
//           padding: 1rem 2rem;
//           border-radius: 1rem;
//           font-weight: 800;
//           font-size: 1rem;
//           cursor: pointer;
//           transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//           box-shadow: 0 8px 20px rgba(6, 182, 212, 0.4);
//           letter-spacing: 0.5px;
//         }

//         .generate-btn:hover {
//           transform: translateY(-3px);
//           box-shadow: 0 12px 30px rgba(6, 182, 212, 0.5);
//         }

//         .generate-btn:active {
//           transform: translateY(-1px);
//         }

//         /* Responsive Design */
//         @media (max-width: 1024px) {
//           .hero-container {
//             min-height: 500px;
//           }

//           .tropical-scene {
//             min-height: 450px;
//           }

//           .island-group {
//             right: 5%;
//             transform: translateY(-50%) scale(0.85);
//           }

//           .plane-banner {
//             right: 8%;
//             top: 70px;
//           }

//           .airplane-svg {
//             width: 80px;
//             height: 48px;
//           }

//           .banner-text {
//             font-size: 0.75rem;
//           }

//           .sailboat-container {
//             left: 25%;
//             transform: scale(0.85);
//           }

//           .email-card {
//             max-width: 340px;
//           }
//         }

//         @media (max-width: 768px) {
//           .nav-item {
//             display: none;
//           }

//           .hero-section {
//             padding: 1.5rem 0.75rem;
//           }

//           .hero-container {
//             min-height: 450px;
//           }

//           .tropical-scene {
//             min-height: 400px;
//             border-radius: 1.5rem;
//           }

//           .cloud-badge {
//             top: 15px;
//             left: 15px;
//           }

//           .cloud-badge-svg {
//             width: 140px;
//             height: 55px;
//           }

//           .cloud-text {
//             font-size: 1.35rem;
//           }

//           .decorative-cloud {
//             transform: scale(0.7);
//           }

//           .plane-banner {
//             right: 5%;
//             top: 60px;
//             flex-direction: column;
//             gap: 0.5rem;
//           }

//           .airplane-svg {
//             width: 70px;
//             height: 42px;
//           }

//           .banner-flag {
//             padding: 0.5rem 0.875rem;
//           }

//           .banner-text {
//             font-size: 0.7rem;
//           }

//           .island-group {
//             right: 3%;
//             top: 48%;
//             transform: translateY(-50%) scale(0.7);
//           }

//           .island-base {
//             width: 160px;
//             height: 64px;
//           }

//           .palm-tree-svg {
//             width: 65px;
//             height: 95px;
//             top: -50px;
//           }

//           .treasure-chest-container {
//             right: -30px;
//             top: -15px;
//           }

//           .treasure-chest-svg {
//             width: 80px;
//             height: 64px;
//           }

//           .chest-label {
//             font-size: 0.7rem;
//             padding: 0.5rem 0.75rem;
//           }

//           .sailboat-container {
//             transform: scale(0.6);
//             left: 18%;
//           }

//           .coconut-svg {
//             width: 55px;
//             height: 55px;
//           }

//           .email-card {
//             padding: 1.25rem;
//           }
//         }

//         @media (max-width: 480px) {
//           .tropical-scene {
//             min-height: 350px;
//           }

//           .island-group {
//             transform: translateY(-50%) scale(0.6);
//           }

//           .plane-banner {
//             transform: scale(0.8);
//           }

//           .sailboat-container {
//             transform: scale(0.6);
//             left: 18%;
//           }

//           .coconut-svg {
//             width: 55px;
//             height: 55px;
//           }

//           .email-card {
//             padding: 1.25rem;
//           }
//         }
//         /* </CHANGE> */}

//         /* Services Section */
//         /* ... existing code ... */
//       `}</style>
//     </div>
//   )
// }

// export default HeroSection





// test1


"use client"

import { useRef } from "react"

import type React from "react"

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null)

  const handleParallax = (e: React.MouseEvent<HTMLDivElement>) => {
    const root = heroRef.current
    if (!root) return
    const rect = root.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    // Parallax layers move at different speeds based on data-speed
    root.querySelectorAll<HTMLElement>("[data-speed]").forEach((el) => {
      const speed = Number(el.dataset.speed || "0.1")
      const tx = -x * 30 * speed
      const ty = -y * 30 * speed
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`
    })
  }

  const resetParallax = () => {
    const root = heroRef.current
    if (!root) return
    root.querySelectorAll<HTMLElement>("[data-speed]").forEach((el) => {
      el.style.transform = "translate3d(0,0,0)"
    })
  }

  const handleCopy = (email: string, e: React.MouseEvent) => {
    // Implement copy functionality here
    navigator.clipboard
      .writeText(email)
      .then(() => {
        alert("Email copied to clipboard!")
      })
      .catch((err) => {
        console.error("Failed to copy email: ", err)
      })
  }

  return (
    <div className="tropical-page">
      {/* Navbar */}
      {/* <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-icon">🥥</span>
            <span className="logo-text">Cocoinbox</span>
          </div>
          <div className="nav-menu">
            <a href="#services" className="nav-item">
              PRICING
            </a>
            <a href="#about" className="nav-item">
              ABOUT US
            </a>
            <a href="#faq" className="nav-item">
              FAQ
            </a>
            <a href="#contact" className="nav-item">
              CONTACT
            </a>
            <a href="#blog" className="nav-item">
              BLOG
            </a>
            <button className="nav-login">LOGIN / SIGN UP</button>
          </div>
        </div>
      </nav> */}

      <section className="hero-section">
        <div className="hero-container" ref={heroRef} onMouseMove={handleParallax} onMouseLeave={resetParallax}>
          <div className="cloud-badge parallax-layer" data-speed="0.05">
            <svg className="cloud-badge-svg" viewBox="0 0 180 70" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                  <stop offset="100%" stopColor="#F8FAFC" stopOpacity="0.95" />
                </linearGradient>
                <filter id="cloudShadow">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                  <feOffset dx="0" dy="4" result="offsetblur" />
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.15" />
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <g filter="url(#cloudShadow)">
                <ellipse cx="90" cy="45" rx="85" ry="25" fill="url(#cloudGradient)" />
                <circle cx="50" cy="35" r="30" fill="url(#cloudGradient)" />
                <circle cx="90" cy="30" r="35" fill="url(#cloudGradient)" />
                <circle cx="130" cy="35" r="30" fill="url(#cloudGradient)" />
              </g>
            </svg>
            <span className="cloud-text">eSIMs</span>
          </div>

          {/* Main tropical scene */}
          <div className="tropical-scene">
            <div className="sky-clouds parallax-layer" data-speed="0.03">
              <svg
                className="decorative-cloud cloud-pos-1"
                viewBox="0 0 120 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="skyCloudGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
                    <stop offset="100%" stopColor="#F1F5F9" stopOpacity="0.92" />
                  </linearGradient>
                </defs>
                <ellipse cx="60" cy="35" rx="50" ry="15" fill="url(#skyCloudGrad1)" />
                <circle cx="30" cy="25" r="20" fill="url(#skyCloudGrad1)" />
                <circle cx="60" cy="20" r="25" fill="url(#skyCloudGrad1)" />
                <circle cx="90" cy="25" r="20" fill="url(#skyCloudGrad1)" />
              </svg>
              <svg
                className="decorative-cloud cloud-pos-2"
                viewBox="0 0 120 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="skyCloudGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#E2E8F0" stopOpacity="0.88" />
                  </linearGradient>
                </defs>
                <ellipse cx="60" cy="35" rx="50" ry="15" fill="url(#skyCloudGrad2)" />
                <circle cx="30" cy="25" r="20" fill="url(#skyCloudGrad2)" />
                <circle cx="60" cy="20" r="25" fill="url(#skyCloudGrad2)" />
                <circle cx="90" cy="25" r="20" fill="url(#skyCloudGrad2)" />
              </svg>
              <svg
                className="decorative-cloud cloud-pos-3"
                viewBox="0 0 100 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="skyCloudGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.92" />
                    <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.85" />
                  </linearGradient>
                </defs>
                <ellipse cx="50" cy="32" rx="45" ry="13" fill="url(#skyCloudGrad3)" />
                <circle cx="25" cy="22" r="18" fill="url(#skyCloudGrad3)" />
                <circle cx="50" cy="18" r="22" fill="url(#skyCloudGrad3)" />
                <circle cx="75" cy="22" r="18" fill="url(#skyCloudGrad3)" />
              </svg>
            </div>

            <div className="plane-banner parallax-layer" data-speed="0.35">
              <svg className="airplane-svg" viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="planeBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFB366" />
                    <stop offset="50%" stopColor="#FF9933" />
                    <stop offset="100%" stopColor="#E67A1A" />
                  </linearGradient>
                  <linearGradient id="planeHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFCC99" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#FFAA55" stopOpacity="0.6" />
                  </linearGradient>
                  <radialGradient id="windowGlass" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="#E0F2FE" />
                    <stop offset="60%" stopColor="#7DD3FC" />
                    <stop offset="100%" stopColor="#0EA5E9" />
                  </radialGradient>
                  <filter id="planeShadow">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
                    <feOffset dx="0" dy="3" />
                    <feComponentTransfer>
                      <feFuncA type="linear" slope="0.3" />
                    </feComponentTransfer>
                    <feMerge>
                      <feMergeNode />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <g filter="url(#planeShadow)">
                  {/* Main body with gradient */}
                  <ellipse cx="60" cy="40" rx="40" ry="14" fill="url(#planeBodyGrad)" />
                  {/* Highlight on top */}
                  <ellipse cx="60" cy="37" rx="35" ry="10" fill="url(#planeHighlight)" />
                  {/* Wings with depth */}
                  <ellipse cx="52" cy="40" rx="28" ry="9" fill="url(#planeBodyGrad)" transform="rotate(-25 52 40)" />
                  <ellipse cx="68" cy="40" rx="28" ry="9" fill="url(#planeBodyGrad)" transform="rotate(25 68 40)" />
                  {/* Wing highlights */}
                  <ellipse cx="52" cy="38" rx="24" ry="6" fill="#FFB366" opacity="0.6" transform="rotate(-25 52 38)" />
                  <ellipse cx="68" cy="38" rx="24" ry="6" fill="#FFB366" opacity="0.6" transform="rotate(25 68 38)" />
                  {/* Propeller hub */}
                  <circle cx="25" cy="40" r="9" fill="#4B5563" />
                  <circle cx="25" cy="40" r="7" fill="#6B7280" />
                  {/* Propeller blades */}
                  <ellipse cx="25" cy="40" rx="18" ry="3" fill="#374151" opacity="0.7" />
                  <ellipse cx="25" cy="40" rx="3" ry="18" fill="#374151" opacity="0.7" />
                  {/* Windows with glass effect */}
                  <circle cx="50" cy="37" r="4" fill="url(#windowGlass)" />
                  <circle cx="50" cy="37" r="2.5" fill="#FFFFFF" opacity="0.4" />
                  <circle cx="62" cy="37" r="4" fill="url(#windowGlass)" />
                  <circle cx="62" cy="37" r="2.5" fill="#FFFFFF" opacity="0.4" />
                  <circle cx="74" cy="37" r="4" fill="url(#windowGlass)" />
                  <circle cx="74" cy="37" r="2.5" fill="#FFFFFF" opacity="0.4" />
                  {/* Tail with gradient */}
                  <path d="M 90 40 L 102 32 L 102 48 Z" fill="url(#planeBodyGrad)" />
                  <path d="M 90 40 L 100 34 L 100 46 Z" fill="#FFB366" opacity="0.5" />
                  {/* Nose cone */}
                  <ellipse cx="28" cy="40" rx="8" ry="12" fill="#E67A1A" />
                  <ellipse cx="28" cy="38" rx="6" ry="9" fill="#FF9933" opacity="0.6" />
                </g>
              </svg>
              <div className="banner-flag">
                <span className="banner-text">Boite mail éphémère</span>
              </div>
            </div>

            <div className="island-group parallax-layer" data-speed="0.25">
              {/* Island base with texture */}
              <svg className="island-base" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="sandGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#F5D5A8" />
                    <stop offset="100%" stopColor="#D4A574" />
                  </linearGradient>
                  <linearGradient id="sandGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#F9E4BC" />
                    <stop offset="100%" stopColor="#E8C090" />
                  </linearGradient>
                  <linearGradient id="sandGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFF4DC" />
                    <stop offset="100%" stopColor="#F5D5A8" />
                  </linearGradient>
                </defs>
                <ellipse cx="100" cy="60" rx="95" ry="20" fill="url(#sandGrad1)" />
                <ellipse cx="100" cy="55" rx="90" ry="18" fill="url(#sandGrad2)" />
                <ellipse cx="100" cy="50" rx="85" ry="16" fill="url(#sandGrad3)" />
                {/* Sand texture details */}
                <circle cx="70" cy="58" r="2" fill="#D4A574" opacity="0.3" />
                <circle cx="130" cy="56" r="1.5" fill="#D4A574" opacity="0.3" />
                <circle cx="90" cy="60" r="1.8" fill="#D4A574" opacity="0.3" />
              </svg>

              {/* Professional palm tree */}
              <svg className="palm-tree-svg" viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6B4423" />
                    <stop offset="50%" stopColor="#8B5A3C" />
                    <stop offset="100%" stopColor="#6B4423" />
                  </linearGradient>
                  <linearGradient id="leafGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#47C77F" />
                    <stop offset="50%" stopColor="#3AA76D" />
                    <stop offset="100%" stopColor="#2D8B57" />
                  </linearGradient>
                  <linearGradient id="leafGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#5FD99A" />
                    <stop offset="50%" stopColor="#47C77F" />
                    <stop offset="100%" stopColor="#3AA76D" />
                  </linearGradient>
                </defs>
                {/* Trunk with texture */}
                <rect x="35" y="40" width="10" height="60" fill="url(#trunkGrad)" rx="5" />
                {/* Trunk segments */}
                <ellipse cx="40" cy="50" rx="7" ry="3" fill="#5A3825" opacity="0.6" />
                <ellipse cx="40" cy="60" rx="7" ry="3" fill="#5A3825" opacity="0.6" />
                <ellipse cx="40" cy="70" rx="7" ry="3" fill="#5A3825" opacity="0.6" />
                <ellipse cx="40" cy="80" rx="7" ry="3" fill="#5A3825" opacity="0.6" />
                <ellipse cx="40" cy="90" rx="7" ry="3" fill="#5A3825" opacity="0.6" />
                {/* Trunk highlights */}
                <rect x="37" y="40" width="3" height="60" fill="#A67C52" opacity="0.3" rx="1.5" />
                {/* Palm leaves with detailed gradients */}
                <ellipse cx="40" cy="30" rx="38" ry="16" fill="url(#leafGrad1)" transform="rotate(-35 40 30)" />
                <ellipse cx="40" cy="30" rx="38" ry="16" fill="url(#leafGrad2)" transform="rotate(-65 40 30)" />
                <ellipse cx="40" cy="30" rx="38" ry="16" fill="url(#leafGrad1)" transform="rotate(35 40 30)" />
                <ellipse cx="40" cy="30" rx="38" ry="16" fill="url(#leafGrad2)" transform="rotate(65 40 30)" />
                <ellipse cx="40" cy="30" rx="38" ry="16" fill="url(#leafGrad2)" transform="rotate(0 40 30)" />
                {/* Leaf highlights */}
                <ellipse cx="40" cy="28" rx="32" ry="8" fill="#7FE5A8" opacity="0.4" transform="rotate(-35 40 28)" />
                <ellipse cx="40" cy="28" rx="32" ry="8" fill="#7FE5A8" opacity="0.4" transform="rotate(35 40 28)" />
                {/* Coconuts cluster */}
                <circle cx="35" cy="42" r="4" fill="#8B5A3C" />
                <circle cx="42" cy="40" r="4" fill="#8B5A3C" />
                <circle cx="38" cy="38" r="4" fill="#A67C52" />
              </svg>

              {/* Premium treasure chest */}
              <div className="treasure-chest-container">
                <svg className="treasure-chest-svg" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="chestGold" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FCD34D" />
                      <stop offset="50%" stopColor="#F59E0B" />
                      <stop offset="100%" stopColor="#D97706" />
                    </linearGradient>
                    <linearGradient id="chestDark" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#92400E" />
                      <stop offset="100%" stopColor="#78350F" />
                    </linearGradient>
                    <radialGradient id="lockShine" cx="50%" cy="40%">
                      <stop offset="0%" stopColor="#FDE68A" />
                      <stop offset="100%" stopColor="#92400E" />
                    </radialGradient>
                    <filter id="chestShadow">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" />
                      <feOffset dx="0" dy="4" />
                      <feComponentTransfer>
                        <feFuncA type="linear" slope="0.4" />
                      </feComponentTransfer>
                      <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <g filter="url(#chestShadow)">
                    {/* Chest base with depth */}
                    <rect x="15" y="35" width="70" height="40" fill="url(#chestDark)" rx="5" />
                    <rect x="17" y="37" width="66" height="36" fill="url(#chestGold)" rx="4" />
                    {/* Metallic bands */}
                    <rect x="15" y="45" width="70" height="4" fill="#92400E" />
                    <rect x="15" y="60" width="70" height="4" fill="#92400E" />
                    {/* Band highlights */}
                    <rect x="15" y="45" width="70" height="1.5" fill="#FCD34D" opacity="0.5" />
                    <rect x="15" y="60" width="70" height="1.5" fill="#FCD34D" opacity="0.5" />
                    {/* Chest lid with 3D effect */}
                    <path d="M 15 35 Q 50 12 85 35" fill="url(#chestDark)" />
                    <path d="M 17 35 Q 50 14 83 35" fill="url(#chestGold)" />
                    {/* Lid highlight */}
                    <path d="M 25 32 Q 50 18 75 32" stroke="#FDE68A" strokeWidth="2" fill="none" opacity="0.6" />
                    {/* Lock mechanism */}
                    <circle cx="50" cy="52" r="10" fill="url(#lockShine)" />
                    <circle cx="50" cy="52" r="8" fill="#78350F" />
                    <rect x="47" y="52" width="6" height="14" fill="#78350F" rx="1" />
                    {/* Keyhole */}
                    <circle cx="50" cy="50" r="3.5" fill="#1F2937" />
                    <path d="M 48.5 50 L 48.5 56 L 51.5 56 L 51.5 50" fill="#1F2937" />
                    {/* Lock highlight */}
                    <circle cx="48" cy="49" r="2" fill="#FCD34D" opacity="0.4" />
                  </g>
                </svg>
                <span className="chest-label">
                  Notes
                  <br />
                  cryptées
                </span>
              </div>
            </div>

            <div className="ocean-layer parallax-layer" data-speed="0.2">
              <svg
                className="ocean-waves"
                viewBox="0 0 1200 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="oceanGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.5" />
                  </linearGradient>
                  <linearGradient id="oceanGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.4" />
                  </linearGradient>
                  <linearGradient id="oceanGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#0891B2" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 50 Q 150 30 300 50 T 600 50 T 900 50 T 1200 50 L 1200 100 L 0 100 Z"
                  fill="url(#oceanGrad1)"
                />
                <path
                  d="M0 60 Q 150 40 300 60 T 600 60 T 900 60 T 1200 60 L 1200 100 L 0 100 Z"
                  fill="url(#oceanGrad2)"
                />
                <path
                  d="M0 70 Q 150 55 300 70 T 600 70 T 900 70 T 1200 70 L 1200 100 L 0 100 Z"
                  fill="url(#oceanGrad3)"
                />
              </svg>

              <div className="sailboat-container parallax-layer" data-speed="0.3">
                <svg className="sailboat-svg" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="sailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="50%" stopColor="#F8FAFC" />
                      <stop offset="100%" stopColor="#E2E8F0" />
                    </linearGradient>
                    <linearGradient id="hullGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#F87171" />
                      <stop offset="50%" stopColor="#EF4444" />
                      <stop offset="100%" stopColor="#DC2626" />
                    </linearGradient>
                    <filter id="boatShadow">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
                      <feOffset dx="0" dy="3" />
                      <feComponentTransfer>
                        <feFuncA type="linear" slope="0.3" />
                      </feComponentTransfer>
                      <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <g filter="url(#boatShadow)">
                    {/* Sail with texture */}
                    <path d="M 50 20 L 50 80 L 20 80 Z" fill="url(#sailGrad)" />
                    {/* Sail stitching lines */}
                    <line x1="50" y1="35" x2="28" y2="80" stroke="#CBD5E1" strokeWidth="1" opacity="0.5" />
                    <line x1="50" y1="50" x2="32" y2="80" stroke="#CBD5E1" strokeWidth="1" opacity="0.5" />
                    <line x1="50" y1="65" x2="38" y2="80" stroke="#CBD5E1" strokeWidth="1" opacity="0.5" />
                    {/* Sail highlight */}
                    <path d="M 50 20 L 48 80 L 20 80 Z" fill="#FFFFFF" opacity="0.3" />
                    {/* Mast */}
                    <line x1="50" y1="20" x2="50" y2="85" stroke="#78350F" strokeWidth="2.5" />
                    <circle cx="50" cy="20" r="2" fill="#92400E" />
                    {/* Boat hull with 3D effect */}
                    <ellipse cx="50" cy="87" rx="32" ry="9" fill="url(#hullGrad)" />
                    <path d="M 18 87 Q 50 97 82 87" fill="#B91C1C" />
                    {/* Hull highlight */}
                    <ellipse cx="50" cy="85" rx="28" ry="6" fill="#FCA5A5" opacity="0.4" />
                    {/* Hull stripe */}
                    <ellipse cx="50" cy="87" rx="30" ry="3" fill="#7F1D1D" />
                  </g>
                </svg>
                <div className="boat-label">
                  Transfert
                  <br />
                  de fichiers
                </div>
              </div>
            </div>

            <div className="beach-layer parallax-layer" data-speed="0.3">
              <div className="coconut-character-container">
                <svg className="coconut-svg" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <radialGradient id="coconutGrad" cx="35%" cy="35%">
                      <stop offset="0%" stopColor="#A67C52" />
                      <stop offset="50%" stopColor="#8B5A3C" />
                      <stop offset="100%" stopColor="#6B4423" />
                    </radialGradient>
                    <filter id="coconutShadow">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" />
                      <feOffset dx="0" dy="4" />
                      <feComponentTransfer>
                        <feFuncA type="linear" slope="0.4" />
                      </feComponentTransfer>
                      <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <g filter="url(#coconutShadow)">
                    {/* Coconut body with gradient */}
                    <circle cx="40" cy="40" r="35" fill="url(#coconutGrad)" />
                    {/* Texture fibers */}
                    <path d="M 15 25 Q 40 28 65 25" stroke="#5A3825" strokeWidth="2.5" fill="none" opacity="0.6" />
                    <path d="M 12 35 Q 40 38 68 35" stroke="#5A3825" strokeWidth="2.5" fill="none" opacity="0.6" />
                    <path d="M 15 45 Q 40 48 65 45" stroke="#5A3825" strokeWidth="2.5" fill="none" opacity="0.6" />
                    <path d="M 12 55 Q 40 58 68 55" stroke="#5A3825" strokeWidth="2.5" fill="none" opacity="0.6" />
                    <path d="M 18 65 Q 40 68 62 65" stroke="#5A3825" strokeWidth="2.5" fill="none" opacity="0.6" />
                    {/* Highlight on coconut */}
                    <ellipse cx="30" cy="28" rx="12" ry="8" fill="#C9A574" opacity="0.4" />
                    {/* Eyes with shine */}
                    <circle cx="28" cy="35" r="7" fill="white" />
                    <circle cx="52" cy="35" r="7" fill="white" />
                    <circle cx="30" cy="35" r="5" fill="#1F2937" />
                    <circle cx="54" cy="35" r="5" fill="#1F2937" />
                    <circle cx="31" cy="33" r="2.5" fill="white" />
                    <circle cx="55" cy="33" r="2.5" fill="white" />
                    {/* Rosy cheeks */}
                    <ellipse cx="18" cy="42" rx="5" ry="3" fill="#FCA5A5" opacity="0.6" />
                    <ellipse cx="62" cy="42" rx="5" ry="3" fill="#FCA5A5" opacity="0.6" />
                    {/* Happy smile with depth */}
                    <path
                      d="M 25 50 Q 40 62 55 50"
                      stroke="#1F2937"
                      strokeWidth="3.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 25 50 Q 40 60 55 50"
                      stroke="#4B5563"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* Email Input Card */}
          <div className="email-card parallax-layer" data-speed="0.15">
            <div className="email-input-wrapper">
              <input
                type="text"
                placeholder="Your temporary email..."
                className="email-input"
                value={process.env.NEXT_PUBLIC_TEMP_EMAIL || ""}
                readOnly
              />
              <button className="generate-btn" onClick={(e) => handleCopy(process.env.NEXT_PUBLIC_TEMP_EMAIL || "", e)}>
                Generate
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* </CHANGE> */}

      {/* Services Section */}

      {/* Inbox Section */}

      {/* User Feedback Section */}

      {/* Footer */}

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .tropical-page {
          min-height: 100vh;
          background: linear-gradient(180deg, #7DD3FC 0%, #38BDF8 50%, #22D3EE 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        /* Navbar */
        .navbar {
          background: rgba(6, 182, 212, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 3px solid #0891B2;
          padding: 1rem 0;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 800;
          font-size: 1.5rem;
          color: white;
        }

        .logo-icon {
          font-size: 2rem;
        }

        .nav-menu {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .nav-item {
          color: white;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.75rem;
          letter-spacing: 0.5px;
          transition: all 0.2s;
          padding: 0.5rem;
          border-radius: 0.5rem;
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .nav-login {
          background: white;
          color: #0891B2;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 2rem;
          font-weight: 700;
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .nav-login:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }

        /* Redesigned hero section styles with professional assets */
        .hero-section {
          padding: 2rem 1rem;
          position: relative;
          overflow: hidden;
        }

        .hero-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          min-height: 600px;
        }

        .parallax-layer {
          will-change: transform;
          transition: transform 150ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        /* Cloud badge */
        .cloud-badge-svg {
          width: 180px;
          height: 70px;
          filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.12));
        }

        .cloud-text {
          position: absolute;
          font-weight: 800;
          font-size: 1.75rem;
          color: #1e293b;
          letter-spacing: 0.5px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        /* Tropical scene container */
        .tropical-scene {
          background: linear-gradient(180deg, #7DD3FC 0%, #38BDF8 35%, #22D3EE 65%, #FDE68A 100%);
          border-radius: 2rem;
          position: relative;
          min-height: 550px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
          border: 4px solid rgba(255, 255, 255, 0.3);
        }

        /* Sky clouds */
        .sky-clouds {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 200px;
          z-index: 1;
          pointer-events: none;
        }

        .decorative-cloud {
          position: absolute;
          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.08));
          animation: float 8s ease-in-out infinite;
        }

        .cloud-pos-1 {
          top: 30px;
          left: 10%;
          width: 120px;
          animation-delay: 0s;
        }

        .cloud-pos-2 {
          top: 60px;
          right: 15%;
          width: 100px;
          animation-delay: 2s;
        }

        .cloud-pos-3 {
          top: 100px;
          left: 50%;
          width: 90px;
          animation-delay: 4s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        /* Airplane with banner */
        .plane-banner {
          position: absolute;
          top: 80px;
          right: 12%;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          z-index: 3;
        }

        .airplane-svg {
          width: 120px;
          height: 70px;
          filter: drop-shadow(0 6px 20px rgba(0, 0, 0, 0.25));
          animation: fly-wobble 3s ease-in-out infinite;
        }

        @keyframes fly-wobble {
          0%, 100% {
            transform: translateY(0px) rotate(-5deg);
          }
          50% {
            transform: translateY(-8px) rotate(-3deg);
          }
        }

        .banner-flag {
          background: linear-gradient(135deg, #FFFBEB 0%, #FDE68A 100%);
          padding: 0.75rem 1.25rem;
          border-radius: 0.75rem;
          border: 3px solid #F59E0B;
          box-shadow: 0 6px 20px rgba(245, 158, 11, 0.3);
        }

        .banner-text {
          font-weight: 800;
          font-size: 0.875rem;
          color: #92400E;
          white-space: nowrap;
          letter-spacing: 0.3px;
        }

        /* Island group */
        .island-group {
          position: absolute;
          right: 8%;
          top: 45%;
          transform: translateY(-50%);
          z-index: 4;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .island-base {
          width: 200px;
          height: 80px;
          filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.25));
        }

        .palm-tree-svg {
          position: absolute;
          top: -60px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 120px;
          filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.25));
          animation: sway 4s ease-in-out infinite;
        }

        @keyframes sway {
          0%, 100% {
            transform: translateX(-50%) rotate(0deg);
          }
          50% {
            transform: translateX(-50%) rotate(3deg);
          }
        }

        .treasure-chest-container {
          position: absolute;
          top: -20px;
          right: -40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .treasure-chest-svg {
          width: 100px;
          height: 80px;
          filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.3));
        }

        .chest-label {
          background: linear-gradient(135deg, #FEF3C7 0%, #FCD34D 50%, #F59E0B 100%);
          color: #78350F;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          font-weight: 800;
          font-size: 0.8rem;
          text-align: center;
          line-height: 1.3;
          border: 3px solid #92400E;
          box-shadow: 0 6px 20px rgba(146, 64, 14, 0.3);
          letter-spacing: 0.3px;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3);
        }

        /* Ocean layer */
        .ocean-layer {
          position: absolute;
          bottom: 22%;
          left: 0;
          right: 0;
          height: 100px;
          z-index: 3;
        }

        .ocean-waves {
          width: 100%;
          height: 100%;
          opacity: 0.8;
        }

        .sailboat-container {
          position: absolute;
          left: 28%;
          top: -40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          animation: bob 4s ease-in-out infinite;
        }

        @keyframes bob {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(-2deg);
          }
        }

        .sailboat-svg {
          width: 100px;
          height: 120px;
          filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.25));
        }

        .boat-label {
          background: linear-gradient(135deg, #FEE2E2 0%, #FCA5A5 30%, #EF4444 70%, #DC2626 100%);
          color: white;
          padding: 0.75rem 1.25rem;
          border-radius: 0.75rem;
          font-weight: 800;
          font-size: 0.8rem;
          text-align: center;
          line-height: 1.3;
          border: 3px solid #991B1B;
          box-shadow: 0 6px 20px rgba(153, 27, 27, 0.4);
          letter-spacing: 0.3px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        /* Beach layer */
        .beach-layer {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 22%;
          background: linear-gradient(180deg, #FDE68A 0%, #FCD34D 50%, #F59E0B 100%);
          z-index: 5;
          border-radius: 0 0 1.75rem 1.75rem;
        }

        .coconut-character-container {
          position: absolute;
          left: 12%;
          bottom: 15%;
        }

        .coconut-svg {
          width: 80px;
          height: 80px;
          filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.3));
          animation: bounce 2s ease-in-out infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        /* Email Card */
        .email-card {
          position: absolute;
          top: 140px;
          left: 30px;
          width: 100%;
          max-width: 380px;
          background: linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%);
          padding: 1.5rem;
          border-radius: 1.5rem;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.3);
          z-index: 8;
          border: 1px solid rgba(255, 255, 255, 0.8);
        }

        .email-input-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .email-input {
          width: 100%;
          padding: 1rem 1.25rem;
          border: 2px solid #E5E7EB;
          border-radius: 1rem;
          font-size: 0.95rem;
          color: #475569;
          font-weight: 500;
          background: #FFFFFF;
          transition: all 0.2s;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.02);
        }

        .email-input:focus {
          outline: none;
          border-color: #22D3EE;
          background: white;
          box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.1), inset 0 2px 4px rgba(0, 0, 0, 0.02);
        }

        .email-input::placeholder {
          color: #94A3B8;
        }

        .generate-btn {
          background: linear-gradient(135deg, #67E8F9 0%, #22D3EE 50%, #06B6D4 100%);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 1rem;
          font-weight: 800;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 30px rgba(6, 182, 212, 0.4);
          letter-spacing: 0.5px;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .generate-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(6, 182, 212, 0.5);
        }

        .generate-btn:active {
          transform: translateY(-1px);
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .hero-container {
            min-height: 500px;
          }

          .tropical-scene {
            min-height: 450px;
          }

          .island-group {
            right: 5%;
            transform: translateY(-50%) scale(0.85);
          }

          .plane-banner {
            right: 8%;
            top: 70px;
          }

          .airplane-svg {
            width: 80px;
            height: 48px;
          }

          .banner-text {
            font-size: 0.75rem;
          }

          .sailboat-container {
            left: 25%;
            transform: scale(0.85);
          }

          .email-card {
            max-width: 340px;
          }
        }

        @media (max-width: 768px) {
          .nav-item {
            display: none;
          }

          .hero-section {
            padding: 1.5rem 0.75rem;
          }

          .hero-container {
            min-height: 450px;
          }

          .tropical-scene {
            min-height: 400px;
            border-radius: 1.5rem;
          }

          .cloud-badge {
            top: 15px;
            left: 15px;
          }

          .cloud-badge-svg {
            width: 140px;
            height: 55px;
          }

          .cloud-text {
            font-size: 1.35rem;
          }

          .decorative-cloud {
            transform: scale(0.7);
          }

          .plane-banner {
            right: 5%;
            top: 60px;
            flex-direction: column;
            gap: 0.5rem;
          }

          .airplane-svg {
            width: 70px;
            height: 42px;
          }

          .banner-flag {
            padding: 0.5rem 0.875rem;
          }

          .banner-text {
            font-size: 0.7rem;
          }

          .island-group {
            right: 3%;
            top: 48%;
            transform: translateY(-50%) scale(0.7);
          }

          .island-base {
            width: 160px;
            height: 64px;
          }

          .palm-tree-svg {
            width: 65px;
            height: 95px;
            top: -50px;
          }

          .treasure-chest-container {
            right: -30px;
            top: -15px;
          }

          .treasure-chest-svg {
            width: 80px;
            height: 64px;
          }

          .chest-label {
            font-size: 0.7rem;
            padding: 0.5rem 0.75rem;
          }

          .sailboat-container {
            transform: scale(0.6);
            left: 18%;
          }

          .coconut-svg {
            width: 55px;
            height: 55px;
          }

          .email-card {
            padding: 1.25rem;
          }
        }

        @media (max-width: 480px) {
          .tropical-scene {
            min-height: 350px;
          }

          .island-group {
            transform: translateY(-50%) scale(0.6);
          }

          .plane-banner {
            transform: scale(0.8);
          }

          .sailboat-container {
            transform: scale(0.6);
            left: 18%;
          }

          .coconut-svg {
            width: 55px;
            height: 55px;
          }

          .email-card {
            padding: 1.25rem;
          }
        }
        /* </CHANGE> */}

        /* Services Section */
      `}</style>
    </div>
  )
}

export default HeroSection
