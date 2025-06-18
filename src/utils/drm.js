module.exports = {
  applyDRMRestrictions(content, plan) {
    // Simulate resolution restriction based on plan
    const qualityLevels = {
      Basic: '480p',
      Standard: '720p',
      Premium: '1080p',
    }

    const allowedQuality = qualityLevels[plan] || '480p'
    return {
      ...content,
      allowedQuality,
      drmProtected: true,
    }
  },

  restrictConcurrentStreams(userStreams, maxAllowed) {
    return userStreams.length >= maxAllowed
  },

  geoBlock(userCountry, allowedRegions) {
    return !allowedRegions.includes(userCountry)
  }
}
