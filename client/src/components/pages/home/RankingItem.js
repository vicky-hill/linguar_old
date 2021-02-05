import React from 'react';

const RankingItem = ({ level }) => {

    const showRankingList = (level) => {
        const rankingList = document.getElementById('ranking-list');
        rankingList.classList.add('show-ranking-list');

    }

    return (
        <div className="ranking_item" onClick={showRankingList}>
            <p className="ranking_level"><span className="emoji" role="img" aria-label="sheep">{level.emoji} </span>{level.title}</p>
            <div className="ranking_count">{level.count}</div>
        </div>

    )
}

export default RankingItem;