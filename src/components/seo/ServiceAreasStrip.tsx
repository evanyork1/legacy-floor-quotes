import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { DFW_CITIES } from "@/constants/serviceAreas";

export const ServiceAreasStrip = () => {
  return (
    <section
      aria-labelledby="service-areas-heading"
      className="py-12 sm:py-16 bg-gradient-to-br from-slate-50 to-blue-50 border-y border-slate-200"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-blue-600 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">
              Serving North Texas
            </span>
          </div>
          <h2
            id="service-areas-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
          >
            Premium Epoxy Flooring & Polished Concrete Across DFW
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Legacy Industrial Coatings proudly installs industrial floor coatings,
            high-traffic epoxy systems, polyurea garage floor coatings, and
            mechanical concrete polishing throughout the Dallas-Fort Worth
            metroplex and surrounding North Texas communities.
          </p>
          <ul className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {DFW_CITIES.map((city) => (
              <li key={city}>
                <Link
                  to="/service-areas"
                  className="inline-block px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors shadow-sm"
                >
                  {city}, TX
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreasStrip;
