function sendWhatsApp(){
  const name=document.getElementById("name").value.trim();
  const phone=document.getElementById("phone").value.trim();
  const location=document.getElementById("location").value.trim();
  const message=document.getElementById("message").value.trim();
  const text=`Hello Nirman Construction,%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AProject Location: ${encodeURIComponent(location)}%0AProject Details: ${encodeURIComponent(message)}`;
  window.open("https://wa.me/9188104241402?text="+text,"_blank");
  return false;
}