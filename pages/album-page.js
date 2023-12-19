import { Cloudinary } from '@cloudinary/url-gen';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';

class AlbumPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div class="m-2 space-y-4">
    <h1 class="text-5xl font-bold">Photo Album</h1>
    <p class="m-2">
      This page shows how to display images uploaded to your Cloudinary
      account.
    </p>
    <div class="m-2">
      Please note that the following defaults are being used:
      <ul class="list-disc list-inside">
        <li>
          Images are using the
          <code class="bg-black text-gray-100 px-2 py-1 rounded-md text-sm">
            responsive()</code>
          and
          <code class="bg-black text-gray-100 px-2 py-1 rounded-md text-sm">
            placeholder()</code>
          plugins
        </li>
        <li>
          Images tagged as
          <code class="bg-black text-gray-100 px-2 py-1 rounded-md text-sm">
            myphotoalbum-js</code>
          are displayed.
        </li>
        <li>
          Images are transformed using the following actions:
          <code
            class="bg-black text-gray-100 px-2 py-1 rounded-md text-sm whitespace-normal overflow-auto break-words"
          >
            .resize(thumbnail().width(300).height(300).gravity(autoGravity())).delivery(format(&apos;auto&apos;)).delivery(quality(&apos;auto&apos;));
          </code>
        </li>
      </ul>
    </div>
    <div id="loadingStatus" class="font-bold">Loading gallery...</div>
    <div id="photoGallery" class="flex flex-wrap -mx-4"></div>
    <div id="noPhotosMessage" class="text-xl p-4" style="display: none">
      No photos to list. Please make sure that you have uploaded some images
      using this app.
    </div>
  </div>`;
    const photoGallery = document.getElementById('photoGallery');
    const loadingStatus = document.getElementById('loadingStatus');
    const noPhotosMessage = document.getElementById('noPhotosMessage');

    this.getData('myphotoalbum-js');
  }
  cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLOUD_NAME,
    },
  });

  createCldImage(publicId) {
    const myImage = this.cld
      .image(publicId)
      .resize(thumbnail().width(300).height(300).gravity(autoGravity()))
      .delivery(format('auto'))
      .delivery(quality('auto'));
    return myImage.toURL();
  }

  displayPhotos(photos) {
    if (photos && photos.length > 0) {
      photos.forEach((photo) => {
        const photoContainer = document.createElement('div');
        photoContainer.classList.add('lg:w-1/3', 'md:w-1/2', 'w-full', 'p-4');
        const img = document.createElement('img');
        img.classList.add(
          'w-full',
          'h-64',
          'object-cover',
          'max-w-sm',
          'rounded-lg',
          'shadow-lg'
        );
        img.style.maxWidth = '100%';
        img.src = this.createCldImage(photo.public_id);
        photoContainer.appendChild(img);
        photoGallery.appendChild(photoContainer);
      });
    } else {
      noPhotosMessage.style.display = 'block';
    }
  }

  async getData(tag) {
    try {
      const response = await fetch(
        `https://res.cloudinary.com/${
          import.meta.env.VITE_CLOUD_NAME
        }/image/list/${tag}.json`
      );
      const data = await response.json();
      this.displayPhotos(data.resources);
    } catch (error) {
      console.error('Error fetching data:', error);
      noPhotosMessage.style.display = 'block';
    } finally {
      loadingStatus.style.display = 'none';
    }
  }
}

customElements.define('album-page', AlbumPage);
