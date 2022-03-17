import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

const config = {
  dataAsmCdn: "cdn-de.f11-ads.com",
  dataAsmHost: "ads.qualitymedianetwork.de",
  adScript: "https://cdn-de.f11-ads.com/adasync.min.js",
  pid: "346",
};

function App() {
  useEffect(() => {
    const floorAd = document.createElement("div");
    const script = document.createElement("script");
    script.src = "https://factor11-floor-ad.web.app/floorad.js";
    script.setAttribute("data-asm-cdn", config.dataAsmCdn);
    script.setAttribute("data-asm-host", config.dataAsmHost);
    script.setAttribute("ad-loader", config.adScript);
    script.setAttribute("pid", config.pid);
    script.async = true;
    document.body.appendChild(floorAd);
    floorAd.appendChild(script);

    return () => {
      document.body.removeChild(floorAd);
    };
  }, []);

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
