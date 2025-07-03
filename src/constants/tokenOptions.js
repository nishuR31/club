export default function tokenOptions(type) {
  return {
    expiresIn: type.toLowerCase().trim() === "access" ? "1d" : "15d", // ⏰ Token expiration (e.g. '60s', '1h', '7d')
    issuer: "club-app", // 📛 Who issued the token
    audience: "club-clients", // 🎯 Who the token is intended for
  };
}
