var ar=';http://sitsifsapp1.sits.local:59080';
function listener(details) {
  if (ar.indexOf(details.url.substring(1,35))!=-1) {
   return  {redirectUrl:'ifs:' + details.url };
 } else {
  return {}};
}
function  closetabs(detalis) {
  if (ar.indexOf(detalis.url.substring(1,35))!=-1 & detalis.url.substring(1,3)!='ifs') {
    var hiding = browser.tabs.remove(
        detalis.tabId         // integer or integer array
      );
  }
}
browser.webRequest.onHeadersReceived.addListener(
  closetabs,
  {
    urls: ["<all_urls>"],
    types: ["main_frame"]
  },
[ "responseHeaders"]

)
browser.webRequest.onBeforeSendHeaders.addListener(
		listener,
		{
			urls: ["<all_urls>"],
			types: ["main_frame"]
		},
		["blocking"]
	);
