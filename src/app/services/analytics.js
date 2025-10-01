window.dataLayer = window.dataLayer || [];
export function gtag() { dataLayer.push(arguments); }
console.log('gtag initialization')
gtag('js', new Date());

gtag('consent', 'default', {
  'ad_storage': 'deny',
  'ad_user_data': 'deny',
  'ad_personalization': 'deny',
  'analytics_storage': 'deny'
})

gtag('config', 'G-76F815B0F4');
