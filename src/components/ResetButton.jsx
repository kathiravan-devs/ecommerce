import axios from "axios";
import './ResetButton.css'

export function ResetButton({ loadCart }) {

    const resetPageData = async () => {
        await axios.post('/api/reset');
        loadCart()
    }

    return (
        <button className="reset-btn" onClick={resetPageData}>
            <img src="public\images\icons\bin.png" alt='bin' />
            <span>Reset</span>
        </button>
    );
}