class ApiUploadPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div class="m-2 space-y-4">
    <h1 class="text-5xl font-bold">API Upload</h1>
    <p class="m-2">
      This example shows how to upload images via the Upload API.
    </p>
    <div id="dragAndDropArea" class="drag-area">
      <p>Drag and drop images here</p>
    </div>
    <div id="uploadStatus"></div>
    <div id="uploadedImages" class="flex flex-wrap">
      <h2 class="w-full text-xl font-bold">Uploaded images</h2>
    </div>
  </div>`;

    const dragAndDropArea = document.getElementById('dragAndDropArea');
    const uploadStatus = document.getElementById('uploadStatus');
    const uploadedImages = document.getElementById('uploadedImages');

    uploadStatus.style.display = 'none';
    uploadedImages.classList.add('hidden');

    dragAndDropArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      dragAndDropArea.classList.add('drag-over');
    });

    dragAndDropArea.addEventListener('dragleave', () => {
      dragAndDropArea.classList.remove('drag-over');
    });

    dragAndDropArea.addEventListener('drop', async (e) => {
      e.preventDefault();
      dragAndDropArea.classList.remove('drag-over');

      const files = Array.from(e.dataTransfer.files);
      if (files.length === 0) return;

      uploadStatus.innerHTML =
        '<p>Image upload in progress...</p><span class="loading loading-spinner text-primary">&nbsp;</span>';
      uploadStatus.style.display = 'block';

      const uploadedFiles = [];

      for (let file of files) {
        try {
          const formData = new FormData();
          const fields = {
            file,
            upload_preset: import.meta.env.VITE_UPLOAD_PRESET,
            tags: ['myphotoalbum-js'],
            multiple: true,
            resource_type: 'image',
          };

          Object.entries(fields).forEach(([key, value]) => {
            formData.append(key, value);
          });

          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${
              import.meta.env.VITE_CLOUD_NAME
            }/upload`,
            {
              method: 'POST',
              body: formData,
            }
          );

          if (!response.ok) {
            throw new Error('Failed to upload file');
          }

          const json = await response.json();
          const secureUrl = json.secure_url;
          const previewUrl = secureUrl.replace(
            '/upload/',
            '/upload/w_400/f_auto,q_auto/'
          );
          uploadedFiles.push(previewUrl);
          uploadedImages.classList.remove('hidden');
        } catch (error) {
          console.error(error);
        }
      }

      uploadStatus.innerHTML = '';
      const h2El = uploadedImages.querySelector('h2');
      uploadedFiles.forEach((url) => {
        if (h2El.nextSibling) {
          const newDiv = document.createElement('div');
          newDiv.classList.add(
            'w-full',
            'sm:w-1/2',
            'md:w-1/2',
            'lg:w-1/3',
            'xl:w-1/4',
            'p-4'
          );
          const img = document.createElement('img');
          img.src = url;
          img.classList.add('w-full');
          newDiv.appendChild(img);
          uploadedImages.insertBefore(newDiv, h2El.nextSibling);
        } else {
          uploadedImages.appendChild(newDiv);
        }
      });
    });
  }
}

customElements.define('api-upload-page', ApiUploadPage);
