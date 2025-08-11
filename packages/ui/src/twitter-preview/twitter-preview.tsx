"use client";

import React from "react";
import { CardContainer } from "../layouts/card-container";
import "./twitter-preview.style.css";

interface TwitterPreviewProps {
  scale?: number;
  className?: string;
  styles?: React.CSSProperties;
  pageName?: string;
  logoUrl?: string;
  logoUrlLabel?: string;

  // component props
  name: string;
  username: string;
  text: string;
  showTwitterUI?: boolean;
  verified?: boolean;
  profileImage?: string;
  tweetImage?: string;
}

export const TwitterPreview: React.FC<TwitterPreviewProps> = ({
  scale = 1,
  className = "",
  styles = {},
  pageName,
  logoUrl = "",
  logoUrlLabel = "",
  
  // component props:
  name = "",
  username = "",
  text = "",
  showTwitterUI = true,
  verified = true,
  profileImage = "",
  tweetImage = "",
}) => {
  return (
    <CardContainer
      className={className}
      styles={styles}
      pageName={pageName}
      logoUrl={logoUrl}
      logoUrlLabel={logoUrlLabel}
      lightMode={true}
      scale={scale}
    >
      <div className="twitter-preview-container">
        {showTwitterUI && (
          <div className="twitter-header">
            <div className="twitter-avatar">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="profile-image" />
              ) : null}
            </div>
            <div className="twitter-user-info">
              <div className="twitter-name-container">
                <span className="twitter-name">{name}</span>
                {verified && (
                  <svg viewBox="0 0 24 24" className="twitter-verified">
                    <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path>
                  </svg>
                )}
              </div>
              <span className="twitter-username">@{username}</span>
            </div>
          </div>
        )}
        
        <TwitterText text={text} />
        
        {tweetImage && (
          <div className="tweet-image-container">
            <img src={tweetImage} alt="Tweet content" className="tweet-image" />
          </div>
        )}
        
        {showTwitterUI && (
          <div className="twitter-footer">
            <div className="twitter-stats">
              <span className="twitter-stat">1:23 PM · Feb 28, 2025</span>
              <span className="twitter-stat">·</span>
              <span className="twitter-stat">10.4K Views</span>
            </div>
            <div className="twitter-actions">
              <div className="twitter-action">
                <svg viewBox="0 0 24 24" className="twitter-icon">
                  <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
                </svg>
                <span>128</span>
              </div>
              <div className="twitter-action">
                <svg viewBox="0 0 24 24" className="twitter-icon">
                  <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path>
                </svg>
                <span>45</span>
              </div>
              <div className="twitter-action">
                <svg viewBox="0 0 24 24" className="twitter-icon">
                  <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
                </svg>
                <span>298</span>
              </div>
              <div className="twitter-action">
                <svg viewBox="0 0 24 24" className="twitter-icon">
                  <path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"></path>
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </CardContainer>
  );
};

function TwitterText({ text }: { text: string }) {
  return (
    <div className="twitter-text">
      {text.split("\n").map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </div>
  );
}