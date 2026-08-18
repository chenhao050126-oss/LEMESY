const btn=document.querySelector('.menu-btn'); const nav=document.querySelector('.nav');
btn?.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const form=document.querySelector('#rfqForm');
form?.addEventListener('submit',e=>{
  e.preventDefault();
  const data=new FormData(form); const obj=Object.fromEntries(data.entries());
  const subject=encodeURIComponent(`LEMESY RFQ - ${obj.product||'General Inquiry'} - ${obj.company||obj.name}`);
  const body=encodeURIComponent(`Name: ${obj.name}\nBusiness Email: ${obj.email}\nCompany: ${obj.company}\nCountry/Region: ${obj.country}\nBusiness Type: ${obj.businessType}\nProduct Interested In: ${obj.product}\nEstimated Quantity: ${obj.quantity}\nCustomization Needed: ${obj.customization}\n\nMessage:\n${obj.message}`);
  window.location.href=`mailto:cynthiasu@lemesy.com?subject=${subject}&body=${body}`;
});
