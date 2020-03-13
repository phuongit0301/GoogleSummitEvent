import React from 'react';

const Items = ({ item, indexSelected, index, isShowAudio, isAcceptClick, handleClick }) => {
    return (
        <div className="questions-area">
            <div className="item-wrapper">
                <div className="left">
                    <div className="item-left up-area">
                        <h2 className="title">OPTION</h2>
                        <p>{isAcceptClick ? (index + 1) : item.index}</p>
                    </div>
                    <div className="item-left down-area">
                        <span className="circle">{item.cost}</span><p className="txt-coins">COINS</p>
                    </div>
                </div>
                {
                    isAcceptClick ? 
                        <button className={`right ${(indexSelected && indexSelected === index + 1) ? ' active' : ''}`} disabled={isShowAudio} onClick={() => handleClick(item, index + 1)}>
                            <div className="question" dangerouslySetInnerHTML={{__html: item.title}}></div>
                        </button>
                    :
                        <button className={`right`}>
                            <div className="question" dangerouslySetInnerHTML={{__html: item.title}}></div>
                        </button>
                }
            </div>
        </div>
    )
}

export default Items;