import Image from "next/image"
import Link from "next/link"

/* ── Warm 1×1 blur placeholder ── */
const HERO_BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k="

/* ─── Add to globals.css if not already present ────────────────────────────
   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
   ──────────────────────────────────────────────────────────────────────── */

const STATS = [
  { num: "12,000+", numShort: "12K+", label: "Recipes" },
  { num: "180+",    numShort: "180+", label: "Cuisines" },
  { num: "500K+",   numShort: "500K", label: "Cooks" },
  { num: "Daily",   numShort: "Daily", label: "New drops" },
]

export const HeroSection = () => {
  return (
    <section
      aria-label="Hero — Discover Amazing Food Recipes"
      className="relative w-full overflow-hidden"
      style={{ minHeight: "clamp(280px, 50vw, 480px)" }}
    >
      {/* ── Background image ── */}
      <Image
        src="/images/header.jpg"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover"
        priority
        placeholder="blur"
        blurDataURL={HERO_BLUR}
      />

      {/* ── Dark overlay ── */}
      <div className="absolute inset-0 bg-[#0E0805]/80" />

      {/* ── Warm radial glow ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 60% 40%, rgba(184,82,26,0.28) 0%, transparent 65%), " +
            "radial-gradient(ellipse 50% 40% at 20% 70%, rgba(196,168,130,0.12) 0%, transparent 60%)",
        }}
      />

      {/* ── Decorative vertical accent lines ── */}
      <div
        className="absolute inset-y-0 left-0 w-[3px]"
        style={{ background: "linear-gradient(to bottom, transparent, #B8521A 30%, #B8521A 70%, transparent)" }}
      />
      <div
        className="absolute inset-y-0 right-0 w-[3px]"
        style={{ background: "linear-gradient(to bottom, transparent, #B8521A 30%, #B8521A 70%, transparent)" }}
      />

      {/* ── Decorative horizontal rules ── */}
      <div
        className="absolute top-6 left-10 right-10 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(196,168,130,.3), transparent)" }}
      />
      <div
        className="absolute bottom-[72px] sm:bottom-[76px] left-10 right-10 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(196,168,130,.3), transparent)" }}
      />

      {/* ── Rating badge (desktop only) ── */}
      <div
        className="absolute top-5 right-6 hidden sm:flex flex-col items-center justify-center w-[72px] h-[72px] rounded-full border"
        style={{ borderColor: "rgba(196,168,130,.25)", background: "rgba(28,16,8,.5)" }}
      >
        <span
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: "#E8C89A", lineHeight: 1 }}
        >
          4.9
        </span>
        <span
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(196,168,130,.6)", marginTop: 3 }}
        >
          Rating
        </span>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-5 pt-12 pb-20 sm:pb-24"
        style={{ minHeight: "clamp(280px, 50vw, 480px)" }}
      >
        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-5">
          <div className="w-7 h-px" style={{ background: "rgba(196,168,130,.6)" }} />
          <span
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "#C4A882" }}
          >
            Curated for food lovers
          </span>
          <div className="w-7 h-px" style={{ background: "rgba(196,168,130,.6)" }} />
        </div>

        {/* Title */}
        <h1
          className="leading-none mb-3"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          <span
            className="block"
            style={{ fontWeight: 300, fontSize: "clamp(32px, 6vw, 58px)", color: "#FAF7F2", letterSpacing: "-0.02em" }}
          >
            Discover{" "}
            <em style={{ fontStyle: "italic", color: "#E8A87C" }}>Amazing</em>
          </span>
          <span
            className="block"
            style={{
              fontWeight: 600,
              fontSize: "clamp(36px, 7vw, 66px)",
              letterSpacing: "-0.03em",
              background: "linear-gradient(135deg, #E8C89A 0%, #B8521A 60%, #8B3A0F 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: 1.05,
            }}
          >
            Food Recipes
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="max-w-lg"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(12px, 1.8vw, 15px)",
            fontWeight: 300,
            color: "rgba(250,247,242,.6)",
            letterSpacing: "0.04em",
            lineHeight: 1.7,
            margin: "16px 0 28px",
          }}
        >
          Explore thousands of handpicked recipes from every corner of the world,
          crafted for every skill level and every craving.
        </p>

        {/* CTA buttons */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <Link
            href="/recipes"
            className="transition-colors duration-200 rounded-full"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#1C1714",
              background: "#E8C89A",
              padding: "12px 28px",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#FAF7F2")}
            onMouseLeave={e => (e.currentTarget.style.background = "#E8C89A")}
          >
            Explore recipes
          </Link>
          <Link
            href="/collections"
            className="transition-all duration-200 rounded-full"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              fontWeight: 400,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#C4A882",
              background: "transparent",
              border: "0.5px solid rgba(196,168,130,.35)",
              padding: "12px 28px",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "rgba(196,168,130,.7)"
              e.currentTarget.style.color = "#FAF7F2"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "rgba(196,168,130,.35)"
              e.currentTarget.style.color = "#C4A882"
            }}
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-center"
        style={{ borderTop: "0.5px solid rgba(196,168,130,.12)", background: "rgba(14,8,5,.4)", backdropFilter: "blur(8px)" }}
      >
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className="flex flex-col items-center py-3 sm:py-4"
            style={{
              padding: "12px clamp(12px, 3.5vw, 32px)",
              borderRight: i < STATS.length - 1 ? "0.5px solid rgba(196,168,130,.15)" : "none",
            }}
          >
            <span
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "clamp(14px, 2.5vw, 21px)", color: "#E8C89A", lineHeight: 1 }}
              className="sm:hidden"
            >
              {s.numShort}
            </span>
            <span
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "clamp(14px, 2.5vw, 21px)", color: "#E8C89A", lineHeight: 1 }}
              className="hidden sm:block"
            >
              {s.num}
            </span>
            <span
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(8px, 1vw, 10px)", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(196,168,130,.55)", marginTop: 3 }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}