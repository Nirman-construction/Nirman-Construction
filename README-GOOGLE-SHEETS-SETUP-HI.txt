NIRMAN CONSTRUCTION — FREE AUTO ENQUIRY + WEBSITE VISITOR COUNTER

KYA MILEGA?
- Customer Contact page ka form submit karega to details Google Sheet ke “Enquiries” tab mein save hongi. Customer ko WhatsApp ka Send button dabana zaroori nahi.
- Nayi enquiry par info@nirmanconstruction.net.in par email notification bhejne ki koshish hogi (Google account se pehli baar permission deni hogi).
- Website par total recorded visits ka counter dikhega. Yeh unique people ka exact count nahi hai; har browser session ka ek visit record hota hai. Browser/session restrictions ki wajah se count approximate ho sakta hai.
- Chatbot FAQ rule-based aur free hai; OpenAI API key nahi chahiye.

ONE-TIME SETUP (FREE GOOGLE ACCOUNT)
1. Google Drive kholkar New > Google Sheets banayein. Naam rakhein: Nirman Construction Enquiries.
2. Sheet mein Extensions > Apps Script kholein.
3. Apps Script ke editor mein Code.gs ka purana code hata kar is ZIP ki “Google-Apps-Script.gs” file ka poora code paste karein. Save karein.
4. Function dropdown se setupSheets select karke Run dabayein. Permissions maange to apne Google account se review/allow karein. Isse Enquiries aur Visits tabs banenge.
5. Deploy > New deployment > Select type (gear) > Web app.
6. Execute as: Me. Who has access: Anyone. Deploy karein; Google permission maang sakta hai. Sirf apni banayi hui script ko deploy karein.
7. Jo Web app URL /exec par khatam hota hai use copy karein.
8. ZIP ke config.js mein yeh line dhoondhein:
   window.NIRMAN_SHEETS_ENDPOINT = '';
   Single quotes ke beech apna /exec URL paste karein. Example:
   window.NIRMAN_SHEETS_ENDPOINT = 'https://script.google.com/macros/s/XXXXX/exec';
9. Updated project GitHub repository mein upload/commit karein; Vercel deployment complete hone dein.
10. Live website ke Contact form par test enquiry submit karein. Google Sheet ke Enquiries tab aur email inbox/spam check karein. Website ko kuch baar alag browser sessions mein kholkar Visits tab/counter test karein.

IMPORTANT / LIMITATIONS
- Abhi config.js mein URL blank hai, isliye auto-save/counter tab tak kaam nahi karega jab tak aap apna Web App URL add karke redeploy nahi karte.
- Google Apps Script/Sheets ka normal personal use aam taur par free hota hai, lekin Google quotas/limits lagu hote hain aur badal sakte hain. Is solution mein OpenAI API ka paid use nahi hota.
- “Anyone” access web form ko publicly submit karne deta hai. Sheet ko public share mat karein. Sirf apne Google account se sheet dekhein. Spam ho to deployment ko disable/restrict karna ya CAPTCHA add karna padega.
- Customer se sirf zaroori details maangein aur contact details ko private rakhein.
- Agar baad mein Apps Script code badlein: Deploy > Manage deployments > Edit (pencil) > New version > Deploy.
- Email delivery ko live use se pehle test karna zaroori hai. Apps Script permissions ya quotas ki wajah se notification fail ho sakti hai; Sheet mein saved row check karein.
