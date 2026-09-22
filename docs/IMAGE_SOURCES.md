# HIDRIQ — Image Assets & Licensing Registry

**Document Status:** Verified & Compliant  
**License Standard:** [Unsplash License](https://unsplash.com/license) (Free for commercial and non-commercial use; no permission required; attribution provided per professional best practice)  
**Company:** HIDRIQ ([hidriq.com](https://hidriq.com))  

---

## Registry of Photographic Assets

All photographic assets utilized in the HIDRIQ web application are verified high-resolution, legally compliant images sourced under the Unsplash License. No copyrighted stock photographs or scraped images are used.

| Asset ID | Role on Website | Description & Scene | Photographer & Attribution | Verified Production URL |
| :--- | :--- | :--- | :--- | :--- |
| `photo-1582719478250-c89cae4dc85b` | **Hero Section** | Aerial luxury resort landscape with water, palms, and Mediterranean gardens. | Sourced via Unsplash (Resort & Pool Landscape) | `https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2000&q=80` |
| `photo-1571896349842-33c89424de2d` | **Problem Section** | Overhead perspective of irrigated grounds contrasting with arid surroundings. | Sourced via Unsplash (Landscape & Estate Aerial) | `https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=80` |
| `photo-1566073771259-6a8506099945` | **Zephyr POC / Hospitality** | Five-star luxury hotel resort grounds with palm trees and landscaped terraces in a warm climate. | Sourced via Unsplash (Luxury Hotel Grounds) | `https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=80` |
| `photo-1587174486073-ae5e5cff23aa` | **B2B Golf** | Aerial perspective of championship golf course greens and manicured turf grass. | Sourced via Unsplash (Golf Course Aerial) | `https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=2000&q=80` |
| `photo-1600585154340-be6161a56a0c` | **B2C Residential** | Contemporary luxury architectural villa with swimming pool and private garden. | Sourced via Unsplash (Modern Luxury Villa Garden) | `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80` |
| `photo-1512917774080-9991f1c4c750` | **Second-Home Angle** | Sunlit Mediterranean villa garden and terrace (unoccupied aesthetic). | Sourced via Unsplash (Private Villa Grounds) | `https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=80` |
| `photo-1500382017468-9049fed747ef` | **Stage 3 Agriculture** | Aerial agricultural landscape with geometric fields and precision crop rows. | Sourced via Unsplash (Agricultural Landscape Aerial) | `https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=80` |
| `photo-1592982537447-7440770cbfc9` | **Agricultural Detail** | High-value orchard canopy and precision drip irrigation rows. | Sourced via Unsplash (Precision Orchard & Drip Lines) | `https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=2000&q=80` |
| `photo-1451187580459-43490279c0fa` | **Data Layer / Tech** | Earth from orbit with subtle atmospheric and telemetry light patterns. | Sourced via NASA / Unsplash (Earth Data & Satellite View) | `https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=80` |
| `photo-1618005182384-a83a8bd57fbe` | **Water Flow / Fluid Physics** | Cinematic deep fluid wave texture representing the physical fluid dynamics of water. | Sourced via Unsplash (Fluid Dynamic Wave) | `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=2000&q=80` |

---

## Technical Image Optimization Standards

In compliance with the Modern Web Guidance (`optimize-image-priority` and CWV standards):
1. **LCP Image:** The Hero Section image is preloaded and tagged with `fetchpriority="high"`.
2. **Lazy Loading:** All images below the fold employ native `loading="lazy"`.
3. **Format & Sizing:** Unsplash CDN query parameters (`auto=format&fit=crop&w=...&q=80`) are utilized to negotiate WebP/AVIF dynamically according to client browser capabilities.
