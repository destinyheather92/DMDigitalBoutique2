/** Renders an email address that can wrap cleanly after the "@" on narrow screens. */
export function EmailText({ email }: { email: string }) {
  const [user, domain] = email.split("@");
  return (
    <>
      {user}@<wbr />
      {domain}
    </>
  );
}
