import React from 'react';
export const mockDatabaseInfo = () => {
  return (
    <>
      <div class="validation-citation-container validation-container">
        <div class="validation-title">Validation status</div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus
          mauris ante, a iaculis leo placerat quis.
        </p>
      </div>
      <div class="dataset-info-container">
        <h2>Dataset info</h2>
        <div class="dataset-info-field">
          <div class="dataset-field-title">
            <h3>Resource title</h3>
            <span class="info-icon" tooltip="Info" direction="up">
              <i class="fas fa-info-circle"></i>
            </span>
          </div>
          <div class="dataset-field-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus
            mauris ante, a iaculis leo placerat quis.
          </div>
        </div>
        <div class="dataset-info-field">
          <div class="dataset-field-title">
            <h3>Resource abstract</h3>
            <span class="info-icon" tooltip="Info" direction="up">
              <i class="fas fa-info-circle"></i>
            </span>
          </div>
          <div class="dataset-field-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus
            mauris ante, a iaculis leo placerat quis. Sed tincidunt, dui sit
            amet ullamcorper efficitur, tortor metus hendrerit ipsum, et sodales
            elit velit sit amet dui. Nulla porttitor porttitor condimentum. Nunc
            non ornare tortor. Curabitur quis feugiat arcu, et tincidunt odio.
            Nullam varius lorem lacus, quis ullamcorper eros bibendum id. Etiam
            in vulputate magna. Quisque condimentum ipsum elementum tortor
            volutpat, a dapibus nisl lacinia. Proin urna dui, egestas in sapien
            pretium, placerat euismod dolor. Etiam turpis magna, auctor at
            gravida suscipit, feugiat ut magna. Duis laoreet laoreet ante nec
            dapibus. Ut ultrices est vel ligula commodo, pharetra tristique
            tellus consequat. Pellentesque habitant morbi tristique senectus et
            netus et malesuada fames ac turpis egestas.
          </div>
        </div>
        <div class="dataset-info-field">
          <div class="dataset-field-title">
            <h3>Resource type</h3>
            <span class="info-icon" tooltip="Info" direction="up">
              <i class="fas fa-info-circle"></i>
            </span>
          </div>
          <div class="dataset-field-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus
            mauris ante, a iaculis leo placerat quis.
          </div>
        </div>
        <div class="dataset-info-field">
          <div class="dataset-field-title">
            <h3>Resource locator</h3>
            <span class="info-icon" tooltip="Info" direction="up">
              <i class="fas fa-info-circle"></i>
            </span>
          </div>
          <div class="dataset-field-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus
            mauris ante, a iaculis leo placerat quis.
          </div>
        </div>
      </div>
      <div class="dataset-info-documents dropdown">
        <div class="ccl-expandable__button" aria-expanded="true">
          <h2>Technical documents (X docs)</h2>
        </div>
        <div class="documents-dropdown">
          <div class="card-doc">
            <div class="card-doc-title">Doc title</div>
            <div class="card-doc-text">
              <div class="doc-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                luctus mauris ante, a iaculis leo placerat quis.
              </div>
              <div class="card-doc-size">PDF X.X MB</div>
            </div>
          </div>
          <div class="card-doc">
            <div class="card-doc-title">Doc title</div>
            <div class="card-doc-text">
              <div class="doc-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                luctus mauris ante, a iaculis leo placerat quis.
              </div>
              <div class="card-doc-size">PDF X.X MB</div>
            </div>
          </div>
        </div>
      </div>
      <div class="dataset-info-products">
        <h2>Found the dataset in this products</h2>
        <div class="card-container">
          <div class="card-block">
            <div class="card-image">
              <img
                src="https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg"
                alt="Placeholder image"
              />
            </div>
            <div class="card-text">
              <div class="card-title">Dataset title</div>
              <div class="card-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                luctus mauris ante, a iaculis leo placerat quis. Nullam vitae
                vulputate leo, et ultricies dolor.
              </div>
              <div class="card-button">
                <a
                  href="../product-portfolio/product-overview/product-detail.html"
                  class="ccl-button ccl-button--default"
                >
                  Access to product
                </a>
              </div>
            </div>
          </div>
          <div class="card-block">
            <div class="card-image">
              <img
                src="https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg"
                alt="Placeholder image"
              />
            </div>
            <div class="card-text">
              <div class="card-title">Dataset title</div>
              <div class="card-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                luctus mauris ante, a iaculis leo placerat quis. Nullam vitae
                vulputate leo, et ultricies dolor.
              </div>
              <div class="card-button">
                <a
                  href="../product-portfolio/product-overview/product-detail.html"
                  class="ccl-button ccl-button--default"
                >
                  Access to product
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="validation-citation-container citation-container">
        <div class="citation-title">Dataset citation</div>
        <p>
          © European Union, Copernicus Land Monitoring Service{' '}
          <year>, European Environment Agency (EEA)</year>
        </p>
      </div>
    </>
  );
};

