function sendDocumentMessage(event, data) {
  document.dispatchEvent(
    new CustomEvent('KEKKAI_MESSAGE', {
      detail: {
        event,
        data,
      },
    }),
  );
}

function onProceed () {
  const { hash } = new URL(window.location.href);
  const hashContents = hash.slice(1);
  const hashQueryString = new URLSearchParams(hashContents);
  const scamHostname = hashQueryString.get('hostname');
  const scamHref = hashQueryString.get('href');

  if (!scamHostname || !scamHref) {
    throw new Error('No host or href');
  }

  sendDocumentMessage('SCAM_WARNING_PROCEED', { scamHostname, scamHref, timestamp: Date.now() });

  window.location.href = scamHref;
}

function getQueryVariable(variable) {
    const query = window.location.search.substring(1);
    const vars = query.split("&");
    for (let i=0;i<vars.length;i++) {
        const pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return;
}

function renderTexts(lang) {
  const langs = ['en', 'ja', 'vi', 'id', 'bd', 'zh-CN'];
  if (!langs.includes(lang)) {
    lang = 'en';
  }
  const keys = Object.keys(i18n);
  for (let i = 0; i < keys.length; i++) {
    const el = document.querySelector(`#${keys[i]}`);
    if (el) {
      el.innerText = i18n[keys[i]][lang] || i18n[keys[i]]['en'] || '';
    }
  }
}


window.onload = function () {
  const { hash } = new URL(window.location.href);
  const hashContents = hash.slice(1);
  const hashQueryString = new URLSearchParams(hashContents);
  const lang = hashQueryString.get('lang') || navigator.language;
  renderTexts(lang);
  document.querySelector('#proceed-btn').addEventListener('click', onProceed);
}

window.onunload = function () {
  document.querySelector('proceed-btn').removeEventListener('click', onProceed);
}