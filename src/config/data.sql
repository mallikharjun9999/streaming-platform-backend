-- Insert fresh records with restricted_countries
INSERT INTO content (id, title, description, type, genre, language, release_date, is_kids, region, thumbnail_url, trailer_url, restricted_countries) VALUES
(1, 'The Great Adventure', 'A thrilling adventure series', 'series', 'Action', 'English', '2023-06-01', 0, 'US', 'https://example.com/thumb1.jpg', 'https://example.com/trailer1.mp4', 'IN,PK'),

(2, 'Romance in Paris', 'A romantic drama in the city of love', 'movie', 'Romance', 'French', '2022-02-14', 0, 'FR', 'https://example.com/thumb2.jpg', 'https://example.com/trailer2.mp4', 'US'),

(3, 'Inception', 'A thief who steals corporate secrets through dream-sharing technology is given a chance to erase his past.', 'movie', 'sci-fi', 'English', '2010-07-16', 0, 'Global', 'https://example.com/thumbnails/inception.jpg', 'https://example.com/trailers/inception.mp4', NULL),

(4, 'Finding Nemo', 'A timid clownfish sets out on a journey to bring his son home.', 'movie', 'animation', 'English', '2003-05-30', 1, 'Global', 'https://example.com/thumbnails/nemo.jpg', 'https://example.com/trailers/nemo.mp4', NULL),

(5, 'Stranger Things', 'Supernatural forces and secret government exploits.', 'series', 'drama', 'English', '2016-07-15', 0, 'US', 'https://example.com/thumbnails/strangerthings.jpg', 'https://example.com/trailers/strangerthings.mp4', 'CN,RU'),

(6, 'FIFA World Cup Highlights', 'Highlights from the 2022 FIFA World Cup.', 'sports', 'football', 'English', '2022-12-18', 0, 'Global', 'https://example.com/thumbnails/fifa2022.jpg', 'https://example.com/trailers/fifa2022.mp4', NULL),

(7, 'Live Concert: Coldplay', 'Coldplay live from Wembley Stadium.', 'live', 'music', 'English', '2025-06-30', 0, 'Global', 'https://example.com/thumbnails/coldplaylive.jpg', 'https://example.com/trailers/coldplaylive.mp4', 'IR'),

(8, 'Champions League Final 2024', 'The football final showdown.', 'sports', 'football', 'English', '2024-06-01', 0, 'Europe', 'https://example.com/thumbs/uclfinal2024.jpg', 'https://example.com/trailers/uclfinal2024.mp4', 'IN,AF'),

(9, 'Live NASA Spacewalk', 'Live from the ISS.', 'live', 'science', 'English', '2025-06-17', 0, 'Global', 'https://example.com/thumbs/nasalive.jpg', 'https://example.com/trailers/nasalive.mp4', NULL);

-- seeds.sql

-- USERS
INSERT INTO users (id, email, password_hash, name, phone, country) VALUES
(1, 'john@example.com', '$2b$10$eP8jZ4q0B2UfLQJts8LZaOqYtVKRkL1Qz4U8cBhzvyT4YwKj6RYze', 'John Doe', '1234567890', 'US'),
(2, 'jane@example.com', '$2b$10$9xK1yH8fB9g/P3FQiyZNneFZ6N5ZUsiBF6F2ZsCKEmUn2JXZ4vXf2', 'Jane Smith', '0987654321', 'UK');

-- PROFILES
INSERT INTO profiles (id, user_id, name, is_kids, language_preference) VALUES
(1, 1, 'John Kid', 1, 'en'),
(2, 2, 'Jane Teen', 0, 'fr');

-- DEVICES
INSERT INTO devices (id, user_id, device_name, device_type) VALUES
(1, 1, 'iPhone 12', 'mobile'),
(2, 2, 'Samsung TV', 'tv');

-- SUBSCRIPTION PLANS
INSERT INTO subscription_plans (id, name, price, max_devices, max_quality, allow_live, allow_kids, concurrent_streams) VALUES
(1, 'Basic', 5.99, 1, '720p', 0, 1, 1),
(2, 'Premium', 9.99, 4, '1080p', 1, 1, 2);

-- USER SUBSCRIPTIONS
INSERT INTO user_subscriptions (id, user_id, plan_id, start_date, end_date) VALUES
(1, 1, 2, '2025-06-01', '2025-07-01'),
(2, 2, 1, '2025-06-10', '2025-07-10');


-- EPISODES
INSERT INTO episodes (id, content_id, season, episode_number, title, video_url) VALUES
(1, 1, 1, 1, 'Pilot Episode', 'https://example.com/video1.mp4'),
(2, 1, 1, 2, 'Next Chapter', 'https://example.com/video2.mp4');

-- SUBTITLES
INSERT INTO subtitles (id, content_id, language, subtitle_url) VALUES
(1, 1, 'English', 'https://example.com/subs1.vtt'),
(2, 2, 'French', 'https://example.com/subs2.vtt');

-- AUDIO TRACKS
INSERT INTO audio_tracks (id, content_id, language, audio_url) VALUES
(1, 1, 'English', 'https://example.com/audio1.mp3'),
(2, 2, 'French', 'https://example.com/audio2.mp3');

-- WATCHLIST
INSERT INTO watchlist (id, profile_id, content_id) VALUES
(1, 1, 1),
(2, 2, 2);

-- SPORTS EVENTS
INSERT INTO sports_events (id, title, description, sport_type, league, start_time, end_time, is_live, stream_url) VALUES
(1, 'Champions League Final', 'Exciting football final', 'Football', 'UEFA', '2025-06-18 20:00:00', '2025-06-18 22:00:00', 1, 'https://example.com/sports1.m3u8'),
(2, 'Wimbledon Final', 'Grand Slam Tennis Final', 'Tennis', 'ATP', '2025-07-12 15:00:00', '2025-07-12 17:00:00', 0, 'https://example.com/sports2.m3u8');

-- SPORTS SCORES
INSERT INTO sports_scores (event_id, team1, team2, score1, score2) VALUES
(1, 'Team A', 'Team B', 2, 1),
(2, 'Player 1', 'Player 2', 3, 2);

-- CHANNELS
INSERT INTO channels (id, name, logo_url, language, stream_url) VALUES
(1, 'National Geographic', 'https://example.com/logo1.png', 'English', 'https://example.com/channel1.m3u8'),
(2, 'Discovery', 'https://example.com/logo2.png', 'English', 'https://example.com/channel2.m3u8');

-- CHANNEL PROGRAMS
INSERT INTO channel_programs (channel_id, program_name, start_time, end_time, description) VALUES
(1, 'Wild Life Africa', '2025-06-16 14:00:00', '2025-06-16 15:00:00', 'Exploring wildlife in Africa'),
(2, 'Mega Constructions', '2025-06-16 16:00:00', '2025-06-16 17:00:00', 'Engineering marvels');

-- VIEWING HISTORY
INSERT INTO viewing_history (profile_id, content_id, last_watched_at) VALUES
(1, 1, '2025-06-15 20:30:00'),
(2, 2, '2025-06-14 19:00:00');

-- RECOMMENDATIONS
INSERT INTO recommendations (profile_id, content_id, reason) VALUES
(1, 2, 'Based on your interest in Action'),
(2, 1, 'Trending now in your region');


