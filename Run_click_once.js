let url_list =  [];

function get_Allowed_Domains () {
  browser.storage.local.get("allowed_domains").then((results) => {
		url_list = results.allowed_domains;
		if (url_list == undefined) {
      url_list =  ['http://sitsifsapp1.sits.local:59080','http://10.1.1.29:3000','http://10.0.1.29:3000'];
      browser.storage.local.set({allowed_domains: url_list});
		}
	}).catch((err) => {console.log('Error retrieving storage: '+err.message);});
}
get_Allowed_Domains();
function Is_Allowed(Present_url){
    let allow=false;
    for (var j=0; j<url_list.length; j++)
    {
      if (Present_url.indexOf(url_list[j])==0)
      {
        allow=true;
        break;
      }
    }
    return allow
};
function listener(req) {
  if (Is_Allowed(req.url)) {
    return  {redirectUrl:'ifs:' + req.url }; // redirect to registered URI
  } else {
    return {}};
};
function closetabs(req) {
  if (Is_Allowed(req.url) & req.url.substring(1,3)!='ifs') {
    var hiding = browser.tabs.remove(
        req.tabId
      );
  }
};


browser.webRequest.onHeadersReceived.addListener(
  closetabs,
  {
    urls: ["*://*/*.application*"],
    types: ["main_frame", "sub_frame", "other"]
  },
[ "responseHeaders"]

);
browser.webRequest.onBeforeSendHeaders.addListener(
		listener,
		{
			urls: ["*://*/*.application*"],
			types: ["main_frame", "sub_frame", "other"]
		},
		["blocking"]
	);
