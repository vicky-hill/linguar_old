import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import { connect } from 'react-redux';
import { nextCard, removeLastWord, addTime, wordUpdate, closeReview } from '../../../actions/review';
import bonusPoints from '../../../sounds/bonus-points.mp3';

const Review = ({ review: { list, currentWord, translation, id, rating, loadingList, reviewMode }, nextCard, removeLastWord, addTime, wordUpdate, closeReview }) => {
    const [play] = useSound(bonusPoints);
    const [word, setWord] = useState('');


    useEffect(() => {
        checkAnswer(word);
    }, [word]);

    const english = document.getElementById("english");
    const spanish = document.getElementById("spanish");
    const review = document.getElementById("review");

    const updateCount = () => {
        const counter = document.getElementById('counter');
        const speed = 150;

        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;

        const inc = Math.round(target / speed);

        if (count < target) {
            counter.innerText = count + inc;
            setTimeout(updateCount, 1);
        } else {
            counter.innerText = target;
        }
    }

    // Reset the review card
    function resetReview() {
        english.classList.remove('small');
        spanish.classList.remove('correct');
        spanish.blur();
        setWord('');
    }


    // Check answer 
    const checkAnswer = async (typedAnswer) => {
        // Correct answer
        if (typedAnswer === translation) {

            play();

            spanish.classList.add("correct");

            // Get current review list length
            const array = list.length - 1;

            // Get new dueDate
            const newDueDate = await addTime(rating);

            // Add 1 to rating and update word in db
            wordUpdate(id, {
                rating: rating + 1,
                dueDate: newDueDate
            });

            if (array > 0) {
                setTimeout(() => {
                    nextCard(currentWord, array, 'correctAnswer');
                    resetReview();
                }, 1000);


                // Last word in review list
            } else {
                setTimeout(() => {
                    console.log('last word');
                    closeReview();
                    removeLastWord(currentWord);
                    review.classList.remove('slide-in');
                    resetReview();
                    updateCount();
                }, 1000);

            }
        }
    }

    const onChange = async (e) => {
        setWord(e.target.value);
        checkAnswer(e.target.value);
    }

    const shrinkEnglish = () => {
        english !== null && english.classList.add("small");
        document.getElementById("spanish").focus();
    }


    const keyboardAction = (e) => {

        // Handle Enter key press
        if (e.key === 'Enter') {
            spanish.blur();

            // If nothing typed, show translation
            if (word === '') {
                setWord(' ' + translation + ' ');
                const array = list.length - 1;

                // Subtract from rating
                if (rating !== 0) {
                    wordUpdate(id, {
                        rating: 0
                    });
                }

                setTimeout(() => {
                    nextCard(currentWord, array, 'incorrectAnswer');
                    resetReview();
                }, 2500);

                // Check if word is incorrect
            } else if (word !== translation) {

                spanish.classList.add("incorrect");

                // Show the right answer
                setTimeout(() => {
                    spanish.classList.remove('incorrect');
                    setWord(' ' + translation + ' ');
                    const array = list.length - 1;

                    // Subtract from rating
                    if (rating !== 0) {
                        wordUpdate(id, {
                            rating: 0
                        });
                    }

                    // Show next word
                    setTimeout(() => {
                        nextCard(currentWord, array, 'incorrectAnswer');
                        resetReview();
                    }, 2500);
                }, 1000);


            }
        }
    }



    !loadingList && reviewMode === true && document.addEventListener('keydown', shrinkEnglish);


    return (
        <div className="window slide-container" id="review">
            <div className='review' id="review" onKeyDown={shrinkEnglish}>
                <h1 className="english-word" id="english">{currentWord}</h1>
                <input
                    // readOnly={true}
                    autoCapitalize="none"
                    className="review-input"
                    id="spanish" type="text"
                    value={word}
                    onChange={onChange}
                    onClick={shrinkEnglish}
                    onKeyPress={keyboardAction}
                    autoComplete="off"
                />

            </div>
            <i className="fas fa-times edit-form--close full-screen--close" onClick={closeReview}></i>
        </div>

    )
}


const mapStateToProps = state => ({
    review: state.review
})

export default connect(mapStateToProps, { nextCard, removeLastWord, addTime, wordUpdate, closeReview })(Review);
