import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const config = {
  dataAsmCdn: "cdn-de.f11-ads.com",
  dataAsmHost: "ads.qualitymedianetwork.de",
  adScript: "https://cdn-de.f11-ads.com/adasync.min.js",
  pid: "346",
};

interface GDPR {
  gdprApplies: boolean;
  consentstring: string;
}

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function App() {
  const [gdpr, setGdpr] = useState<GDPR | undefined>();

  useEffect(() => {
    timeout(1000).then(() =>
      window
        //@ts-ignore
        .getGDPRString()
        .then(setGdpr)
    );
  }, []);

  useEffect(() => {
    if (!gdpr) {
      return;
    }
    const floorAd = document.createElement("div");
    const script = document.createElement("script");
    script.src = "floorad.js";
    script.setAttribute("data-asm-cdn", config.dataAsmCdn);
    script.setAttribute("data-asm-host", config.dataAsmHost);
    script.setAttribute("ad-loader", config.adScript);
    script.setAttribute("pid", config.pid);
    script.setAttribute("gdpr", gdpr.gdprApplies ? "1" : "0");
    script.setAttribute("gdpr_consent", gdpr.consentstring);
    script.async = true;
    document.body.appendChild(floorAd);
    floorAd.appendChild(script);

    return () => {
      document.body.removeChild(floorAd);
    };
  }, [gdpr]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Floor ad example</p>
      </header>
    </div>
  );
}

export default App;
