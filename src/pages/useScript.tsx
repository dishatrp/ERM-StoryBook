import { useEffect } from 'react';

const useScript = (url: any, widgetCode: any, hasConsent: any) => {
    useEffect(() => {
        if (typeof window !== "undefined" && hasConsent) {
            const script = document.createElement('script');
            script.type = "text/javascript";
            let code = `var $zoho=$zoho || {};$zoho.salesiq = $zoho.salesiq || {widgetcode: "${widgetCode}", values:{},ready:function(){}};var d=document;var s=d.createElement("script");s.type="text/javascript";s.id="zsiqscript";s.defer=true;s.src="${url}";var t=d.getElementsByTagName("script")[0];t.parentNode.insertBefore(s,t);`;
            script.appendChild(document.createTextNode(code));
            document.body.appendChild(script);

            const zohoScript = document.createElement('script');
            zohoScript.type = "text/javascript";
            zohoScript.defer = true;
            zohoScript.src = url;
            document.body.appendChild(zohoScript);

            return () => {
                document.body.removeChild(script);
            };
        }
    }, [url, widgetCode, hasConsent]);
};

export default useScript;