# Streaming Platform API Documentation

**Created by: Penugonda Mallikharjunarao**

## Overview

This is a comprehensive Node.js/Express backend API for a streaming platform that supports movies, series, live content, sports events, and multilingual content with subscription-based access control.

### Features
- User authentication and profile management
- Subscription-based content access (Basic, Premium plans)
- Multi-device support with concurrent stream limits
- Geo-restrictions and DRM protection
- Sports events with live scores
- Channel programming and live TV
- Watchlist and viewing history
- Multi-language support (English, Hindi, Telugu, Tamil, Malayalam, Bengali)

### Technology Stack
- **Backend**: Node.js, Express.js
- **Database**: SQLite3
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **CORS**: Enabled for cross-origin requests

## Getting Started

### Prerequisites
- Node.js (v20 or higher)
- npm or yarn package manager

### Clone and Setup

1. **Local Development Setup** 
   ```bash
   git clone <repository-url>
   cd streaming-platform-backend
   npm install
   node ./src/app.js
   ```

2. **Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   JWT_SECRET=your_jwt_secret_key_here
   PORT=3000
   ```

3. **Database Initialization run below command in terminal**
   node ./src/config/init.mjs

### Base URL

- **Development**: `http://localhost:3000` 

### Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## API Endpoints

### 🔐 Authentication (`/api/auth`)

#### Register User
- **POST** `/api/auth/register`
- **Description**: Register a new user account
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe",
  "phone": "1234567890",
  "country": "US"
}
```
- **Response** (201):
```json
{
  "message": "User registered successfully"
}
```
- **Error Responses**:
  - `400`: Invalid input data
  - `409`: User already exists

#### Login User
- **POST** `/api/auth/login`
- **Description**: Authenticate user and get access token
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```
- **Response** (200):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
- **Error Responses**:
  - `401`: Invalid credentials
  - `404`: User not found

### 👤 Profile Management (`/api/profile`)
#### Create Profile
- **POST** `/api/profile/create-profile`
- **Description**: Create a new profile for the user
- **Headers**: 
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Request Body**:
```json
{
  "name": "Teen Profile",
  "is_kids": false,
  "language_preference": "hi"
}
```
- **Response** (201):
```json
{
  "message": "Profile created successfully",
  "profileId": 3
}
```

#### Get User Profile
- **GET** `/api/profile/`
- **Description**: Get user profile for the authenticated user
- **Headers**: `Authorization: Bearer <token>`
- **Response** (200):
```json
  {
    "id": 1,
    "user_id": 1,
    "name": "John Adult",
    "is_kids": false,
    "language_preference": "en"
  }
  ```

#### Get User Profiles
- **GET** `/api/profile/profiles`
- **Description**: Get all profiles for the authenticated user
- **Headers**: `Authorization: Bearer <token>`
- **Response** (200):
```json
[
  {
    "id": 1,
    "user_id": 1,
    "name": "John Adult",
    "is_kids": false,
    "language_preference": "en"
  },
  {
    "id": 2,
    "user_id": 1,
    "name": "John Kids",
    "is_kids": true,
    "language_preference": "en"
  }
]
```
###update profile
#### Get User Profiles
- **PUT** `/api/profile/`
- **Description**: update profile for the authenticated user
- **Headers**: `Authorization: Bearer <token>`
- **Response** (200):
  Profile updated successfully


### 🎬 Content Management (`/api/content`)

#### Get All Content
- **GET** `/api/content/`
- **Description**: Get all available content (movies, series, sports, live)
- **Headers**: `Authorization: Bearer <token>`
- **Query Parameters**:
  - `type` (optional): Filter by content type (movie, series, sports, live)
  - `genre` (optional): Filter by genre
  - `language` (optional): Filter by language
