
import { InfoIcon } from '../info_icon'
import ButtonLogo from '../logo'
import SwitchInner from '../switch'
import './button.styles.css'

const SwitchButton = () => {
    return (
        <div className="switch-button-container">
            <div className="climate-click-container">
                <div className='switch-logo-info'>
                    <SwitchInner />
                </div>
                <div className='switch-content'>
                    <div className='top'>
                        <div className="detailed-title"> Fund climate action</div>
                        <div className='detailed-info-logo'>
                            <InfoIcon />
                        </div>
                    </div>
                    <div className="switch-price"> 0,25€</div>
                </div>
                <div className='switch-logo-image'>
                    <ButtonLogo />
                </div>
               

            </div>
        </div>
    )
}

export default SwitchButton
