
import { InfoIcon } from '../info_icon'
import ButtonLogo from '../logo'
import SwitchInner from '../switch'
import './button.styles.css'

const DetailedButton = () => {
    return (

        <div className="detailed-button-container">
            <div className="climate-click-container">
                <div className='detailed-logo-image'>
                    <ButtonLogo />
                </div>
                <div className='detailed-content'>
                    <div className='top'>
                        <div className="detailed-title">Fund climate action</div>
                        <div className='detailed-info-logo' >
                            <InfoIcon />
                        </div>
                        <div className="detailed-price"> +0,25€</div>
                    </div>
                    <div className="description">Your contribution will be used to fund certified climate action projects that have proven to reduce the impacts of climate change</div>
                </div>
                <div className='detailed-switch'>
                    <SwitchInner />
                </div>
            </div>
        </div>
    )
}

export default DetailedButton
