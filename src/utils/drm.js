const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./constants');

const generateDRMKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

const generateDRMToken = (userId, contentId) => {
  return jwt.sign(
    {
      userId,
      contentId,
      drmKey: generateDRMKey(),
      iat: Math.floor(Date.now() / 1000),
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

const applyDRMRestrictions = (content, plan) => {
  const qualityLevels = {
    Basic: '480p',
    Standard: '720p',
    Premium: '1080p',
  };

  const allowedQuality = qualityLevels[plan] || '480p';
  return {
    ...content,
    allowedQuality,
    drmProtected: true,
  };
};

const restrictConcurrentStreams = (userStreams, maxAllowed) => {
  return userStreams.length >= maxAllowed;
};

const geoBlock = (userCountry, allowedRegions) => {
  return !allowedRegions.includes(userCountry);
};

module.exports = {
  generateDRMKey,
  generateDRMToken,
  applyDRMRestrictions,
  restrictConcurrentStreams,
  geoBlock,
};