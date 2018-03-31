# Memoji
Memoji is a HTML5 game in which you should find in one minute all pairs represented by emojis.

It uses `<dialog>` tag and `::backdrop` pseudoelement. [As of now](https://caniuse.com/#search=dialog), this is fully implemented in Chrome only.
Firefox provides support by enabling "dom.dialog_element.enabled". But there is a pollyfill for `dialog`.
You can check it out [here](https://github.com/GoogleChrome/dialog-polyfill). It is really easy to include.