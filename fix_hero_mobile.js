const fs = require('fs');

// Patch custom2.css
let custom2 = fs.readFileSync('css/custom2.css', 'utf8');

// Replace the entire max-width 767px block for hero
custom2 = custom2.replace(/@media \(max-width: 767px\) \{[\s\S]*?\}\n\s*\}\s*$/, ''); // Try to clear it, but it's hard with regex. Let's just append an overriding block.

let overrideBlock = `
@media (max-width: 767px) {
  /* AGGRESSIVE HERO OVERRIDES */
  #hero .hero-content {
    padding: 100px 1rem 2rem !important;
  }
  
  #hero .hero-title {
    font-size: clamp(1.5rem, 8vw, 2rem) !important;
    line-height: 1.3 !important;
    word-break: break-word !important;
  }
  
  #hero .hero-title br {
    display: none !important;
  }
  
  #hero .hero-desc {
    text-align: center !important;
    margin: 1rem auto !important;
    width: 100% !important;
  }
  
  #hero .hero-stats {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    gap: 1rem !important;
    width: 100% !important;
  }
  
  #hero .hero-stat {
    width: 100% !important;
    text-align: center !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
  }
  
  #hero .hero-stat .num {
    display: inline-block !important;
    text-align: center !important;
  }
  
  #hero .hero-stat .label {
    display: block !important;
    text-align: center !important;
  }
  
  /* Force float cards to be standard block elements */
  #hero .hero-float-cards,
  .hero-float-cards {
    position: static !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    gap: 1rem !important;
    width: 100% !important;
    margin: 2rem auto !important;
    transform: none !important;
    padding: 0 1rem !important;
  }
  
  #hero .hero-float-card,
  .hero-float-card {
    position: static !important;
    width: 100% !important;
    max-width: 320px !important;
    margin: 0 auto !important;
    transform: none !important;
  }
}
`;

fs.writeFileSync('css/custom2.css', custom2 + overrideBlock);
console.log('Appended aggressive overrides to custom2.css');
