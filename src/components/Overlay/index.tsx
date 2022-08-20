import './overlay.component.css';

export const Overlay = () => {
    return <div className="overlay">
        <div className="overlay__inner">
            <div className="overlay__content">
                <span className="spinner"></span>
                <p>Processing image. Please wait...</p>
            </div>
        </div>
    </div>
}
