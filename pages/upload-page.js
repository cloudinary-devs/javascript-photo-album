class UploadPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div class="m-2 space-y-4">
    <h1 class="text-5xl font-bold">Upload (Upload Widget)</h1>
    <p class="m-2">
      This example shows how to integrate the Cloudinary Upload Widget into
      a (vanilla) JavaScript application.
    </p>
    <div class="m-2">
      Please note that the following defaults are being used:
      <ul class="list-disc list-inside">
        <li>
          The upload source is limited to the local filesystem or to a
          remote URL.
        </li>
        <li>
          The
          <code class="bg-black text-gray-100 px-2 py-1 rounded-md text-sm">
            myphotoalbum-js</code
          >
          tag gets added to all photos uploaded via this method (this is
          used in the photo album to retrieve images).
        </li>
        <li>Only images can be uploaded.</li>
      </ul>
    </div>
    <button id="uploadButton" class="btn btn-primary" type="button">
      Upload Image
    </button>
    <div id="uploadedImagesContainer" class="flex flex-wrap"></div>
  </div>`;

    const uploadButton = document.getElementById('uploadButton');
    const uploadedImagesContainer = document.getElementById(
      'uploadedImagesContainer'
    );
    let isDisabled = false;
    let uploadedImages = [];

    const updateButtonState = () => {
      uploadButton.disabled = isDisabled;
      uploadButton.textContent = isDisabled ? 'Opening Widget' : 'Upload Image';
      uploadButton.classList.toggle('btn-disabled', isDisabled);
    };

    const processResults = (error, result) => {
      if (result && result.event === 'success') {
        const secureUrl = result.info.secure_url;
        const previewUrl = secureUrl.replace(
          '/upload/',
          '/upload/w_400/f_auto,q_auto/'
        );
        uploadedImages.push(previewUrl);
        displayUploadedImages();
      }
      isDisabled = false;
      updateButtonState();
    };

    const displayUploadedImages = () => {
      uploadedImagesContainer.innerHTML = uploadedImages
        .map(
          (uploadedImage, idx) => `
          <div key="${idx}" class="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
            <img class="w-full" src="${uploadedImage}" alt="uploaded image">
          </div>
        `
        )
        .join('');
    };

    const uploadWidget = () => {
      isDisabled = true;
      updateButtonState();

      window.cloudinary.openUploadWidget(
        {
          cloudName: import.meta.env.VITE_CLOUD_NAME,
          uploadPreset: import.meta.env.VITE_UPLOAD_PRESET,
          sources: ['local', 'url'],
          tags: ['myphotoalbum-js'],
          clientAllowedFormats: ['image'],
          resourceType: 'image',
        },
        processResults
      );
    };

    uploadButton.addEventListener('click', uploadWidget);

    updateButtonState();
  }
  loadUW() {
    const uwScript = document.getElementById('uw');
    if (!uwScript) {
      const script = document.createElement('script');
      script.setAttribute('async', '');
      script.setAttribute('id', 'uw');
      script.src = 'https://upload-widget.cloudinary.com/global/all.js';
      document.body.appendChild(script);
    }
  }
}

customElements.define('upload-page', UploadPage);
