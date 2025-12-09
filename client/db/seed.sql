-- Basic seed data for Wind Tempo

-- 1) Create a test user
INSERT INTO users (id, username, email, password_hash)
VALUES (
  gen_random_uuid(),
  'aria',
  'aria@example.com',
  'dummy-hash-here'
)
ON CONFLICT (email) DO NOTHING;

-- 2) Grab that user's id
WITH creator AS (
  SELECT id FROM users WHERE username = 'aria' LIMIT 1
),

-- 3) Insert a song and a wind using that creator
insert_song AS (
  INSERT INTO songs (title, artist, bpm, length_seconds, audio_url, cover_url, is_official, uploader_id)
  SELECT
    'Starlight Arpeggios',
    'Wind Tempo OST',
    165,
    134,
    'https://example.com/audio/starlight-arpeggios.mp3',
    'https://example.com/covers/starlight-arpeggios.jpg',
    TRUE,
    creator.id
  FROM creator
  RETURNING id AS song_id
)

INSERT INTO winds (song_id, slug, title, difficulty, difficulty_label, creator_id, status, description, chart_file_url)
SELECT
  insert_song.song_id,
  'starlight-arpeggios-expert',
  'Starlight Arpeggios (Expert)',
  5.80,
  'Expert',
  creator.id,
  'published',
  'Fast arpeggio-focused piano chart.',
  'https://example.com/charts/starlight-arpeggios-expert.json'
FROM creator, insert_song;
