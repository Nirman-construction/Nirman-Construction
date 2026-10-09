/** Nirman Construction free enquiry + visitor counter. Bind this script to a Google Sheet. */
const OWNER_EMAIL = 'info@nirmanconstruction.net.in';
const ENQUIRY_SHEET = 'Enquiries';
const VISIT_SHEET = 'Visits';

function setupSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  getOrCreateSheet_(ss, ENQUIRY_SHEET, ['Timestamp','Name','Mobile','Location','Project Type','Project Details','Message','Page']);
  getOrCreateSheet_(ss, VISIT_SHEET, ['Timestamp','Page','Referrer']);
}
function getOrCreateSheet_(ss, name, headers) {
  let sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);
  if (sh.getLastRow() === 0) sh.appendRow(headers);
  sh.setFrozenRows(1);
  return sh;
}
function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const p = (e && e.parameter) || {};
  const kind = String(p.kind || '');
  if (kind === 'visit') {
    getOrCreateSheet_(ss, VISIT_SHEET, ['Timestamp','Page','Referrer']).appendRow([new Date(), clean_(p.page,300), clean_(p.referrer,1000)]);
    return ContentService.createTextOutput('OK');
  }
  if (kind === 'enquiry') {
    const name=clean_(p.name,120), phone=clean_(p.phone,30), location=clean_(p.location,200), type=clean_(p.type,120);
    if (!name || !phone || !location || !type) return ContentService.createTextOutput('MISSING_FIELDS');
    const details=clean_(p.details,3000), message=clean_(p.message,2000), page=clean_(p.page,300);
    getOrCreateSheet_(ss, ENQUIRY_SHEET, ['Timestamp','Name','Mobile','Location','Project Type','Project Details','Message','Page']).appendRow([new Date(),name,phone,location,type,details,message,page]);
    const body = 'New website enquiry for Nirman Construction\n\nName: '+name+'\nMobile: '+phone+'\nLocation: '+location+'\nProject: '+type+'\nDetails: '+details+'\nMessage: '+message+'\nPage: '+page+'\n\nPlease contact the customer.';
    MailApp.sendEmail(OWNER_EMAIL, 'New Website Enquiry - Nirman Construction', body);
    return ContentService.createTextOutput('SAVED');
  }
  return ContentService.createTextOutput('UNKNOWN_ACTION');
}
function doGet(e) {
  const p=(e && e.parameter)||{};
  if (p.action === 'stats') {
    const ss=SpreadsheetApp.getActiveSpreadsheet();
    const sh=ss.getSheetByName(VISIT_SHEET);
    const count=sh ? Math.max(0, sh.getLastRow()-1) : 0;
    const data=JSON.stringify({visits:count});
    const callback=String(p.callback||'').replace(/[^a-zA-Z0-9_$\.]/g,'');
    if (callback) return ContentService.createTextOutput(callback+'('+data+');').setMimeType(ContentService.MimeType.JAVASCRIPT);
    return ContentService.createTextOutput(data).setMimeType(ContentService.MimeType.JSON);
  }
  return ContentService.createTextOutput('Nirman Construction enquiry endpoint is running.');
}
function clean_(value, max) {
  let s=String(value||'').replace(/[\\r\\n]+/g,' ').trim().slice(0,max);
  // Prevent spreadsheet formula injection.
  if (/^[=+@]/.test(s)) s="'"+s;
  return s;
}
