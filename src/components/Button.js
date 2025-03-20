// src/components/Button.js
// TODO: strip this out here and in App.js probably..
import React from 'react';
import analytics from '../utils/analytics';

const Button = ({ onClick, children, campaignId, action }) => {
  const handleClick = (e) => {
    analytics.trackClick(e.target.id, {
      x: e.clientX,
      y: e.clientY
    });

    if (campaignId) {
      analytics.trackCampaign(campaignId, action || 'click');
    }

    onClick?.();
  };

  return (
    <button 
      id={children.toLowerCase()} 
      onClick={handleClick}
      className="tracking-button"
    >
      {children}
    </button>
  );
};

export default Button;