------------------------------------------------------------
-- Wind Tempo Database Schema
-- Includes DROP IF EXISTS for development
------------------------------------------------------------

-- Enable UUIDs
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

------------------------------------------------------------
-- DROP EXISTING TABLES (DEV ONLY)
-- Order matters: drop dependents first
------------------------------------------------------------

DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS user_favorite_winds CASCADE;
DROP TABLE IF EXISTS community_post_likes CASCADE;
DROP TABLE IF EXISTS community_comments CASCADE;
DROP TABLE IF EXISTS community_posts CASCADE;
DROP TABLE IF EXISTS plays CASCADE;
DROP TABLE IF EXISTS wind_tags CASCADE;
DROP TABLE IF EXISTS tags CASCADE;
DROP TABLE IF EXISTS winds CASCADE;
DROP TABLE IF EXISTS songs CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS auth_sessions CASCADE;

------------------------------------------------------------
-- USERS & PROFILES
------------------------------------------------------------

CREATE TABLE users (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username       VARCHAR(32) UNIQUE NOT NULL,
    email          TEXT UNIQUE NOT NULL,
    password_hash  TEXT NOT NULL,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE user_profiles (
    user_id        UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    display_name   VARCHAR(50),
    bio            TEXT,
    avatar_url     TEXT,
    country_code   CHAR(2),
    skill_label    VARCHAR(20),
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE auth_sessions (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    expires_at  TIMESTAMPTZ NOT NULL,
    user_agent  TEXT,
    ip_address  INET
);

CREATE INDEX idx_auth_sessions_user_id ON auth_sessions(user_id);

------------------------------------------------------------
-- SONGS (audio) & WINDS (charts)
------------------------------------------------------------

CREATE TABLE songs (
    id              BIGSERIAL PRIMARY KEY,
    title           TEXT NOT NULL,
    artist          TEXT NOT NULL,
    bpm             INT,
    length_seconds  INT,
    audio_url       TEXT NOT NULL,
    cover_url       TEXT,
    is_official     BOOLEAN NOT NULL DEFAULT FALSE,
    uploader_id     UUID REFERENCES users(id),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_songs_title ON songs USING gin (to_tsvector('simple', title));
CREATE INDEX idx_songs_artist ON songs USING gin (to_tsvector('simple', artist));

CREATE TABLE winds (
    id               BIGSERIAL PRIMARY KEY,
    song_id          BIGINT NOT NULL REFERENCES songs(id) ON DELETE CASCADE,
    slug             TEXT UNIQUE NOT NULL,
    title            TEXT NOT NULL,
    difficulty       NUMERIC(4,2),
    difficulty_label VARCHAR(20),
    creator_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status           TEXT NOT NULL DEFAULT 'published'
                     CHECK (status IN ('draft','pending','published','archived')),
    description      TEXT,
    chart_file_url   TEXT NOT NULL,
    play_count       BIGINT NOT NULL DEFAULT 0,
    like_count       BIGINT NOT NULL DEFAULT 0,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_winds_song_id ON winds(song_id);
CREATE INDEX idx_winds_creator_id ON winds(creator_id);
CREATE INDEX idx_winds_status ON winds(status);

------------------------------------------------------------
-- TAGS
------------------------------------------------------------

CREATE TABLE tags (
    id    BIGSERIAL PRIMARY KEY,
    name  TEXT UNIQUE NOT NULL
);

CREATE TABLE wind_tags (
    wind_id BIGINT NOT NULL REFERENCES winds(id) ON DELETE CASCADE,
    tag_id  BIGINT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (wind_id, tag_id)
);

------------------------------------------------------------
-- PLAYS (scores)
------------------------------------------------------------

CREATE TABLE plays (
    id            BIGSERIAL PRIMARY KEY,
    user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    wind_id       BIGINT NOT NULL REFERENCES winds(id) ON DELETE CASCADE,
    score         INT NOT NULL,
    accuracy      NUMERIC(5,2) NOT NULL,
    max_combo     INT,
    is_full_combo BOOLEAN NOT NULL DEFAULT FALSE,
    mods          TEXT[],
    achieved_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_plays_user_id ON plays(user_id);
CREATE INDEX idx_plays_wind_id ON plays(wind_id);
CREATE INDEX idx_plays_wind_user ON plays(wind_id, user_id);

------------------------------------------------------------
-- COMMUNITY CONTENT
------------------------------------------------------------

CREATE TABLE community_posts (
    id          BIGSERIAL PRIMARY KEY,
    author_id   UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title       TEXT,
    body        TEXT NOT NULL,
    wind_id     BIGINT REFERENCES winds(id) ON DELETE SET NULL,
    category    TEXT,  -- "general", "feedback", "map-release", etc.
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_community_posts_author ON community_posts(author_id);
CREATE INDEX idx_community_posts_category ON community_posts(category);

CREATE TABLE community_comments (
    id          BIGSERIAL PRIMARY KEY,
    post_id     BIGINT NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
    author_id   UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    body        TEXT NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_community_comments_post ON community_comments(post_id);

CREATE TABLE community_post_likes (
    post_id    BIGINT NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
    user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (post_id, user_id)
);

------------------------------------------------------------
-- FAVORITES
------------------------------------------------------------

CREATE TABLE user_favorite_winds (
    user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    wind_id    BIGINT NOT NULL REFERENCES winds(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (user_id, wind_id)
);

------------------------------------------------------------
-- NOTIFICATIONS
------------------------------------------------------------

CREATE TABLE notifications (
    id          BIGSERIAL PRIMARY KEY,
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type        TEXT NOT NULL,
    payload     JSONB NOT NULL,
    is_read     BOOLEAN NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);
