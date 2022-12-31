const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

// Button submit 
const onGenerateSubmit = (e) => {
  e.preventDefault();

  // clear generated QR code or submit button
  clearUI();

  const url = document.getElementById('url').value;
  const size = document.getElementById('size').value;

// validate URL
  if(url === ''){
    alert('Please enter a URL');
  }else{
    // show spinner for 1 sec
    showSpinner();

    setTimeout(() => {
      hideSpinner();
      generateQRCode(url, size);

      // create save button
      setTimeout(() => {
        const saveUrl = qr.querySelector('img').src;
        createSaveBtn(saveUrl);
      }, 50);
    }, 1000);
  }
};

// generate QR code using library
const generateQRCode = (url, size) => {
  const qrcode = new QRCode('qrcode', {
    text: url,
    width: size,
    height: size
  });
};

// show spinner
const showSpinner = () => {
  document.getElementById('spinner').style.display = 'block';
}

// hide spinner
const hideSpinner = () => {
  document.getElementById('spinner').style.display = 'none';
}

//clear element 
const clearUI = () => {
  // remove generated QR code
  qr.innerHTML = '';

  // remove generated save button
  const saveLink = document.getElementById('save-link');
  if(saveLink) saveLink.remove();

}

//save button for QR code
const createSaveBtn = (saveUrl) => {
  const link = document.createElement('a');
  link.id = 'save-link';
  link.classList = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
  link.href = saveUrl;
  link.download = 'qrcode';
  link.innerHTML = 'Save Image';
  document.getElementById('generated').appendChild(link);
};

hideSpinner();

form.addEventListener('submit', onGenerateSubmit);