- **Response** (200):
```json
[
  {
    "id": 1,
    "title": "Breaking Bad",
    "description": "A high school chemistry teacher turned methamphetamine manufacturer",
    "type": "series",
    "genre": "drama",
    "language": "English",
    "release_date": "2008-01-20",
    "is_kids": false,
    "region": "Global",
    "thumbnail_url": "https://example.com/thumbnails/breaking-bad.jpg",
    "trailer_url": "https://example.com/trailers/breaking-bad.mp4",
    "restricted_countries": null
  }
]
```

#### Get Content by ID
- **GET** `/api/content/:id`
- **Description**: Get detailed information about specific content
- **Headers**: `Authorization: Bearer <token>`
- **Response** (200):
```json
{
  "id": 1,
  "title": "Breaking Bad",
  "description": "A high school chemistry teacher turned methamphetamine manufacturer",
  "type": "series",
  "genre": "drama",
  "language": "English",
  "release_date": "2008-01-20",
  "is_kids": false,
  "region": "Global",
  "thumbnail_url": "https://example.com/thumbnails/breaking-bad.jpg",
  "trailer_url": "https://example.com/trailers/breaking-bad.mp4",
  "episodes": [
    {
      "id": 1,
      "season": 1,
      "episode_number": 1,
      "title": "Pilot Episode",
      "video_url": "https://example.com/video1.mp4"
    }
  ],
  "subtitles": [
    {
      "language": "English",
      "subtitle_url": "https://example.com/subs1.vtt"
    }
  ],
  "audio_tracks": [
    {
      "language": "English",
      "audio_url": "https://example.com/audio1.mp3"
    }
  ]
}
```

### 💳 Subscriptions (`/api/subscriptions`)

#### Get Subscription Plans
- **GET** `/api/subscriptions/plans`
- **Description**: Get all available subscription plans
- **Headers**: `Authorization: Bearer <token>`
- **Response** (200):
```json
[
  {
    "id": 1,
    "name": "Basic",
    "price": 5.99,
    "max_devices": 1,
    "max_quality": "720p",
    "allow_live": false,
    "allow_kids": true,
    "concurrent_streams": 1
  },
  {
    "id": 2,
    "name": "Premium",
    "price": 9.99,
    "max_devices": 4,
    "max_quality": "1080p",
    "allow_live": true,
    "allow_kids": true,
    "concurrent_streams": 2
  }
]
```

#### Subscribe to Plan
- **POST** `/api/subscriptions/subscribe`
- **Description**: Subscribe user to a specific plan
- **Headers**: 
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Request Body**:
```json
{
  "planId": 2
}
```
- **Response** (201):
```json
{
  "message": "Subscription successful"
}
```

#### Get User Subscription
- **GET** `/api/subscriptions/my-subscription`
- **Description**: Get current user's subscription details
- **Headers**: `Authorization: Bearer <token>`
- **Response** (200):
```json
{
  "id": 1,
  "user_id": 1,
  "plan_name": "Premium",
  "price": 9.99,
  "start_date": "2025-06-18",
  "end_date": "2025-07-18",
  "is_active": true,
  "max_devices": 4,
  "max_quality": "1080p",
  "concurrent_streams": 2
}
```

### 🎯 Streaming (`/api/stream`)

#### Stream Content
- **GET** `/api/stream/:contentId/stream`
- **Description**: Start streaming specific content
- **Headers**: `Authorization: Bearer <token>`
- **Middleware**: Checks subscription, device limits, and geo-restrictions
- **Response** (200):
```json
{
    "stream_url": "https://example.com/stream/content1.m3u8",
    "drm_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImNvbnRlbnRJZCI6IjEiLCJkcm1LZXkiOiI0MGU5MWYwOTVkY2EzNjg1OWIyYzdmNjc4NDc5MWQ5M2JjNDJkNGY0YTFhNjQzNzAzNjQwMWQzYWZlZTA5ZmVmIiwiaWF0IjoxNzUwNDEzNjM2LCJleHAiOjE3NTA1MDAwMzZ9.Hlk_R4Zd4DzC9BM29MZiFJZ8h1DYbsxwLR6e2mpe8ss",
    "expires_at": "2025-06-21T10:00:36.617Z"
}
```
- **Error Responses**:
  - `403`: Subscription required or device limit exceeded
  - `451`: Content not available in your region

