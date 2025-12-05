#!/bin/bash

echo "🧪 Testing SAC Booking Backend API"
echo "===================================="
echo ""

BASE_URL="http://localhost:5000"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}1. Health Check${NC}"
echo "GET $BASE_URL/api/health"
curl -s "$BASE_URL/api/health" | python3 -m json.tool 2>/dev/null || curl -s "$BASE_URL/api/health"
echo ""
echo ""

echo -e "${BLUE}2. Register Student (Example)${NC}"
echo "POST $BASE_URL/api/auth/register"
echo "Request Body:"
cat <<EOF | python3 -m json.tool
{
  "name": "John Doe",
  "rollNumber": "N220866",
  "email": "n220866@rguktn.ac.in",
  "gender": "male",
  "password": "password123"
}
EOF
echo ""
echo "Response:"
curl -s -X POST "$BASE_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "rollNumber": "N220866",
    "email": "n220866@rguktn.ac.in",
    "gender": "male",
    "password": "password123"
  }' | python3 -m json.tool 2>/dev/null || curl -s -X POST "$BASE_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "rollNumber": "N220866",
    "email": "n220866@rguktn.ac.in",
    "gender": "male",
    "password": "password123"
  }'
echo ""
echo ""

echo -e "${BLUE}3. Login (Example)${NC}"
echo "POST $BASE_URL/api/auth/login"
echo "Request Body:"
cat <<EOF | python3 -m json.tool
{
  "email": "n220866@rguktn.ac.in",
  "password": "password123"
}
EOF
echo ""
echo "Response:"
curl -s -X POST "$BASE_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "n220866@rguktn.ac.in",
    "password": "password123"
  }' | python3 -m json.tool 2>/dev/null || curl -s -X POST "$BASE_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "n220866@rguktn.ac.in",
    "password": "password123"
  }'
echo ""
echo ""

echo -e "${BLUE}4. Get Shows (Requires Auth Token)${NC}"
echo "GET $BASE_URL/api/shows"
echo "Headers: Authorization: Bearer <token>"
echo ""
echo -e "${YELLOW}Note: This requires a valid JWT token from login${NC}"
echo ""

echo -e "${BLUE}5. Book a Seat (Requires Auth Token)${NC}"
echo "POST $BASE_URL/api/book"
echo "Headers: Authorization: Bearer <token>"
echo "Request Body:"
cat <<EOF | python3 -m json.tool
{
  "showId": "show-id-here",
  "seatNumber": "A5"
}
EOF
echo ""
echo -e "${YELLOW}Note: This requires a valid JWT token from login${NC}"
echo ""

echo -e "${GREEN}✅ API Testing Complete!${NC}"
echo ""
echo "Available Endpoints:"
echo "  • GET  /api/health              - Health check"
echo "  • POST /api/auth/register       - Register student"
echo "  • POST /api/auth/login          - Login student"
echo "  • GET  /api/shows               - Get shows (requires auth)"
echo "  • POST /api/book                - Book seat (requires auth)"
echo "  • GET  /api/book/my-bookings    - Get user bookings (requires auth)"