export const mockMetadata = () => {
  return (
    <>
      <button class="ccl-button ccl-button--default download-dataset-metadata">
        Download metadata
      </button>
      <div class="dataset-metadata-container">
        <h2>Data identification</h2>
        <div class="dataset-info-field">
          <div class="dataset-field-title">
            <h3>Resource title</h3>
            <span class="info-icon" tooltip="Info" direction="up">
              <i class="fas fa-info-circle"></i>
            </span>
          </div>
          <div class="dataset-field-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus
            mauris ante, a iaculis leo placerat quis.
          </div>
        </div>
        <div class="dataset-info-field">
          <div class="dataset-field-title">
            <h3>Resource abstract</h3>
            <span class="info-icon" tooltip="Info" direction="up">
              <i class="fas fa-info-circle"></i>
            </span>
          </div>
          <div class="dataset-field-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus
            mauris ante, a iaculis leo placerat quis. Sed tincidunt, dui sit
            amet ullamcorper efficitur, tortor metus hendrerit ipsum, et sodales
            elit velit sit amet dui. Nulla porttitor porttitor condimentum. Nunc
            non ornare tortor. Curabitur quis feugiat arcu, et tincidunt odio.
            Nullam varius lorem lacus, quis ullamcorper eros bibendum id. Etiam
            in vulputate magna. Quisque condimentum ipsum elementum tortor
            volutpat, a dapibus nisl lacinia. Proin urna dui, egestas in sapien
            pretium, placerat euismod dolor. Etiam turpis magna, auctor at
            gravida suscipit, feugiat ut magna. Duis laoreet laoreet ante nec
            dapibus. Ut ultrices est vel ligula commodo, pharetra tristique
            tellus consequat. Pellentesque habitant morbi tristique senectus et
            netus et malesuada fames ac turpis egestas.
          </div>
        </div>
        <div class="dataset-info-field">
          <div class="dataset-field-title">
            <h3>Resource type</h3>
            <span class="info-icon" tooltip="Info" direction="up">
              <i class="fas fa-info-circle"></i>
            </span>
          </div>
          <div class="dataset-field-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus
            mauris ante, a iaculis leo placerat quis.
          </div>
        </div>
        <div class="dataset-info-field">
          <div class="dataset-field-title">
            <h3>Resource locator</h3>
            <span class="info-icon" tooltip="Info" direction="up">
              <i class="fas fa-info-circle"></i>
            </span>
          </div>
          <div class="dataset-field-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus
            mauris ante, a iaculis leo placerat quis.
          </div>
        </div>
      </div>
      <div class="dataset-metadata-container">
        <h2>Classification of spatial data</h2>
      </div>
      <div class="dataset-metadata-container">
        <h2>Geographic reference</h2>
      </div>
      <div class="dataset-metadata-container">
        <h2>Temporal reference</h2>
      </div>
      <div class="dataset-metadata-container">
        <h2>Quality and validity</h2>
      </div>
      <div class="dataset-metadata-container">
        <h2>Conformity</h2>
      </div>
      <div class="dataset-metadata-container">
        <h2>Constraints related to access and use</h2>
      </div>
      <div class="dataset-metadata-container">
        <h2>Responsible organisation</h2>
      </div>
    </>
  );
};

export const mockDownloadDataset = () => {
  return (
    <>
      <div class="login-block">
        <div class="login-content">
          <button class="ccl-button ccl-button--default login-block-button">
            Login to download the data
          </button>
          <p class="login-block-new">
            New user?{' '}
            <a href="../register.html">Follow this link to register</a>
          </p>
        </div>
      </div>
      <div class="dataset-download-area">
        <h2>Download by area</h2>
        <p>
          Use this option if you would like to download the dataset for area(s)
          of interest.
        </p>
        <a
          href="download-area.html"
          id="dataset_download_area"
          class="ccl-button ccl-button--default"
          disabled=""
        >
          Go to download by area
        </a>
      </div>
      <div class="dataset-download-table">
        <h2>Download pre-packaged data collections</h2>
        <p>
          Please note that you can only download the latest version of our
          datasets from this website. If you are looking for older versions
          please contact us.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus
          mauris ante, a iaculis leo placerat quis.
        </p>
        <div class="custom-table dataset-table">
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Resolution</th>
                <th>Type</th>
                <th>Format</th>
                <th>Version</th>
                <th>Size</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>YYYY</td>
                <td>000m</td>
                <td>
                  <span class="tag tag-raster">Raster</span>
                </td>
                <td>Format</td>
                <td>v0.0</td>
                <td>000.0 MB</td>
              </tr>
              <tr>
                <td>YYYY</td>
                <td>000m</td>
                <td>
                  <span class="tag tag-vector">Vector</span>
                </td>
                <td>Format</td>
                <td>v0.0</td>
                <td>000.0 MB</td>
              </tr>
              <tr>
                <td>YYYY</td>
                <td>000m</td>
                <td>
                  <span class="tag tag-vector">Vector</span>
                </td>
                <td>Format</td>
                <td>v0.0</td>
                <td>000.0 MB</td>
              </tr>
            </tbody>
          </table>
        </div>
        <a
          href="../cart.html"
          id="dataset_download_cart"
          class="ccl-button ccl-button--default"
          disabled=""
        >
          Add to cart
        </a>
      </div>
    </>
  );
};