### 🏆 Sports (`/api/sports`)

#### Get All Sports Events
- **GET** `/api/sports/events`
- **Description**: Get all sports events
- **Headers**: `Authorization: Bearer <token>`
- **Response** (200):
```json
[
  {
    "id": 1,
    "title": "Champions League Final",
    "description": "Exciting football final",
    "sport_type": "Football",
    "league": "UEFA",
    "start_time": "2025-06-18T20:00:00Z",
    "end_time": "2025-06-18T22:00:00Z",
    "is_live": true,
    "stream_url": "https://example.com/sports1.m3u8"
  }
]
```

#### Get Live Events
- **GET** `/api/sports/live-events`
- **Description**: Get currently live sports events
- **Headers**: `Authorization: Bearer <token>`
- **Response** (200):
```json
[
  {
    "id": 1,
    "title": "Champions League Final",
    "sport_type": "Football",
    "league": "UEFA",
    "is_live": true,
    "stream_url": "https://example.com/sports1.m3u8"
  }
]
```

#### Get Event by ID
- **GET** `/api/sports/events/:eventId`
- **Description**: Get detailed information about a specific sports event
- **Headers**: `Authorization: Bearer <token>`
- **Response** (200):
```json
{
  "id": 1,
  "title": "Champions League Final",
  "description": "Exciting football final",
  "sport_type": "Football",
  "league": "UEFA",
  "start_time": "2025-06-18T20:00:00Z",
  "end_time": "2025-06-18T22:00:00Z",
  "is_live": true,
  "stream_url": "https://example.com/sports1.m3u8"
}
```

#### Get Live Scores
- **GET** `/api/sports/scores/:eventId`
- **Description**: Get live scores for a specific sports event
- **Headers**: `Authorization: Bearer <token>`
- **Response** (200):
```json
[
  {
    "id": 1,
    "event_id": 1,
    "team1": "Team A",
    "team2": "Team B",
    "score1": 2,
    "score2": 1,
    "updated_at": "2025-06-18T21:30:00Z"
  }
]
```

### 📺 Channels (`/api/channels`)

#### Get All Channels
- **GET** `/api/channels/`
- **Description**: Get all available TV channels
- **Headers**: `Authorization: Bearer <token>`
- **Response** (200):
```json
[
  {
    "id": 1,
    "name": "National Geographic",
    "logo_url": "https://example.com/logo1.png",
    "language": "English",
    "stream_url": "https://example.com/channel1.m3u8"
  }
]
```
#### Get Channel Programs

-**GET** `/api/channels/`
-**Description**:Get all channels
-**Headers**:`Authorization: Bearer <token>`
-**Response**(200):
```json
[
    {
        "id": 1,
        "name": "National Geographic",
        "logo_url": "https://example.com/logo1.png",
        "language": "English",
        "stream_url": "https://example.com/channel1.m3u8"
    },
    {
        "id": 2,
        "name": "Discovery",
        "logo_url": "https://example.com/logo2.png",
        "language": "English",
        "stream_url": "https://example.com/channel2.m3u8"
    }
]
```
- **GET**`/api/channels/:channelId/programs`
- **Description**: Get programming schedule for a specific channel
- **Headers**: `Authorization: Bearer <token>`
- **Response** (200):
```json
[
  {
    "id": 1,
    "channel_id": 1,
    "program_name": "Wild Life Africa",
    "start_time": "2025-06-16T14:00:00Z",
    "end_time": "2025-06-16T15:00:00Z",
    "description": "Exploring wildlife in Africa"
  }
]
```

### 📋 Watchlist (`/api/watchlist`)

#### Get User Watchlist
- **GET** `/api/watchlist/`
- **Description**: Get watchlist for a specific profile
- **Headers**: `Authorization: Bearer <token>`
-**Request**:
```json
{
  "profileId":2
}
```
- **Response** (200):
```json
[
    {
        "id": 2,
        "title": "Romance in Paris",
        "thumbnail_url": "https://example.com/thumb2.jpg",
        "genre": "Romance",
        "language": "French",
        "type": "movie"
    }
]
```

