/* The Days Between soft gate: current drop is open; past drops need membership.
   Member flag is set after joining on the homepage, or by ?member=1 links in member emails. */
(function(){
  var K='strand_member';
  function get(){ try{ return localStorage.getItem(K)==='1'; }catch(e){ return false; } }
  try{ if(new URLSearchParams(location.search).get('member')==='1'){ localStorage.setItem(K,'1'); } }catch(e){}
  var member=get();
  var JOIN='/?utm_source=days_between&utm_campaign=archive_gate#join';
  // Archive list: lock past drops for non-members
  document.querySelectorAll('.drops li[data-current="false"] a').forEach(function(a){
    if(member) return;
    a.setAttribute('href',JOIN);
    var em=a.querySelector('em'); if(em){ em.textContent='Join to read'; }
    a.classList.add('locked');
  });
  // Past drop page: overlay for non-members
  var card=document.querySelector('[data-drop-current="false"]');
  if(card && !member){
    card.classList.add('gated');
    var g=document.createElement('div'); g.className='gate';
    g.innerHTML='<b>This drop is for members.</b><p>Join free to read every past drop and get a new one each week.</p><a class="btn dark" href="'+JOIN+'">Join free</a>';
    card.appendChild(g);
  }
})();
