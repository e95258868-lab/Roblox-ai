function getIds(){
  const url=location.href;
  const profile=url.match(/\/users\/(\d+)(?:\/|$)/i);
  const game=url.match(/\/games\/(\d+)(?:\/|$)/i);
  let userId=profile?.[1]||"", placeId=game?.[1]||"";
  const html=document.documentElement.innerHTML;
  if(!userId){const m=html.match(/(?:userId|user_id|UserId)[^0-9]{0,50}(\d{3,})/);if(m)userId=m[1];}
  if(!placeId){const m=html.match(/(?:placeId|place_id|PlaceId)[^0-9]{0,50}(\d{3,})/);if(m)placeId=m[1];}
  return {userId,placeId};
}
function scan(){
  const ids=getIds();
  return {
    type:ids.userId?"Profil":ids.placeId?"Oyun":"Roblox sayfası",
    title:document.title.replace(/\s*-\s*Roblox\s*$/i,'').trim(),
    userId:ids.userId, placeId:ids.placeId, url:location.href,
    visibleText:(document.body?.innerText||'').slice(0,30000),
    viewport:{width:innerWidth,height:innerHeight},
    language:document.documentElement.lang||navigator.language
  };
}
chrome.runtime.onMessage.addListener((msg,_,send)=>{
  if(msg?.type==='ROBLOX_SCAN'){send(scan());return true;}
});
