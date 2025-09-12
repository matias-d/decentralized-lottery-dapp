import { NavLink } from "react-router";

const tabs = [
  {
    id: 1,
    to: "/dashboard",
    label: "Home",
  },
  {
    id: 2,
    to: "/dashboard/tokens",
    label: "Tokens",
  },
  {
    id: 3,
    to: "/dashboard/tickets",
    label: "Tickets",
  },

  {
    id: 4,
    to: "/dashboard/lottery",
    label: "Lottery",
  },
];

export default function Tabs() {
  return (
    <section className="flex items-center gap-x-4 justify-center my-4">
      {tabs.map((tab) => (
        <NavLink
          key={tab.id}
          to={tab.to}
          end={tab.to === "/dashboard"}
          className={({ isActive }) =>
            isActive
              ? " text-accent font-medium bg-card px-2 py-1 rounded-md"
              : "text-text px-2 py-1 rounded-md hover:bg-card transition-colors"
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </section>
  );
}
