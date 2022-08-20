import { MouseEvent, RefObject, useEffect, useRef, useState } from 'react';
import { FileReader } from '../../components/FileReader';
import Gallery from '../../components/Gallery';
import { Overlay } from '../../components/Overlay';
import iDogsAPIResponse from '../../shared/models/DogsAPIResponse.model';
import iPredictions from '../../shared/models/Predictions.model';
import Dogs from '../../shared/services/apis/dogs.api';
import './classifier.page.css';

function ClassifierPage() {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [loadingResult, setLoadingResult] = useState<boolean>(false);
  const [fullList, updateFullList] = useState<Array<string>>([]);
  const [viewGallery, setViewGallery] = useState<boolean>(false);
  const [previewSrc, setPreviewSrc] = useState<string>();

  const imgFormRef: RefObject<HTMLDivElement> = useRef() as RefObject<HTMLDivElement>;
  const imgGalleryRef: RefObject<HTMLDivElement> = useRef() as RefObject<HTMLDivElement>;
  
  useEffect(() => {
    if (!selectedFile) {
        setPreviewSrc(undefined)
        return
    }

    const objectUrl: string = URL.createObjectURL(selectedFile)
    setPreviewSrc(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  useEffect(() => {
    if(viewGallery) {
      if(imgGalleryRef.current) {
        imgGalleryRef.current.scrollIntoView({ 
          behavior: 'smooth' 
        });
      }
    } else {
      if(imgFormRef.current) {
        imgFormRef.current.scrollIntoView({ 
          behavior: 'smooth' 
        });
      }
    }
  }, [viewGallery])

  const fetchFullGallery = async (predictions: Array<iPredictions>) => {
    const [ subBreed, breed ] = predictions[0].className.split(" ");
    Dogs.getAll(breed, subBreed)
    .then((response: iDogsAPIResponse) => {
      if(response) {
        if(response.code === 404) {
          alert("Is it a dinosaur? Doesn't look like a dog. Please upload a different image.")
        } else {
          updateFullList([...response.message]);
        }
      } else {
        alert("Oops! this wasn't expected. Please try again.")
      }
    })
    .catch((e) => {
      alert("Oops! this wasn't expected. Please try again.")
    })
    .finally(() => {
      setLoadingResult(false);
    });
  }

  const toggleViewGallery = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setViewGallery(!viewGallery);
  }

  return (
    <div className="scroll-container">
      {
        loadingResult ? <Overlay/>
        : null
      }
      {
        viewGallery ? null
        : <FileReader
          ref={imgFormRef}
          selectedFile={selectedFile}
          previewSrc={previewSrc}
          setSelectedFile={setSelectedFile}
          fetchFullGallery={fetchFullGallery}
          setLoadingResult={setLoadingResult}
        />
      }
      {
        !loadingResult && fullList && fullList.length ?
          <button
            className={`view-gallery-cta ${viewGallery ? 'top' : 'bottom'}`}
            onClick={toggleViewGallery}
            dangerouslySetInnerHTML={{ __html: viewGallery ? "View form &#8593;" : "View gallery &#8595;"}}
          />
          : null
      }
      {
        viewGallery && fullList && fullList.length ? <Gallery fullList={fullList} ref={imgGalleryRef}/>
        : null
      }
    </div>
  );
}

export default ClassifierPage;
