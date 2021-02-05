import React, { Fragment } from 'react'
import goldCircle from '../../../img/graphics/gold-circle.png';
import silverCircle from '../../../img/graphics/silver-circle.png';
import Footer from '../../layout/Footer';
import { connect } from 'react-redux';
import { startReview, openRanking } from '../../../actions/review';
import book from '../../../img/icons/book-icon.png';
import chevronright from '../../../img/icons/chevron-right-icon.png';
import speechbubble from '../../../img/icons/speechbubble-icon.png';
import { Link } from 'react-router-dom';

const Landing = ({ words: { count, loading }, startReview, openRanking, review: {list, loadingList} }) => {
    
    const windowClass = window.innerWidth < 1100 ? 'mobile' : 'desktop';

    
    // Gold circle
    const gold = (
        <Fragment>
            <div className={windowClass + "-landing_review"} onClick={openRanking}>
                <h2 className={windowClass + "-landing_review--title"}>All done!</h2>
                <img className={windowClass + "-landing_review--circle"} src={goldCircle} alt="gold-circle"/>
                <div className={windowClass + "-landing_review--tag"} >
                <p><span id="counter" data-target={count}>{count}</span> Words<span className="check-mark" id="check-mark">✓</span></p>
                </div>
            </div>
    </Fragment>
    )


    // Silver circle
    const silver = (
        <Fragment>
            <div className={windowClass + "-landing_review"} onClick={startReview} >
                <h2 className={windowClass + "-landing_review--title"} >Study!</h2>
                <img className={windowClass + "-landing_review--circle"} src={silverCircle} alt="silver-circle" />
                <div className={windowClass + "-landing_review--tag"} id="silver-tag">
                    <p>{list.length}</p>
                </div>
            </div>
        </Fragment>
    )


    return (
        <div className={windowClass + "-landing"}>
           
                { !loading && !loadingList ? list.length === 0 ? gold : silver : '' }
                { !loading && !loadingList ? windowClass === "desktop" ? (
                        <div className="desktop-landing_menu">
                         <Link to="/vocabulary">
                        <div className="desktop-landing_menu--card">
                            <img className="icon" src={book} alt="book icon" />
                            <h5>Vocabulary</h5>
                            <img className="chevron" src={chevronright} alt="chevron right" />
                        </div></Link>   
                
                        <Link to="/conjugation">
                        <div className="desktop-landing_menu--card">
                            <img className="icon" id="speechbubble" src={speechbubble} alt="speech bubble icon" />
                            <h5>Conjugation</h5>
                            <img className="chevron" src={chevronright} alt="chevron right" />
                        </div>
                        </Link>
                
                    </div>
                ) : null : '' }

           
                
            <Footer />
        </div>
    )
}

const mapStateToProps = state => ({
    words: state.words,
    review: state.review
})

export default connect(mapStateToProps, { startReview, openRanking })(Landing);


