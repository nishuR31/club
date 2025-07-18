export default function tokenOptions(type) {
  return {
    expiresIn: type.toLowerCase().trim() === "access" ? "1d" : "15d", // token valid for 1 day
    issuer: "SynergyHub team", // who issued the token
    subject: "Token object exclusive for SynergyHub's client and team for authentication and security.", // subject of the token
    audience: "SynergyHub's audience, client and team.", // intended audience
  };
}
