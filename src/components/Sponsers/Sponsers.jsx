// components/Sponsers/Sponsers.jsx

const sponsors = [
  // GOLD (2)
  {
    id: 1,
    tier: "gold",
    image: "/sponsors/gold-1.png",
    link: "https://gold1.com",
  },
  {
    id: 2,
    tier: "gold",
    image: "/sponsors/gold-2.png",
    link: "https://gold2.com",
  },

  // SILVER (4)
  {
    id: 3,
    tier: "silver",
    image: "/sponsors/silver-1.png",
    link: "https://silver1.com",
  },
  {
    id: 4,
    tier: "silver",
    image: "/sponsors/silver-2.png",
    link: "https://silver2.com",
  },
  {
    id: 5,
    tier: "silver",
    image: "/sponsors/silver-3.png",
    link: "https://silver3.com",
  },
  {
    id: 6,
    tier: "silver",
    image: "/sponsors/silver-4.png",
    link: "https://silver4.com",
  },

  // BRONZE (6)
  {
    id: 7,
    tier: "bronze",
    image: "/sponsors/bronze-1.png",
    link: "https://bronze1.com",
  },
  {
    id: 8,
    tier: "bronze",
    image: "/sponsors/bronze-2.png",
    link: "https://bronze2.com",
  },
  {
    id: 9,
    tier: "bronze",
    image: "/sponsors/bronze-3.png",
    link: "https://bronze3.com",
  },
  {
    id: 10,
    tier: "bronze",
    image: "/sponsors/bronze-4.png",
    link: "https://bronze4.com",
  },
  {
    id: 11,
    tier: "bronze",
    image: "/sponsors/bronze-5.png",
    link: "https://bronze5.com",
  },
  {
    id: 12,
    tier: "bronze",
    image: "/sponsors/bronze-6.png",
    link: "https://bronze6.com",
  },

  // OTHER (5)
  {
    id: 13,
    tier: "other",
    image: "/sponsors/other-1.png",
    link: "https://other1.com",
  },
  {
    id: 14,
    tier: "other",
    image: "/sponsors/other-2.png",
    link: "https://other2.com",
  },
  {
    id: 15,
    tier: "other",
    image: "/sponsors/other-3.png",
    link: "https://other3.com",
  },
  {
    id: 16,
    tier: "other",
    image: "/sponsors/other-4.png",
    link: "https://other4.com",
  },
  {
    id: 17,
    tier: "other",
    image: "/sponsors/other-5.png",
    link: "https://other5.com",
  },
];

const tierOrder = ["gold", "silver", "bronze", "other"];

const tierLabels = {
  gold: "Gold Sponsors",
  silver: "Silver Sponsors",
  bronze: "Bronze Sponsors",
  other: "Other Sponsors",
};

const tierGridCols = {
  gold: "grid-cols-12",
  silver: "grid-cols-12",
  bronze: "grid-cols-12",
  other: "grid-cols-12",
};

const tierTileSpan = {
  gold: "col-span-12",
  silver: "col-span-12 md:col-span-6",
  bronze: "col-span-12 md:col-span-4",
  other: "col-span-12 sm:col-span-6 md:col-span-3",
};

function groupByTier(list) {
  return list.reduce((acc, item) => {
    (acc[item.tier] ||= []).push(item);
    return acc;
  }, {});
}

export default function Sponsers() {
  const grouped = groupByTier(sponsors);

  return (
    <div
      className="w-full"
      style={{
        fontFamily: "Roboto, sans-serif",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold mb-10">Sponsors</h2>

        <div className="space-y-14">
          {tierOrder.map((tier) => {
            const items = grouped[tier] || [];
            if (!items.length) return null;

            return (
              <section key={tier}>
                <div className="flex items-baseline justify-between mb-5">
                  <h3 className="text-xl font-semibold">{tierLabels[tier]}</h3>
                  <div className="h-px flex-1 bg-white/10 ml-6" />
                </div>

                <div className={`grid ${tierGridCols[tier]} gap-6`}>
                  {items.map((s) => (
                    <a
                      key={s.id}
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${tierTileSpan[tier]} 
                        rounded-xl border border-white/10 bg-white/5
                        p-6 flex items-center justify-center
                        transition hover:scale-[1.02] hover:bg-white/10`}
                    >
                      <img
                        src={s.image}
                        alt={`${tier} sponsor`}
                        className="max-h-20 w-auto object-contain"
                        loading="lazy"
                      />
                    </a>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
