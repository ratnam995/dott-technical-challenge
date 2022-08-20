import { ChangeEvent, DragEvent, MouseEvent, ForwardedRef, forwardRef, RefObject, useRef, useState } from "react"
import iPredictions from "../../shared/models/Predictions.model";
import iTfjsModel from "../../shared/models/TfjsModel.model";
import './fileReader.component.css';

interface iFileReaderPropTypes {
    ref: RefObject<HTMLDivElement>,
    selectedFile?: File,
    previewSrc?: string, 
    setSelectedFile: Function,
    fetchFullGallery: Function,
    setLoadingResult: Function
}

export const FileReader = forwardRef((props: iFileReaderPropTypes, ref: ForwardedRef<HTMLDivElement>) => {
    const {previewSrc, selectedFile, setSelectedFile, fetchFullGallery, setLoadingResult} = props;

    const inputRef: RefObject<HTMLInputElement> = useRef() as RefObject<HTMLInputElement>;
    const previewRef: RefObject<HTMLImageElement> = useRef() as RefObject<HTMLImageElement>;

    // triggers when file is selected with click
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const onFileUploadBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
        if (inputRef.current !== null) {
            inputRef.current.click();
        }
    };

    const onConfirmClick = async (e: MouseEvent<HTMLButtonElement>) => {
        if (previewRef.current) {
            setLoadingResult(true);
            // Load the model.
            let model: iTfjsModel|null = null;
            let predictions: Array<iPredictions>;
            try {
                model = await (window as any).mobilenet.load();
            } catch (e) {
                console.log("exception", e);
                setLoadingResult(false);
                alert("Oops! this wasn't expected. Please try again.")
            }

            if(model) {
                // Classify the image.
                try {
                    predictions = await model.classify(previewRef.current, 1);
                    fetchFullGallery(predictions);
                } catch (e) {
                    console.log("exception", e);
                    setLoadingResult(false);
                    alert("Oops! this wasn't expected. Please try again.")
                }
            }
        } else {
            alert("Please select an image to classify.");
        }
    }

    return <div ref={ref} className="form-container wrapper">
        <div className="form-wrapper">
            <form id="form-file-upload" onSubmit={(e) => e.preventDefault()}>
                <input ref={inputRef} type="file" id="input-file-upload" multiple={false} onChange={handleChange} />
                <label id="label-file-upload" htmlFor="input-file-upload">
                <div>
                    <button className="upload-button" onClick={onFileUploadBtnClick}>
                    {
                        selectedFile ? "Change file" : "Upload a file"
                    }
                    </button>
                </div> 
                </label>
                <button className="confirm-btn" onClick={onConfirmClick}>Confirm</button>
            </form>
        </div>
        <div className='preview-wrapper'>
        {selectedFile &&  <img ref={previewRef} className="image-preview" src={previewSrc} /> }
        </div>
    </div>
});
