"use client";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background py-4 px-4 md:px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
        <p>© 2026 Daily MOM. All rights reserved.</p>
        <p>Built for productivity, accountability, and team alignment.</p>
      </div>
    </footer>
  );
};

export default Footer;
