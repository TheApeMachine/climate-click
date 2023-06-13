
import { InfoIcon } from '../info_icon'
import ButtonLogo from '../logo'
import './button.styles.css'

const CheckboxButton = () => {
    return (

        <div className="checkbox-button-container">
            <div className='climate-click-container'>
                <input type="checkbox" />
                <div className='top'>
                    <div className="checkbox-title"> Fund climate action</div>
                    <div className='checkbox-info-logo'>
                            <InfoIcon />
                    </div>
                    <div className="checkbox-price"> +0,25€</div>
                </div>
                <div className='checkbox-logo-image'>
                    <ButtonLogo />
                </div>
            </div>
        </div>
    )
}

export default CheckboxButton
