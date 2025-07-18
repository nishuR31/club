export default function hideEmail(email) {
  let domain = email.split("@")[0].split("");
  let serve = "@" + email.split("@")[1];
  return (
    domain
      .map((letter, id) => {
        return id === 0 || id === domain.length - 1 ? letter : "*";
      })
      .join("") + serve
  );
}
