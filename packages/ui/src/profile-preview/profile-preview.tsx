"use client";

import React from "react";
import { CardContainer } from "../layouts/card-container";
import "./profile-preview.style.css";

interface ProfileCardPreviewProps {
  scale?: number;
  className?: string;
  styles?: React.CSSProperties;
  pageName?: string;
  logoUrl?: string;
  logoUrlLabel?: string;

  // component props
  name: string;
  jobTitle: string;
  description: string;
  profileImage?: string;
}

export const ProfileCardPreview: React.FC<ProfileCardPreviewProps> = ({
  scale = 1,
  className = "",
  styles = {},
  pageName,
  logoUrl = "",
  logoUrlLabel = "",
  
  // component props:
  name = "John Doe",
  jobTitle = "Senior Designer",
  description = "Passionate about creating beautiful user experiences and solving complex problems through design. With over 8 years of experience in the industry.",
  profileImage = "",
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
      <div className="profile-card-container">
        <div className="profile-image-section">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="profile-image"
            />
          ) : (
            <div className="profile-image-placeholder">
              <svg viewBox="0 0 24 24" className="profile-placeholder-icon">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
              </svg>
            </div>
          )}
        </div>
        
        <div className="profile-content">
          <h2 className="profile-name">{name}</h2>
          <p className="profile-jobtitle">{jobTitle}</p>
          <p className="profile-description">{description}</p>
        </div>
      </div>
    </CardContainer>
  );
};