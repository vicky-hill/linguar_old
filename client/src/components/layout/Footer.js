import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import book from '../../img/icons/book-icon.png';
import speechbubble from '../../img/icons/speechbubble-icon.png';
import chevronright from '../../img/icons/chevron-right-icon.png';


const Footer = () => {
    return (
        <Fragment>
           {/* Vocabulary Footer Link */}
            <Link to="/vocabulary" className="footer-top">       
            <img className="icon" src={book} alt="book icon"/>
                <h5>Vocabulary</h5>
                <img className="chevron" src={chevronright} alt="chevron right"/>   
            </Link>
    
           
             {/* Conjugation Footer Link */}
            <div className="footer-bottom">
                <img className="icon" id="speechbubble" src={speechbubble} alt="speech bubble icon"/>
                <h5>Conjugation</h5>
                <img className="chevron" src={chevronright} alt="chevron right"/>  
            </div>
            
        </Fragment>
    )
}

export default Footer;