#### Add to Watchlist
- **POST** `/api/watchlist/add`
- **Description**: Add content to user's watchlist
- **Headers**: 
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Request Body**:
```json
{
  "contentId": 5,
  "profileId": 3
}
```
- **Response** (201):
```json
{
  "message": "Added to watchlist"
}
```

#### Remove from Watchlist
- **DELETE** `/api/watchlist/remove`
- **Description**: Remove content from user's watchlist
- **Headers**: `Authorization: Bearer <token>`
-**Request**:
```json
{
  "contentId": 5,
  "profileId": 3
}
```
- **Response** (200):
```json
{
  "message": "Removed from watchlist successfully"
}
```

## Using with Postman

### Setup Postman Collection

1. **Create New Collection**
   - Open Postman
   - Click "New" → "Collection"
   - Name it "Streaming Platform API"

2. **Set Base URL Variable**
   - In your collection, go to "Variables" tab
   - Add variable: `baseUrl` with value: `http://localhost:3000` (for local development)

3. **Set Authentication Token**
   - Add variable: `authToken` (leave initial value empty)
   - After login, copy the token from response and set it as current value

### Example Postman Requests

#### 1. Register User
```
POST {{baseUrl}}/api/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123",
  "name": "Test User",
  "phone": "1234567890",
  "country": "US"
}
```

#### 2. Login User
```
POST {{baseUrl}}/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

#### 3. Get Content (Protected)
```
GET {{baseUrl}}/api/content/
Authorization: Bearer {{authToken}}
```

#### 4. Stream Content (Protected)
```
GET {{baseUrl}}/api/stream/1/stream
Authorization: Bearer {{authToken}}
```

### Postman Environment Setup

Create a new environment with these variables:
- `baseUrl`: Your API base URL
- `authToken`: JWT token (set after login)
- `userId`: User ID (set after login)
- `profileId`: Profile ID (set after creating profile)

## Error Handling

### Common HTTP Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request (Invalid input)
- `401`: Unauthorized (Invalid/missing token)
- `403`: Forbidden (Insufficient permissions)
- `404`: Not Found
- `409`: Conflict (Resource already exists)
- `451`: Unavailable For Legal Reasons (Geo-blocked)
- `500`: Internal Server Error

### Error Response Format
```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": "Additional error details"
}
```

## Rate Limiting & Restrictions

### Subscription-Based Limitations
- **Basic Plan**: 1 device, 720p quality, 1 concurrent stream
- **Premium Plan**: 4 devices, 1080p quality, 2 concurrent streams

### Geo-Restrictions
Some content may be restricted in certain countries. The API will return a `451` status code for geo-blocked content.

### Device Limits
Users cannot exceed the device limit based on their subscription plan. The system tracks and enforces these limits.

## Security Features

### JWT Authentication
- All protected endpoints require valid JWT tokens
- Tokens expire after a set period (configure in environment)
- Include token in Authorization header: `Bearer <token>`

### Password Security
- Passwords are hashed using bcrypt
- Minimum password requirements should be enforced client-side

### DRM Protection
- Content URLs include DRM protection
- Quality restrictions based on subscription level
- Concurrent stream monitoring

## Development Notes

### Database
- SQLite database with comprehensive schema
- Automatic initialization with seed data
- Foreign key constraints maintain data integrity

### Middleware Stack
- CORS enabled for cross-origin requests
- Authentication middleware for protected routes
- Subscription validation middleware
- Device limit enforcement
- Geo-restriction checking

### Supported Languages
- English (en)
- Hindi (hi)
- Telugu (te)
- Tamil (ta)
- Malayalam (ml)
- Bengali (bn)

---

**API Created by: Penugonda Mallikharjunarao**

For issues or questions, please refer to the project documentation or contact the development team.
