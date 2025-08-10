import { useContext } from "react";
const defaultProps = {
  instagramPost: {
    width: 1080 / 2,
    height: 1080 / 2,
    innerPaddingY: 1080 / 10,
    scale: 1,
  },
  instagramStory: {
    width: 1080 / 2,
    height: 1920 / 2,
    innerPaddingY: 1920 / 8,
    scale: 1,
  },
  twitterPost: {
    width: 1200 / 2,
    height: 675 / 2,
    innerPaddingY: 0,
    scale: 0.7,
  },
  twitterHeader: {
    width: (1500 / 2) * 1.2,
    height: (500 / 2) * 1.2,
    innerPaddingY: 0,
    scale: 0.7,
  },
  facebookPost: {
    width: (1200 / 2) * 1.3,
    height: (630 / 2) * 1.3,
    innerPaddingY: 630 / 10,
    scale: 1,
  },
  facebookCover: {
    width: 820,
    height: 312,
    innerPaddingY: 312 / 10,
    scale: 0.7,
  },
  dribbleShot: {
    width: (800 / 2) * 1.5,
    height: (600 / 2) * 1.5,
    innerPaddingY: 600 / 10,
    scale: 1,
  },
  linkedinPost: {
    width: 1200 / 1.5,
    height: 627 / 1.5,
    innerPaddingY: 627 / 10,
    scale: 1,
  },
  linkedinCover: {
    width: 1584 / 1.5,
    height: 396 / 1.5,
    innerPaddingY: 10,
    scale: 0.5,
  },
};
function SocialMediaController({
  setStateValue,
  exportScale = 1,
  CardSizeContext,
  componentSocialMapping = {},
}: {
  setStateValue: Function;
  exportScale: number;
  CardSizeContext: React.Context<any>;
  componentSocialMapping?: any;
}) {
  const ctx = useContext(CardSizeContext);

  const setInstagramPostSize = () => {
    const key = "instagramPost";
    const map = componentSocialMapping[key] || defaultProps[key] || null;
    if (!map) return;
    Object.keys(map).forEach((prop) => {
      setStateValue(prop, map[prop]);
    });
  };

  const setInstagramStorySize = () => {
    const key = "instagramStory";
    const map = componentSocialMapping[key] || defaultProps[key] || null;
    if (!map) return;
    Object.keys(map).forEach((prop) => {
      setStateValue(prop, map[prop]);
    });
  };

  const setTwitterPostSize = () => {
    const key = "twitterPost";
    const map = componentSocialMapping[key] || defaultProps[key] || null;
    if (!map) return;
    Object.keys(map).forEach((prop) => {
      setStateValue(prop, map[prop]);
    });
  };

  const setTwitterHeaderSize = () => {
    const key = "twitterHeader";
    const map = componentSocialMapping[key] || defaultProps[key] || null;
    if (!map) return;
    Object.keys(map).forEach((prop) => {
      setStateValue(prop, map[prop]);
    });
  };

  const setFacebookPostSize = () => {
    const key = "facebookPost";
    const map = componentSocialMapping[key] || defaultProps[key] || null;
    if (!map) return;
    Object.keys(map).forEach((prop) => {
      setStateValue(prop, map[prop]);
    });
  };

  const setFacebookCoverSize = () => {
    const key = "facebookCover";
    const map = componentSocialMapping[key] || defaultProps[key] || null;
    if (!map) return;
    Object.keys(map).forEach((prop) => {
      setStateValue(prop, map[prop]);
    });
  };

  const setDribbleShotSize = () => {
    const key = "dribbleShot";
    const map = componentSocialMapping[key] || defaultProps[key] || null;
    if (!map) return;
    Object.keys(map).forEach((prop) => {
      setStateValue(prop, map[prop]);
    });
  };

  const setLinkedinPostSize = () => {
    const key = "linkedinPost";
    const map = componentSocialMapping[key] || defaultProps[key] || null;
    if (!map) return;
    Object.keys(map).forEach((prop) => {
      setStateValue(prop, map[prop]);
    });
  };

  const setLinkedinCoverSize = () => {
    const key = "linkedinCover";
    const map = componentSocialMapping[key] || defaultProps[key] || null;
    if (!map) return;
    Object.keys(map).forEach((prop) => {
      setStateValue(prop, map[prop]);
    });
  };

  return (
    <div
      style={{
        zIndex: 50,
      }}
      className="mb-4 z-50"
    >
      {/* Placeholder for Social Media Controller */}
      <div className="stats-info mb-1">
        {ctx?.width}px x {ctx?.height}px (
        {Math.round((ctx?.width! / ctx?.height!) * 100) / 100})
      </div>
      {/* instagram post 1080x1080 */}
      <button onClick={setInstagramPostSize} className="stats-info-button">
        Instagram Post
      </button>
      {/* instagram story 1080x1920 */}
      <button onClick={setInstagramStorySize} className="stats-info-button">
        Instagram Story
      </button>
      {/* twitter post 1200x675 */}
      <button onClick={setTwitterPostSize} className="stats-info-button">
        Twitter Post
      </button>
      {/* twitter header 1500x500 */}
      <button onClick={setTwitterHeaderSize} className="stats-info-button">
        Twitter Header
      </button>
      {/* facebook post 1200x630 */}
      <button onClick={setFacebookPostSize} className="stats-info-button">
        Facebook Post
      </button>
      {/* facebook cover 820x312 */}
      <button onClick={setFacebookCoverSize} className="stats-info-button">
        Facebook Cover
      </button>
      {/* dribble shot 800x600 */}
      <button onClick={setDribbleShotSize} className="stats-info-button">
        Dribble Shot
      </button>
      {/* linkedin post 1200x627 */}
      <button onClick={setLinkedinPostSize} className="stats-info-button">
        Linkedin Post
      </button>
      {/* linkedin cover 1584x396 */}
      <button onClick={setLinkedinCoverSize} className="stats-info-button">
        Linkedin Cover
      </button>

      {/* <div>
        <div className="flex flex-col mt-4 border p-2 rounded-md">
          <label className="block mb-2">
            Export scale: {exportScale ? exportScale : 0}x
          </label>
          <input
            type="range"
            min="0"
            name="exportScale"
            max="300"
            value={exportScale * 100}
            onChange={(e) =>
              setStateValue(e.target.name, Number(e.target.value) / 100)
            }
            className="w-full"
          />
        </div>
      </div> */}
    </div>
  );
}

export default SocialMediaController;
