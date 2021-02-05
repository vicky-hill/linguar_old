import React from 'react';
import { connect } from 'react-redux';
import RankingItem from './RankingItem';

const Ranking = ({ words: { words } }) => {

    const allLevels = [
        {
            emoji: '🎓',
            title: 'Level 10: Graduated',
            count: words.filter(word => word.rating >= 28 && word.rating <= 40).length,
            words: words.filter(word => word.rating >= 28 && word.rating <= 30)
        },
        {
            emoji: '🍾',
            title: 'Level 9: Almost there',
            count: words.filter(word => word.rating >= 25 && word.rating <= 27).length,
            words: words.filter(word => word.rating >= 25 && word.rating <= 27)
        },
        {
            emoji: '♠️',
            title: 'Level 8: Acing it',
            count: words.filter(word => word.rating >= 22 && word.rating <= 24).length,
            words: words.filter(word => word.rating >= 22 && word.rating <= 24)
        },
        {
            emoji: '✨',
            title: 'Level 7: Getting pretty good',
            count: words.filter(word => word.rating >= 19 && word.rating <= 21).length,
            words: words.filter(word => word.rating >= 19 && word.rating <= 21),
        },
        {
            emoji: '🎩',
            title: 'Level 6: Keep going',
            count: words.filter(word => word.rating >= 16 && word.rating <= 18).length,
            words: words.filter(word => word.rating >= 16 && word.rating <= 18)
        },
        {
            emoji: '🏳️',
            title: 'Level 5: Half way there',
            count: words.filter(word => word.rating >= 13 && word.rating <= 15).length,
            words: words.filter(word => word.rating >= 13 && word.rating <= 15)
        },
        {
            emoji: '💎',
            title: 'Level 4: Getting better',
            count: words.filter(word => word.rating >= 10 && word.rating <= 12).length,
            words: words.filter(word => word.rating >= 10 && word.rating <= 12)
        },
        {
            emoji: '📖',
            title: 'Level 3: Needs work',
            count: words.filter(word => word.rating >= 7 && word.rating <= 9).length,
            words: words.filter(word => word.rating >= 7 && word.rating <= 9)
        },
        {
            emoji: '🗝️',
            title: 'Level 2: Recently learned',
            count: words.filter(word => word.rating >= 4 && word.rating <= 6).length,
            words: words.filter(word => word.rating >= 4 && word.rating <= 6)
        },
        {
            emoji: '🧊',
            title: 'Level 1: Getting started',
            count: words.filter(word => word.rating >= 0 && word.rating <= 3).length,
            words: words.filter(word => word.rating >= 0 && word.rating <= 3)
        }
    ]

    let startIndex;

    for(let i = 0; i < allLevels.length; i++) {
        if(allLevels[i].count !== 0) {
            startIndex = i;
            break
        }
    }

    return (
       
        <div className='review ranking' id="ranking">
            {
                allLevels
                    .filter((level, index) => index >= startIndex )
                    .map((level, index) => (
                    <RankingItem key={index} level={level} />
                ))
            }
        </div>
    )
}

const mapStateToProps = state => ({
    words: state.words
})

export default connect(mapStateToProps)(Ranking);
