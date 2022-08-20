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
