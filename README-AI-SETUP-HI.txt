NIRMAN CONSTRUCTION — AI API SETUP (Hinglish)

Is updated project mein website ka AI chat /api/chat serverless endpoint se connect hai. API key ko HTML/JavaScript mein mat daalein.

VERCEL PAR SETUP:
1. Open https://vercel.com/dashboard and select your Nirman Construction project.
2. Settings > Environment Variables open karein.
3. Name: OPENAI_API_KEY
4. Value: apni OpenAI API key paste karein (secret rakhein; kisi ko share na karein).
5. Environment mein Production select karein. Preview/Development par bhi test karna ho to un environments ko bhi select karein.
6. Save karein.
7. Deployments tab mein latest deployment ko Redeploy karein, ya updated project GitHub par push karke deployment hone dein.
8. Website open karke AI chat mein test karein: “Aap kaun-kaun si services provide karte hain?”

OPTIONAL:
OPENAI_MODEL = gpt-4.1-mini
Agar default model use karna hai to OPENAI_MODEL set karna zaroori nahi.

IMPORTANT:
- OpenAI API billing/credits enabled hone chahiye; ChatGPT subscription API usage ke saath same nahi hota.
- API key ko script.js, HTML, GitHub public repo ya screenshots mein kabhi na daalein.
- Agar site GitHub se Vercel deploy hoti hai, is ZIP ke updated files apne local Nirman-construction project folder mein replace karein, phir GitHub par commit/push karein. api/chat.js root ke andar api folder mein hona chahiye.
- Agar “AI abhi connect nahi ho pa raha” aaye, Vercel > Functions/Logs check karein aur OPENAI_API_KEY spelling/environment verify karein.


UPLOAD KARNE KA IMPORTANT TARIKA:
- ZIP extract karne par jo project files milengi, unhe apne GitHub repository ke ROOT mein upload/replace karein.
- api/chat.js ka final path repository mein exactly api/chat.js hona chahiye (api folder index.html ke same level par).
- Sirf ZIP ko nested folder ke andar rakh dene se endpoint /api/chat par nahi milega.
- Push/commit ke baad Vercel deployment Ready hone dein, phir website ke AI chat se test karein.
- OPENAI_API_KEY ko frontend file mein kabhi na rakhein.
