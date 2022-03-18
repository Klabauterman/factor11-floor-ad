# factor11-floor-ad

## Steps to integrate

1. integrate ConstentManager: https://www.contentmanager.de/ and getGDPRString must be defined.
2. load script with parameters:
   - pid
   - data-asm-cdn
   - data-asm-host
   - ad-loader (should be "https://cdn-de.f11-ads.com/adasync.min.js")
   - pid

## Hosted Demo

https://factor11-floor-ad.web.app/

## Hosted Script

https://factor11-floor-ad.web.app/floorad.js

## I cannot see the ad!

Check the console. If you see "f11-ads" outputs the ad gets loaded. The script checks for an iframe added to the container. Only if there is an iframe as an indicator that an ad is loaded the ad gets visible. If you see "MISSING IFRAME" the ad request does not return an ad or it returns an ad that is not embedded into an iframe. Contact factor11 for help!
