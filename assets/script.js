const btn=document.querySelector('.menu-btn'); const nav=document.querySelector('.nav');
btn?.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const form=document.querySelector('#rfqForm');
form?.addEventListener('submit',async e=>{
  e.preventDefault();
  const obj=Object.fromEntries(new FormData(form).entries());
  const notice=form.querySelector('.notice');
  const sub=form.querySelector('.submit-btn');
  const label=sub?sub.textContent:'';
  if(sub){sub.disabled=true;sub.textContent='SENDING...';}
  if(notice){notice.classList.remove('ok','err');}
  try{
    const res=await fetch('https://formsubmit.co/ajax/cynthiasu@lemesy.com',{
      method:'POST',
      headers:{'Content-Type':'application/json',Accept:'application/json'},
      body:JSON.stringify({
        _subject:`LEMESY RFQ - ${obj.product||'General Inquiry'} - ${obj.company||obj.name}`,
        _template:'table',
        Name:obj.name,
        Company:obj.company,
        'Business Email':obj.email,
        'WhatsApp / Phone':obj.phone||'-',
        'Country / Region':obj.country,
        'Business Type':obj.businessType,
        'Product Interested In':obj.product||'-',
        'Estimated Quantity':obj.quantity||'-',
        'Customization Needed':obj.customization||'-',
        Message:obj.message||'-'
      })
    });
    const out=await res.json();
    if(out.success==='true'||out.success===true){
      form.reset();
      if(notice){notice.textContent='Thank you! Your request has been sent to our team. We reply within 24 hours.';notice.classList.add('ok');}
    }else{throw new Error(out.message||'send failed');}
  }catch(err){
    if(notice){notice.innerHTML='Could not send automatically. Please email us directly at <a href="mailto:cynthiasu@lemesy.com">cynthiasu@lemesy.com</a>.';notice.classList.add('err');}
  }finally{
    if(sub){sub.disabled=false;sub.textContent=label;}
  }
});
