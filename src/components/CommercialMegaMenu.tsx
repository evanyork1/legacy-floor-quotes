import { APPLICATIONS, SOLUTIONS } from "@/data/commercialNav";

const Column = ({ title, items }: { title: string; items: typeof APPLICATIONS }) => (
  <div>
    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-900 mb-3 pb-2 border-b border-gray-200">
      {title}
    </div>
    <ul className="space-y-0.5">
      {items.map((item) => (
        <li key={item.path}>
          <a
            href={item.path}
            className="block px-2 py-1.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

/** Desktop hover breakout for the Commercial nav item. */
export const CommercialMegaMenu = () => (
  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[640px] bg-white rounded-lg shadow-2xl border border-gray-200 p-6 z-50">
    <div className="grid grid-cols-2 gap-8">
      <Column title="Applications" items={APPLICATIONS} />
      <Column title="Solutions" items={SOLUTIONS} />
    </div>
  </div>
);

/** Stacked version for the mobile drawer. */
export const CommercialMegaMenuMobile = ({ onNavigate }: { onNavigate?: () => void }) => (
  <div className="space-y-4">
    {[
      { title: "Applications", items: APPLICATIONS },
      { title: "Solutions", items: SOLUTIONS },
    ].map((group) => (
      <div key={group.title}>
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-900 mb-1">
          {group.title}
        </div>
        {group.items.map((item) => (
          <a
            key={item.path}
            href={item.path}
            onClick={onNavigate}
            className="block text-gray-600 hover:text-blue-600 transition-colors font-medium py-2 text-sm pl-4 rounded-lg hover:bg-gray-50"
          >
            {item.label}
          </a>
        ))}
      </div>
    ))}
  </div>
);

export default CommercialMegaMenu;
