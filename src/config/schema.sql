--user entity
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT,
    country TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

--Profile entity
CREATE TABLE profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    is_kids BOOLEAN DEFAULT FALSE,
    language_preference TEXT DEFAULT 'en',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

--Device entity
CREATE TABLE devices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    device_name TEXT,
    device_type TEXT,
    last_active DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

--Subscription entity
CREATE TABLE subscription_plans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    max_devices INTEGER,
    max_quality TEXT CHECK (max_quality IN ('480p', '720p', '1080p', '4K')),
    allow_live BOOLEAN,
    allow_kids BOOLEAN,
    concurrent_streams INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

--user subscriptions entity
CREATE TABLE user_subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    plan_id INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES subscription_plans(id)
);


--content entity
CREATE TABLE content (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    type TEXT CHECK (type IN ('movie', 'series', 'sports', 'live')),
    genre TEXT,
    language TEXT,
    release_date DATE,
    is_kids BOOLEAN DEFAULT FALSE,
    region TEXT,
    thumbnail_url TEXT,
    trailer_url TEXT,
    restricted_countries TEXT
);

--episodes entity
CREATE TABLE episodes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content_id INTEGER NOT NULL,
    season INTEGER,
    episode_number INTEGER,
    title TEXT,
    video_url TEXT,
    FOREIGN KEY (content_id) REFERENCES content(id) ON DELETE CASCADE
);

--subtitles entity
CREATE TABLE subtitles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content_id INTEGER NOT NULL,
    language TEXT,
    subtitle_url TEXT,
    FOREIGN KEY (content_id) REFERENCES content(id) ON DELETE CASCADE
);

--audio tracks entity
CREATE TABLE audio_tracks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content_id INTEGER NOT NULL,
    language TEXT,
    audio_url TEXT,
    FOREIGN KEY (content_id) REFERENCES content(id) ON DELETE CASCADE
);

--watchlist entity
CREATE TABLE watchlist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    profile_id INTEGER NOT NULL,
    content_id INTEGER NOT NULL,
    FOREIGN KEY (profile_id) REFERENCES profiles(id),
    FOREIGN KEY (content_id) REFERENCES content(id)
);


--sprots events entity
CREATE TABLE sports_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    sport_type TEXT,
    league TEXT,
    start_time DATETIME,
    end_time DATETIME,
    is_live BOOLEAN,
    stream_url TEXT
);


CREATE TABLE sports_scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id INTEGER NOT NULL,
    team1 TEXT,
    team2 TEXT,
    score1 INTEGER,
    score2 INTEGER,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES sports_events(id) ON DELETE CASCADE
);


CREATE TABLE channels (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    logo_url TEXT,
    language TEXT,
    stream_url TEXT
);


CREATE TABLE channel_programs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    channel_id INTEGER NOT NULL,
    program_name TEXT NOT NULL,
    start_time DATETIME,
    end_time DATETIME,
    description TEXT,
    FOREIGN KEY (channel_id) REFERENCES channels(id) ON DELETE CASCADE
);


CREATE TABLE viewing_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    profile_id INTEGER NOT NULL,
    content_id INTEGER NOT NULL,
    last_watched_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (profile_id) REFERENCES profiles(id),
    FOREIGN KEY (content_id) REFERENCES content(id)
);


CREATE TABLE recommendations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    profile_id INTEGER NOT NULL,
    content_id INTEGER NOT NULL,
    reason TEXT,
    FOREIGN KEY (profile_id) REFERENCES profiles(id),
    FOREIGN KEY (content_id) REFERENCES content(id)
);
