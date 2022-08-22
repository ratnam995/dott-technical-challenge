# Image Classifier (Dogs)

This project is implemented as part of coding challenge for Dott. This was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to run this in local?

In the project directory, you can run:

### `npm install`

This will install all the required dependencies to run this project.
PS: I have used react-router v6 for setting up routes in this project.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Information about the app

### App Layout

- I have built this app as a generic image classifier.

### App Routes

This App contains 2 routes (or pages):
#### Home

- Can be accessed on `http://localhost:3000`.
- On the home page there is list of buttons for all the classifiers available (one for now, i.e. Dog classifier).
- This button redirects user to the dog classifier page.

#### Dog classifier

- Can be accessed on `http://localhost:3000/dog`.
- The first section of this page is divided into 2 parts (horizontally):
    - Image selector
        - The left half has a image selector form.
        - You can select images by clicking the box.
    - Image preview
        - The right half loads the preview of the selected image.
- Once the image is final, you can click on `Confirm` button below the Image selector box.
- This triggers the processing of image (using tensorflow mobileNet models), which returns predictions (dog breed and sub breed).
- Upon receiving information on the breed, dogceo API is triggered to fetch images of same breed dogs.
- Upon receiving the full list of images, a `View Gallery` button pops (and bounces) at the bottom of the screen. Clicking this button will scroll you to the Dog Gallery.
- Dog gallery has infinite scroll and lazy loading of images for a better user experience.

### State management

This app uses component's local state.

### High level user journey walk through in sync with code

- User lands on home and clicks on the Dogs button.
- User is redirected to /dogs page where there is a form to choose an image file.
- On choosing the image, preview of the image is visible after which user can confirm to classify the image.
- Once image is classified all the images for the dog's breed is fetched and stored.
- User views and clicks on the `View gallery` button, to view th gallery.
- In the gallery, the 10 images (at a time) are filtered and returned from the list of all the images (there is not dogs-ceo API which allows pagination) and are displayed.
- These 10 images are lazyloaded.
- There is infinte scroll implemented, so when the user scrolls to the bottom next 10 images are fetched and lazily loaded.
- User can go back to the form, by clicking the `View form` button and change the selected image anytime.

### Unit tests

I have setup Jest for unit tests. Snapshot testing for all the components is setup.
Full unit tests, I have written only for dogs-api and utils services because of the limited time.

### Known issues/bugs/optimisations

- **Optimisation:** The infinite scroll keeps on hitting the API (in this case a mock function to return paginated data) even after all the data is fetched. Since I had so many things to setup and implement during the 8 hours I deprioritised fixing it. Hope it does not has much impact on the assessment.
