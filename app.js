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

  console.log({
    hash,
    hashContents,
    scamHostname,
    scamHref,
  })

  sendDocumentMessage('SCAM_WARNING_PROCEED', { scamHostname, scamHref, timestamp: Date.now() });

  window.location.href = scamHref;
}

window.onload = function () {
  document.querySelector('#proceed-btn').addEventListener('click', onProceed);

}

window.onunload = function () {
  document.querySelector('proceed-btn').removeEventListener('click', onProceed);
}