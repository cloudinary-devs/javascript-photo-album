class HomePage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<h1 class="text-5xl font-bold m-2">Welcome</h1>
    <p class="m-2">
      This sample project shows how to use the
      <a
        class="underline text-blue-500 hover:bg-blue-200 rounded-full transition duration-300"
        href="https://cloudinary.com/documentation/javascript_integration"
      >
        Cloudinary JavaScript SDK</a>.
    </p>
    <div class="p-2">
      The following pieces of functionality are exposed in this app:
      <ul class="list-disc list-inside">
        <li>
          <a
            class="underline text-blue-500 hover:bg-blue-200 rounded-full transition duration-300"
            href="/upload.html"
          >
            Upload (Upload Widget)</a>
          :shows an example implementation of the
          <a
            class="underline text-blue-500 hover:bg-blue-200 rounded-full transition duration-300"
            href="https://cloudinary.com/documentation/upload_widget"
          >
            Upload Widget</a>.
        </li>
        <li>
          <a
            class="underline text-blue-500 hover:bg-blue-200 rounded-full transition duration-300"
            href="/apiupload.html"
          >
            API Upload</a>: shows an example of how to use the
          <a
            class="underline text-blue-500 hover:bg-blue-200 rounded-full transition duration-300"
            href="https://cloudinary.com/documentation/image_upload_api_reference"
          >
            Upload API</a> to upload from a JavaScript context.
        </li>
        <li>
          <a
            class="underline text-blue-500 hover:bg-blue-200 rounded-full transition duration-300"
            href="/album.html"
          >
            Photo Album</a>: shows how to display images from a Cloudinary product environment.
        </li>
      </ul>
    </div>`;
  }
}

customElements.define('home-page', HomePage);
